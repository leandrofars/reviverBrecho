import React, { useEffect, useState } from "react";
import axios from "axios";
import env from "react-dotenv";

import close from "../../imgs/close.svg"
import slider from "../../imgs/sliders2.svg"
import "./menu.css"

export default function Menu(setFilter) {

    const [displayMenu, setDisplayMenu] = useState(false)
    const [categories, setCategories] = useState(null)

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

    return <nav>
    <div className="menuMobile">
        {!displayMenu?
        <div className="open"  onClick={()=>setDisplayMenu(true)}>
        <p>Categorias</p>
        <img src={slider}alt="menu"/>
        </div>:
        <div className="menu-opened">
            <img src={close}className="close" alt="close" onClick={()=>setDisplayMenu(false)}/>
            <div className="categorias">
                <div className="category">
                <div className="categorys-mobile" onClick={()=>{setFilter.setFilter("/0");setDisplayMenu(false)}}>Todas</div>
                    {categories.map(category =>
                        <div className="categorys-mobile" onClick={()=>{setFilter.setFilter(`/${category.categoryCode}`);setDisplayMenu(false)}}>{category.description}</div>
                    )}
                </div>
            </div>
        </div>}
    </div>
    </nav>
}