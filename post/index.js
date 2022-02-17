const express  = require('express');
const {randomBytes} = require('crypto');
const bodyParser =  require('body-parser');
const cors =  require('cors');
const axios =  require('axios');

const app =  express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get('/posts',(req,res) =>{
    return res.json(
        posts
    )
});

app.post('/posts',async (req,res) =>{
    const id =  randomBytes(4).toString('hex');
    const {title} = req.body;
    
    posts[id]  = {
        id,
        title
    }

    await axios.post('http://localhost:4005/events',{
        type:'PostCreated',
        data:{
            id,title
        }
    });

    return res.status(201).json(
        posts[id]
    )
});


app.post('/events',(req,res)=>{
    console.log('Event recibe',req.body.type);
    res.json({});
})

app.listen(4000,()=>{
    console.log(`Post Listening on ${4000}`);
})