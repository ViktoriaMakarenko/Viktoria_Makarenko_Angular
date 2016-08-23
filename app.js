var express = require('express');
var pause = require('connect-pause');
var bodyparser = require('body-parser');
var session = require('express-session');
var app = express();
var NodeCache = require( "node-cache" );
var myCache = new NodeCache();


app.use('/', express.static(__dirname));
app.use(bodyparser.json());
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 5 * 60 * 1000 
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
}));

app.post('/doLogin', function(req, res){
    if (req.session.loginId === undefined) {
        var users = require('./data/users.json');
        var loginned = false;
        users.map(function (user) {
            if (user.login === req.body.info.login && user.password === req.body.info.password){
					req.session.loginId = user.id;
					loginned = true;
            }
        });
        res.send({success: loginned, userId: req.session.loginId});
    } else {
        req.session.touch(req.session.id, req.session);
        res.send({success: true, userId: req.session.loginId});
    }
});

app.post('/getPassword', function(req, res){
    var users = require('./data/users.json');
    users.map(function(user){
        if (user.login === req.body.login) {
            res.send({password: user.password});
        }
    });
});

app.delete('/logout', function(req, res) {
  if (req.session) {
    req.session.destroy(function() {});
  }
  res.send('Session was destroyed');
});

app.all('*', function(req, res, next) {
    if (!req.session.loginId) {
		res.status(401).send({ error: 'You are not authorized!' });
    } else {
		next();
	}
});

app.get('/getInfo/:id', pause(3000), function(req, res){
    if (!myCache.get(req.params.id)) {
        var userInfo = require('./data/info.json');
        userInfo.map(function (user) {
            if (user.id === req.params.id) {
                myCache.set(user.id, user);
            }
        });
    }
	req.session.touch(req.session.id, req.session);
    res.send({userInfo: myCache.get(req.params.id)});
});

app.get('/getId', function(req, res){
    res.send({id: req.session.loginId});
});

app.put('/setInfo/:id', function(req, res){
	myCache.set(req.params.id, req.body.userInfo);
	req.session.touch(req.session.id, req.session);
	res.send({userInfo: myCache.get(req.params.id)});
});

app.listen(8000);
console.log('listen 8000');