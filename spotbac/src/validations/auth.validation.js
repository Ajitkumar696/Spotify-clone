const { body, validationResult } = require("express-validator");

const registerValidation = [
    body("username")
        .notEmpty()
        .withMessage("username is required")
        .isLength({ min: 3 })
        .withMessage("username must be at least 3 characters"),

    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email"),

    body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters")
];

const loginValidation = [
    body("password")
        .notEmpty()
        .withMessage("password is required"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("invalid email")
];

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    registerValidation,
    loginValidation,
    validate
};