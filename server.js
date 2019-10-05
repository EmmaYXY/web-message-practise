var express = require('express')
var fs = require('fs')

var app = express()

app.use(express.static('iframes'))

app.get('/', function(req, res){
	fs.readFile('./index.html', function(err, data) {
		if (err) {
			console.log(err)
			res.send('We will grow old together, just away from the other.')
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'})
			res.write(data.toString())
		}
		res.end()
	})
})

app.listen(8888, function(){
	console.log('Not Today.')
})