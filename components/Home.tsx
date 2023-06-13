import Image from "next/image"
import view from "../public/images/view.jpeg"
import styles from "../app/page.module.css"
import { Row,Col, Button, Container } from "react-bootstrap"
import {list} from "../list"
import home from "../public/images/home.jpeg"
import outdoor from "../public/images/ourdoor.jpeg"
import unique from "../public/images/unique2.jpeg"
import { Footer } from "./Footer"
import { useRouter, useSearchParams } from "next/navigation";
import { add } from 'date-fns'

const checkout = add(new Date(), { days: 7, })
export const Home=()=>{
  const router = useRouter();
  const searchParams= useSearchParams();

  const handleSearch=(item:any)=>{
    const current=new URLSearchParams(searchParams.toString())
    current.set("location",item.place)
    current.set("startDate",new Date().toISOString())
    current.set("endDate",checkout.toISOString())
    current.set("adults","2")
    current.set("children","0")
    const searching=current.toString()
    const query=searching ? `?${searching}` :""
    router.push(`/search${query}`)
  }

  return (<>
    <h2 className={styles.viewtitle}>Explore Unique Places, Best Prices</h2>
    <Image className={styles.view} src={view} alt="view"/>
    <Row className={styles.trend}>
      <h4 className="mt-4 mb-3">Trending destinations</h4>
      {list.map((item:any)=>{
        return (<>
        <Col className={styles.placeicon} onClick={()=>handleSearch(item)} key={item.image}>
          <Image src={item.image} alt="" width={110} height={70}/>
          <p>{item.place}</p>
          </Col></>)
      })}
    </Row>
    <Row className={styles.discover}>
      <Col className={styles.homecol}>
      <Image src={home} alt="home" className={styles.home} />
      <p className={styles.hometitle}>Find <span className={styles.homesubtitle}></span><br/> for your next trip</p><br/>
      <Button variant="outline-dark" className={styles.homebtn}>Discover homes</Button>
      </Col>
      <Col className={styles.anywhererow}>
        <Col>
        <h3>Live anywhere</h3>
        <Image width={200} height={200} className={styles.anywhere} src={outdoor} alt="anywhere"/>
        <p>Outdoors getaways</p>
        </Col>
        <Col>
        <Image width={200} height={200} className={styles.anywhere} src={unique} alt="anywhere"/>
        <p>Unique stays</p>
        </Col>
      </Col>
    </Row>
    <Footer/>
  </>
  )
}