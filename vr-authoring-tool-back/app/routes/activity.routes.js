
const controller = require("../controllers/activity.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  

  app.get(
    "/api/activity/getById/:id",    
    controller.getByID
  );

  
  app.post(
    "/api/activity/save",    
    controller.save
  );
};
