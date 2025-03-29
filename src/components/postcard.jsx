import React from 'react'
import appwriteservices from '../appwrite/config'
import { Link } from 'react-router-dom'
const postCard = ({$id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
    <div className="w-full bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out min-h-[250px]">
        <div className='w-full flex justify-center mb-4'>
            <img src={appwriteservices.getFilePreview(featuredImage)} alt={title} className="w-full h-40 object-cover rounded-lg" />
        </div>
        <h2 className="text-lg font-bold text-center">{title}</h2>
    </div>
</Link>

);
}

export default postCard