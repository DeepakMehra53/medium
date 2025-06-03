import React from 'react'
import { Avatar } from './BlogCard'

export const AppBar = () => {
  return (
    <div className='flex justify-between border-b px-10 py-4'>
        <div>
            Medium
        </div>
        <div>
            <Avatar name='Deepak'/>
        </div>
    </div>
  )
}
