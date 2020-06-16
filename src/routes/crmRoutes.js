import {addNewContact, 
        getContacts,
        getContactWithID,
        updateContact,
        deleteContact
    } from '../controllers/crmController'
const routes = (app) => {

    // lets apply a middleware
    app.route('/contact')
        .get((req, res, next) => {
            console.log(`Request is from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            //res.send('GET request successful')
            next()
        },getContacts)

        
        .post(addNewContact); // post a specific contact
        
    
    app.route('/contact/:contactID')
        .get(getContactWithID) // get a specific contact
        .put(updateContact) // update a specific contact
        .delete(deleteContact) // delete a specific contact
        
};

export default routes;