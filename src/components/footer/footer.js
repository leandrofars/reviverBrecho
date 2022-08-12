import React from "react"

import whatsapp from "../../imgs/zapIcon.svg"
import instagram from "../../imgs/instagram.svg"
import email from "../../imgs/email.svg"

export default function Footer(){

    return(
    <footer>
        <div className="entrarEmContato">
            <div className="contato">
                Contatos:
            </div>
            <div className="formasDeContato">
                <div className="zapzap">
                    <img src={whatsapp} alt="whatsaap"/>
                    {/*eslint-disable-next-line*/}
                    <a href="tel:+55-48-99859-0767"></a>(48)9 9859-0767
                </div>
                <div className="instagram">
                    <img src={instagram} alt="ícone instagram"/>
                    @vocemaisintima
                </div>
                <div className="email">
                    <img src={email} alt="email"/>
                    vocemaisintimaonline@gmail.com
                </div>
            </div>
        </div>
    </footer>)
    }