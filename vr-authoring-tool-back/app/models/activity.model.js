const mongoose = require("mongoose");

const ImageContent = new mongoose.Schema({
  source: String,
  xPos: String,
  yPos: String
});

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
    creationDate: Number,
    color: String,
    times:[{
      type: String      
    }],
    activityType: Number,
    images:[{
      type: ImageContent, 
      default:[]      
    }],
    
          
  })
);

module.exports = Activity;