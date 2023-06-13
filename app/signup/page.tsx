"use client"
import { useState,useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import signup from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from "../page.module.css"
import { Navpart } from "@/components/Navpart";
import { useAuthContext } from "@/context/AuthContext";
import { doc ,setDoc } from "firebase/firestore";
import { db ,auth} from "@/firebase/firebase";


export default function Page(){
  const [user,setUser]=useState({
    email:"",
    password:""
  })
  const userName=useAuthContext()
  const [validate,setValidate]=useState(false)
  const [error,setError]=useState(false)
  const router=useRouter()

  useEffect(() => {
    //This code is executed in the browser
    console.log(window.innerWidth)
  }, [])
  const handleChange=(e:any)=>{
    const {name,value}=e.target
    setUser((pre:any)=>{
      return {...pre,[name]:value}
    })
  }
  const handleSignup=async(e:any)=>{
    e.preventDefault()
    setValidate(true)
    const {result,error}=await signup(user.email,user.password)
    setUser({
      email:"",
      password:""
    })
    if(error){
      setError(true)
      return console.log(error)
    }
    await setDoc(doc(db,"users",`${auth.currentUser!.uid}`),{
      booked:[]
    })
    return router.push("/")
  }
  return (<>
  <Navpart />
    <Container className={styles.signupform}>
      <h3>Sign up</h3>
      <Form validated={validate} onSubmit={handleSignup}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" onChange={handleChange} name="email" value={user.email || ""}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control required style={error ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} type="password" onChange={handleChange} name="password" value={user.password || ""}/>
          {error && <Form.Text className="mb-3 text-danger">Password should be at least 6 characters!</Form.Text>}
        </Form.Group>
        <Button className={styles.signupbtn} type="submit">Sign up</Button>
      </Form>
    </Container>
    </>)
}



