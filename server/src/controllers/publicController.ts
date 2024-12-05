import { Request, Response } from "express";
import pool from "../configs/db";
import { RowDataPacket } from "mysql2";

export const getUserProfileByUsername = async (req: Request, res: Response) => {
  const username = req.params.username;
  const [result] = await pool.query<RowDataPacket[]>(
    `SELECT id, username, email, firstName, lastName, image FROM users WHERE username = ?`,
    [username]
  );

  const user = result[0];

  if (!user) {
    throw new Error("User not found");
  }

  res.status(200).json(user);
};
