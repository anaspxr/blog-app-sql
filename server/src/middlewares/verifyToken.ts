import { NextFunction, Response } from "express";
import { PrivateRequest } from "../lib/types";
import jwt from "jsonwebtoken";
import pool from "../configs/db";
import { RowDataPacket } from "mysql2";

export const verifyToken = async (
  req: PrivateRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Not authenticated");
    }
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as jwt.JwtPayload;

    req.userId = verified.id;

    const [result] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM users WHERE id = ?`,
      [req.userId]
    );
    const userExists = result[0];
    if (!userExists || userExists.isBlocked) {
      throw new Error("User not found or blocked");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyAdmin = async (
  req: PrivateRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Not authenticated");
    }
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as jwt.JwtPayload;

    if (verified.roll !== "admin") {
      throw new Error("Not authorized");
    }

    req.userId = verified.id;

    const [result] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM admins WHERE id = ?`,
      [req.userId]
    );

    const adminExists = result[0];

    if (!adminExists) {
      throw new Error("Admin not found");
    }
    next();
  } catch (error) {
    next(error);
  }
};
