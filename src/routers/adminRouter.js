import express from "express";
import { hashPassword } from "../utility/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { createAdmin } from "../models/adminUser/AdminUserModel.js";
import { adminSignUpEmailVerification } from "../utility/emails.js";

const router = express.Router();

//admin registration
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);

    req.body.password = hashPassword(req.body.password);

    req.body.verificationCode = uuidv4();
    const result = await createAdmin(req.body);

    if (result?._id) {
      //we need to create unique url and sent email to the client
      //[process for the email]
      const uniqueurl = `http://localhost:3000/verify?c=${result.verificationCode}&email=${result.email}`;

      //call email services
      adminSignUpEmailVerification(result, uniqueurl);

      res.json({
        status: "success",
        message:
          "We have sent an email verification link to your email. Please check your email (junk as well if not found in the inbox) and follow the instruction to activate your account",
      });

      return;
    }
    res.json({
      status: "error",
      message: "Error, unable to create new admin, Try again later",
    });
  } catch (error) {
    error.errorCode = 500;
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        " There is already an account exist associated with this email.";
    }
  }
});

//admin Login

export default router;
