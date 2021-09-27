const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,  
  },
    exercise:{

    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        trim: true,
        require: true,
    },
    weight: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    }
}
});


const Workout = mongoose.model("Workout" , WorkoutSchema)

module.exports = {Workout};
/* This will need the following fields
Date:
Exercise Type Resistance or cardio
Exercise Name
Weight
sets
reps
duration
*/