import FollowCard from "../../component/FollowCard";
import { useSelector } from "react-redux";
import { Loader } from "../../component";
import "./style.css";
export default function Following() {
  const { user, status } = useSelector((state) => state.user);
  return (
    <div className="followingPage">
      {status === "loading" && <Loader />}
      {status === "success" && (
        <div className="followingSection">
          <section className="pageTitle">
            Following({user.following.length})
          </section>
          <section className="followingList">
            {user.following.map((item) => {
              return <FollowCard user={item} key={item._id} />;
            })}
          </section>
        </div>
      )}
    </div>
  );
}
