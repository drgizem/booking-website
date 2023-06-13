import {auth} from "../firebase"
import { signInWithEmailAndPassword} from "firebase/auth"

export default async function signin(email:string,password:string){
  let result=null
  let error=null
  try{
    result=await signInWithEmailAndPassword(auth,email,password)
  } catch (e){
    error=e
  }
  return {result,error}

}