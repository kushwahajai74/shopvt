//creating token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
