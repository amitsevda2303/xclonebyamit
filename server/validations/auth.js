import {body} from "express-validator"

export const createUserValidations = [
    body('email')
        .optional()
        .custom((value) => {
            if (value && !value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                throw new Error('Invalid email address');
            }
            return true;
        }),

body('mobile')
    .optional()
    .custom((value) => {
        if (value !== null && value !== "" && !/^[0-9]{10}$/.test(value.toString())) {
            throw new Error('Mobile number must be 10 digits');
        }

        return true;
    }),
    body('password').custom((value) =>{
        if (value == null || value.length < 7) {
            throw new Error ('Password is too small plese enter atleast 8 characters');
        }
        return true;
    }),

body()
    .custom((value, { req }) => {
        const { email, mobile } = req.body;
        if ((email !== null && email !== '') && !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            throw new Error('Invalid email address');
        }

        if ((mobile !== null && mobile !== '') && !/^[0-9]{10}$/.test(mobile.toString())) {
            throw new Error('Mobile number must be 10 digits');
        }
         if ((mobile !== null && mobile !== '') && (email !== null && email !== '')) {
            throw new Error("Either email or mobile is required, but not both");
        }

        if ((mobile === null || mobile === '') && (email === null || email === '')) {
            throw new Error('Either email or mobile is required');
        }

        return true;
    }),
]

export const loginValidations = [
    body("content")
      .custom((value, { req }) => {
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        const isValidMobile = /^[0-9]{10}$/.test(value);
  
        if (!isValidEmail && !isValidMobile) {
          throw new Error("Invalid email or mobile number format");
        }
  
        return true;
      }),
    body("password", "At least 8 characters").isLength({ min: 7 }),
  ];