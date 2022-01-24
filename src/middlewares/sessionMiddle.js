sessionMiddle = function(req, res, next) {
    res.locals.loggedUser = req.session.loggedUser;
    // console.log(res.locals.loggedUser)
    next();
  };

module.exports = sessionMiddle