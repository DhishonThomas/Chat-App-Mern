import User from "../Models/userModel";
import expressAsyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwtUtils";

interface UserCheck extends Request {
  user: any;
}

const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userReq = req as UserCheck;
    let token;
    if (
      userReq.headers.authorization &&
      userReq.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization?.split("")[1] || "";

        const decoded = verifyToken(token);
        userReq.user = await User.findById(decoded.id).select("-password");
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
