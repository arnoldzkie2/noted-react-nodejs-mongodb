import { User, Note } from "../models/notes.js";
import asyncWrapper from "../middleware/asyncWrapper.js";

//get User Data
const renderUser = asyncWrapper(async (req, res) => {
  const {id: userID} = req.params
  const user = await User.findOne({_id: userID});
  if (!user) {
    res.status(404).json({ msg: "invalid" });
  }
  const notes = await Note.findOne({_id: user._id});
  if (!notes) {
    res.status(404).json({ msg: "no notes found" });
  }
  res.status(200).json({ user, notes });
});

const registerUser = asyncWrapper(async (req, res) => {
  const {email} = req.body
  const checkUserExist = await User.findOne({email: email})
  if(checkUserExist){
    return res.status(201).json('exist')
  }
  const user = await User.create(req.body);
  if(!user){
    return res.status(404).json({msg: 'failed'})
  }
  const notes = await Note.create({ _id: user._id});
  if(!notes){
    return res.status(404).json({msg: 'failed'})
  }
  res.status(201).json({ user ,notes });
});

//login user
const loginUser = asyncWrapper(async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email: email, password: password});
  if (!user) {
    return res.status(404).json({ msg: "invalid" });
  }
  const notes = await Note.find({_id: user._id})
  res.status(201).json({ user, notes });
});

//check
const changePasword = asyncWrapper(async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user) {
    res.status(404).json({ msg: "no user found " });
  }
  const newPass = await User.findByIdAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!newPass) {
    return res.status(404).json({ msg: "no user found" });
  }
  res.status(200).json({ newPass });
});

//check
const getAllUser = asyncWrapper(async (req,res) => {
  const allUser = await User.find()
  if(!allUser){
    return res.status(404).json({msg: 'no users'})
  }
  const userNotes = await Note.find()
  if(!userNotes){
    return res.status(404).json({msg: 'no notes found'})
  }
  res.status(200).json({allUser, userNotes})
})

export { renderUser, registerUser, loginUser, changePasword, getAllUser };
