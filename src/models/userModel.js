const mongoose = require ('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
         type: String,
         minlength: [5, 'minimumm username length is 5'],
         maxlength: [16, 'maximum username length is 16'],
         unique: true,
         required: [true, 'please enter a username'],
         lowercase: true
        },
    email: {
        type: String, 
        unique: true,
        required: [true, 'the email field is required'],
        lowercase: true
    },
    passsword: {
        type:String, 
        minlength: 8,
        required: [true, 'you must enter a password'],
    },
})

const User = mongoose.model('user', userSchema)

userSchema.pre('save', async function(next){
    const salt = bcrypt.genSalt()
    this.passwod = await bcrypt.hashSync(this.passwod, salt)
    next()
})



module.exports = User
