import { Request, Response } from "express";
import { storage } from "../storage";

export class UserController {
  // Lấy tất cả người dùng (chỉ quản trị viên)
  static async getAll(req: Request, res: Response) {
    try {
      const users = await storage.getUsers();
      // Loại bỏ mật khẩu khỏi response
      const safeUsers = users.map((user: any) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        createdAt: user.createdAt
      }));
      res.json(safeUsers);
    } catch (error) {
      res.status(500).json({ message: 'Không thể tải danh sách người dùng' });
    }
  }

  // Cập nhật người dùng
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const user = await storage.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: 'Không thể cập nhật người dùng' });
    }
  }

  // Xóa người dùng
  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const currentUser = req.user;
      
      if (currentUser.userId === id) {
        return res.status(400).json({ message: 'Không thể xóa tài khoản của chính bạn' });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      
      await storage.deleteUser(id);
      res.json({ message: 'Xóa người dùng thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Không thể xóa người dùng' });
    }
  }
}
