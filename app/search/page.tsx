"use client"
import { Navpart } from "@/components/Navpart";
import { Mappart } from "@/components/Map";
import { SearchCard } from "@/components/SearchCard";
import { SearchForm } from "@/components/Searchform";
import { Booked, Hotel } from "@/components/types";
import { differenceInDays } from "date-fns";
import { useSearchParams,useRouter } from "next/navigation";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { collection,doc,getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import styles from "../page.module.css"
import { useAuthContext } from "@/context/AuthContext";



export default function Search() {
  const router=useRouter()
  const searchParams= useSearchParams();
  const user=useAuthContext()
  const current=new URLSearchParams(searchParams.toString())
  const location=current.get("location")?.toString()
  const startDate=current.get("startDate")?.substring(0,10)
  const endDate=current.get("endDate")?.substring(0,10)
  const adults=Number(current.get("adults"))
  const children=Number(current.get("children"))
  const [results,setResults]=useState<Hotel[]>([])
  
 const nigths=differenceInDays(new Date(current.get("endDate")!),new Date(current.get("startDate")!))
 const[width,setWidth]=useState<number>(window.innerWidth)

 useEffect(()=>{
   window.addEventListener("resize",()=>setWidth(window.innerWidth))
 }
 ,[width])
  useEffect(()=>{
    const uploadPage=async()=>{
      let cache:Hotel[]=[]
      const querySnapshot = await getDocs(collection(db, "hotels"));
      querySnapshot.forEach((doc) => {
       cache.push(doc.data() as Hotel)
      })
      const results=cache.filter((item:any)=>item.city.toLowerCase().replace(/ /g, "")===location!.toLowerCase().replace(/ /g, ""))
      setResults(results)
    }
    uploadPage() 
  },[location])


const handleBook=async(hotel:Hotel)=>{
  const booked={
    hotel:hotel.name,
    startDate:startDate!,
    endDate:endDate!,
    adults:adults,
    children:children,
    price:hotel.price*nigths
  }
  const current=new URLSearchParams(searchParams.toString())
  current.set("hotel",hotel.name)
  current.set("startDate",startDate!)
  current.set("endDate",endDate!)
  current.set("adults",adults.toString())
  current.set("children",children.toString())
  current.set("price",hotel.price.toString())
  const searching=current.toString()
  const query=searching ? `?${searching}` :""
  if(user.user.uid !==""){
    const userRef=doc(db,"users",`${user.user.uid}`)
    const listRef=await getDoc(userRef)
    const dbList=listRef.data()
    const newBooked=[...dbList!.booked,booked]
    setDoc(userRef,{...dbList,booked:newBooked})
    router.push(`/booking${query}`) 
  }else {
    router.push("/signup") 
  }
}
    return (<>
      <Navpart />
      <hr/>
      {width >700 ? <Container>
        <Row className="mb-3">
        {children===0 ? <h3>{nigths} nights in {location} - {adults} adults</h3> : <h3>{nigths} nights in {location} - {adults} adults and {children} children</h3>}
        </Row>
        <Row>
          <Col xs={4} className={styles.searchformpart}>
            <Col className={styles.searchformcol}>
            <SearchForm 
          nigths={nigths}
          startDate={startDate!}
          endDate={endDate!}
          adults={adults}
          children={children}
          location={location!}
          results={results}/></Col>
          <Col><Mappart results={results} /></Col>
          </Col>
          <Col className="mt-0">
          {results.map((item:Hotel)=>{
          return <SearchCard 
          key={item.id}
          title={item.name}
          image={item.image}
          price={item.price}
          nigths={nigths}
          city={item.city}
          distance={item.distance}
          adults={adults}
          children={children}
          handleBook={handleBook}
          item={item}
          />
        })
        }
        </Col>
        </Row>
      </Container> :
      <Container>
      <Row className="mb-3">
      {children===0 ? <h3>{nigths} nights in {location} - {adults} adults</h3> : <h3>{nigths} nights in {location} - {adults} adults and {children} children</h3>}
      </Row>
      <Row className={styles.searchrow}>
          <SearchForm 
        nigths={nigths}
        startDate={startDate!}
        endDate={endDate!}
        adults={adults}
        children={children}
        location={location!}
        results={results}/></Row>
        <Row className="mt-5">
        {results.map((item:Hotel)=>{
        return <SearchCard 
        key={item.id}
        title={item.name}
        image={item.image}
        price={item.price}
        nigths={nigths}
        city={item.city}
        distance={item.distance}
        adults={adults}
        children={children}
        handleBook={handleBook}
        item={item}
        />
      })
      }
      </Row>
    </Container> }
      </> )
  }
  
  

