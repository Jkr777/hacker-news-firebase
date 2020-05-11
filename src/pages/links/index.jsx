import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../../context";
import LinkIntem from "../../components/linkItem";
import { LINKS_NR } from "../../utils";

const Links = ({ location, match, history }) => {
  const { firebase } = useContext(FirebaseContext); 
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null); 
  const pageNr = Number(match.params.page); 
  const topPage = location.pathname.includes("top");
  const linksPage = location.pathname.includes("links");

  useEffect(() => {
    const unsub = fetchLinks();
    return () => unsub();
  }, [topPage, pageNr]);  

  function fetchLinks() {
    if(topPage) { 
      return firebase.db.collection("links").orderBy("voteCount", "desc").limit(LINKS_NR).onSnapshot(handleLinks);
    } else if(pageNr === 1) {
      return firebase.db.collection("links").orderBy("created", "desc").limit(LINKS_NR).onSnapshot(handleLinks);
    } else if(cursor) {
      return firebase.db.collection("links").orderBy("created", "desc").startAfter(cursor.created).limit(LINKS_NR).onSnapshot(handleLinks);

    }
  }

  function handleLinks(snapshot) {
    const links  = snapshot.docs.map(link => {
      return { id: link.id, ...link.data() };
    });
    setLinks(links);
    const lastLink = links[links.length - 1]; 
    setCursor(lastLink); 
  } 

  function handlePagination(action) {
    if(action === "prev" && pageNr > 1) {
      history.push(`/links/${pageNr - 1}`);
    } else if(action === "prev" && pageNr === 1) {
      return;
    } else if(pageNr <= links.length / LINKS_NR ) {
      history.push(`/links/${pageNr + 1}`);
    }
  }

  const pageIndex = pageNr ?(pageNr - 1) * LINKS_NR + 1 : 1;

  return (
    <div className="links-container">
      {links.map((link, i) => (
        <LinkIntem 
          key={link.id}
          link={link}
          count={i + pageIndex}
        />
      ))}
      {linksPage && (
        <div className="pagination-container">
          <button className="paginationBtn" onClick={() => handlePagination("prev")}>prev</button>
          <button className="paginationBtn" onClick={() => handlePagination("next")}>next</button>
        </div>
      )}
    </div>
  )
};

export default Links;