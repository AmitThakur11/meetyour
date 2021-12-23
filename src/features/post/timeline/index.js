import AddPost from "../addPost";
import PostCard from "../postCard";
import "./style.css"
import Loader from "../../../component/loader";
import { useSelector } from "react-redux";

function Timeline() {
  let { posts, status } = useSelector((state) => state.post);
  // const dispatch = useDispatch()
  return (
    <section className="timeline">
      {status === "loading" && <Loader />}
      {status === "success" && (
        <>
          <AddPost />
          <section className="postListSection">
            {posts.map((post) => {
              return <PostCard post={post} />;
            })}
          </section>
        </>
      )}
      {status === "error" && <h1>error</h1>}
    </section>
  );
}

export default Timeline;
