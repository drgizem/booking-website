"use client"
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './page.module.css'
import { Navbarpart } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Home } from '@/components/Home';
import { SSRProvider } from 'react-bootstrap';


export default function Page() {
  return (<>
  <SSRProvider>
    <Navbarpart/>
    <Home />
    </SSRProvider>
    </>)
}
