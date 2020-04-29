import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { formatDomain } from "../../utils";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import FirebaseContext from "../../context";

const LinkIntem = ({ link, count, history }) => {
  const { firebase, user } = useContext(FirebaseContext);

  function handleVote() {
    if(!user) {
      history.push("/login");
    } else {
      const voteRef = firebase.db.collection("links").doc(link.id); 
      voteRef.get().then(doc => {
        if(doc.exists) {
          const prevVotes = doc.data().votes; 
          const newVote = { votedBy: { id: user.uid, username: user.displayName } };
          const newVotes = [...prevVotes, newVote];
          voteRef.update({ votes: newVotes }) 
        } 
      }) 
    }
  }

  function handleDelete() {
    const linkRef = firebase.db.collection("links").doc(link.id); 
    linkRef.delete().then(() => {
      console.log("deleted!");
    }).catch(err => {
      console.log(err);
    }); 
  }

  const postedByUser = user && user.uid === link.postedBy.id; 

  return (
    <div className="link-container">
      <div className="link-top">
        <div className="link-top__count">
          {count && <span>{count}.</span>}
          <span className="link-top__count__vote-btn" onClick={handleVote}>&#9650;</span>
        </div>
        <div className="link-top__url">
          <a href={link.link} className="link-top__url__description">{link.description}</a>
          <span className="link-top__url__link">({formatDomain(link.link)})</span>
        </div>
      </div>
      <div className="link-bottom">
        {link.votes.length} votes by {link.postedBy.username} {formatDistanceToNow(link.created)}
        {" | "}
        <Link to={`/link/${link.id}`}>
          {link.comments.length > 0
            ? `${link.comments.length} comments`
            : "discuss"
          }
        </Link>
        {postedByUser &&  (
          <>
            {" | "} <button className="deleteBtn" onClick={handleDelete}>delete</button> 
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(LinkIntem);