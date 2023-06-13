export type SearchInfo={
  location:string ,
  startDate:string ,
  endDate:string,
  numberofguest:number 
}

export type Hotel={
    name:string,
    city:string,
    distance:string,
    latitude:number,
    longitude:number,
    price:number,
    image:string,
    id:string 
}
export type User={
  email:string,
  name:string,
  uid:string
}
export type Booked={
  hotel:string,
  startDate:string,
  endDate:string,
  adults:number,
  children:number
}