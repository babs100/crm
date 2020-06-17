import express from 'express';
import mongoose from 'mongoose';
import routes  from './src/routes/crmRoutes'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import RateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import jsonwebtoken from 'jsonwebtoken'
import User from './src/models/userModel'


const app = express();
const PORT = 4000;

//setup helmet for security
app.use(helmet())

// we use cookieParser becaue cookie is set to true in csrf protection
app.use(cookieParser())

// csrf middleware for XSS forgery protection suppose we have forms
const csrfProtection = csrf({cookie:true})

//setup rate limit to prevent DOS attack
const limiter = new RateLimit({
    windowMs:15*60*1000, // 15 minutes
    max:100, // maximum number of request from an IP in 15 minues
    delayMs:0 // disables delays
})

app.use(limiter)

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//body-parser setup top parse json
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// set-up jwt
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split()[0] === 'Bearer') {
        jsonwebtoken.verify(req.headers.authorization.split()[1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user =undefined;
            else req.user = decode;

            next()
        });
    } else {
        req.user = undefined;
        next()
    }
})

// bodyParser for form only
const parseForm = bodyParser.urlencoded({extended:false})

// add routes to app
routes(app);

// serving static files
app.use(express.static('public'))

app.get('/', (req, res) => (
    res.send(` Node and express server running on port ${PORT}`)
));

// parse a form and inject a csrf token using the middleware
app.get('/form',csrfProtection, (req, res) => {
    //pass the token to the form view
    res.render('send', {csrfToken: req.csrfToken()})
})

// to process the form
app.post('/process', parseForm, csrfProtection, (req, res) => {
    res.send('form data is being processed')
})

app.listen(PORT, () => console.log(`APP is listening on port ${PORT}`));
