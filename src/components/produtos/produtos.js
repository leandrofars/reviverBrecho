import React, {useState, useEffect} from 'react';
import axios from 'axios';
import sacola from '../../imgs/sacola.svg';
import './produtos.css';
import rightArrow from '../../imgs/chevron-right.svg'
import leftArrow from '../../imgs/chevron-left.svg'
import close from '../../imgs/close.svg'

export default function Produtos(filter) {
  
  const [estoque, setEstoque] = useState(null)
  const [page, setPage] = useState(1)
  const [displayBig, setDisplayBig] = useState(false)
  const [productBig, setProductBig] =useState(null)
  const [actualImg, setActualImg] =useState(null)

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

  const fetchInpage = (newPageCount) => {
    let url = "http://localhost:5000/categoria"+filter.filter+"/"+newPageCount;
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
    let url = "http://localhost:5000/categoria"+filter.filter;
      axios.get(url)
      .then(res=>{
        var parsed=JSON.parse(res.data)
        setEstoque(parsed)
        console.log(parsed.produtos)
      })
      .catch(err=>{
        console.log(err)
      })
    },[filter])
  return <div className="products">
    <div className="containerProdutos">
      {estoque ? estoque.produtos.map(product=>
        <div className="produtos"  key={product.id}>
        <img src={`https://cdn.smartpos.app/product/${product.id}`} alt="arrival" onClick={()=>{
          setDisplayBig(!displayBig); 
          setProductBig(product.imagens);
          setActualImg(0)}
          }/>
          <div className="informações">
            <p className="info">{product.descricao}<br/>
            R$ {product.valorVenda} </p>
            <ul className='sizes'>
            </ul>
          </div>
        </div>)
      :<p>loading..</p>}
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
   {estoque?<div className='paging'>
        {estoque.page==1?null:
        <p className='back' onClick={pageBack}>Anterior</p>}
        <div className='default-page'>{estoque.page}</div>
        <p>de</p>
        <div className='last-page'>{estoque.totalPages}</div>
        {estoque.page==estoque.totalPages?null:
        <p className='next' onClick={pageNext}>Próxima</p>}
      </div>:<p>loading...</p>}
  </div>
}
