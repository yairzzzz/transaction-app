import jwt from "jsonwebtoken";

export const generateToken = (newUser, res) => {
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // can't access from JavaScript (XSS safe)
    secure: true, // only over HTTPS (set to false in dev)
    sameSite: "Strict", // optional: control cross-site behavior
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};
