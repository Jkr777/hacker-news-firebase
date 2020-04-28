import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../../context";
import LinkIntem from "../../components/linkItem";

const Links = ({ location }) => {
  const { firebase } = useContext(FirebaseContext); 
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchLinks();
  }, []); 

  function fetchLinks() {
    firebase.db.collection("links").orderBy("created", "desc").onSnapshot(handleLinks); 
  }

  function handleLinks(snapshot) {
    const links  = snapshot.docs.map(link => {
      return { id: link.id, ...link.data() };
    });
    setLinks(links);
  } 

  function renderLinks() {
    if(location.pathname.includes("links")) {
      return links;
    }
    const topLinks =  links.slice().sort((e1, e2) => e2.votes.length - e1.votes.length);
    return topLinks;
  }

  return (
    <div className="links-container">
      {renderLinks().map((link, i) => (
        <LinkIntem 
          key={link.id}
          link={link}
          count={i + 1}
        />
      ))}
    </div>
  )
};

export default Links;