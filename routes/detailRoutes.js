const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const Detail = require('../model/detailsModel');
const router = express.Router();

// ? get all details

router.post(
  '/alldetails',
  asyncHandler(async (req, res, next) => {
    console.log('/nameform GET route has been hit__________');

    console.log(req.body);

    const { email } = req.body;
    console.log(email);
    console.log(email);
    console.log(email);
    console.log(email);
    console.log(email);
    const detailExist = await Detail.findOne({ email });

    if (detailExist) {
      console.log('nameFormData found');
      return res.json({
        status: 'success',
        message: 'nameForm data found',
        detailExist,
      });
    }
    console.log('nameFormData not found');
    return res.status(200).json({
      status: 'failed',
      message: 'nameForm data not found',
    });
  })
);

// ? update user data
router.patch(
  '/nameform',
  asyncHandler(async (req, res, next) => {
    console.log('/nameform PATCH route has been hit__________');

    console.log(req.body);

    const { firstName, middleName, lastName, email, userName } = req.body;
    const user = await User.findOne({ email });
    const detailExist = await Detail.findOne({ email });
    const userNameExist = await Detail.findOne({ userName });
    if (user) {
      if (detailExist) {
        //? is details already exist , already updated by user for 1st time ?
        if (detailExist.setUpForFirstTimeStatus === true) {
          return res.status(200).json({
            status: 'failed',
            message:
              'name, middle name, last name has already been set, cannot be updated twice',
          });
        }
      }

      // ?  is the userName already exist ?
      if (userNameExist) {
        return res.status(200).json({
          status: 'failed',
          message: 'user name already exist , please use another user name',
        });
      }
      // ? if already exist, update the details
      if (detailExist) {
        const createNameFormData = await Detail.findOneAndUpdate(
          { email },
          {
            firstName,
            lastName,
            middleName,
            email,
            userName,
            setUpForFirstTimeStatus: true,
          }
        );

        if (createNameFormData) {
          console.log('nameFormData created');
          res.json({
            status: 'success',
            message:
              'user nameForm data has been updated & now cannot be reset',
            createNameFormData,
          });
        }
        console.log('user NameForm Updated__');
        return 0;
      } else {
        // ? if dont exist, create the details

        const createNameFormData = await Detail.create({
          firstName,
          lastName,
          middleName,
          email,
          userName,
          setUpForFirstTimeStatus: true,
        });
        if (createNameFormData) {
          console.log('nameFormData created');
          res.json({
            status: 'success',
            message:
              'user nameForm data has been created & now cannot be reset',
            createNameFormData,
          });
        }
        console.log('user NameForm Updated__');
        return 0;
      }
    }
    console.log(
      '(trying to update details without creating account , accept policies & terms first )__'
    );
    return res.status(404).json({
      message:
        'User not found , cannot update your details, first create account',
    });
  })
);

// ? update bio data
router.patch(
  '/bioform',
  asyncHandler(async (req, res, next) => {
    console.log('/bioform PATCH route has been hit__________');

    console.log(req.body);

    const { profilePhoto, bio, email } = req.body;
    const user = await User.findOne({ email });
    const detailExist = await Detail.findOne({ email });

    // ? is account created (is terms & policy accepted  )
    if (user) {
      if (detailExist) {
        const createBioData = await Detail.findOneAndUpdate(
          { email },
          {
            profilePhoto,
            bio,
            email,
          }
        );

        console.log(bio);
        console.log(bio);
        console.log(bio);
        console.log(bio);
        console.log(bio);
        console.log(bio);
        if (createBioData) {
          console.log(createBioData);
          console.log('nameFormData created');
          return res.json({
            status: 'success',
            message: 'user bioForm data has been updated ',
            createBioData,
          });
        }
        console.log('user bioForm Updated__');
      } else {
        const createBioData = await Detail.create({
          profilePhoto,
          bio,
          email,
        });
        if (createBioData) {
          console.log('nameFormData created');
          return res.json({
            status: 'success',
            message: 'user bioForm data has been created ',
            createBioData,
          });
        }
        console.log('user bioForm Updated__');
      }
    }
    console.log(
      '(trying to update details without creating account , accept policies & terms first )__'
    );
    return res.status(404).json({
      message:
        'User not found , cannot update your details, first create account',
    });
  })
);

module.exports = router;
