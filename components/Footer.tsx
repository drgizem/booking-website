import { Col, Row, Toast } from "react-bootstrap"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from '../app/page.module.css'
import { useState } from "react";



export const Footer=()=>{
  const [show,setShow]=useState(false)

  return (<>
  {show ? <Toast className={styles.footerdetail} onClose={()=>setShow(false)}>
    <Toast.Header>
      <Col className={styles.footertitle}>Support</Col>
      <Col className={styles.footertitle}>Community</Col>
      <Col className={styles.footertitle}>Hosting</Col>
      <Col className={styles.footertitle}>Airbnb</Col>
    </Toast.Header>
    <Toast.Body>
      <Row>
      <Col>
      <p className={styles.footerinfo}>Help Center</p>
      <p className={styles.footerinfo}>AirCover</p>
      <p className={styles.footerinfo}>Supporting people with disabilities</p>
      <p className={styles.footerinfo}>Cancellation options</p>
      <p className={styles.footerinfo}>Our COVID-19 Response</p>
      </Col>
      <Col>
      <p className={styles.footerinfo}>Airbnb.org:disaster relief housing</p>
      <p className={styles.footerinfo}>Combating discrimination</p></Col>
      <Col>
      <p className={styles.footerinfo}>Airbnb your home</p>
      <p className={styles.footerinfo}>AirCover for Hosts</p>
      <p className={styles.footerinfo}>Explore hosting resources</p>
      <p className={styles.footerinfo}>Visit our community forum</p>
      <p className={styles.footerinfo}>How to host responsibly</p>
      <p className={styles.footerinfo}>Airbnb-friendly apartments</p>
      </Col>
      <Col>
      <p className={styles.footerinfo}>Newsroom</p>
      <p className={styles.footerinfo}>Learn about new features</p>
      <p className={styles.footerinfo}>Learn from our founders</p>
      <p className={styles.footerinfo}>Careers</p>
      <p className={styles.footerinfo}>Investors</p>
      <p className={styles.footerinfo}>Gift cards</p>
      </Col>
      </Row>
    </Toast.Body>
    </Toast>:<footer className={styles.footer} onClick={()=>setShow(true)} >
      <Col className={styles.footercol}>© 2023 Airbnb, Inc.</Col>
      <Col className={styles.footercol}>Terms</Col>
      <Col className={styles.footercol}>Sitemap</Col>
      <Col className={styles.footercol}>Privacy</Col>
      <Col className={styles.footercol}>Your Privacy Choices</Col>
      <Col className={styles.footercol}>Support & resources <KeyboardArrowUpIcon/></Col>
    </footer>}
    </>)
}