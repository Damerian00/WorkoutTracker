const express = require("express");
const mongoose = require('mongoose');
const {Workout} = require('../models/workout');
const logger = require("morgan");
const path = require("path");

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
    Workout.aggregate([
      {
      $addFields: {
        totalDuration: {$sum: "$exercises.duration"},
      },
    }]).then((data)=>{
      res.json(data);

    })  .catch((err) => {
      res.send(err);
        
      });
      
    
});

app.get("/stats", (req , res) => {
  res.sendFile(path.resolve(__dirname, '../public/stats.html'))
})

app.get("/exercise", (req , res) => {
  res.sendFile(path.resolve(__dirname, '../public/exercise.html'))
})


app.get("/api/workouts/range", (req , res) => {
  Workout.aggregate([
    {
    $addFields: {
      totalDuration: {$sum: "$exercises.duration"},
    },
  },
  ]).sort({_id: -1}).limit(7).then((data) => {
    data.sort((a, b) => (a._id > b._id) ? 1 : -1)
    res.json(data);
  }) 
  .catch((err) => {
    res.send(err);
      
    });
  
});

app.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    {_id: req.params.id},
    {$push: {exercises: req.body},},
    {new: true,
    runValidators: true,}
    )
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});


// db.places.update({"country": "Morocco"}, {$set: {"continent": "Antarctica"}}, {multi: true})


// app.post("/api/workouts", (req, res) => {
//   console.log(req.body);

//   Workout.insert(req.body, (error, data) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(data);
//     }
//   });
// });




module.exports = app;