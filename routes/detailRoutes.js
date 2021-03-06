const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const Detail = require('../model/detailsModel');
const router = express.Router();

// ? get all details

router.post(
  '/themedetails',
  asyncHandler(async (req, res, next) => {
    console.log('/themedetails post route has been hit__________');

    console.log(req.body);

    const { userName } = req.body;

    const detailExist = await Detail.findOne({ userName });

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

// ? get all details for UPDATE FIELDS OF FORM

router.post(
  '/alldetails',
  asyncHandler(async (req, res, next) => {
    console.log('/alldetails post route has been hit__________');

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

// ? update nameForm data
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

// ? update bioForm data
router.patch(
  '/bioform',
  asyncHandler(async (req, res, next) => {
    console.log('/bioform PATCH route has been hit__________');

    console.log(req.body);

    const {
      profilePhoto,
      bio,
      email,
      yearsOfExperience,
      noOfCompletedProjects,
    } = req.body;
    const user = await User.findOne({ email });
    const detailExist = await Detail.findOne({ email });

    // ? is account created (is terms & policy accepted  )
    if (user) {
      if (detailExist) {
        const createBioData = await Detail.findOneAndUpdate(
          { email },
          {
            profilePhoto,
            // bio form's text area data
            bio,
            email,
            yearsOfExperience,
            noOfCompletedProjects,
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

// ? update contactForm data
router.post(
  '/contactform',
  asyncHandler(async (req, res, next) => {
    console.log('/contactform PATCH route has been hit__________');

    console.log(req.body);

    const { twitter, facebook, instagram, linkedin, github, website, email } =
      req.body;
    const user = await User.findOne({ email });
    const detailExist = await Detail.findOne({ email });

    // ? is account created (is terms & policy accepted  )
    if (user) {
      if (detailExist) {
        const updateContactData = await Detail.findOneAndUpdate(
          { email },
          {
            twitter,
            facebook,
            instagram,
            linkedin,
            github,
            website,
            email,
          }
        );

        if (updateContactData) {
          console.log(updateContactData);
          console.log('nameFormData created');
          return res.json({
            status: 'success',
            message: 'user contact data has been updated ',
            updateContactData,
          });
        }
        console.log('user contact data Updated__');
      } else {
        const createContactData = await Detail.create({
          twitter,
          facebook,
          instagram,
          linkedin,
          github,
          website,
          email,
        });
        if (createContactData) {
          console.log('nameFormData created');
          return res.json({
            status: 'success',
            message: 'user contact data has been created ',
            createContactData,
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
// ! UPDATE SKILLS
router.patch(
  '/skillsform',
  asyncHandler(async (req, res, next) => {
    console.log('/skillsform PATCH route has been hit__________');

    const { email, skillName, skillLevel } = req.body;
    const user = await User.findOne({ email });
    const detailExist = await Detail.findOne({ email });

    // ? is account created (is terms & policy accepted  )
    if (user) {
      if (detailExist) {
        const newArray = [...detailExist.skills, { skillName, skillLevel }];

        // check if skill already exist
        for (let i = 0; i < detailExist.skills.length; i++) {
          if (detailExist.skills[i].skillName === skillName) {
            console.log('skill already exist');
            return res.status(404).json({
              message: 'skill already exist',
            });
          }
        }
        // update skills
        const updateSkillsData = await Detail.findOneAndUpdate(
          { email },
          {
            skills: newArray,
          }
        );
        // response on successful update
        if (updateSkillsData) {
          console.log('skills data updated');
          return res.json({
            status: 'success',
            message: 'user skills data has been updated ',
            updateSkillsData,
          });
        }
      } else {
        const createSkillsData = await Detail.create({
          email,
          skills: [{ skillName, skillLevel }],
        });
        if (createSkillsData) {
          console.log('nameFormData created');
          return res.json({
            status: 'success',
            message: 'user skills data has been created ',
            createSkillsData,
          });
        }
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
// ! UPDATE EDUCCATION

router.patch(
  '/educationform',
  asyncHandler(async (req, res, next) => {
    console.log('/educationform PATCH route has been hit__________');

    const { email, organizationName, dateOfJoining, dateOfLeaving } = req.body;
    const user = await User.findOne({ email });
    const detailExist = await Detail.findOne({ email });

    // ? is account created (is terms & policy accepted  )
    if (user) {
      if (detailExist) {
        const newArray = [
          ...detailExist.education,
          { organizationName, dateOfJoining, dateOfLeaving },
        ];

        // check if skill already exist
        for (let i = 0; i < detailExist.education.length; i++) {
          if (detailExist.education[i].organizationName === organizationName) {
            console.log('organization name already exist');
            return res.status(404).json({
              message: 'organization name already exist',
            });
          }
        }
        // update education
        const updateEducationData = await Detail.findOneAndUpdate(
          { email },
          {
            education: newArray,
          }
        );
        // response on successful update
        if (updateEducationData) {
          console.log('education data updated');
          return res.json({
            status: 'success',
            message: 'user education data has been updated ',
            updateEducationData,
          });
        }
      } else {
        const createEducationData = await Detail.create({
          email,
          education: [{ organizationName, dateOfJoining, dateOfLeaving }],
        });
        if (createEducationData) {
          console.log('nameFormData created');
          return res.json({
            status: 'success',
            message: 'user education data has been created ',
            createEducationData,
          });
        }
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

// ! UPDATE WORK
router.patch(
  '/workform',
  asyncHandler(async (req, res, next) => {
    console.log('/workform PATCH route has been hit__________');

    const { email, companyName, destination, dateOfJoining, workDescription } =
      req.body;
    const user = await User.findOne({ email });
    const detailExist = await Detail.findOne({ email });

    // ? is account created (is terms & policy accepted  )
    if (user) {
      if (detailExist) {
        const newArray = [
          ...detailExist.workExperience,
          { companyName, destination, dateOfJoining, workDescription },
        ];

        // check if skill already exist
        for (let i = 0; i < detailExist.workExperience.length; i++) {
          if (detailExist.workExperience[i].companyName === companyName) {
            console.log('company name already exist');
            return res.status(404).json({
              message: 'company name already exist',
            });
          }
        }
        // update skills
        const updateWorkExperienceData = await Detail.findOneAndUpdate(
          { email },
          {
            workExperience: newArray,
          }
        );
        // response on successful update
        if (updateWorkExperienceData) {
          console.log('skills data updated');
          return res.json({
            status: 'success',
            message: 'user work experience data has been updated ',
            updateWorkExperienceData,
          });
        }
      } else {
        const createWorkExperienceData = await Detail.create({
          email,
          workExperience: [
            { companyName, destination, dateOfJoining, workDescription },
          ],
        });
        if (createWorkExperienceData) {
          console.log('nameFormData created');
          return res.json({
            status: 'success',
            message: 'user skills data has been created ',
            createWorkExperienceData,
          });
        }
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

// ! update Achievements

router.patch(
  '/achievementform',
  asyncHandler(async (req, res, next) => {
    console.log('/acievement form PATCH route has been hit__________');

    const { email, achievementImage, achievementName, achievementDescription } =
      req.body;
    const user = await User.findOne({ email });
    const detailExist = await Detail.findOne({ email });

    // ? is account created (is terms & policy accepted  )
    if (user) {
      if (detailExist) {
        // * *** **if detail exist then just update .... .... ...
        const newArray = [
          ...detailExist.achievements,
          { achievementImage, achievementName, achievementDescription },
        ];

        // check if skill already exist
        for (let i = 0; i < detailExist.achievements.length; i++) {
          if (detailExist.achievements[i].achievementName === achievementName) {
            return res.status(404).json({
              message: 'achievementName  name already exist',
            });
          }
        }
        // update skills
        const updateAchievemetData = await Detail.findOneAndUpdate(
          { email },
          {
            achievements: newArray,
          }
        );
        // response on successful update
        if (updateAchievemetData) {
          return res.json({
            status: 'success',
            message: 'achievement data has been updated ',
            updateAchievemetData,
          });
        }
      } else {
        const createAchievementData = await Detail.create({
          email,
          achievements: [
            { achievementImage, achievementName, achievementDescription },
          ],
        });
        if (createAchievementData) {
          console.log('nameFormData created');
          return res.json({
            status: 'success',
            message: 'achievement data has been created ',
            createAchievementData,
          });
        }
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

// ! UPDATE Project
router.patch(
  '/projectform',
  asyncHandler(async (req, res, next) => {
    console.log('/project form PATCH route has been hit__________');

    const {
      email,
      projectName,
      projectDescription,
      projectImage,
      projectVideoLink,
      projectGithubLink,
      projectWebsiteLink,
      projectDocLink,
    } = req.body;
    const user = await User.findOne({ email });
    const detailExist = await Detail.findOne({ email });

    // ? is account created (is terms & policy accepted  )
    if (user) {
      if (detailExist) {
        // * *** **if detail exist then just update .... .... ...
        const newArray = [
          ...detailExist.projects,
          {
            projectName,
            projectDescription,
            projectImage,
            projectVideoLink,
            projectGithubLink,
            projectWebsiteLink,
            projectDocLink,
          },
        ];

        // check if project already exist
        for (let i = 0; i < detailExist.projects.length; i++) {
          if (detailExist.projects[i].projectName === projectName) {
            return res.status(404).json({
              message: 'project  name already exist',
            });
          }
        }
        // update skills
        const updateProjectData = await Detail.findOneAndUpdate(
          { email },
          {
            projects: newArray,
          }
        );
        // response on successful update
        if (updateProjectData) {
          return res.json({
            status: 'success',
            message: 'project data has been updated ',
            updateProjectData,
          });
        }
      } else {
        const createProjectData = await Detail.create({
          email,
          projects: [
            {
              projectName,
              projectDescription,
              projectImage,
              projectVideoLink,
              projectGithubLink,
              projectWebsiteLink,
              projectDocLink,
            },
          ],
        });
        if (createProjectData) {
          console.log('project data created');
          return res.json({
            status: 'success',
            message: 'project data has been created ',
            createProjectData,
          });
        }
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

// ? submit secondaryImage forrm

// ? update bioForm data
router.patch(
  '/secondaryimg',
  asyncHandler(async (req, res, next) => {
    console.log('/secondaryImage PATCH route has been hit__________');

    console.log(req.body);

    const { secondaryPicture, email } = req.body;
    const user = await User.findOne({ email });
    const detailExist = await Detail.findOne({ email });

    // ? is account created (is terms & policy accepted  )
    if (user) {
      if (detailExist) {
        const alreadyCreatedSecondaryForm = await Detail.findOneAndUpdate(
          { email },
          {
            secondaryPicture,
            email,
          }
        );
        //? iif updated successfully
        if (alreadyCreatedSecondaryForm) {
          console.log(alreadyCreatedSecondaryForm);
          console.log('secondaryPictureForm created');
          return res.json({
            status: 'success',
            message: 'user secondaryPicture Form data has been updated ',
            alreadyCreatedSecondaryForm,
          });
        }
        console.log('user bioForm Updated__');
      } else {
        const newlyCreatedSecondaryForm = await Detail.create({
          secondaryPicture,
          email,
        });
        // ? if created successfully
        if (newlyCreatedSecondaryForm) {
          console.log('secondaryPictureForm Data created');
          return res.json({
            status: 'success',
            message: 'user secondaryPictureForm Data data has been created ',
            newlyCreatedSecondaryForm,
          });
        }
        console.log('user secondaryPictureForm Data Updated__');
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
