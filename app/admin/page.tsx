"use client"
import { useState } from "react"
import { Form,Button, Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { v4 as uuidv4 } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db,storage } from "@/firebase/firebase";
import { setDoc,doc} from "firebase/firestore";


export default function Admin(){
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
const handleImage = (e:any) => {
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
const handleSubmit=async(e:any)=>{
  e.preventDefault()
  await setDoc(doc(db,"hotels",`${hotel.id}`),{
    name:hotel.name,
    city:hotel.city,
    distance:hotel.distance,
    latitude:hotel.latitude,
    longitude:hotel.longitude,
    price:hotel.price,
    image:hotel.image,
  })
  setHotel({
    name:"",
    city:"",
    distance:0,
    latitude:0,
    longitude:0,
    price:0,
    image:"",
    id:uuidv4()
  })
}

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="mt-5">
      <Form.Group className="mb-3">
        <Form.Label>Hotel Name</Form.Label>
        <Form.Control type="text" value={"" || hotel.name} name="name" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>City</Form.Label>
        <Form.Control type="text" value={"" || hotel.city} name="city" onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Price of a Night per person</Form.Label>
        <Form.Control type="number" onChange={handleChange} name="price" value={"" || hotel.price}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Distance from city center</Form.Label>
        <Form.Control type="number" onChange={handleChange} value={"" || hotel.distance} name="distance"/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Latitude</Form.Label>
        <Form.Control type="number" onChange={handleChange} name="latitude" value={"" || hotel.latitude}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Longitude</Form.Label>
        <Form.Control type="number" onChange={handleChange} name="longitude" value={"" || hotel.longitude}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={handleImage} name="image" readOnly/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>  
  )
}