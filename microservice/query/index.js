const express = require('express');
const cors =  require('cors');
const bodyParser =  require('body-parser');
const { xyz } = require('color-convert');

const app =  express();
app.use(bodyParser.json());
app.use(cors());

const arrayPosts = {};

app.get('/posts',(req,res)=>{
    res.json(arrayPosts);
})


app.post('/events',(req,res)=>{
    const { type ,data} = req.body;
    if(type ==='PostCreated'){
        const {id,title} =  data;
        arrayPosts[id] = {id,title,comments:[]};
    }   

    if(type ==='CommentCreated'){
        const {id, content,postId} = data;

        const post = arrayPosts[postId];//Found the post with ID
        //here we push a  new comment into the object!
        post.comments.push({
            id,content
        })
        const commentTemp =  arrayPosts[postId].comments;
        arrayPosts[postId]={ ...arrayPosts[postId], comments:commentTemp }
    }
    res.json({});
})

app.listen(4002,()=>{
    console.log('Listening on 4002')
})