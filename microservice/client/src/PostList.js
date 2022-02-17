 import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { CommentCreate } from './CommentCreate';
import { CommentList } from './CommentList';


  export const PostList = () => {
       
    const [posts, setPost] = useState({})

    const fetchPosts = async()=>{
        const res = await axios.get('http://localhost:4002/posts');
        setPost(res.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderPosts =  Object.values(posts).map( x=> {
        return(
            <div className='card' style={{ width:'30%',marginBottom:'20px'}} key={x.id}>
                <div className='card-body'>
                    <h3>{x.title}</h3>
                    <CommentList  comments={x.comments}/>
                    <CommentCreate postId = {x.id} />
                    
                </div>
            </div>
        )
    })
    
    return (
      <div className='d-flex flex-row flex-wrap justify-content-between'>
          {renderPosts}
      </div>
    )
  }
  