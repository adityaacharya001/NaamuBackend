import mongoose from 'mongoose';

const formSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creator: String,
    approver: String,
    creatorDepartment: String,
    approverDepartment: String,
    case: String,
    status: String
})

module.exports = mongoose.model("Form", formSchema);