import * as React from "react"
import { siteStyles } from "@src/styles"
import axios from "axios";
import { PUBLIC_BASE_URL, SEARCH_PUBLIC_URI } from "@src/services/routes";
import { style } from "@src/styles/searchResult";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";
import Image from "next/image";
import { Nav } from 'react-bootstrap/Nav';


const Banner = () => {
    const [searchResult, setSearchResult] = React.useState();

    const handleChange = (value) => {
        if(value.length !== 0){
            axios.get(`${PUBLIC_BASE_URL}${SEARCH_PUBLIC_URI}?address=${value}`)
            .then( async (response) => await setSearchResult(response.data.data))
            .catch( async (error) => setSearchResult(""))
        }else{
            setSearchResult("")
        }
    }
    
return (
    <div className={`hero_banner`}>
        <Container>
            <Row className={`d-flex flex-wrap flex-respond align-items-center`}>
            <Col className={`d-flex flex-column justify-content-lg-end justify-content-xl-center justify-content-sm-center justify-content-md-center`}>
                    <h2 className={`banner-title-text`}>
                        Fastest
                        Delivery &
                        Easy Pickup
                    </h2>
                    <p className={`banner-description-text`}>
                        Restaurant delivery and more to your doorstep.
                    </p>
                    <button onClick={()=>window.location.replace(`/identity/get-started`)} className={`g-started-btn d-inline-flex text-white align-items-center`}>
                        <strong>Get Started</strong>
                        <svg width="22" height="24" className={`mx-2`} viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15.0723C2.44772 15.0723 2 14.6246 2 14.0723C2 13.52 2.44772 13.0723 3 13.0723V15.0723ZM21 13.0723C21.5523 13.0723 22 13.52 22 14.0723C22 14.6246 21.5523 15.0723 21 15.0723L21 13.0723ZM3 13.0723L21 13.0723L21 15.0723L3 15.0723V13.0723Z" fill="white"/>
                            <path d="M16.7404 20.2526C16.3692 20.6615 15.7367 20.692 15.3278 20.3208C14.9189 19.9496 14.8884 19.3172 15.2596 18.9083L16.7404 20.2526ZM21 14.0729L21.7404 13.4008C22.0865 13.782 22.0865 14.3638 21.7404 14.7451L21 14.0729ZM15.2596 9.2376C14.8884 8.82869 14.9189 8.19626 15.3278 7.82503C15.7367 7.4538 16.3692 7.48435 16.7404 7.89326L15.2596 9.2376ZM15.2596 18.9083L20.2596 13.4008L21.7404 14.7451L16.7404 20.2526L15.2596 18.9083ZM20.2596 14.7451L15.2596 9.2376L16.7404 7.89326L21.7404 13.4008L20.2596 14.7451Z" fill="white"/>
                        </svg>
                    </button>
                </Col>
                <Col className={`d-flex justify-content-lg-end justify-content-xl-end img-respond`}>
                    <Image src={`/uploads/center-image.png`} alt={`good food and timely delivery`} width={420} height={397}/>
                </Col>
            </Row>
        </Container>
    </div>
    )
}

export {Banner};