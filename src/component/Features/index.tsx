import Image from "next/image";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";
import { PAGE_ROUTE_SIGN_IN } from "@src/services/routes";

const Features = () =>{
    return(
      <div>
        <h2 className={`text-center text-capitalize feature-intro-text`}>Let&apos;s do it together</h2>
        <p className={`decription text-center`}>
          The nearest restaurant is just at your finger tip. Get started with Rogerdart in 3 easy steps.
        </p>
        <div className={`space-t-8 d-flex center-img justify-content-center`}>
          <Image src={`/uploads/person-eating.svg`} alt={`person eating pizza`} width={607} height={527}/>
        </div>
          <Container>
            <Row className={`text-center feature-list`}>
              <Col className={`desc-width`}>
                <Image src={`/uploads/device.svg`} width={58} height={58} alt={`device icon`}/>
                <p className={`sub-feature-heading`}>Register</p>
                <p className={`feature-description`}>Download our mobile app from playstore/appstore create your account.</p>
              </Col>
              <Col className={`desc-width`}>
                <Image src={`/uploads/shopping-bag.svg`} width={58} height={58} alt={`shopping bag icon`}/>
                <p className={`sub-feature-heading`}>Order</p>
                <p className={`feature-description`}>Place an order from your account or login on the web to place your order.</p>
              </Col>
              <Col className={`desc-width`}>
                <Image src={`/uploads/plate.svg`} width={65} height={58} alt={`meal icon`}/>
                <p className={`sub-feature-heading`}>Enjoy your meal</p>
                <p className={`feature-description`}>Our deleivery agent will contact you at your doorstep.</p>
              </Col>
            </Row>
            <div className={`white-space`}></div>
            <Row className={`d-inline-flex align-items-center`}>
              <Col className={`col-p`}>
                <p className={`sub-sub-feature-heading`}>Become an Agent</p>
                <p className={`feature-sub-description`}>
                  Are you a delivery agent or can work as delivery agent, make quick sustinable cash on the go!
                  Download our mobile app to get started.
                </p>
                <button onClick={()=>alert('App is launching soon!')} className={`g-started-btn-center nav-g-started-btn align-left d-inline-flex text-white align-items-center`}>
                  <strong>Download App</strong>
                  <svg width="22" height="24" className={`mx-2`} viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 15.0723C2.44772 15.0723 2 14.6246 2 14.0723C2 13.52 2.44772 13.0723 3 13.0723V15.0723ZM21 13.0723C21.5523 13.0723 22 13.52 22 14.0723C22 14.6246 21.5523 15.0723 21 15.0723L21 13.0723ZM3 13.0723L21 13.0723L21 15.0723L3 15.0723V13.0723Z" fill="white"/>
                      <path d="M16.7404 20.2526C16.3692 20.6615 15.7367 20.692 15.3278 20.3208C14.9189 19.9496 14.8884 19.3172 15.2596 18.9083L16.7404 20.2526ZM21 14.0729L21.7404 13.4008C22.0865 13.782 22.0865 14.3638 21.7404 14.7451L21 14.0729ZM15.2596 9.2376C14.8884 8.82869 14.9189 8.19626 15.3278 7.82503C15.7367 7.4538 16.3692 7.48435 16.7404 7.89326L15.2596 9.2376ZM15.2596 18.9083L20.2596 13.4008L21.7404 14.7451L16.7404 20.2526L15.2596 18.9083ZM20.2596 14.7451L15.2596 9.2376L16.7404 7.89326L21.7404 13.4008L20.2596 14.7451Z" fill="white"/>
                  </svg>
                </button>
              </Col>
              <Col>
                <Image src={`/uploads/Card.png`} width={650} height={576} alt={`delivery illustration`}/>
              </Col>
            </Row>
            {/* <div className={`white-space`}></div> */}
            <Row className={`d-inline-flex align-items-center`}>
              <Col>
                <Image src={`/uploads/open-store.png`} width={650} height={576} alt={`open store illustration`}/>
              </Col>
              <Col className={`col-p`}>
                <p className={`sub-sub-feature-heading`}>Become a Partner</p>
                <p className={`col-p feature-sub-description`}>
                  Take your business to the next level and reach out to new customers by patnering with us.
                </p>
                <button onClick={()=>window.location.href=`${PAGE_ROUTE_SIGN_IN}`} className={`g-started-btn-center nav-g-started-btn align-right-left d-inline-flex text-white align-items-center`}>
                  <strong>Get Started</strong>
                  <svg width="22" height="24" className={`mx-2`} viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 15.0723C2.44772 15.0723 2 14.6246 2 14.0723C2 13.52 2.44772 13.0723 3 13.0723V15.0723ZM21 13.0723C21.5523 13.0723 22 13.52 22 14.0723C22 14.6246 21.5523 15.0723 21 15.0723L21 13.0723ZM3 13.0723L21 13.0723L21 15.0723L3 15.0723V13.0723Z" fill="white"/>
                      <path d="M16.7404 20.2526C16.3692 20.6615 15.7367 20.692 15.3278 20.3208C14.9189 19.9496 14.8884 19.3172 15.2596 18.9083L16.7404 20.2526ZM21 14.0729L21.7404 13.4008C22.0865 13.782 22.0865 14.3638 21.7404 14.7451L21 14.0729ZM15.2596 9.2376C14.8884 8.82869 14.9189 8.19626 15.3278 7.82503C15.7367 7.4538 16.3692 7.48435 16.7404 7.89326L15.2596 9.2376ZM15.2596 18.9083L20.2596 13.4008L21.7404 14.7451L16.7404 20.2526L15.2596 18.9083ZM20.2596 14.7451L15.2596 9.2376L16.7404 7.89326L21.7404 13.4008L20.2596 14.7451Z" fill="white"/>
                  </svg>
                </button>
              </Col>
            </Row>
          </Container>
          <div className={`gradient-background`}>
            <h2 className={`text-center feature-intro-text`}>Download our Mobile App</h2>
            <p className={`d-decription feature-description text-center`}>
              Easily download and monitor your orders on our mobile app at your easy.
              We give you the best experience all through your use here
            </p>
            <div className={`center-image`} style={{marginTop:"40px"}}>
              <Image src={`/uploads/store-buttons.png`} width={455} height={68} alt={`appstore playstore buttons`}/>
            </div>
            <div className={`center-image-big`}>
              <Image src={`/uploads/3-phone-placeholder.png`} width={650} height={1020} alt={`appstore playstore buttons`}/>
            </div>
            <div className={`find-restaurant`}>
              <Container>
                <Row>
                  <Col>
                  <p className={`find-restaurant-title`}>Find a restaurant in your city</p>
                  <p className={`find-restaurant-desc`}>
                    Get to see the list of cities you can find Rogerdart, and the restaurants we have in them.
                  </p>
                  <div className={`find-input-group`}>
                    <input type={`search`} placeholder={`type in your city`}/>
                    <button>Search</button>
                  </div>
                  </Col>
                  <Col>
                    <Image src={`/uploads/find-result.png`} width={549} height={385} alt={`search result`}/>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
      </div>
    )
}

export { Features };
