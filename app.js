const express = require( 'express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import routes 

const userRoutes = require('./api/controllers/users/index');
const subjectRoutes = require('./api/controllers/subjects/index');
const semesterRoutes = require('./api/controllers/semesters/index');
const sectionRoutes = require('./api/controllers/sections/index');
const questionRoutes = require('./api/controllers/questions/index');
const lessonRoutes = require('./api/controllers/lessons/index');
const pdfRoutes = require('./api/controllers/pdf/index');



// connect to DATABASE

mongoose.connect('mongodb+srv://Ammarasc74:'+ process.env.MONGO_ATLAS_PW +
'@cluster0.1tiis.mongodb.net/<dbname>?retryWrites=true&w=majority'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on("error", () => console.log("disconnected"));
  db.once("open", () => console.log("connected"));




app.use(morgan('dev'));
// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requsted-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods",'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
// handling req for routes

app.use('/user', userRoutes)
app.use('/subject', subjectRoutes)
app.use('/semester', semesterRoutes)
app.use('/section', sectionRoutes)
app.use('/question', questionRoutes)
app.use('/lesson', lessonRoutes)
app.use('/pdf', pdfRoutes)


//  error handling

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            massage: error.message
        }
    });
});

module.exports = app;