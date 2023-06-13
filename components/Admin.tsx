import { useState } from "react"
import { Form,Button } from "react-bootstrap"
import { v4 as uuidv4 } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {storage,db} from '../firebase/firebase'
import { setDoc,getDoc,doc, updateDoc } from "firebase/firestore";


export const Admin=()=>{
  const [hotel,setHotel]=useState({
    name:"",
    city:"",
    distance:0,
    latitude:0,
    longitude:0,
    price:0,
    image:"",
    id:uuidv4()
  })
const handleChange=(e:any)=>{
  const {value,name}=e.target
  setHotel((pre)=>{
    return {...pre,[name]:value}
  })
}
const handleImage = (e:React.ChangeEvent<HTMLInputElement>) => {
  if(e.target.files){
      const image = e.target.files[0]
      const storageRef = ref(storage,`images/${hotel.id}`)
      const uploadTask = uploadBytesResumable(storageRef,image)
      uploadTask.on('state_changed',
      (snapshot) => {
          console.log(snapshot)
      }
      ,(error) => {
          console.log(error)
      }
      ,() => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setHotel({...hotel,image:downloadURL})
          })
      }
      )
}}
const handleSubmit=(e:any)=>{
  e.preventDefault()
  setDoc(doc(db,"hotels",`${hotel.id}`),{
    name:hotel.name,
    city:hotel.city,
    distance:hotel.distance,
    latitude:hotel.latitude,
    longitude:hotel.longitude,
    price:hotel.price,
    image:hotel.image,
  })
}

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Hotel Name</Form.Label>
        <Form.Control type="text" value={hotel.name} name="name" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>City</Form.Label>
        <Form.Control type="text" value={hotel.city} name="city" onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Price of a Night per person</Form.Label>
        <Form.Control type="number" onChange={handleChange} name="price"/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Distance from city center</Form.Label>
        <Form.Control type="number" onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Latitude</Form.Label>
        <Form.Control type="number" onChange={handleChange} name="latitude"/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Longitude</Form.Label>
        <Form.Control type="number" onChange={handleChange} name="longitude"/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={handleImage} name="image"/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}