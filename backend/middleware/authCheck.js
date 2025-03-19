import User from "../models/User.js";
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  const token = req.cookies.jwt;  
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findById(decoded._id).populate("role");
      if (!user) {
        return res.status(403).json({
          message: "Пользователь не найден",
        });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({
        message: "Вы не зарегистрированы",
      });
    }
  } else {
    return res.status(403).json({
      message: "Вы не зарегистрированы",
    });
  }
};
