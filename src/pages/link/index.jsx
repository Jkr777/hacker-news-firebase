import React, { useEffect, useContext, useState } from "react";
import FirebaseContext from "../../context";
import LinkItem from "../../components/linkItem";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Link = ({ match, history }) => {
  const { firebase, user } = useContext(FirebaseContext);
  const [link, setLink] = useState(null);
  const [comment, setComment] = useState("");
  const linkRef = firebase.db.collection("links").doc(match.params.id); 

  useEffect(() => {
    fetchLink();
  }, []);

  const handleChange = e => setComment(e.target.value);

  function handleAddComm() {
    if(!user) {
      history.push("/login");
    } else {
      linkRef.get().then(doc => {
        if(doc.exists) {
          const prevComments = doc.data().comments; 
          const comm = {
            postedBy: { id: user.uid, username: user.displayName },
            created: Date.now(),
            text: comment
          } 
          const updateComments = [...prevComments, comm];
          linkRef.update({ comments: updateComments }); 
          setLink(prev => ({
            ...prev,
            comments: updateComments
          }));
          setComment(""); 
        }
      });
    }
  }

  function fetchLink() {
    linkRef.get().then(doc => {
      setLink({ ...doc.data(),  id: doc.id });
    }); 
  }

  return !link ? (
    <div className="comm-container">Loading...</div>
  ) : (
    <div className="comm-container">
      <LinkItem 
        link={link}
      />
      <div className="comm-container__body">
        <textarea 
          name="comments"
          value={comment}
          placeholder="add a comment"
          className="form__textArea"
          onChange={handleChange}
          maxLength="500"
          required={true}
        /> 
        <button className="btns__auth-btn btns__auth-btn--comment" onClick={handleAddComm}>comment</button>
      </div>
      {link.comments.map((comm, i) => (
        <div key={i} className="comments">
          <p>{comm.postedBy.username} | {formatDistanceToNow(comm.created)}</p>
          <p>{comm.text}</p>
        </div>
      ))}
    </div>
  )
};

export default Link;