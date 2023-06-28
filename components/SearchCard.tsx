import { Button, Card,Row,Col } from "react-bootstrap"
import styles from "../app/page.module.css"
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { Hotel } from "./types";

type Props={
  image:string,
  title:string,
  price:number,
  city:string,
  distance:string,
  nigths:number,
  adults:number,
  children:number,
  handleBook(item:Hotel):void,
  item:Hotel
}
export const SearchCard=({image,title,price,city,distance,nigths,adults,children,handleBook,item}:Props)=>{

  return (
    <Card className="mb-2 p-4">
      <Row>
        <Col>
        <Card.Img src={image} alt="" style={{height:"300px"}}/></Col>
        <Col className={styles.cardinfo}>
        <Card.Title>{title}</Card.Title>
      <Card.Text>{city}</Card.Text>
      <Card.Text><DirectionsRunIcon/>{distance} from city center</Card.Text></Col>
        <Col className={styles.cardpricepart}>
        {children !==0 ? <Card.Text className={styles.cardnigths}>{nigths} nights, {adults} adults-{children} children</Card.Text> :
        <Card.Text className={styles.cardnigths}>{nigths} nights, {adults} adults</Card.Text>}
        <Card.Text className={styles.cardprice}><strong>${price}</strong>/night</Card.Text>
        <Card.Text className={styles.cardtotalprice}>Total: ${price*nigths}</Card.Text>
      <Button className={styles.cardbtn} onClick={()=>handleBook(item)}>Book this hotel</Button></Col>
      </Row>
    </Card>
  )
}