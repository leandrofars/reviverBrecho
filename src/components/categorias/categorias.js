import React, { useEffect, useState } from "react";
import axios from "axios";

import './categorias.css'

export default function Categorias (setFilter) {

    const [categories, setCategories] = useState(null)

    useEffect(()=>{
        fetchCategories()
    },[])

    const fetchCategories = async () => {
        let url = "http://localhost:5000/categories";
        console.log(url)
        axios.get(url)
        .then(res=>{
          setCategories(JSON.parse(res.data))
        })
        .catch(err=>{
          console.log(err)
        }) 
    }

    return<div className="catigurias">
        <p className="title"><strong>Categorias:</strong></p>
        {categories?<div className="categorrí">
            <div className="eachOf" onClick={()=>setFilter.setFilter(`/0`)}>Todas</div>
            {categories.map(category =>
                <div className="eachOf" onClick={()=>setFilter.setFilter(`/${category.categoryCode}`)}>{category.description}</div>
            )}
        </div>:<p>loading...</p>}
    </div>
}