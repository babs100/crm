import {addNewContact, 
        getContacts,
        getContactWithID,
        updateContact,
        deleteContact
    } from '../controllers/crmController'

import {login, register, loginRequired} from '../controllers/userContoller'

const routes = (app) => {

    // lets apply a middleware
    app.route('/contact')
        .get((req, res, next) => {
            console.log(`Request is from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            //res.send('GET request successful')
            next()
        },getContacts)

        
        .post(loginRequired, addNewContact); // post a specific contact
        
    
    app.route('/contact/:contactID')
        .get(loginRequired, getContactWithID) // get a specific contact
        .put(loginRequired, updateContact) // update a specific contact
        .delete(loginRequired, deleteContact) // delete a specific contact

    // registration route
    app.route('/auth/register')
        .post(register)

    // login route
    app.route('/auth/login')
        .post(login)
        
};

export default routes;