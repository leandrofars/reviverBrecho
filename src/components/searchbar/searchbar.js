import React, { useState } from "react";
import axios from "axios";

import "./searchbar.css"
import searchIcon from "../../imgs/search.svg"

export default function SearchBar(setEstoque) {

    const [searchValue, setSearchValue]= useState(null)

    const handleSearchValue = e => {
        setSearchValue(e.target.value)
    }

    const submitSearch = () => {
        let url = "http://localhost:5000/busca/"+searchValue
        axios.get(url)
        .then(res=>{
            var parsed=JSON.parse(res.data)
            setEstoque.setEstoque(parsed)
            console.log(parsed)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return <div className="wrap">
    <div className="search">
       <input type="text" className="searchTerm" placeholder="Faça sua busca" onChange={handleSearchValue} />
       <button type="submit" className="searchButton" onClick={submitSearch}>
         <img src={searchIcon} alt="icone de pesquisa"></img>
      </button>
    </div>
 </div>
}