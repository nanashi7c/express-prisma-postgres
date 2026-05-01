import type { Request, Response } from "express";
import { UserModel } from "../models/userModel.js";

async function index(req: Request, res: Response) {
  const users = await UserModel.findAll();
  res.json(users);
}

async function show(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "Invalid user id",
    });
  }

  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  res.json(user);
}

async function create(req: Request, res: Response) {
  const { name, email } = req.body;

  if (!name || email) {
    return res.status(400).json({
      error: "name and email are reequired",
    });
  }

  const user = await UserModel.create(name, email);

  res.status(201).json(user);
}

async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  if (!name || email) {
    return res.status(400).json({
      error: "name and email are required",
    });
  }

  const existingUser = await UserModel.findById(id);

  if (!existingUser) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const user = await UserModel.update(id, name, email);

  res.json(user);
}

async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "User not found",
    });
  }

  const existingUser = await UserModel.findById(id);

  if (!existingUser) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  await UserModel.delete(id);

  res.status(204).send();
}

export const UserController = {
  index,
  show,
  create,
  update,
  delete: remove,
};
