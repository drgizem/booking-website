import { collection,onSnapshot,getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(){
    const results:any[]=[]
  
    const querySnapshot = await getDocs(collection(db, "hotels"));
      querySnapshot.forEach((doc) => {
        const result=doc.data()
        results.push(result)
      })
      console.log(NextResponse.json(results))
     return 
  
}