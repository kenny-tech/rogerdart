import { signinStyles} from "@src/styles";
import { FLATLOGO} from "@src/media/png";
import { sitelinks } from "@src/component";
import { useRouter } from "next/router";
import Image from "next/image";
import * as React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AUTH_USER_CONSUMER } from "@src/services/routes";


const PageInfo = {
    title:'Rogerdart'
}

const Navigationbar = () => {
    const auth = false;
    const [bgWhite, setBgWhite] = React.useState(false);
    React.useEffect(():any => {
        const handleScroll = ():any => { 
          if (window.pageYOffset > 1) {
            setBgWhite(true)
          } else {
            setBgWhite(false)
          }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      }, [])
    return (
        <Navbar bg={`${bgWhite?'white':'default'} bg-white-mobile`} fixed={`top`} expand={`lg`}>
            <Container>
            <Navbar.Brand href="/">
                <Image src={FLATLOGO} alt="Rogerdart Logo" className={`fluid`} width={150} height={40}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {!auth ?
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto nav-center">
                {sitelinks.map((links) =>
                    <Nav.Link key={links.id} href={links.url}>
                        <strong>{links.name}</strong>
                    </Nav.Link>)}
                </Nav>
                <Nav className={`d-flex justify-content-end`}>
                    <Nav.Link href={`/identity/signin`}>
                        <strong>Sign In</strong>
                    </Nav.Link>
                    <Nav.Link href={`/identity/get-started`} className={`nav-g-started-btn nav-g-started-btn-respond d-inline-flex text-white align-items-center`}>
                        <strong>Get Started</strong>
                        <svg width="22" height="24" className={`mx-2`} viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15.0723C2.44772 15.0723 2 14.6246 2 14.0723C2 13.52 2.44772 13.0723 3 13.0723V15.0723ZM21 13.0723C21.5523 13.0723 22 13.52 22 14.0723C22 14.6246 21.5523 15.0723 21 15.0723L21 13.0723ZM3 13.0723L21 13.0723L21 15.0723L3 15.0723V13.0723Z" fill="white"/>
                            <path d="M16.7404 20.2526C16.3692 20.6615 15.7367 20.692 15.3278 20.3208C14.9189 19.9496 14.8884 19.3172 15.2596 18.9083L16.7404 20.2526ZM21 14.0729L21.7404 13.4008C22.0865 13.782 22.0865 14.3638 21.7404 14.7451L21 14.0729ZM15.2596 9.2376C14.8884 8.82869 14.9189 8.19626 15.3278 7.82503C15.7367 7.4538 16.3692 7.48435 16.7404 7.89326L15.2596 9.2376ZM15.2596 18.9083L20.2596 13.4008L21.7404 14.7451L16.7404 20.2526L15.2596 18.9083ZM20.2596 14.7451L15.2596 9.2376L16.7404 7.89326L21.7404 13.4008L20.2596 14.7451Z" fill="white"/>
                        </svg>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>:
               <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto nav-center">
               {sitelinks.map((links) =>
                   <Nav.Link key={links.id} href={links.url}>
                       <strong>{links.name}</strong>
                   </Nav.Link>)}
               </Nav>
               <Nav className={`d-flex justify-content-end`}>
                   <Nav.Link href={`${AUTH_USER_CONSUMER}`} className={`g-started-btn d-inline-flex text-white align-items-center`}>
                       <strong>Find restaurants</strong>
                       <svg width="22" height="24" className={`mx-2`} viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M3 15.0723C2.44772 15.0723 2 14.6246 2 14.0723C2 13.52 2.44772 13.0723 3 13.0723V15.0723ZM21 13.0723C21.5523 13.0723 22 13.52 22 14.0723C22 14.6246 21.5523 15.0723 21 15.0723L21 13.0723ZM3 13.0723L21 13.0723L21 15.0723L3 15.0723V13.0723Z" fill="white"/>
                           <path d="M16.7404 20.2526C16.3692 20.6615 15.7367 20.692 15.3278 20.3208C14.9189 19.9496 14.8884 19.3172 15.2596 18.9083L16.7404 20.2526ZM21 14.0729L21.7404 13.4008C22.0865 13.782 22.0865 14.3638 21.7404 14.7451L21 14.0729ZM15.2596 9.2376C14.8884 8.82869 14.9189 8.19626 15.3278 7.82503C15.7367 7.4538 16.3692 7.48435 16.7404 7.89326L15.2596 9.2376ZM15.2596 18.9083L20.2596 13.4008L21.7404 14.7451L16.7404 20.2526L15.2596 18.9083ZM20.2596 14.7451L15.2596 9.2376L16.7404 7.89326L21.7404 13.4008L20.2596 14.7451Z" fill="white"/>
                       </svg>
                   </Nav.Link>
               </Nav>
           </Navbar.Collapse>}
            </Container>
        </Navbar>
      )
}

const AuthNavbar = () => {
    const router = useRouter();
    return (
        <a href='#' onClick={()=>router.replace("/")} className={signinStyles.navbar}>
            <div className={signinStyles.landscapeLogo}></div>
        </a>
    )
}


export { PageInfo, Navigationbar, AuthNavbar };