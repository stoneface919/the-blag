
let express = require('express');
let bodyParser= require('body-parser');
let ejs = require('ejs');
let mongoose = require('mongoose')
let _ = require('lodash')
server = express();
server.use(bodyParser.urlencoded({extended:true}));
server.use(express.static('public'));


server.set('view engine', 'ejs')

///database connection 

mongoose.connect('mongodb+srv://admin_blosst:stoneface1998@developmentpractice.bhanj.mongodb.net/blogPosts', { useUnifiedTopology: true,  useNewUrlParser: true  })


////////////////////////////////////////////////////// Mongo Schemas

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, 'You need a title for your post']
    },
    postEntry: {
        type: String,
        required: [true, 'You need a blod post entrie']
    }
})

const BlogItem = mongoose.model('Post', blogSchema)






const aboutContent = 'About Content'
const contactContent = 'Contact Content'

var posts = [ ]
server.get('/', (req, res)=>{


    BlogItem.find({}, function (err, results){
        if(err){
            console.log(err)
        }else {
            results.forEach(function(element){
                console.log(element.name)
            })
            res.render('main', {posts: results})
        }
    })
    
   
    
})
server.get('/posts/:postName' ,(req,res)=>{
    BlogItem.find({name:req.params.postName}, function(err, results){
        if (!err){
            res.render('post', {title:results[0].name, entrie: results[0].postEntry})
    }
    })

})

server.get('/about', (req,res)=>{
    res.render('about', {content: aboutContent})
})


server.get('/contact', (req,res)=>{
    res.render('contact', {content: contactContent})
})


server.get('/compose', (req, res)=>{
    res.render('compose')
})


server.post('/compose', (req,res)=>{ 
    
    const title = req.body.postTitle 
    const entrie = req.body.postEntry


   BlogItem.create({name:title, postEntry: entrie}, function(err){
       if(err){
           console.log(err)
       } else {
           console.log("Succesfully added to the DB!")
       }
   })
    res.redirect("/")


    // entries[req.body.postTitle] = req.body.postEntry
    // console.log(entries)
    // res.redirect('/compose')
})


server.listen(process.env.PORT || 3000, ()=>{
    console.log('Server listening on port: '+ process.env.PORT || 3000)
})