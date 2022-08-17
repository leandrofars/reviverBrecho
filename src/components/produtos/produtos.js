import React, {useState, useEffect} from 'react';
import axios from 'axios';
import env from 'react-dotenv';

import Loading from '../loading/loading';
import SearchBar from '../searchbar/searchbar';

import './produtos.css'
import rightArrow from '../../imgs/chevron-right.svg'
import leftArrow from '../../imgs/chevron-left.svg'
import close from '../../imgs/close.svg'


export default function Produtos(filter) {
  
  const [estoque, setEstoque] = useState(null)
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);
  const [page, setPage] = useState(1)
  const [displayBig, setDisplayBig] = useState(false)
  const [imgs, setImgs] = useState(null)
  const [length, setLength] = useState(null)
  const [actualImg, setActualImg] = useState(null)
  const [arrow, setArrow] = useState("")
  const [leftArrowRule, setLeftArrow] = useState("")
  const [error, setError] = useState(null)

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const pageBack = () => {
    var newPageCount = page-1
    setPage(newPageCount)
    fetchInpage(newPageCount)
  }

  const pageNext = () => {
    var newPageCount = page+1
    setPage(newPageCount)
    fetchInpage(newPageCount)
  }

  const nextPicture = () => {
    var newPictureCount = actualImg+1
    setActualImg(newPictureCount)
  }

  const previousPicture = () => {
    var newPictureCount = actualImg-1
    setActualImg(newPictureCount)
  }

  useEffect(()=>{
    console.log("running")
    if(actualImg===length-1){
      console.log("adding class to right")
      setArrow("none")
    }else{
      setArrow("")
    }
    if(actualImg===0){
      console.log("adding class to left")
      setLeftArrow("none")
    }else{
      setLeftArrow("")
    }
    //eslint-disable-next-line
  },[actualImg,imgs])

  const fetchTenant = async (id) => {
    let url = `${env.API_ENDPOINT}/imgs/${id}`
      axios.get(url)
      .then(res=>{
        var initial = [{"key":`product/${id}`}]
        var parsed=JSON.parse(res.data)
        if (parsed!=="notFound"){
        parsed.map(el=>{return initial.push(el)})
        setImgs(initial)
        setLength(initial.length)
        setActualImg(0)
        console.log(initial)
        }else{
          setImgs([{"key":`product/${id}`}])
          setLength(1)
          setActualImg(0)
        }
      })
      .catch(err=>{
        console.log(err)
      })
  } 
  const fetchInpage = (newPageCount) => {
    let url = `${env.API_ENDPOINT}/categoria${filter.filter}/${newPageCount}`;
      axios.get(url)
      .then(res=>{
        var parsed=JSON.parse(res.data)
        setEstoque(parsed)
        console.log(parsed.produtos)
      })
      .catch(err=>{
        console.log(err)
      })
  }
  useEffect(()=>{
    setPage(1)
    let url = `${env.API_ENDPOINT}/categoria${filter.filter}`;
      axios.get(url)
      .then(res=>{
        var parsed=JSON.parse(res.data)
        setEstoque(parsed)
        console.log(parsed.produtos)
      })
      .catch(err=>{
        setError(err)
        console.log(err)
      })
    },[filter])
  return !error?<div className="products">
    <SearchBar setEstoque={setEstoque}/>
    <div className="containerProdutos">
      {estoque ? estoque.produtos.map(product=>{
      let treatSize = product.descricao.replace(/[T?t][a?A][m?M][\s][^\s]+/,"")
      let match = product.descricao.match(/[T?t][a?A][m?M][\s][^\s]+/)
      let size;
      if (match){
      size = match[0].slice(3,match[0].length)
      }
      let description = treatSize
      if(product.descricao.length>20 && !isDesktop){
        description = treatSize.slice(0,20)+"..."
      }
      if(product.descricao.length>25 && isDesktop){
        description = treatSize.slice(0,25)+"..."
      }
      let venda;
      let initialVenda =product.valorVenda
      if(initialVenda % 1 !== 0 && !isNaN(initialVenda % 1)){
        var teste =String(initialVenda).replace(".9",",90")
        venda = teste
        console.log(teste)
      }else{
        venda = initialVenda+",00"
      }
      return<div className="produtos"  key={product.id} onClick={()=>{setDisplayBig(true);fetchTenant(product.id)}}>
        <img src={`https://cdn.smartpos.app/product/${product.id}`} alt="arrival"/>
          <div className="informações">
            <p className="info">{description}<br/>
            R$ {venda} </p>
            {size &&
            <p className='size'>
            <span className='tam'>Tam:</span><span className='size-cont'>{size}</span>
            </p>}
          </div>
        </div>})
      :<Loading />}
      {displayBig&&
    <div className="display-container">
      <div className='imgs-big'>
      <div className={`left-arrow `+leftArrowRule}>
        <img src={leftArrow} alt="flecha a esquerda" onClick={previousPicture}/>
      </div>
      <div className='img-and-close'>
      <div className='close-display' onClick={()=>{setDisplayBig(false);setImgs(null)}}>
        <img src={close} alt="close"></img>
      </div>
        {imgs ?
        <img src={"https://cdn.smartpos.app/"+imgs[actualImg].key} alt="product"></img>: <Loading />}
      </div>
      <div className={`arrow `+arrow} >
        <img src={rightArrow} alt="flecha a direita" onClick={nextPicture}/>
      </div>
      </div>
    </div>}
    </div>
   {estoque?<div className='paging'>
        {estoque.page===1?null:
        <p className='back' onClick={pageBack}>Anterior</p>}
        <div className='default-page'>{estoque.page}</div>
        <p>de</p>
        <div className='last-page'>{estoque.totalPages}</div>
        {estoque.page===estoque.totalPages?null:
        <p className='next' onClick={pageNext}>Próxima</p>}
      </div>:<Loading />}
  </div>:<p>{String(error)}</p>
}
