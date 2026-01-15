import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";

// Mở rộng Express Request interface để bao gồm user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware xác minh JWT token
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Yêu cầu token truy cập' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token không hợp lệ' });
    }
    req.user = user;
    next();
  });
}

// Middleware kiểm tra quyền admin
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Yêu cầu quyền quản trị viên' });
  }
  next();
}

// Middleware kiểm tra quyền nhân viên hoặc admin
export function requireStaff(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'staff' && req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Yêu cầu quyền nhân viên' });
  }
  next();
}
