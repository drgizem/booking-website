"use client"
import { Navpart } from "@/components/Navpart"
import { useAuthContext } from "@/context/AuthContext"
import { auth, db } from "@/firebase/firebase"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Card, Container, Row } from "react-bootstrap"
import { format } from "date-fns";
import styles from "../page.module.css"

export default function Page(){
const [book,setBook]=useState([])
const user=useAuthContext()


  useEffect(()=>{
      const userRef=doc(db,"users",`${auth.currentUser!.uid}`)
      const unSubscribe=onSnapshot(userRef,(doc)=>{
        const dbList=doc.data()
        const list=dbList!.booked
        setBook(list)
      })
      return ()=>unSubscribe()
  },[user.user.uid])
  return (<>
    <Navpart />
    <Container>
      <Row className="mt-5">
      {book.map((item:any)=>{
        return <Card className={styles.reservation} key={item.hotel}>
        <Card.Title>
          {item.hotel}
        </Card.Title>
        <Card.Text className="text-decoration-underline">{format(new Date(item.startDate!),"MMM dd")}-{format(new Date(item.endDate!),"MMM dd")}</Card.Text>
        {item.children>0 ? <Card.Text>{item.adults} adults and {item.children} children </Card.Text>:<Card.Text>{item.adults} adults</Card.Text> }
        <Card.Text>Total Price=<strong>${item.price}</strong></Card.Text>
      </Card>
      })}
      </Row>
    </Container>
    </>)
}