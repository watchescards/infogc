// all middleware goes here
const middlewareObj = {};


middlewareObj.isLoggedIn =function(req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      req.flash('error', 'You must be signed in to do that!');
      res.redirect('/login');
  
};

middlewareObj.checkadminAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
            if (!req.user.isadmin) {
                res.redirect("/");
            } else {
                 return next();
            }
      
    }else{
      res.redirect('/login');

    }
};


module.exports = middlewareObj;



// Create seperate middleware for vendor login and authentication 