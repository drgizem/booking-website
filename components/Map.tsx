import { MapContainer, TileLayer,Marker,Popup,useMap } from 'react-leaflet'
import { Hotel } from './types'
import "leaflet/dist/leaflet.css"
import L, { Icon } from "leaflet"
import styles from "../app/page.module.css"


type Props={
  results:Hotel[]
}
type Prop={
  coords:[number, number]
}
function ChangeMapView({ coords }:Prop) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}
export const Mappart=({results}:Props)=>{
  const newicon = new L.Icon(
   { iconUrl:"../public/images/istanbul.png",
  }
  )

  return (<>
    {results.length !==0 && <MapContainer className={styles.searchmap} style={{"height":"40vh"}}  center={[results[0]!.latitude,results[0]!.longitude]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {results.map((item:Hotel)=>{
      return <Marker key={item.name} position={[item.latitude,item.longitude]} icon={newicon} >
      <Popup>
        {item.name}
      </Popup>
    </Marker>
    })}
     <ChangeMapView coords={[results[0]!.latitude,results[0]!.longitude]} />
  </MapContainer>}
  </>
  )
}