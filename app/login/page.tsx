"use client"
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import signin from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from "../page.module.css"
import { Navpart } from "@/components/Navpart";


export default function Page(){
  const [user,setUser]=useState({
    email:"",
    password:""
  })
  const [validate,setValidate]=useState(false)
  const [error,setError]=useState(false)
  const router=useRouter()
  const handleChange=(e:any)=>{
    const {name,value}=e.target
    setUser((pre:any)=>{
      return {...pre,[name]:value}
    })
  }
  const handleSignup=async(e:any)=>{
    e.preventDefault()
    setValidate(true)
    const {result,error}=await signin(user.email,user.password)
    setUser({
      email:"",
      password:""
    })
    if(error){
      setError(true)
      return console.log(error)
    }
    return router.push("/")
  }
  return (<>
    <Navpart />
    <Container className={styles.signupform}>
      <h3>Login</h3>
      <Form validated={validate} onSubmit={handleSignup}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" onChange={handleChange} name="email" value={user.email || ""}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control required style={error ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} type="password" onChange={handleChange} name="password" value={user.password || ""}/>
          {error && <Form.Text className="mb-3 text-danger">Email or password is wrong, try again!</Form.Text>}
        </Form.Group>
        <Button className={styles.signupbtn} type="submit">Sign up</Button>
      </Form>
    </Container>
  </>)
}


