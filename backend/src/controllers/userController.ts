import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import env from "../util/validateEnv";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }
    const user = await UserModel.findById(authenticatedUserId).exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  secret_key?: string;
  username?: string;
  password: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const secret_key = req.body.secret_key;
  const username = req.body.username;
  const passwordRaw = req.body.password;

  try {
    if (secret_key !== env.SECRET_KEY) {
      throw createHttpError(403, "Invalid secret key");
    }

    if (!secret_key || !username || !passwordRaw) {
      throw createHttpError(400, "Missing parameters");
    }

    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();

    if (existingUsername) {
      throw createHttpError(409, "Username not valid");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    const userResponse = {
      username: newUser.username,
      _id: newUser._id,
    };

    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Missing parameters");
    }

    const user = await UserModel.findOne({ username: username })
      .select("+password")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    console.log("Session ID set to:", req.session.userId);

    const userResponse = {
      username: user.username,
      _id: user._id,
    };

    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const { username, password, newPassword } = req.body;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = await UserModel.findById(authenticatedUserId)
      .select("+password")
      .exec();

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    if (username) {
      if (!password) {
        throw createHttpError(
          400,
          "Current password is required to update username"
        );
      }

      const existingUsername = await UserModel.findOne({ username }).exec();
      if (
        existingUsername &&
        existingUsername._id.toString() !== user._id.toString()
      ) {
        throw createHttpError(409, "Username already exists.");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw createHttpError(400, "Current password is incorrect");
      }

      user.username = username;
    }

    if (newPassword) {
      if (!password) {
        throw createHttpError(
          400,
          "Current password is required to update password"
        );
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw createHttpError(400, "Current password is incorrect");
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await user.save();

    const userResponse = {
      username: updatedUser.username,
      _id: updatedUser._id,
    };

    res.status(200).json(userResponse);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = await UserModel.findByIdAndDelete(authenticatedUserId).exec();

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    req.session.destroy((error) => {
      if (error) {
        next(error);
      } else {
        res.status(200).json({ message: "Account deleted successfully" });
      }
    });
  } catch (error) {
    next(error);
  }
};
