const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	name : String,
    facebook_id : String,
    email: String,
    location: String,
    //pairRequest items
    pairRequest : [{
        type: mongoose.Schema.Types.ObjectId, ref: 'PairRequest'
    }]
    //pr: [{ id: String, body: String, title: String}]
});

userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema)