import mongoose from 'mongoose';
import validator from 'validator'
import { ContactSchema } from '../models/crmModel'

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body)

    // do validation
    if (!validator.isEmail(newContact.email)){

    }

    // save new contact
    newContact.save((err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json(contact)
    })
}

export const getContacts = (req, res) => {

    Contact.find({}, (err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json(contact)
    })
}

export const getContactWithID = (req, res) => {
    Contact.findById(req.params.contactID, (err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json(contact)
    })
}

export const updateContact = (req, res) => {
    Contact.findOneAndUpdate({_id:req.params.contactID},
        req.body, 
        {new:true, useFindAndModify:false}, // new:true ensures the updated contact is returned
        // while useFindAndModify:false prevents deprecated errors
        (err, contact) => {
            if (err) {
                res.send(err)
            }
            res.json(contact)
    })
}

export const deleteContact = (req, res) => {
    Contact.findOneAndRemove({_id:req.params.contactID},
        (err, contact) => {
            if (err) {
                res.send(err)
            }
            res.json({"message": "succefully deleted contact!"})
    })
}