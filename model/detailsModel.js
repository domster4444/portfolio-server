const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  setUpForFirstTimeStatus: {
    type: Boolean,
    default: false,
    optional: true,
  },
  firstName: {
    type: String,
    optional: true,
  },
  middleName: {
    type: String,
    optional: true,
  },
  lastName: {
    type: String,
    optional: true,
  },
  userName: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
    unique: true,
    optional: true,
  },
  profilePhoto: {
    type: String,
    default:
      'https://i.pinimg.com/564x/74/46/9b/74469bd23df16c22231fcf75b7073fd2.jpg',
    optional: true,
  },
  secondaryPicture: {
    type: String,
    optional: true,
  },
  profilePhotoUpdateCount: {
    type: Number,
    default: 0,
    optional: true,
  },
  bio: {
    type: String,
    default: '',
    optional: true,
  },
  aboutMe: {
    type: String,
    default: '',
    optional: true,
  },
  twitter: {
    type: String,
    default: '',
    optional: true,
  },
  facebook: {
    type: String,
    default: '',
    optional: true,
  },
  instagram: {
    type: String,
    default: '',
    optional: true,
  },
  linkedin: {
    type: String,
    default: '',
    optional: true,
  },
  github: {
    type: String,
    default: '',
    optional: true,
  },
  website: {
    type: String,
    default: '',
    optional: true,
  },
  education: [
    {
      organizationName: {
        type: String,
        default: '',
        unique: true,
        optional: true,
      },
      dateOfJoining: {
        type: String,
        default: '',
        optional: true,
      },
      dateOfLeaving: {
        type: String,
        default: '',
        optional: true,
      },
    },
  ],

  workExperience: [
    {
      companyName: {
        type: String,
        default: '',
        optional: true,
      },
      destination: {
        type: String,
        default: '',
        optional: true,
      },
      dateOfJoining: {
        type: String,

        default: '',
        optional: true,
      },
      workDescription: {
        type: String,

        default: '',
        optional: true,
      },
    },
  ],

  skills: [
    {
      skillName: {
        type: String,
        default: '',
        optional: true,
      },
      skillLevel: {
        type: String,

        default: '',
        optional: true,
      },
    },
  ],

  projects: [
    {
      projectName: {
        type: String,
        default: '',
        optional: true,
      },
      projectDescription: {
        type: String,
        default: '',
        optional: true,
      },
      projectImage: {
        type: String,
        default: '',
        optional: true,
      },
      projectVideoLink: {
        type: String,
        default: '',
        optional: true,
      },
      projectGithubLink: {
        type: String,
        default: '',
        optional: true,
      },
      projectWebsiteLink: {
        type: String,
        default: '',
        optional: true,
      },
      projectDocLink: {
        type: String,
        default: '',
        optional: true,
      },
    },
  ],
  yearsOfExperience: {
    type: Number,
    default: null,
    optional: true,
  },
  noOfCompletedProjects: {
    type: Number,
    default: null,
    optional: true,
  },
  achievements: [
    {
      achievementName: {
        type: String,
        default: '',
        optional: true,
      },
      achievementDescription: {
        type: String,
        default: '',
        optional: true,
      },
      achievementImage: {
        type: String,
        default: '',
        optional: true,
      },
    },
  ],
});
const Details = mongoose.model('Details', detailsSchema);
module.exports = Details;
