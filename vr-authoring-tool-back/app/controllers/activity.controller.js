const Activity = require('../models/activity.model');

const ObjectId = require('mongodb').ObjectId;

exports.getByID = (req, res) => {
    var id = req.params.id;       
    var good_id = new ObjectId(id);
   
    Activity.findOne({_id: good_id})
    .exec((err, activity) => {
      if (err) {       
        return  res.status(500).send({ message: err });
      }
  
      if (!activity) {
        return res.status(400).send({ message: "Failed! activity doesnnt exists!" });
        
      }
    
      return res.status(200).send(activity)
    }); 
};

exports.save = (req, res) => {
  const activity = new Activity({
    title: req.body.title,
    timeRange: req.body.timeRange,    
    content: req.body.content,
    initText: req.body.initText,
    endText: req.body.endText,
    preview: req.body.preview
    
  });

  activity.save((err, activity) => {
    if (err) {       
      return  res.status(500).send({ message: err });
    }

    return res.status(200).send(activity)
  }); 
};

exports.update = (req, res) => {
  var id = req.params.id;       
    var good_id = new ObjectId(id);
   
    Activity.findOne({_id: good_id})
    .exec((err, activity) => {
      if (err) {       
        return  res.status(500).send({ message: err });
      }
  
      if (!activity) {
        return res.status(400).send({ message: "Failed! activity doesnnt exists!" });
      }
      activity.update((err, activity) => {
        if (err) {       
          return  res.status(500).send({ message: err });
        }
    
        return res.status(200).send(activity)
      }); 

    
      return res.status(200).send(activity)
    }); 


  
};

  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };