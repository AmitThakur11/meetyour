import FollowCard from "../../component/FollowCard";
import { useSelector } from "react-redux";
import { Loader } from "../../component";
import "./style.css";
export default function Followers() {
  const { user, status } = useSelector((state) => state.user);
  return (
    <div className="followerPage">
      {status === "loading" && <Loader />}
      {status === "success" && (
        <>
          <section className="pageTitle">
            Followers ({user.followers.length})
          </section>
          <secton className="followerList">
            {user.followers.map((item) => {
              return <FollowCard user={item} />;
            })}
          </secton>
        </>
      )}
    </div>
  );
}
