const express = require("express")
const mongoose = require('mongoose');

// User Schema
const pairRequestSchema = mongoose.Schema({
    //user: { type :mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    title: String,
    body: String
});

module.exports = mongoose.model('PairRequest', pairRequestSchema)