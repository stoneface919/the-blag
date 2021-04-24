
let express = require('express');
let bodyParser= require('body-parser');
let ejs = require('ejs');
let lodash = require('lodash')
server = express();
server.use(bodyParser.urlencoded({extended:true}));
server.use(express.static('public'));


server.set('view engine', 'ejs')
const homeContent = "Server Content"
const aboutContent = 'About Content'
const contactContent = 'Contact Content'

var posts = [ ]
server.get('/', (req, res)=>{
    res.render('main', {posts: posts})
   
    
})
server.get('/posts/:postName' ,(req,res)=>{
    console.log(req.params.postName)
    for(post of posts) {
        if (lodash.lowerCase(post.title) === lodash.lowerCase(req.params.postName)) {
            res.render('post',{
                title:post.title,
                entrie:post.entrie
            })
    
        }
    }
    

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
    const post = {
        title: req.body.postTitle ,
        entrie: req.body.postEntry
    }

    posts.push(post)
    res.redirect('/')
    console.log(posts)
    


    // entries[req.body.postTitle] = req.body.postEntry
    // console.log(entries)
    // res.redirect('/compose')
})


server.listen(process.env.PORT || 3000, ()=>{
    console.log('Server listening on port: '+ process.env.PORT || 3000)
})