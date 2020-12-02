const User = require('../models/userModel');


const handleError= (error) => {
    let err = {username: '', email:'', password: ''}

if(error.message === 'incorrect username'){
        err.username = 'that username does not exist'
}

if(error.message === 'incorrect email'){
        err.email = 'that email is not valid'
}
        
if (error.message === 'incorrect passeord' ){
        err.password = 'the password is incorrect'
}

if(error.code === 11000){
    err.email = 'that email is registered already'
}

if(error.message.includes('user validation failed')){
    Object.values(error.errors).forEach(({ properties }) => {
        err[properties.path]= properties.message
})
}

return err
}


const userCtrl = {};

// create a user = POST method
userCtrl.createUser = async (req, res) => {
    try{
        const newUser = new User(req.body)
        let result = await newUser.save();
        res.status(200).send({ message:'Your account has been created', result });
    } catch(error) {
       const warnings = handleError(error)
       res.status(400).json({warnings})
    }
} 

// read a user detail = GET method
userCtrl.getUserDetails = async (req, res) => {
    try{
        let person = User.find({ username: req.body.username})
        if(!person) {
            res.status(400).send({message: 'user does not exist, check planet mars'});
        } else {
            res.status(200).send({message: 'welcome to earth, user does exist', person});
        }
    } catch ( error ) {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}
// update a user detail = UPDATE/PUT method
userCtrl.updateUserDetails = async (req, res) => {
    const {username, email, password } = req.body
    try{
       let person = await User.findOneAndUpdate({ _id: req.params.id }, {username, email, password})
    } catch ( error ) {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

// delete a user account = DELETE method
userCtrl.deleteUser = async (req, res) => {
    try{
        let person = await User.findOneAndDelete({_id:req.params.id })
        res.status(200).send({message: 'user deported to mars'})
    } catch (error) {
        console.log(error)


    }
}



module.exports = userCtrl

