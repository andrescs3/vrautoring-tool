const mongoose = require("mongoose");

const Activity = mongoose.model(
  "Activity",
  new mongoose.Schema({
    title: String,
    timeRange: Number,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    texts:[{
      type: String      
    }],
    content: String,
    initText: String,
    endText: String,
    preview: Boolean,
          
  })
);

module.exports = Activity;