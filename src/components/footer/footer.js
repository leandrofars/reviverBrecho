import React, { useState } from "react"

import "./footer.css"
//import whatsapp from "../../imgs/zapIcon.svg"
import instagram from "../../imgs/instagram.svg"
import email from "../../imgs/email.svg"
import whatsappIcon from "../../imgs/whatsaap.svg"
import close from '../../imgs/close.svg'

export default function Footer(){

    const [displayMessage, setDisplayMessage] = useState(true)

    return(
    <footer>
        <div className="entrarEmContato">
            <div className="contato">
                Contatos:
            </div>
            <div className="formasDeContato">
                {/*<div className="zapzap">
                    <img src={whatsapp} alt="whatsaap"/>
                    <a href="tel:+55-48-99859-0767"></a>(48)9 9859-0767
                </div>*/}
                <div className="instagram">
                    <img src={instagram} alt="ícone instagram"/>
                    @reviverrbrecho
                </div>
                <div className="email">
                    <img src={email} alt="email"/>
                    emaildareviverbrechó@gmail.com
                </div>
                {displayMessage &&
                <div className="messages">
                <div className="closing-message">
                <img src={close} className="changeFill" alt="close icon" onClick={()=>setDisplayMessage(false)}></img>
                </div>
                <div class="bubble">Gostou de alguma peça? Fale conosco pelo whatsaap</div>
                </div>}
                <a href="https://wa.me/554884975827" target="_blank" rel="noreferrer">
                <div id="wa-widget-send-button">
                    <img src={whatsappIcon} alt="ícone de whatsaap"></img>
                </div>
                </a>
            </div>
        </div>
    </footer>)
    }