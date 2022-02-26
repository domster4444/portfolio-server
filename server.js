const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const globalErrorHandler = require('./middleware/errorMiddleware');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
const connectDB = require('./config/db');
const { cloudinary } = require('./utils/cloudnary');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoute = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const detailRoutes = require('./routes/detailRoutes');
dotenv.config();
// connect to the database
connectDB(); //? connect db
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' })); //? allow body parsing
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['lama'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//? routes
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'PortfolioServer Working Fine',
  });
});

//!___ provide url to access the image by cloudinary
// configure routes
app.post('/api/upload', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(
      fileStr,
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: 'Error uploading file',
            error: err,
          });
        } else {
          //! -------SERVER GETS "IMAGE ID OBJ" FROM CLOUDINARY . store that to access later
          console.log(
            'cloudinary image object as response after upload to cloudinary'
          );
          console.log(result);
          console.log(result.url);
          console.log(result.url);
          console.log(result.url);
          console.log(result.url);
          console.log(result.url);
          console.log(result.url);
          //! ------SERVER GETS "IMAGE ID OBJ" FROM CLOUDINARY . store that to access later
          return res.status(200).json({
            message: 'File uploaded successfully',
            url: result.url,
          });
        }
      }
    );
  } catch (err) {
    console.error('your error' + err);
  }
});
//!___ Cloudinary route

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/users', detailRoutes);
// app.use('/account', passwordResetRoutes);

// TODO: auth
// app.use('/auth', authRoute);

//?global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
