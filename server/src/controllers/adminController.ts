import { Request, Response } from "express";
import pool from "../configs/db";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import { loginSchema } from "../lib/validationSchemas/userValidate";
import bcrypt from "bcryptjs";

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);
  console.log(email, password);

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM admins WHERE email = ?",
      [email, password]
    );

    if (rows.length === 0) {
      res.status(404).json({ message: "Invalid credentials" });
      return;
    }

    const admin = rows[0];
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    const { password: _, ...withOutPassword } = admin;

    res.json({
      message: "Admin logged in successfully",
      token,
      admin: withOutPassword,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
