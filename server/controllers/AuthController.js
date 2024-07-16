import UserModel from "../models/userModel.js";
import RefreshToken from "../models/refreshTokenModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userValidationSchema } from "../validation/userValidationSchema.js";



// REGISTRATION FOR ADMIN & SUPER ADMIN
export const registerSuperAdmin = async (req, res) => {

  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);
  const { fullName } = req.body

  try {
    const oldUser = await UserModel.findOne({ fullName });

    if (oldUser)
      return res.json({ status: false, message: "User already exists" });
    const user = await newUser.save();
    const token = jwt.sign(
      { fullName: user.fullName, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { fullName: user.fullName, id: user._id },
      process.env.JWT_REFRESH_KEY,
    );
    await new RefreshToken({ userId: user._id, token: refreshToken }).save();
    res.status(200).json({ status: true, user, token, refreshToken, message: "User has been registration successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// REGISTRATION FOR USER
export const registerUser = async (req, res) => {

  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  const image = req.file ? req.file.filename : "";
  req.body.image = image;

  const newUser = new UserModel(req.body);
  const { fullName } = req.body

  try {
    const oldUser = await UserModel.findOne({ fullName });

    if (oldUser)
      return res.json({ status: false, message: "User already exists" });

    const user = await newUser.save();
    const token = jwt.sign(
      { fullName: user.fullName, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { fullName: user.fullName, id: user._id },
      process.env.JWT_REFRESH_KEY,
    );
    await new RefreshToken({ userId: user._id, token: refreshToken }).save();
   return res.status(200).json({ status: true, user, token, refreshToken, message: "User has been registration successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// LOGIN FOR USER, ADMIN & SUPER ADMIN

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

    if (user) {

      if(!user.isActive) return res.status(400).json({message:'The user is restricted from access'})

      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
       return res.status(200).json({ status: false, message: "wrong password" });

      } else {
        const token = jwt.sign(
          { fullName: user.fullName, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        const refToken = await RefreshToken.findOne({ userId: user.id });
        const refreshToken = refToken.token

       return res.status(200).json({ status: true, user, token, refreshToken, message: "User login successfully!" });
      }
    } else {
     return res.status(400).json({ status: false, message: "User not found" });
    }
  } catch (err) {
   return res.status(500).json(err.message);
  }
};


// GET USER LIST 
export const getUserList = async (req, res) => {

  const user = await UserModel.find().select('fullName email type _id createdAt isActive')
  try {
    if (user) {
      const findUser = await UserModel.findById({ _id: req.userId }); 

      if (findUser == null) return res.status(401).json({ status: false, message: "Unauthorized user" });

      const userData = user.filter(val => val.type === 'user')

     return res.status(200).json({ status: true, data: userData })
    }
  } catch (error) {
   return res.status(400).json({ status: false, data: [] })
  }
}


// MANAGE USER USING STATUS
export const manageUser = async (req, res) => {

  const filter = { _id: req.body.id };
  const update = { isActive: req.body.isActive }

  try {
    await UserModel.findOneAndUpdate(filter, update, {
      returnOriginal: false
    });
    res.status(200).json({ status: true, message: 'User status updated' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}






export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

    // Check if the refresh token exists in the database
    const storedToken = await RefreshToken.findOne({ userId: payload.id, token: refreshToken });
    if (!storedToken) return res.status(403).json({ message: 'Forbidden' });
    const newAccessToken = jwt.sign(
      { fullName: payload.fullName, id: payload.id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};