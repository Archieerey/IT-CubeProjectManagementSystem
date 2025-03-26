import { body } from "express-validator";

export const loginValidation = [
  body("password")
    .notEmpty()
    .withMessage("Пароль не может быть пустым")
];

export const registerValidation = [
  // body("password")
  //   .notEmpty()
  //   .withMessage("Пароль не может быть пустым")
  //   .isLength({ min: 8 })
  //   .withMessage("Пароль должен содержать минимум 8 символов")
  //   .matches(/[A-Z]/)
  //   .withMessage('Пароль должен содержать как минимум одну большую букву')
  //   .matches(/[!@#$%^&*(),.?":{}|<>]/)
  //   .withMessage('Пароль должен содержать как минимум один специальный символ'),
  body("name")
    .notEmpty()
    .withMessage("Имя не может быть пустым")
    .isLength({ min: 3 })
    .withMessage("Полное имя должно содержать минимум 3 символа"),
];

