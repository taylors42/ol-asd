import { useContext } from "react"
import { MapContext } from "../context/MapContext"
export default function SelectButtons(){
  // const {  } = useContext(MapContext)
  
  return(
    <div className="panel">
      <button onClick={() => { setRadius( radius + 1 ) }} className='botao'>More radius</button>
      <button onClick={() => { setRadius(( radius - radius ) + 1)}} className='botao'>Reset radius</button>
      <button onClick={() => { getLocate()} }>My Location</button>
      <button onClick={() => { setUserViewX((userViewX - userViewX) + 1); setUserViewY((userViewY - userViewY) + 1); console.log("exec")}}>Reset View</button>
      <button onClick={() => { setNum( num + 1 ) }}></button>
    </div>
  )
}