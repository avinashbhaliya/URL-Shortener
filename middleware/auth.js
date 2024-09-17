const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const authorizationHeaderValue = req.headers["authorization"];
  req.user = null;

  // Check if authorization header is missing or doesn't start with "Bearer"
  if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ")) {
    return next(); // Proceed to the next middleware or route handler
  }

  // Extract the token from the authorization header
  const token = authorizationHeaderValue.split("Bearer ")[1];

  // Attempt to retrieve user information using the token
  getUser(token)
    .then(user => {
      if (user) {
        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware or route handler
      } else {
        // Handle authentication failure (e.g., invalid token, user not found)
        res.status(401).json({ error: "Unauthorized" });
      }
    })
    .catch(error => {
      // Handle errors that occur during user retrieval
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

function restrictToRoles(roles = []) {
    return function (req, res, next) {
      if (!req.user) {
        return res.redirect("/login");
      }
  
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Unauthorized" });
      }
  
      next();
    };
  }
  
  module.exports = {
    checkForAuthentication,
    restrictToRoles,
  };