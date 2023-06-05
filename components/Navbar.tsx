import { Col, Container, Navbar, Dropdown, Row, Form, Button, Card} from "react-bootstrap"
import Image from "next/image"
import logo from "../public/airbnb.png"
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import styles from "../app/page.module.css"
import Link from "next/link";
import { useState } from "react";
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { add } from 'date-fns'
import { SearchInfo } from "./types";


const checkout = add(new Date(), { days: 7, })

export const Navbarpart=()=>{
  const [info,setInfo]=useState(false)
  const [search,setSearch]=useState("")
  const [selectGuest,setSelectGuest]=useState(false)
  const [guest,setGuest]=useState<number>(0)
  const [guestChild,setGuestChild]=useState<number>(0)
  const [startDate,setStartDate]=useState(new Date())
  const [endDate,setEndDate]=useState(checkout)
  const [selectDate,setSelectDate]=useState(false)
  const selectRange={
    startDate:startDate,
    endDate:endDate,
    key:"selection"
  }
  const [searchInfo,setSearchInfo]=useState<SearchInfo>({
    location:search,
    startDate:startDate,
    endDate:endDate,
    adult:guest,
    child:guestChild
  })
  const startMonth=String(startDate).split(" ")[1]
  const startDay=String(startDate).split(" ")[2]
  const endMonth=String(endDate).split(" ")[1]
  const endDay=String(endDate).split(" ")[2]

  function handleSelect(ranges:any) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }
 
  return (<>
    <Navbar>
      <Container>
      <Col className={styles.navbarlogo}>
      <Link href="/"><Image src={logo} alt="" width={100} height={35} priority/></Link>
      </Col>
      <Col className={styles.navbarsearch} onClick={()=>setInfo(!info)}>
        <Col className={styles.searchinfo}>
          <Col>Anywhere</Col>
          <Col>Anyweek</Col>
          <Col>Add guests</Col>
        </Col>
        <Col xs={2} >
          <Button className={styles.searchicon}><SearchIcon/></Button></Col>
      </Col>
      <Col className={styles.navbarsetting}>
      <Col className={styles.settinghome}>Airbnb your home</Col>
      <LanguageIcon className={styles.language}/>
      <Dropdown>
        <Dropdown.Toggle className={styles.navbaraccount}>
        <MenuIcon/>
        <AccountCircleIcon/>
        </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/login">Login</Dropdown.Item>
        <Dropdown.Item href="/signup">Sign up</Dropdown.Item>
      </Dropdown.Menu></Dropdown>
      </Col>
      </Container>
    </Navbar>
    {info && <Row  >
      <Col className={styles.searchbar} xs={{span: 6, offset: 3 }} >
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
        <Button className={styles.searchbaricon}><SearchIcon/>Search</Button></Col>
      </Col>
      </Col>
    </Row>}
    {info && selectDate && <Col xs={{ span: 3, offset: 5 }} md={{span: 2, offset: 4 }}>
      <DateRange 
      ranges={[selectRange]}
      minDate={new Date()}
      rangeColors={["#ff385c"]}
      onChange={handleSelect}/>
      </Col>}
    {info && selectGuest && <Col xs={{ span: 3, offset: 7 }} md={{span: 2, offset: 6 }}>
    <Card>
      <Row className={styles.guestrow}>
      <Card.Title>Adults</Card.Title>
      <Card.Body>
        <Form.Control className={styles.guest} type="number" onChange={(e)=>setGuest(Number(e.target.value))} value={String(guest)}/>
      </Card.Body></Row>
      <hr/>
      <Row className={styles.guestrow}><Card.Title>Children</Card.Title>
      <Card.Body>
        <Form.Control className={styles.guest} type="number" onChange={(e)=>setGuestChild(Number(e.target.value))} value={String(guestChild)}/>
      </Card.Body></Row>
    </Card>
    </Col>}
    <hr/>
  </>)
}