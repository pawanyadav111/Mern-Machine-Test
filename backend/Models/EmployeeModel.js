const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true 
    },
    designation: {
        type: String,
        required: true 
    },
    profileImage: {
        type: String
    },
    gender: {
        type: String,
        required: true 
    },
    course: {
        type: String,
        required: true 
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})

const EmployeeModel = mongoose.model('employee', EmployeeSchema);
module.exports = EmployeeModel