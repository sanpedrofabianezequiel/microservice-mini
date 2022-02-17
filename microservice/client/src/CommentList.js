import React, { useEffect, useState } from 'react'

export const CommentList = ({comments}) => {


  const renderComments = comments.map(x=>{
      return <li key={x.id}>{x.content}</li>
  })

  return (
    <ul>
        {renderComments}
    </ul>
  )
}
