import React, {useState, useEffect} from 'react';
import axios from 'axios';
import env from 'react-dotenv';
//import { Link } from 'react-router-dom';

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
  const [productBig,setProductBig]=useState(null)
  const [displayOnlyImg, setDisplayOnlyImg]=useState(false)
  const [startPos, setStartPos]=useState(null)
  const [sliding, setSliding]=useState(false)


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
    console.log("oi")
    setActualImg(newPictureCount)
  }

  const previousPicture = () => {
    var newPictureCount = actualImg-1
    setActualImg(newPictureCount)
  }

  const touchMove = () => {
    setSliding(true)
  }
  const touchStart = e => {
    setStartPos(e.changedTouches[0].clientX)
  }
  const touchEnd = e => {
    handleSliding(e.changedTouches[0].clientX)
  }
  const handleSliding = endPos => {
    if (sliding && actualImg!==length-1&&startPos-endPos>100){
      nextPicture()
    }
    if (sliding && actualImg!==0&&startPos-endPos<100){
      previousPicture()
    }
    setSliding(false)
    console.log("start pos:" +startPos+ " end pos: " +endPos)
  }
  const getSize = (sizeParam) => {
    let match = sizeParam.match(/[*][T?t][:][^\s]*/)
    if (match){
    let treatSize = match[0].slice(1,match[0].length-1)
    let size = treatSize.replace("T:","")
    console.log(size)
    return size
    }
    return "."
  }
  const getPrice = price => {
    if(price % 1 !== 0 && !isNaN(price % 1)){
      var treatedPrice = String(price).replace(".9",",90")
      return treatedPrice
    }else{
      return price+",00"
    }
  }
  const getCGC = cgc => {
    let match=cgc.match(/[*][C?c][G?g][C?c][*]]/)
    if (match){
      return true
    }else{
      return false
    }
  }
  const isIos = () => {
      let  iosSys = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform) //|| (navigator.userAgent.includes("Mac") && "ontouchend" in document)
      return iosSys
  }
  const block_overflow = () => {
    document.body.style.overflow = 'hidden';
    if(isIos){
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }
  }
  const unlock_overflow = () => {
    document.body.style.overflow= 'visible';
    if (isIos) {
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }
  const getMarca = marca => {
    let match=marca.match(/[*][M?m][:](.*?)[*]/)
    if (match){
      let treatMarca = match[0].slice(1,match[0].length-1)
      let marca = treatMarca.replace("M:","")
      return marca
    }else{
      return "."
    }
  }
  const getCondicao = cond => {
    let match=cond.match(/[*][C][:](.*?)[*]/)
    if (match){
      let treatCond = match[0].slice(1,match[0].length-1)
      let cond = treatCond.replace("C:","")
      return cond
    }else{
      return "."
    }
  }
  const getDescription = desc =>{
    let desc1 = desc.replace(/[*][C][:](.*?)[*]/,"")
    let desc2 = desc1.replace(/[*][M?m][:](.*?)[*]/,"")
    let desc3 = desc2.replace(/[*][C?c][G?g][C?c][:][^\s]*/,"")
    let desc4 = desc3.replace(/[*][T?t][:][^\s]*/,"")
    return desc4
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
      {estoque ? estoque.produtos.map((product,index)=>{
      let description= product.descricao
      if(description.length>20 && !isDesktop){
        description = product.descricao.slice(0,20)+"..."
      }
      if(description.length>25 && isDesktop){
        description = product.descricao.slice(0,25)+"..."
      }
      return<div className="produtos"  key={product.id} onClick={()=>{setProductBig(index);setDisplayBig(true);fetchTenant(product.id);block_overflow()}}>
        {getCGC(product.observacao) && <div className='cgc'> Vintage</div>}
        <img src={`https://cdn.smartpos.app/product/${product.id}`} alt="arrival"/>
          <div className="informações">
            <p className="info">{description}<br/>
            R$ {getPrice(product.valorVenda)} </p>
            <p className='size'>
            <span className='tam'>Tam:</span><span className='size-cont'>{getSize(product.observacao)}</span>
            </p>
          </div>
        </div>})
      :<Loading />}
      {displayBig&& isDesktop &&
      <div className='display-container'>
        <div className='all-about'>
        <div className='close-display' onClick={()=>{setDisplayBig(false);setImgs(null);setProductBig(null);unlock_overflow()}}>
          <img src={close} alt="close"></img>
        </div>
        <div className='container-infos'>
          <div className='images'>
            <div className={`left-arrow-img `+leftArrowRule}>
              <img src={leftArrow} alt="flecha a esquerda" onClick={previousPicture}/>
            </div>
            {imgs ?
            <img src={"https://cdn.smartpos.app/"+imgs[actualImg].key} className="prod-img" alt="product" onClick={()=>setDisplayOnlyImg(true)}></img>: <Loading />}
            <div className={`arrow-img `+arrow} >
              <img src={rightArrow} alt="flecha a direita" onClick={nextPicture}/>
            </div>
          </div>
          <div className='informations'>
            <div className='product-title'>
            <p>{estoque.produtos[productBig].descricao}</p>
            </div>
            <div className='stuff'>
              <p>Preço: R$ {getPrice(estoque.produtos[productBig].valorVenda)}</p>
            </div>
            <div className='stuff'>
              <p>Tamanho: <span className='size-cont'>{getSize(estoque.produtos[productBig].observacao)}</span> </p>
            </div>  
            <div className='stuff'>
              <p>Marca: <span className='size-cont'>{getMarca(estoque.produtos[productBig].observacao)}</span> </p>
            </div>  
            <div className='stuff'>
              <p>Condição: <span className='size-cont'>{getCondicao(estoque.produtos[productBig].observacao)}</span> </p>
            </div>  
            <div className='stuff'>
            <p>Descrição: {getDescription(estoque.produtos[productBig].observacao)}</p>
            </div>
          </div>
        </div>
        </div>
      </div>}
      {displayBig&& !isDesktop &&
       <div className='display-container'>
       <div className='all-about'>
       <div className='close-display' onClick={()=>{setDisplayBig(false);setImgs(null);setProductBig(null);unlock_overflow()}}>
         <img src={close} alt="close"></img>
       </div>
       <div className='container-infos'>
        <div className='informations'>
        <div className='images' onTouchMove={touchMove} onTouchStart={touchStart} onTouchEnd={touchEnd}>
           <div className={`left-arrow-img `+leftArrowRule}>
             <img src={leftArrow} alt="flecha a esquerda" onClick={previousPicture}/>
           </div>
           {imgs ?
           <img src={"https://cdn.smartpos.app/"+imgs[actualImg].key} className="prod-img" alt="product" onClick={()=>setDisplayOnlyImg(true)}></img>:<div className='loading-prod'> <Loading /></div>}
           <div className={`arrow-img `+arrow} >
             <img src={rightArrow} alt="flecha a direita" onClick={nextPicture}/>
           </div>
         </div>
         <div className='product-title'>
           <p>{estoque.produtos[productBig].descricao}</p>
        </div>
           <div className='stuff'>
             <p>R$ {getPrice(estoque.produtos[productBig].valorVenda)} </p>
           </div> 
           <div className='stuffs-container'> 
              <div className='stuff-size'>
                <p>Tam: <span className='size-cont'>{getSize(estoque.produtos[productBig].observacao)}</span></p>
              </div>  
              <div className='stuff-cond'>
              <p>Condição: <span className='size-cont'>{getCondicao(estoque.produtos[productBig].observacao)}</span></p>
              </div>
              <div className='stuff-description'>
              <p>Marca: <span className='size-cont'>{getMarca(estoque.produtos[productBig].observacao)}</span></p>
              </div>
            </div>
           <div className='stuff-description'>
           <p>Descrição: {getDescription(estoque.produtos[productBig].observacao)}</p>
          </div>

           </div> 
       </div>
       </div>
     </div>}
    {displayOnlyImg &&<div className="display-container-onlyImg">
      <div className='imgs-big'>
      <div className='img-and-close'>
      <div className='close-display' onClick={()=>{setDisplayOnlyImg(false);}}>
        <img src={close} alt="close"></img>
      </div>
        {imgs ?
        <img src={"https://cdn.smartpos.app/"+imgs[actualImg].key} alt="product"></img>: <Loading />}
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
  </div>:<p>Erro no servidor, reinicie a página{String(error)}</p>
}
