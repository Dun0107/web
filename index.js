// // const express = require('express')
// // const app = express()
// // const port = 3000

// // app.get('/', (req, res) => res.send('Hello World!'))

// // app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const passport = require('passport');
// const mongoose = require('mongoose');
// const config = require('./config/database');

// mongoose.connect(config.database, {useNewUrlParser: true});

// mongoose.connection.on('connected', ()=>{
//   console.log('Connected to Database '+config.database);
// });

// // on Error
// mongoose.connection.on('error', (err)=>{
//   console.log('Database error: '+err);
// });



// const app = express();
// app.listen('/tmp/sock');

// const users = require("./routes/users");

// const port = 3000;

// app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.json());

// app.use('./users', users);

// app.get('/', function(req,res)=>{
// 	res.send('<h1>서비스 준비중...</h1>');
// })
// //start server

// app.listen(port, ()=>{
// 	console.log("server start on port "+port);
// });

// // console.log('Hi');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, {useNewUrlParser: true});


mongoose.connection.on('connected', ()=> {
    console.log('Connected to db ' + config.database);
});

const app = express();
const users = require('./routes/users');

// port number
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.use(express.static(path.join(__dirname, 'public')));
// app.get

app.get('/index.html', (req, res)=>{
    res.send('<h1>서비스 준비중...</h1>');
});

app.get('/admin', (req, res)=>{
    res.send('<h1>어드민 서비스 준비중</h1>')
});

// satrt server 
app.listen(port, function(){
    console.log("Server Start on port 3000")
});