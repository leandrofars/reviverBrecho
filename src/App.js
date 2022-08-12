import React from 'react';
import { useState } from 'react';

import Footer from './components/footer/footer'
import Produtos from './components/produtos/produtos';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css"

import logo from "./imgs/logo.png"
import menu from "./imgs/menu.svg"
import close from "./imgs/close.svg"
import slogan from "./imgs/slogan.gif"

function App() {

  const [filter,setFilter]= useState("/")
  function homepage(){
    setFilter("/")
  }

  return (
   <div>
     <ToastContainer position="top-left"
        autoClose={1000}
        transition={Zoom}
        icon="🛍️"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}/>
    <header>
        <div className="logo">
            <img src={logo} alt="logo" onClick={homepage}/>
        </div>
    </header>
    <nav>
        <div className="menuMobile">
            <img src={menu} className="open" alt="menu"/>
            <img src={close}className="close" alt="close"/>
        </div>
    </nav>
    <main>
        {/*<div className="destaque">
            <div className="imagens">
                <img src={slogan} alt="fotoChique"/>
            </div>
        </div>*/}
        <Produtos
        filter={filter}
        ></Produtos>
    </main>
    <Footer/>
  </div> 
  );
}

export default App;
