import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          console.log(userData, "userData in poat");
          if (userData) {
            const isAuthor = post.userId === userData.userId;
          }
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate, userData]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="w-full min-h-screen bg-slate-400 flex flex-col items-center relative">
    <div className="w-full max-w-3xl  p-4">
        <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-auto max-h-[300px] object-contain rounded-lg s"
        />

        {userData && post.userId === userData?.userId && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className=" w-[70vw] rounded-lg mx-auto p-8 min-h-[50vh] bg-gradient-to-b from-slate-300 to-slate-400">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
            {post.title}
        </h1>

        <div className="browser-css text-lg text-gray-800 leading-relaxed tracking-wide">
            {parse(post.content)}
        </div>
    </div>
    </div>
  ) : null;
}