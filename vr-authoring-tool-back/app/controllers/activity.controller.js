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
    preview: req.body.preview,
    creationDate: req.body.creationDate,
    owner:req.body.owner,
    color: req.body.color,
    times: req.body.times,
    texts: req.body.texts,
    activityType: req.body.activityType,
    images:req.body.images
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
        console.log(err)
        return  res.status(500).send({ message: err });
      }

      console.log(activity)
      if (!activity) {
        console.log(err)
        return res.status(400).send({ message: "Failed! activity doesnnt exists!" });
      }

      Activity.updateOne({_id: good_id},{
        title: req.body.title,
        timeRange: req.body.timeRange,    
        content: req.body.content,
        initText: req.body.initText,
        endText: req.body.endText,
        preview: req.body.preview,
        creationDate: req.body.creationDate,
        owner:req.body.owner,
        color: req.body.color,
        times: req.body.times,
        texts: req.body.texts,
        activityType: req.body.activityType,
        images:req.body.images
        
      },  (err, activity) => {
        if (err) {   
          console.log(err)    
          return  res.status(500).send({ message: err });
        }
        console.log(activity)
        return res.status(200).send(activity)
      }); 
    }); 


  
};

  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };


  exports.getAll = (req, res) => {
    const id = req.userId
    console.log(id)
    var good_id = new ObjectId(id);
    Activity.find({ preview: { $ne: true }, owner: {$eq:id}})
    .exec((err, results) => {
      if (err) {       
        return  res.status(500).send({ message: err });
      }
  
      if (!results) {
        return res.status(400).send({ message: "Failed! activity doesnnt exists!" });
        
      }
    
      return res.status(200).send(results)
    }); 
  };