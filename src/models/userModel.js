import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword:{
        type: String,
        required:true
        
    },
    phone:{
        type: Number
        
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = (password, hashPassword) =>{
    return bcrypt.compareSync(password, hashPassword);
};
