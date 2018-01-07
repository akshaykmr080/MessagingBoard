var express = require('express');

var app = express();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var messages = [{
    owner: 'Akshay',
    message: 'Hey'
}, {
    owner: 'Mamatha',
    message: 'Hey'
}];

var users = [{
    firstName: 'A',
    email: 'a',
    password: 'a',
    id: 0
}];


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested--With, Content-Type, Accept, x-auth");
    next();
})

app.use(bodyParser());

var api = express.Router();

var auth = express.Router();


api.get('/messages/:name', (req,res) => {
    console.log("Reached")
    var user = req.params.name;
    console.log('Here '+user);
    var result = messages.filter(message => message.owner === user);

    res.json(result);
}); 

api.get('/messages', (req,res) => {
    res.json(messages);
});


api.get('/users/me', authenticate, (req,res) => {
    var user = users[req.userId];
    var resData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
    res.send(resData);
});

api.post('/users/me', authenticate, (req,res) => {
    console.log(req.body)
    var user = users[req.userId];
    user.firstName = req.body.firstname;
    user.lastName = req.body.lastname;

    res.json(user);
})

api.post('/messages', (req,res) => {
    console.log('got here');
    messages.push(req.body);
    res.status(200).send(req.body);
});


auth.post('/register', (req,res) => {

    var index = users.push(req.body) - 1;
    var user = users[index];
    user.id = index;
    var username = user.firstName;
    sendToken(res, user.id, username);
});

auth.post('/login', (req,res) => {
    var user = users.find(user => user.email === req.body.email);

    if(!user) return ErrorHandler(res)

    if(user.password !== req.body.password) return ErrorHandler(res)

    var index = users.indexOf(user);
    var username = user.firstName;
    sendToken(res, index, username);
    
})

function sendToken(res, id, username){
    var token = jwt.sign(id, '1234');
    res.json({username, token});
}

function ErrorHandler(res){
    return res.status(401).json({success: false, message: 'email or password incorrect'});
}


function authenticate(req, res, next) {
    console.log('Reaching here')
    if(!req.header('x-auth'))
        return res.status(401).send({message:'UnAuthorized request. Token header not present'});

    var token = req.header('x-auth').split(' ')[1];
    var payload = jwt.decode(token, '1234');

    if(!payload)
        return res.status(401).send({message:'UnAuthorized request. Token header invalid'});

    req.userId = payload;
    next();
}
app.use('/api', api);
app.use('/auth', auth);
app.listen(16000);