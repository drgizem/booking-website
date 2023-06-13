import {Navbar,Container,Col,Dropdown,Button, Form} from "react-bootstrap"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/booking.png"
import styles from "../app/page.module.css"
import { useAuthContext } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";


export const Navpart=()=>{
  const user=useAuthContext()
  const router=useRouter()
  const onSignout=()=>{
    signOut(auth)
    localStorage.setItem("user","")
  }
  const onReservation=(e:any)=>{
    e.preventDefault()
    router.push(`/reservations?${user.user.uid}`)
  }
  return (
    <Navbar>
      <Container>
      <Col className={styles.navbarlogo}>
      <Link href="/"><Image src={logo} alt="" width={60} height={43} priority/></Link></Col>
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
      </Dropdown.Menu>}</Dropdown>
      </Col>
      </Container>
    </Navbar>
  )
}