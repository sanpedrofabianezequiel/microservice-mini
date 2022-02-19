const express = require('express');
const cors =  require('cors');
const bodyParser =  require('body-parser');
const { xyz } = require('color-convert');
const axios = require('axios');

const app =  express();
app.use(bodyParser.json());
app.use(cors());

const arrayPosts = {};

const handleEvnet = (type,data)=>{
    if(type ==='PostCreated'){
        const {id,title} =  data;
        arrayPosts[id] = {id,title,comments:[]};
    }   

    if(type ==='CommentCreated'){
        const {id, content,postId,status } = data;

        const post = arrayPosts[postId];//Found the post with ID
        //here we push a  new comment into the object!
        post.comments.push({
            id,content,status
        })
        const commentTemp =  arrayPosts[postId].comments;
        arrayPosts[postId]={ ...arrayPosts[postId], comments:commentTemp }
    }

    if(type==='CommentUpdated'){
        const {id,content,postId,status} = data;
        const postFound =  arrayPosts[postId];
        const comment = postFound.comments.find(x=>{
            return x.id === id;
        })

        comment.status = status;
        comment.content = content;
    }

}

app.get('/posts',(req,res)=>{
    res.json(arrayPosts);
})


app.post('/events',(req,res)=>{
    const { type ,data} = req.body;
  
    handleEvnet(type,data);

    res.json({});
})

app.listen(4002,async ()=>{
    console.log('Listening on 4002')

    const res = await axios.get('http://event-bus-srv:4005/events');

    for(let x of res.data){
        console.log('Processing event:',x.type);
        handleEvnet(x.type,x.data);
    }
})