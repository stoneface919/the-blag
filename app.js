let express = require('express');
let bodyParser= require('body-parser');
let ejs = require('ejs');
server = express();
server.use(bodyParser.urlencoded({extended:true}));
server.use(express.static('public'));

server.set('view engine', 'ejs')



server.get('/', (req, res)=>{
    res.render('main', {})
})





server.listen(process.env.PORT || 3000, ()=>{
    console.log('Server listening on port: '+ process.env.PORT || 3000)
})