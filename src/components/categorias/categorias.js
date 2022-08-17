import React, { useEffect, useState } from "react";
import axios from "axios";

import './categorias.css'
import leftArrow from '../../imgs/chevron-left.svg'
import rightArrow from '../../imgs/chevron-right.svg'

export default function Categorias (setFilter) {

    const [categories, setCategories] = useState(null)
    const [display, setDisplay] = useState(true)

    useEffect(()=>{
        fetchCategories()
    },[])

    const fetchCategories = async () => {
        let url = `${env.API_ENDPOINT}/categories`;
        console.log(url)
        axios.get(url)
        .then(res=>{
          setCategories(JSON.parse(res.data))
        })
        .catch(err=>{
          console.log(err)
        }) 
    }

    return categories &&<div className="catigurias">
        <div className="categorrí">
        <p className="title"><strong>{display&&"Categorias:"}</strong>{display ?<img className='left-arrow-categories'src={leftArrow} alt="flecha a esquerda" onClick={()=>setDisplay(false)}></img>:<img className='left-arrow-categories'src={rightArrow} alt="flecha a esquerda" onClick={()=>setDisplay(true)}></img>}</p>
        {display&&
            <div className="eachOf" onClick={()=>setFilter.setFilter(`/0`)}>Todas</div>}
            {display && categories.map(category =>
                <div className="eachOf" onClick={()=>setFilter.setFilter(`/${category.categoryCode}`)}>{category.description}</div>
            )}
        </div>
    </div>
}