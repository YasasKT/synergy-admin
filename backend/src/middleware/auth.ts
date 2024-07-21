import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }
    const user = await UserModel.findById(authenticatedUserId).exec();
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    next();
  } catch (error) {
    next(error);
  }
};
