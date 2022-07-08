import React, { useEffect, useRef, useState } from "react";
import s from './Modal.module.css'
import 'mapbox-gl/dist/mapbox-gl.css'



export default function Modal({active, setActive, buttonClick}) {

    const [value, setValue] = useState([0,1,2,3,4,5])
    const [color, setColor] = useState()
/* map.map.once('click', console.log('12')) */

    return (
        <div className={active? s.modal : s.modal_hidden} onClick= {() => setActive(false)}>
            <div className={s.modal_container} onClick={(e) => e.stopPropagation()}>
                {value.map((v,i) => <button onClick={buttonClick} key={i}>{v}</button>) }
            </div>
        </div>
    )


}