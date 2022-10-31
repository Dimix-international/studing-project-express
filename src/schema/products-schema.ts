import {body} from "express-validator";

export const productsSchema = [
    body('title')
        .exists({checkFalsy: true})
        .withMessage('Incorrect format')
        .trim()
        .isLength({min: 3, max: 30})
        .withMessage('Incorrect count of symbols!'),
];