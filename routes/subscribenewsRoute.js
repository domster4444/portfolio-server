const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

// Portfolio  Server Route V2
//
// ? get all userAccounts Details from the database

router.post(
  '/subscribenews',
  asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    if (email) {
      (async () => {
        try {
          //! smtp mail send
          //// await sgMail.send(msg);

          await sendEmail({
            // user email
            email: email,
            subject: `Subscribed to news letters`,
            message,
          });
          res.status(200).json({
            status: 'success',
            message: 'Subscribed to news letters',
          });
        } catch (error) {
          console.error(error);
          if (error.response) {
            console.error(error.response.body);
          }
          res.status(500).json({
            status: 'error',
            message: 'Internal server error',
          });
        }
      })();
    } else {
      res.status(400).json({
        message: 'email is required',
      });
    }
  })
);
