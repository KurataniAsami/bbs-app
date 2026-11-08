// import Image from "next/image";
import { Suspense } from "react";
import PostList from "./components/PostList";
import Loader from "./Loader";

export default  function Home() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <PostList />
      </Suspense>
    </div>
  );
};
<h1>掲示板</h1>