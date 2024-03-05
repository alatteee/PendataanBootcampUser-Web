import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const Search = ({ setResults }) => {
    const [input, setInput] = useState("");
  
    const fetchData = (value) => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
          const results = json.filter((user) => {
            return (
              value &&
              user &&
              user.name &&
              user.name.toLowerCase().includes(value)
            );
          });
          setResults(results);
        });
    };
  
    const handleChange = (value) => {
      setInput(value);
      fetchData(value);
    };
  
    return (
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

// export const Search = () => (
   
//     <form action="/" method="get">
//         <label htmlFor="header-search">
//             <span className="visually-hidden">Search Nama Siswa</span>
//         </label>
//         <input
//             type="text"
//             id="header-search"
//             placeholder="Contoh:Irin"
//             name="s" 
//         />
//         <button type="submit">Search</button>
//     </form>
    
);
    };

export default Search;