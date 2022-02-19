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
        content,
        status:'pending'
    })
    commentsByPostId[req.params.id] = arrayComments;

    await axios.post('http://event-bus-srv:4005/events',{
        type:'CommentCreated',
        data:{
            id:commentId,
            content,
            postId:req.params.id,
            status:'pending'
        }
    })

    return res.status(201).json(
        arrayComments
    )
})


app.post('/events',async(req,res)=>{
    console.log('Event recibe',req.body.type);
    const {type,data} = req.body;

    if(type === 'CommentModerated'){
        const {postId,id,status,content} = data;
        const commentsArray = commentsByPostId[id];

        const comment =  commentsArray.find(x=>{
            return x.id === id
        })

        comment.status = status;

        await axios.pos('http://event-bus-srv:4005/events',{
            type:'CommentUpdated',
            data:{
                id,status,postId,content
            }
        })

    }

    res.json({});
})


app.listen(4001,()=>{
    console.log('Comments Listening on 4001');
})