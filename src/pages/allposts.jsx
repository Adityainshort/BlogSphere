import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    
  return (
    <div className='w-full bg-slate-400 py-6 px-6 border  b-0 border-white '>
            <div className='flex flex-wrap min-h-[60vh]'>
                {posts.map((post) => (
                    <div key={post?.$id} className='p-2 w-1/4'>
                        <PostCard {...post}  />
                    </div>
                ))}
            </div>
    </div>
  )
}

export default AllPosts