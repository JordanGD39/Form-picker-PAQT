import React, { PropsWithChildren } from 'react'
import Background from '../Components/Background'
import Footer from '../Components/Footer'
import Header from '../Components/Header'

export default function PageLayout(props: PropsWithChildren) {
  return (
    <Background>
        <Header />
        <div className='p-4 max-w-[1500px] mx-auto mb-[112px]'>
            {props.children}
        </div>
        <Footer />
    </Background>
  )
}
