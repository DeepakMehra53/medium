import React from 'react'
import { useBlog } from '../hook'

export const Blog = () => {
const {loading,blog} = useBlog()
if(loading){
  return <div>
    loading....
  </div>
}
  return (
    <div>

    </div>
  )
}

