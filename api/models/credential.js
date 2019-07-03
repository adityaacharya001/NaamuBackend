import mongoose from 'mongoose';

const credentialSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    department: String
})

module.exports = mongoose.model("Credential", credentialSchema);