const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	name : String,
    facebook_id : String,
    email: String,
    location: String
});

userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema)