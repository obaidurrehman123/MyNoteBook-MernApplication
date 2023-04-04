const jwt = require("jsonwebtoken");
const JWT_TOKEN = "obaidurrehmanauthen";
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  console.log("token"+token);
  if (!token) {
    res
      .status(401)
      .send({ error: "please authenticate using a validate token" });
  }
  try {
    const data = jwt.verify(token,JWT_TOKEN);
    req.user = data.user;
  } catch {
    res
      .status(401)
      .send({ error: "please authenticate using a validate token" });
  }
  next();
};

module.exports = fetchUser;
