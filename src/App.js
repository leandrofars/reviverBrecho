import React from 'react';
import { useState } from 'react';

import Categorias from './components/categorias/categorias';
import Menu from './components/menu/menu'
import Footer from './components/footer/footer'
import Produtos from './components/produtos/produtos';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css"

import logo from "./imgs/logo.png"
import menu from "./imgs/menu.svg"
import close from "./imgs/close.svg"

function App() {

  const [filter,setFilter]= useState("/0")
  function homepage(){
    setFilter("")
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
    <Menu setFilter={setFilter}/>
    <main>
        {/*<div className="destaque">
            <div className="imagens">
                <img src={slogan} alt="fotoChique"/>
            </div>
        </div>*/}
        <div className='main-page'>
        <Categorias setFilter={setFilter}/>
        <Produtos
        filter={filter}
        ></Produtos>
        </div>
    </main>
    <Footer/>
  </div> 
  );
}

export default App;
