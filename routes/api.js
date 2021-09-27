const express = require("express");
// const mongojs = require("mongojs");
const mongoose = require('mongoose');
const {Workout} = require('../models/workout');
const logger = require("morgan");
// const path = require("path");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// const databaseUrl = "workout";
// const collections = ["workout"];

// const db = mongojs(databaseUrl, collections);
mongoose.connect('mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.get("/api/workouts", (req , res) => {
    Workout.find({}, (error, data) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(data);
          res.json(data);
        }
      });
    
})



app.get("/api/workouts/range", (req , res) => {
  Workout.find({}, (error, data) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  
})


module.exports = app;