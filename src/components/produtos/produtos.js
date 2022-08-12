import React, {useState, useEffect} from 'react';
import axios from 'axios';
import sacola from '../../imgs/sacola.svg';
import './produtos.css';
import rightArrow from '../../imgs/chevron-right.svg'
import leftArrow from '../../imgs/chevron-left.svg'
import close from '../../imgs/close.svg'

export default function Produtos(filter) {
  
  const [estoque, setEstoque] = useState([])
  const [displayBig, setDisplayBig] = useState(false)
  const [productBig, setProductBig] =useState(null)
  const [actualImg, setActualImg] =useState(null)

  useEffect(()=>{
    let url = "http://localhost:5000"+filter.filter;
    console.log(url)
    axios.get(url)
    .then(res=>{
      console.log(res)
      setEstoque(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[filter])
  return <div className="products">
    <div className="containerProdutos">
      {
        estoque.map(product=>
        <div className="produtos"  key={product._id}>
        <img src={require(`../../${product.imagem}`)} alt="arrival" onClick={()=>{
          setDisplayBig(!displayBig); 
          setProductBig(product.imagens);
          setActualImg(0)}
          }/>
          <div className="informações">
            <p className="info">{product.nome}<br/>
            {product.preço}</p>
            <ul className='sizes'>
              {product.PP !== 0 && 
              <li className='sizeIcon' key={"PP"}>PP</li>}
              {product.P !==0 &&
              <li className='sizeIcon' key={"P"}>P</li>}
              {product.M !==0 &&
              <li className='sizeIcon' key={"M"}>M</li>}
              {product.G !==0 &&
              <li className='sizeIcon' key={"G"}>G</li>}
              {product.GG !==0 &&
              <li className='sizeIcon' key={"GG"}>GG</li>}
            </ul>
          </div>
        </div>)
      }
      {displayBig &&
      <div className="product-max-container">
        <div className='container-max'>
          <div className='close'>
          <img src={close} alt='close' className='closeImg' onClick={()=>{setDisplayBig(!displayBig)}}/>
          </div>
          <div className='image'>
            <div className='arrow'>
              {actualImg!==0 && <img src={leftArrow} alt='left-arrow' className='arrow' onClick={()=>setActualImg(old=>{return old-1})}/>}
            </div>
            <img src={require(`../../${productBig[actualImg]}`)} alt="product maximized" className='prodImage'/>
            <div className='arrow'>
              {actualImg===productBig.length-1 ? null:<img src={rightArrow} alt='right-arrow' className='arrow' onClick={()=>setActualImg(old=>{return old+1})}/>}
            </div>
          </div>
        </div>
      </div>}
    </div>
  </div>
}
