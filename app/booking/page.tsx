"use client"
import { Navpart } from "@/components/Navpart";
import { Card, Container } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import { differenceInDays, format } from "date-fns";
import 'bootstrap/dist/css/bootstrap.min.css'
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from "react";

export default function Page(){
  const searchParams= useSearchParams();
  const current=new URLSearchParams(searchParams.toString())
  const hotel=current.get("hotel")?.toString()
  const startDate=current.get("startDate")?.substring(0,10)
  const endDate=current.get("endDate")?.substring(0,10)
  const adults=Number(current.get("adults"))
  const children=Number(current.get("children"))
  const price=Number(current.get("price"))
  const nigths=differenceInDays(new Date(current.get("endDate")!),new Date(current.get("startDate")!))
  const total=price*nigths
  let start=format(new Date(startDate!),"MMM dd")
  let end=format(new Date(endDate!),"MMM dd")

  useEffect(() => {
    //This code is executed in the browser
    console.log(window.innerWidth)
  }, [])
  
  return (<>
  <Navpart />
  <Container>
    <h4 className="mt-5 mb-3">Booking is successful<CheckIcon className="mx-2 text-success"/></h4>
    <h5>Details:</h5>
    <Card className="p-3 w-50">
      <Card.Title>
        {hotel}
      </Card.Title>
      <Card.Text className="text-decoration-underline">{start}-{end}</Card.Text>
      <Card.Text>{nigths} nigths</Card.Text>
      {children>0 ? <Card.Text>{adults} adults and {children} children </Card.Text>:<Card.Text>{adults} adults</Card.Text> }
      <Card.Text>Total Price=<strong>${total}</strong></Card.Text>
    </Card>
    </Container>
    </>)
}