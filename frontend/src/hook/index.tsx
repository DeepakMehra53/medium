import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const useBlog=()=>{
    const [loading,setloadind] = useState(true)
    const [blogs,setBlogs]=useState([])
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/bulk`)
            .then(response=>{
                setBlogs(response.data)
                setloadind(false)
            })

    },[])
    return {loading,blogs}
}