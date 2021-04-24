
let express = require('express');
let bodyParser= require('body-parser');
let ejs = require('ejs');
server = express();
server.use(bodyParser.urlencoded({extended:true}));
server.use(express.static('public'));

server.set('view engine', 'ejs')
const homeContent = "Hemmp"


server.get('/', (req, res)=>{
    res.render('main', {content: homeContent})
})


server.get




server.listen(process.env.PORT || 3000, ()=>{
    console.log('Server listening on port: '+ process.env.PORT || 3000)
})