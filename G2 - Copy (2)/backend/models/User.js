import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },  
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    homeAddress: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;  
