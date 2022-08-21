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
  const [productBig,setProductBig]=useState(null)
  const [displayOnlyImg, setDisplayOnlyImg]=useState(false)


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
    let match=cgc.match(/[*][C][G][C][:][^\s]*/)
    if (match){
      return true
    }else{
      return false
    }
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
      return<div className="produtos"  key={product.id} onClick={()=>{setProductBig(index);setDisplayBig(true);fetchTenant(product.id)}}>
        {getCGC(product.observacao) && <div className='cgc'> CGC</div>}
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
        <div className='close-display' onClick={()=>{setDisplayBig(false);setImgs(null);setProductBig(null)}}>
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
            <p>Descrição:</p>
            <div className='stuff'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim sodales ut eu sem integer vitae justo. Quisque egestas diam in arcu cursus euismod quis viverra. Ultrices sagittis or. </p>
            </div>
            </div>
          </div>
        </div>
        </div>
      </div>}
      {displayBig&& !isDesktop &&
       <div className='display-container'>
       <div className='all-about'>
       <div className='close-display' onClick={()=>{setDisplayBig(false);setImgs(null);setProductBig(null)}}>
         <img src={close} alt="close"></img>
       </div>
       <div className='container-infos'>
        <div className='informations'>
        <div className='images'>
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
           <div className='stuff-size'>
             <p>Tam: <span className='size-cont'>{getSize(estoque.produtos[productBig].observacao)}</span></p>
           </div>  
           <div className='stuff-description'>
           <p> Descrição: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim sodales ut </p>
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
  </div>:<p>{String(error)}</p>
}
