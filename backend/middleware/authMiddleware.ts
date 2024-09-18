import User from "../Models/userModel";
import expressAsyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwtUtils";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization?.split(" ")[1]|| "";
        const decoded = verifyToken(token);
        req.user = await User.findById(decoded._id).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
);

export default protect;
