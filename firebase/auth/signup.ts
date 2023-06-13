import {auth} from "../firebase"
import { createUserWithEmailAndPassword} from "firebase/auth"

export default async function signup(email:string,password:string){
  let result=null,
   error=null
  try {
    result=await createUserWithEmailAndPassword(auth,email,password)
  } catch(e){
    error=e
  }
  return {result,error}
}