import { Request, Response } from "express";
import pool from "../configs/db";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
