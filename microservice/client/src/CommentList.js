import React, { useEffect, useState } from 'react'

export const CommentList = ({comments}) => {


  const renderComments = comments.map(x=>{

    let content;
    if(x.status ==='approved'){
      content =  x.content;
    }

    if(x.status === 'pending'){
      content='This comment is awaiting moderationg';
    }

    if(x.status === 'rejected'){
      content='This comment has been rejected'
    }

      return <li key={x.id}>{content}</li>
  })

  return (
    <ul>
        {renderComments}
    </ul>
  )
}
