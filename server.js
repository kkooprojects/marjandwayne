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
	Object.keys(req.body).forEach(function(key) {
		guests += req.body[key] + "\n";
	});
	mailOptions.text = guests;

	transporter.sendMail(mailOptions, function(err, info) {
		if (err) {

		}
		else {
			res.sendFile(__dirname + '/public/html/thankyou.html');
		}
	});
});

http.listen(4000, function() {
	console.log('listening on *:4000');
});
