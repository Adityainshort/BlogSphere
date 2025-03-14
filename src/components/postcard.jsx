import React from 'react'
import appwriteservices from '../appwrite/config'
import { Link } from 'react-router-dom'
const postCard = ({$id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className=" w-full bg-gray-100 rounded-xl p-4">
            <div className='w-full justify-center mb-4'>
                <img src={appwriteservices.getFilePreview(featuredImage)} alt={title} />
            </div>
            <h2 className="text-lg font-bold ">{title}</h2>
        </div>
    </Link>
  )
}

export default postCard