var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'marjandwayne@gmail.com',
		pass: 'pekoeiscute'
	}
});

var mailOptions = {
	from: 'marjandwayne@gmail.com',
	to: 'marjandwayne@gmail.com',
	subject: 'RSVP guests received',
	text: ''
};

app.use(express.static('public'));
app.use(express.static('public/images', {
	maxage: '1y'
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/html/index.html');
});

app.post('/rsvp', function(req, res) {
	var guests = "";
	let go, nogo = false;
	Object.keys(req.body).forEach(function(key) {
		if (key == "go") {
			mailOptions.subject = 'RSVP guests received - COMING';
			go = true;
		}
		else if (key == "nogo") {
			mailOptions.subject = 'RSVP guests received - NOT COMING';
			nogo = true;
		}
		else {
			guests += req.body[key] + "\n";
		}
	});
	mailOptions.text = guests;

	transporter.sendMail(mailOptions, function(err, info) {
		if (err) {

		}
		else if (go) {
			res.sendFile(__dirname + '/public/html/thankyou.html');
		}
		else if (nogo) {
			res.sendFile(__dirname + '/public/html/sorry.html');
		}
	});
});

http.listen(4000, function() {
	console.log('listening on *:4000');
});
