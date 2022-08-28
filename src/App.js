import React from 'react';
import { useState, useEffect } from 'react';
//  import { BrowserRouter, Route, Routes} from "react-router-dom";

import Menu from './components/menu/menu'
import Footer from './components/footer/footer'
import Produtos from './components/produtos/produtos';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css"
import logo from "./imgs/logo-removebg.png"


function App() {

  const [filter,setFilter]= useState("/0")
  //eslint-disable-next-line
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  function homepage(){
    setFilter("/0")
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
          <Produtos filter={filter} />
        {/*{isDesktop &&
        <Categorias setFilter={setFilter}/>} ESTOU COMENTANDO ELE POIS ACHO ESSE FILTER MELHOR*/}
        {/*<BrowserRouter>
          <Routes>
        <Route exact path='/produto/:id' element={<DisplayProductBig />} />
        <Route exact path='/' element={<Produtos filter={filter} />} />
          </Routes>
      </BrowserRouter>*/}
        </div>
    </main>
    <Footer/>
  </div> 
  );
}

export default App;
