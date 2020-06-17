import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import {UserSchema} from '../models/userModel';

const User = mongoose.model('User', UserSchema);


export const register = (req, res) => {
    const newUser = User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);

    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message:err
            })
        } else {
            user.hashPassword = undefined
            return res.json(user)
        }
    })
}

export const login = (req, res) => {
    console.log(req.body.email)
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
            //res.status(500).json({message: 'Internal server error', error: user})
        if (!user) {
            res.status(401).json({message: 'Authentication failed. No user found!'})
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({message: 'Authentication failed. Wrong password!'})
            } else {
                return res.json({
                    token: jsonwebtoken.sign({email: user.email, username:user.username, _id: user._id},
                    'RESTFULAPIs')
                });
    
            }
        } 
    })
}

export const loginRequired = (req, res, next) => {
    if (req.user){
        next()
    }
    return res.status(401).json({message: 'Authentication failed. No user found!'})
}