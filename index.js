import express from 'express';
import mongoose from 'mongoose';
import routes  from './src/routes/crmRoutes'
import bodyParser from 'body-parser'

const app = express();
const PORT = 4000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//body-parser setup top parse json
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// add routes to app
routes(app);

// serving static files
app.use(express.static('public'))

app.get('/', (req, res) => (
    res.send(` Node and express server running on port ${PORT}`)
));

app.listen(PORT, () => console.log(`APP is listening on port ${PORT}`));
