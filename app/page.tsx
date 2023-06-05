"use client"
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './page.module.css'
import { Navbarpart } from '@/components/Navbar'
import { Footer } from '@/components/Footer'


export default function Home() {
  return (<>
    <Navbarpart/>
    <Footer/>
    </>)
}
