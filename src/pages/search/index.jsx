import React, { useState, useEffect, useContext } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import FirebaseContext from "../../context";
import LinkItem from "../../components/linkItem";

const Search = () => {
  const { firebase } = useContext(FirebaseContext);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchInitialLink();
  }, [])

  function fetchInitialLink() {
    firebase.db.collection("links").get().then(snapshot => {
      const links = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      });
      setLinks(links);
    })
  }

  const handleChange = e => setFilter(e.target.value);

  function handleSearch(e) {
    e.preventDefault();
    const val = filter.toLowerCase();
    const fLinks = links.filter(link => {
      return link.description.toLowerCase().includes(val) || link.link.toLowerCase().includes(val);
    }); 
    setFilteredLinks(fLinks);
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <Input 
          iType={"text"}
          iName={"search"}
          iValue={filter}
          iPlaceholder={"search"}
          iClass={"form__input form__input--search"}
          change={handleChange}
          max={"255"}
          min={"2"}
          iFocus={true} 
          req={true}
          iAuto={"off"}
        />
          <Button 
            bClass={"btns__auth-btn"}
            text={"search"}
          />
      </form>
      {filteredLinks.map(link => (
        <LinkItem 
          key={link.id}
          link={link}
        />
      ))}
    </div>
  )
};

export default Search;