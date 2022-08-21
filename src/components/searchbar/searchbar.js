import React, { useState } from "react";
import axios from "axios";
import env from "react-dotenv";

import "./searchbar.css"
import searchIcon from "../../imgs/search.svg"

export default function SearchBar(setEstoque) {

    const [searchValue, setSearchValue]= useState(null)

    const handleSearchValue = e => {
        setSearchValue(e.target.value)
    }
    const handleKeyDown = e => {
        if (e.key==="Enter"){
            submitSearch()
        }
    }

    const submitSearch = () => {
        let url = `${env.API_ENDPOINT}/busca/${searchValue}`;
        axios.get(url)
        .then(res=>{
            var parsed=JSON.parse(res.data)
            console.log(parsed)
            if(!parsed.error){
                setEstoque.setEstoque(parsed)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return <div className="wrap">
    <div className="search">
       <input type="text" className="searchTerm" placeholder="Faça sua busca" onChange={handleSearchValue} onKeyDown={handleKeyDown}/>
       <button type="submit" className="searchButton" onClick={submitSearch}>
         <img src={searchIcon} alt="icone de pesquisa"></img>
      </button>
    </div>
 </div>
}