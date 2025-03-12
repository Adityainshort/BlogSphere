import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard ,Loader} from "../components";
import { useNavigate ,Link} from 'react-router-dom'


function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  if (!status) {
    return (
      <div className="border w-full min-h-[50vh] bg-black-200 flex justify-center items-center">
        <h1 className="text-2xl  font-bold">
          <Link to={'/login'}className="text-blue-500">
            Login
          </Link>{" "}
          or{" "}
          <Link to={'/signup'}className="text-blue-500">
            Signup
          </Link>{" "}
          to see the posts .
        </h1>
      </div>
    );
  }
  return (
    <div className="w-full min-h-[60vh] bg-slate-400 py-6 px-6  border  b-0 border-white ">
      <div className="text-3xl font-bold  m-5">
        <p>
          {" "}
          Welcome to the BlogSphere{" "}
          <a href="/add-post" className="text-blue-600">
            create
          </a>{" "}
          your blog and publish
        </p>
      </div>
      {posts.length === 0 ? (
        <div className="border w-full min-h-[50vh] bg-black-200 flex justify-center items-center">
          <h1 className="text-2xl font-bold">No posts yet</h1>
        </div>
      ) : (
        <div>
          <div className="ml-2 text-2xl font-bold m-2">Posts</div>
          <hr className="mb-4" />
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
