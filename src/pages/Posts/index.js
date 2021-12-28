import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import Loader from "../../component/Loader";
export default function Posts() {
  const { user, status } = useSelector((state) => state.user);

  return (
    <div className="postPage">
      {status === "loading" && <Loader />}
      {status === "success" && (
        <div className="postSection">
          <section className="pageTitle">Posts({user.post.length})</section>
          <secton className="postList">
            {user.post.map((postImage) => {
              return (
                <>
                  <Link to={`/post/${postImage._id}`}>
                    <img
                      className="postList__img"
                      src={postImage.media[0]}
                      alt="media"
                    />
                  </Link>
                </>
              );
            })}
          </secton>
        </div>
      )}
    </div>
  );
}
