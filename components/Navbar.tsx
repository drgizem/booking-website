import { Col, Container, Navbar, Dropdown, Row, Form, Button, Card} from "react-bootstrap"
import Image from "next/image"
import booking from "../public/images/booking.png"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import styles from "../app/page.module.css"
import Link from "next/link";
import { useState,useEffect } from "react";
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { add } from 'date-fns'
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";


const checkout = add(new Date(), { days: 7, })

export const Navbarpart=()=>{
  const [info,setInfo]=useState(false)
  const [search,setSearch]=useState("")
  const [selectGuest,setSelectGuest]=useState(false)
  const [guest,setGuest]=useState<number>(2)
  const [guestChild,setGuestChild]=useState<number>(0)
  const [startDate,setStartDate]=useState(new Date())
  const [endDate,setEndDate]=useState(checkout)
  const [selectDate,setSelectDate]=useState(false)
  const selectRange={
    startDate:startDate,
    endDate:endDate,
    key:"selection"
  }
  const[width,setWidth]=useState<number>(window.innerWidth)

  useEffect(()=>{
    window.addEventListener("resize",()=>setWidth(window.innerWidth))
  }
  ,[width])
  const user=useAuthContext()
  const router = useRouter();
  const searchParams= useSearchParams();

  const startMonth=String(startDate).split(" ")[1]
  const startDay=String(startDate).split(" ")[2]
  const endMonth=String(endDate).split(" ")[1]
  const endDay=String(endDate).split(" ")[2]

  const handleSelect=(ranges:any)=>{
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }
  const onSearch=(e:any)=>{
    e.preventDefault()
    const current=new URLSearchParams(searchParams.toString())
    current.set("location",search)
    current.set("startDate",startDate.toISOString())
    current.set("endDate",endDate.toISOString())
    current.set("adults",guest.toString())
    current.set("children",guestChild.toString())
    const searching=current.toString()
    const query=searching ? `?${searching}` :""
    router.push(`/search${query}`)
  }
const onReservation=(e:any)=>{
  e.preventDefault()
  router.push(`/reservations?${user.user.uid}`)
}
const onSignout=()=>{
  signOut(auth)
  localStorage.setItem("user","")
}

  return (<>
    <Navbar>
      <Container>
      <Col>
      <Link href="/admin"><Image className="mt-2" src={booking} alt="" width={60} height={43} priority/></Link>
      </Col>
      <Col onClick={()=>{
        setInfo(!info)
        setSelectDate(false)
        setSelectGuest(false)}} className={styles.navbarsearch}>
        <Col className={styles.searchinfo}>
          <Col>Where</Col>
          <Col>Week</Col>
          <Col>Guests</Col>
          </Col>
        {width>600 && <Col xs={2} >
          <Button className={styles.searchicon}><SearchIcon/></Button></Col>}
      </Col>
      <Col className={styles.navbarsetting}>
      <Dropdown>
        <Dropdown.Toggle className={styles.navbaraccount}>
        <MenuIcon/>
        <AccountCircleIcon/>
        </Dropdown.Toggle>
        {user.user.uid !=="" ? <Dropdown.Menu>
        <Dropdown.Item href="/" onClick={onSignout}>Sign out</Dropdown.Item>
        <Dropdown.Item href="/" onClick={onReservation}>Reservations</Dropdown.Item></Dropdown.Menu> :<Dropdown.Menu>
        <Dropdown.Item href="/login">Login</Dropdown.Item>
        <Dropdown.Item href="/signup">Sign up</Dropdown.Item>
      </Dropdown.Menu>}
      </Dropdown>
      </Col>
      </Container>
    </Navbar>
    {info && width >700 && <Row >
      <Col className={styles.searchbar} xs={{span: 7, offset: 3 }} xl={{span: 6, offset: 4 }}>
    <Col className={styles.searchinfo}>
      <Form.Group>
        <Form.Label>Where</Form.Label>
        < Form.Control placeholder="Search destinations" type="text" style={{fontSize:"14px"}} value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </Form.Group>
      </Col>
      <Col onClick={()=>{
        setSelectDate(!selectDate)
        setSelectGuest(false)}}>
      <h6>Check in</h6>
      <p>{startMonth} {startDay}</p>
      </Col>
      <Col onClick={()=>{
        setSelectDate(!selectDate)
        setSelectGuest(false)}}>
      <h6>Check out</h6>
      <p>{endMonth} {endDay}</p>
      </Col>
      <Col className={styles.addguest} >
      <p onClick={()=>{
        setSelectDate(false)
        setSelectGuest(!selectGuest)}}>Add guests</p>
      <Col>
        <Button className={styles.searchbaricon} onClick={onSearch}><SearchIcon/>Search</Button></Col>
      </Col>
      </Col>
    </Row>}
    {info && width<700 && <Row >
      <Col className="d-flex">
    <Col className={styles.searchinfo}>
      <Form.Group>
        <Form.Label>Where</Form.Label>
        < Form.Control placeholder="Search destinations" type="text" style={{fontSize:"14px"}} value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </Form.Group>
      </Col>
      <Col onClick={()=>{
        setSelectDate(!selectDate)
        setSelectGuest(false)}}>
      <h6>Check in</h6>
      <p>{startMonth} {startDay}</p>
      </Col>
      <Col onClick={()=>{
        setSelectDate(!selectDate)
        setSelectGuest(false)}}>
      <h6>Check out</h6>
      <p>{endMonth} {endDay}</p>
      </Col>
      <Col className={styles.addguest} >
      <p onClick={()=>{
        setSelectDate(false)
        setSelectGuest(!selectGuest)}}>Add guests</p>
      <Col>
        <Button className={styles.searchbaricon} onClick={onSearch}><SearchIcon/>Search</Button></Col>
      </Col>
      </Col>
    </Row> }
    <hr/>
    {info && selectDate && <Col className={styles.navbardaterange} xs={{ span: 3, offset: 1 }} md={{span: 2, offset: 4 }}>
      <DateRange 
      ranges={[selectRange]}
      minDate={new Date()}
      rangeColors={["#ff385c"]}
      onChange={handleSelect}/>
      </Col>}
    {info && selectGuest && <Col xs={{ span: 5, offset: 6 }} md={{span: 4, offset: 5 }}>
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
    </Card>
    </Col>}
  </>)
}