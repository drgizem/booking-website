"use client"
import {auth} from "../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { User } from "@/components/types";
import { createContext } from "react";


export const AuthContext=createContext({user:{
email:"",
name:"",
uid:""}})

export const useAuthContext=()=>useContext(AuthContext)

export const AuthContextProvider=({children}:{ children: React.ReactNode })=>{
  const [user,setUser]=useState<User>(JSON.parse(localStorage.getItem("user") || "null") || {
    email:"",
    name:"",
    uid:""})
  const [loading,setLoading]=useState(true)

useEffect(()=>{
  const unsubscribe=onAuthStateChanged(auth,(user)=>{
    if(user){
      setUser({
        email:user.email!,
        name:user.displayName!,
        uid:user.uid})
    } else {
      setUser({
      email:"",
      name:"",
      uid:""})
    }
    setLoading(false)
  })
  return ()=>unsubscribe()
},[])
useEffect(()=>{
  localStorage.setItem("user", JSON.stringify(user))
},[user])

  return (
    <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
  )

}