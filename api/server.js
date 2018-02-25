
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var worldMargin = {};
var trail = [];
const processCommandRequest = require('./utils/process-command')


app.use( bodyParser.json() );    
app.use(bodyParser.urlencoded({     
  extended: true
})); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',(req,res)=> res.send('This is the api endpoint, read documentation') )

app.post('/command', (req, res) => {
	processCommandRequest(req.body,worldMargin,trail).then(function(obj){
		trail = obj.trail;
		res.send({location:obj.location,trail:trail});
	});
})

app.post('/set-world', (req, res) => {
	let world = req.body.world.replace(/ /g,'');
	let worldMarginArray = world.split('');
	worldMargin.x = worldMarginArray[0];
	worldMargin.y = worldMarginArray[1];
	res.send(worldMargin.x+' '+worldMargin.y )
})

app.listen(3015, () => console.log('Robots api listening on port 3015!'))
