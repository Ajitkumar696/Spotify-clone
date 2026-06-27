const { body, validationResult } = require("express-validator");

const createAlbumValidation = [
    body("title")
        .notEmpty()
        .withMessage("title is required"),

    body("musics")
        .isArray()
        .withMessage("musics must be an array")
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
    createAlbumValidation,
    validate
};