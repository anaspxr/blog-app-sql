import { Request, Response } from "express";
import {
  loginSchema,
  registerSchema,
} from "../lib/validationSchemas/userValidate";
import pool from "../configs/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrivateRequest } from "../lib/types";

export const userRegister = async (req: Request, res: Response) => {
  const { username, email, password, firstName, lastName } =
    registerSchema.parse(req.body);

  const [emailExists] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  if (emailExists[0]) {
    throw new Error("Email already exists");
  }

  const [usernameExists] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM users WHERE username = ?`,
    [username]
  );

  if (usernameExists.length > 0) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await pool.query<ResultSetHeader>(
    `INSERT INTO users (username, email, password, firstName, lastName) VALUES (?, ?, ?, ?, ?)`,
    [username, email, hashedPassword, firstName, lastName]
  );

  const token = jwt.sign(
    {
      id: user.insertId,
    },
    process.env.JWT_SECRET!
  );

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: { id: user.insertId, username, email, firstName, lastName },
  });
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  let user: RowDataPacket;

  // log in the user based on the email or username
  if (email.includes("@")) {
    const [result] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (!result[0]) {
      throw new Error("User not found");
    }

    user = result[0];
  } else {
    // if the email does not contain @, then it is a username
    const [result] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM users WHERE username = ?`,
      [email]
    );

    if (!result[0]) {
      throw new Error("User not found");
    }

    user = result[0];
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET!
  );

  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: userWithoutPassword,
  });
};

export const getUserProfile = async (req: PrivateRequest, res: Response) => {
  const id = req.userId;
  const [result] = await pool.query<RowDataPacket[]>(
    `SELECT id, username, email, firstName, lastName, image FROM users WHERE id = ?`,
    [id]
  );

  const user = result[0];

  if (!user) {
    throw new Error("User not found");
  }

  res.status(200).json(user);
};
