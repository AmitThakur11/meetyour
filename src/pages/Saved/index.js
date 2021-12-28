import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css"
import Loader from "../../component/Loader";
export default function Saved() {
    const {user,status} = useSelector((state)=>state.user)

  return (
    <div className="savedPage">
      {status === "loading" && <Loader />}
      {status === "success" && (
        <div className="savedSection">
          <section className="pageTitle">
            Saved({user.savePost.length})
          </section>
          <secton className="postList">
            {user.savePost.map((postImage) => {
              return <>
              <Link to ={`/post/${postImage._id}`}><img className ="postList__img" src= {postImage.media[0]} alt ="media"/></Link></>;
            })}
          </secton>
        </div>
      )}
    </div>
  );
}
