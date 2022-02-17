const express =  require('express');
const bodyParser =  require('body-parser');
const {randomBytes} = require('crypto');
const cors  =  require('cors');
const axios =  require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

commentsByPostId = {};

app.get('/posts/:id/comments',(req,res)=>{
    return res.json(
        commentsByPostId[req.params.id] || []
    )
})

app.post('/posts/:id/comments',async (req,res)=>{
    const commentId =  randomBytes(4).toString('hex');
    const {content} = req.body;
    const arrayComments = commentsByPostId[req.params.id] || [];
    arrayComments.push({
        id: commentId,
        content
    })
    commentsByPostId[req.params.id] = arrayComments;

    await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id:commentId,
            content,
            postId:req.params.id
        }
    })

    return res.status(201).json(
        arrayComments
    )
})


app.post('/events',(req,res)=>{
    console.log('Event recibe',req.body.type);
    res.json({});
})


app.listen(4001,()=>{
    console.log('Comments Listening on 4001');
})