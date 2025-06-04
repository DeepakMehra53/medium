import React from 'react'
import { useBlog } from '../hook'
import { useParams } from 'react-router-dom'
import { SingleBlog } from '../components/SingleBlog'
export const Blog = () => {
  const {id} =useParams()
const {loading,blog} = useBlog({
  id:id|| ""
})
if(loading){
  return <div>
    loading....
  </div>
}
  return (
    <div>
      <SingleBlog blog={blog}/>
    </div>
  )
}

