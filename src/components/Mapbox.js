import React, { useEffect, useRef, useState } from "react";
import s from './Mapbox.module.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map,  { Marker } from "react-map-gl";
import { v4 as uuid } from "uuid";


export default function Mapbox() {

/*   const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  }); */
const [modalActive, setModalActive] = useState(false)
const [currentColor, setCurrentColor] = useState()
const [currentCoordinate, setCurrentCoordinate] = useState()
const [count, setCount] = useState(0)
const [markers, setMarkers] = React.useState([]);
const [isButtonDelete, setIsButtonDelete] = useState(false)
const [currentId, setCurrentId] = useState()
const [options, setOptions] = useState([
   'black',
 'grey', 'red',
  'orange',
 'lime',
   'green',
])
const id = uuid();

  function handleClick (e) {
    setModalActive(true)
  }

  function buttonClick(event) {
    setMarkers(markers => [...markers, { id ,lng:currentCoordinate.lng, lat:currentCoordinate.lat, color: options[event.target.value], value: event.target.value}])
    setModalActive(false)
    console.log('hello')
    setIsButtonDelete(false)
  };


  function markerClick(e, id) {
    setModalActive(true)
    setIsButtonDelete(true)
    setCurrentId(id)
    return
  }
function changeCoordinate(e, id) {
  const marker = markers.find((marker) => marker.id === id)
  marker.lng = e.lngLat.lng
  marker.lat = e.lngLat.lat
  return
}

function changeMarker(e, id) {
  setMarkers(markers.map((marker) => (marker.id === id?  {...marker, color: options[e.target.value]}: marker)))
setIsButtonDelete(false)
setModalActive(false)
}

function buttonDeleteClick(id) {
 setMarkers(markers.filter((marker) => marker.id !== id))
  setModalActive(false)
  setIsButtonDelete(false)
}
  useEffect(() => {
   if(!markers)return;
   setCount(markers.length + 1)
   
  }, [markers]);
  const blackMarkers = markers.filter((markers) => markers.value === '0' )
  const greyMarkers = markers.filter((markers) => markers.value === '1' )
  const redMarkers = markers.filter((markers) => markers.value === '2' )
  const orangeMarkers = markers.filter((markers) => markers.value === '3' )
  const limeMarkers = markers.filter((markers) => markers.value === '4' )
  const greenMarkers = markers.filter((markers) => markers.value === '5' )
  

    return (
        <div>
          <Map
        initialViewState={{
          longitude: 30.4,
          latitude: 50.5,
          zoom: 10
        }}
        onClick ={e => setCurrentCoordinate({lng:e.lngLat.lng, lat:e.lngLat.lat}) }
        onDblClick={(e) =>handleClick(e)}
        style={{width: '100vw', height :'100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiYW5pZGFtcCIsImEiOiJjbDU4MTdsdHgxeDU2M2Z0N28xdWlwbmxlIn0.fVdsQ_LxznIqvKeXsPG_Zg">
        {markers.map((m) => 
          <Marker latitude={m.lat} longitude ={m.lng} key={m.id} color ={m.color} onClick ={(e) => markerClick(e, m.id)} draggable={true} onDragEnd ={(e) =>changeCoordinate(e, m.id)} />)}
        </Map>
        {modalActive && <div className={modalActive? s.modal : s.modal_hidden} onClick= {() =>  setModalActive(false)}>
            <div className={s.modal_container} onClick={(e) => e.stopPropagation()}>
              <p>Select a grade</p>
              <button className={s.buttonScore} onClick={!isButtonDelete? (e) => buttonClick(e) : (e) => changeMarker(e, currentId)} value={0}>0</button>
              <button className={s.buttonScore} onClick={(e) => buttonClick(e)} value={1}>1</button>
              <button className={s.buttonScore} onClick={(e) => buttonClick(e)} value={2}>2</button>
              <button className={s.buttonScore} onClick={(e) => buttonClick(e)} value={3}>3</button>
              <button className={s.buttonScore} onClick={(e) => buttonClick(e)} value={4}>4</button>
              <button className={s.buttonScore} onClick={(e) => buttonClick(e)} value={5}>5</button>
              {isButtonDelete && <button className={s.buttonDelete} onClick ={() => buttonDeleteClick(currentId)}>Delete</button>}
            </div>
        </div>}
        <div className={s.table}>
          <table>
            <tr><th>Markers</th></tr>
            <tr>
              <td>All</td>
              <td>{count - 1}</td>
            </tr>
            <tr>
              <td>Black</td>
              <td>{blackMarkers.length}</td>
            </tr>
            <tr>
              <td>Grey</td>
              <td>{greyMarkers.length}</td>
            </tr>
            <tr>
              <td>Red</td>
              <td>{redMarkers.length}</td>
            </tr>
            <tr>
              <td>Orange</td>
              <td>{orangeMarkers.length}</td>
            </tr>
            <tr>
              <td>Lime</td>
              <td>{limeMarkers.length}</td>
            </tr>
            <tr>
              <td>Green</td>
              <td>{greenMarkers.length}</td>
            </tr>
          </table>
        </div>
        </div>
    );
        
}