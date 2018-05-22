const express = require('express');
const app = express();

var requests = [];

// parsing body
app.use(express.json());
app.use(express.urlencoded( { extended:false} ));

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, () => console.log('Listening on port 8080'));

app.get('/budget-api', function(req,res,next){
	// console.log('in get', req.body);
	res.json(requests);
});

app.post('/budget-api', function(req,res,next){
	requests.push(req.body);
	res.sendFile(__dirname + '/public/index.html');
});