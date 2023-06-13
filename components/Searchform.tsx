import { Button, Form ,Card, Row} from "react-bootstrap"
import styles from "../app/page.module.css"
import { useState } from "react";
import { DateRange } from 'react-date-range'
import { useRouter, useSearchParams } from "next/navigation";
import { Hotel } from "./types";

type Props={
  nigths:number,
  location:string,
  startDate:string,
  endDate:string,
  adults:number,
  children:number,
  results:Hotel[]
}


export const SearchForm=({nigths,location,startDate,endDate,adults,children,results}:Props)=>{
  const router = useRouter();
  const searchParams= useSearchParams();
  const [guest,setGuest]=useState<number>(Number(adults))
  const [guestChild,setGuestChild]=useState<number>(Number(children))
  const [startDay,setStartDay]=useState(new Date(Number(startDate.split("-")[0]),Number(startDate.split("-")[1]),Number(startDate.split("-")[2])))
  const [endDay,setEndDay]=useState(new Date(Number(endDate.split("-")[0]),Number(endDate.split("-")[1]),Number(endDate.split("-")[2])))
  const [search,setSearch]=useState("")
  const [selectDate,setSelectDate]=useState(false)
  const [selectGuest,setSelectGuest]=useState(false)

  const startMonth=String(startDay).split(" ")[1]
  const start=String(startDay).split(" ")[2]
  const endMonth=String(endDay).split(" ")[1]
  const end=String(endDay).split(" ")[2]
  const handleSelect=(ranges:any)=>{
    setStartDay(ranges.selection.startDate);
    setEndDay(ranges.selection.endDate);
  }
  const selectRange={
    startDate:startDay,
    endDate:endDay,
    key:"selection"
  }
  const handleSearch=(e:any)=>{
    e.preventDefault()
    setSelectDate(false)
    setSelectGuest(false)
    const current=new URLSearchParams(searchParams.toString())
    current.set("location",search)
    current.set("startDate",startDay.toISOString())
    current.set("endDate",endDay.toISOString())
    current.set("adults",guest.toString())
    current.set("children",guestChild.toString())
    const searching=current.toString()
    const query=searching ? `?${searching}` :""
    router.push(`/search${query}`)
  }

  return (<>
    <Form className={styles.searchform}>
      <h3>Search</h3>
      <Form.Group>
        <Form.Label>Destination/property name:</Form.Label>
        <Form.Control type="text" placeholder={location} onChange={(e)=>setSearch(e.target.value)} value={search || location}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Check-in-date</Form.Label>
        <Form.Control value={`${startMonth} ${start}`} readOnly placeholder={startDate} onClick={()=>{
        setSelectDate(!selectDate)
        setSelectGuest(false)}}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Check-out-date</Form.Label>
        <Form.Control value={`${endMonth} ${end}`} readOnly placeholder={endDate} onClick={()=>{
        setSelectDate(!selectDate)
        setSelectGuest(false)}}/>
      </Form.Group>
      {selectDate && <DateRange className={styles.daterange} ranges={[selectRange]}
      minDate={new Date()}
      rangeColors={["#ff385c"]}
      onChange={handleSelect}/>}
      <Form.Text>{nigths}-night stay</Form.Text>
      <Form.Group>
        <Form.Control placeholder={`${adults} adults-${children} children`} readOnly value={`${adults} adults-${children} children`} onClick={()=>{
        setSelectDate(false)
        setSelectGuest(!selectGuest)}}/>
      </Form.Group>
      <Button className={styles.searchformbtn} onClick={handleSearch}>Search</Button>
      {selectGuest && 
    <Card>
    <Row>
    <Card.Body className={styles.personcard}>
    <Card.Title>Adults</Card.Title>
      <Form.Control className={styles.guest} type="number" onChange={(e)=>setGuest(Number(e.target.value))} value={String(guest)}/>
    </Card.Body></Row>
    <hr/>
    <Row>
    <Card.Body className={styles.personcard}>
    <Card.Title>Children</Card.Title>
      <Form.Control className={styles.guest} type="number" onChange={(e)=>setGuestChild(Number(e.target.value))} value={String(guestChild)}/>
    </Card.Body></Row>
  </Card>}
    </Form>
    </>)
}