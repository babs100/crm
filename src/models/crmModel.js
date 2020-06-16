import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required:'Enter a firstname'
    },
    lastName: {
        type: String,
        required: 'Enter a lastnamr'
    },
    email:{
        type: String
        
    },
    company:{
        type: String
        
    },
    phone:{
        type: Number
        
    },
    created_at:{
        type: Date,
        default: Date.now()
        
    }
});