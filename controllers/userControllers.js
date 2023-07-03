const { User } = require("../db/models/usersModel");
const { ctrlWrapper, HttpError } = require("../helpers");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "This email alredy exists");
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, password, avatarURL });
  await newUser.hashPassword(password);
  await newUser.save();
  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(newUser._id, { token });
  res.status(201).json({
    token,
    user: {
      name,
      email,
      avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user =await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      name: user.name,
      avatarURL: user.avatarURL,
    },
  });
};

const logout = async (req, res) => {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, { token: "" })
    res.status(204).json()
}

const getCurrent = async (req, res) => {
    const { name, email, avatarURL } = req.user;
    res.status(200).json({ name, email, avatarURL });
}

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
