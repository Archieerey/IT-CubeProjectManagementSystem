export const adminCheck = (req, res, next) => {
  if (req.user && req.user.role.title === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Отказано в доступе! Вы не админ!",
    });
  }
};

export const teacherCheck = (req, res, next) => {
  if (req.user && (req.user.role.title === 'teacher' || req.user.role.title === 'admin')) {
    next();
  } else {
    res.status(403).json({
      message: "Отказано в доступе! Вы не преподаватель!"
    })
  }
}