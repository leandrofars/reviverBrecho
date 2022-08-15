import React, { useEffect, useState } from "react";
import axios from "axios";

import menu from "../../imgs/menu.svg"
import close from "../../imgs/close.svg"
import sacola from "../../imgs/sacola.svg"
import "./menu.css"

export default function Menu(setFilter) {

    const [displayMenu, setDisplayMenu] = useState(false)
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

    return <nav>
    <div className="menuMobile">
        {!displayMenu?
        <img src={menu} className="open" alt="menu" onClick={()=>setDisplayMenu(!displayMenu)}/>:
        <div className="menu-opened">
            <img src={close}className="close" alt="close" onClick={()=>setDisplayMenu(!displayMenu)}/>
            <div className="categorias">
                <div className="category">
                    {categories.map(category =>
                        <div className="categorys-mobile" onClick={()=>setFilter.setFilter(`/${category.categoryCode}`)}>{category.description}</div>
                    )}
                </div>
            </div>
        </div>}
    </div>
    </nav>
}