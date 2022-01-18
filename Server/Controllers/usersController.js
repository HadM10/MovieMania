require('../models/connectDB')
const User = require('../models/User')

exports.users = async(req, res) => {  
    try {
        const users = await User.find()
        res.json(users);
    } catch (error) {
        res.status(404).json( {message: error })
    } 
}

exports.addUser = async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profile: req.body.profile
    })
console.log(newUser)
    try {
        const users = await newUser.save()
        res.json(users);
    } catch (error) {
        res.status(404).json( {message: error })
    } 
}

exports.updateUser = async(req, res) => {
    const userId = req.params.id;
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profile: req.body.profile
    }

    try {
        const users = await User.findByIdAndUpdate({ _id:userId }, newUser)
        res.json(users);
    } catch (error) {
        res.status(404).json( {message: error })
    } 
}

exports.deleteUser = async(req, res) => {
    const userId = req.params.id;
    try {
      const data = await User.deleteOne({ _id:userId });
      res.json(data);
    } catch (error) {
      res.status(400).json( { message: error })
    }
  }
