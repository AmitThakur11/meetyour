import AddPost from "../addPost";
import PostCard from "../postCard";
import "./style.css";
import Loader from "../../../component/loader";
import { useSelector } from "react-redux";
import { useState } from "react";
import EmptyArea from "../../../component/EmptyArea";
import LikeList from "../../../component/LikeList";
import EmptyImage from "../../../media/emptyTimeline.png";
function Timeline() {
  let { posts, status } = useSelector((state) => state.post);
  const [showLikes, setShowLikes] = useState(false);
  const [postLikes, setPostLikes] = useState({});
  return (
    <section className="timeline">
      {status === "loading" && <Loader />}
      {status === "success" && (
        <>
          <AddPost />
          {posts.length > 0 ? (
            <section className="postListSection">
              {posts.map((post) => {
                return (
                  <PostCard
                    post={post}
                    setShowLikes={setShowLikes}
                    setPostLikes={setPostLikes}
                  />
                );
              })}
            </section>
          ) : (
            <div className="emptyArea">
              <EmptyArea image={EmptyImage} route="/explore" />
            </div>
          )}
          {showLikes && <LikeList show={setShowLikes} data={postLikes} />}
        </>
      )}
      {status === "error" && <h1>error</h1>}
    </section>
  );
}

export default Timeline;
