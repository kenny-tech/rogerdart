import Nav from 'react-bootstrap/Nav';
import { FLATLOGO} from "@src/media/png";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";
import Image from "next/image";

const Footer = () => {
    return (
        <div className={`center-center`}>
            <Container>
                <div className={`white-space`}></div>
                <Row>
                    <Col>
                        <Image src={FLATLOGO} alt="Rogerdart Logo" className={`fluid`} width={150} height={40}/>
                        <p className={`footer-description`}>
                            Rogerdart, convinient restaurant and delivery timely services.
                        </p>
                        <Nav>
                            <Nav.Link href={`#`}>
                                <Image src={`/uploads/icons/001-facebook.png`} alt={`Facebook`} height={20} width={10}/>
                            </Nav.Link>
                            <Nav.Link href={`#`}>
                                <Image src={`/uploads/icons/003-twitter.png`} alt={`Twitter`} height={19} width={22}/>
                            </Nav.Link>
                            <Nav.Link href={`https://instagram.com/rogerdart`}>
                                <Image src={`/uploads/icons/004-instagram.png`} alt={`Instagram`} height={22} width={22}/>
                            </Nav.Link>
                        </Nav>
                    </Col>
                    <Col>
                    <h2 className={`footer-title`}>About Us</h2>
                    <Nav.Item>
                        <Nav.Link href={`#`}>About Us</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={`#`}>Career</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={`#`}>Our Agents</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={`#`}>Partnership</Nav.Link>
                    </Nav.Item>
                    </Col>
                    <Col>
                    <h2 className={`footer-title`}>Download App</h2>
                    <Nav.Item>
                        <Nav.Link href={`#`}>Playstore</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={`#`}>Appstore</Nav.Link>
                    </Nav.Item>
                    </Col>
                    <Col>
                    <h2 className={`footer-title`}>Get in touch</h2>
                    <Nav className={`g-link-width`}>
                        <Nav.Item><Nav.Link href={`mailto:info@rogerdart.com`} className={`m-0 p-0 text-black`}>info@rogerdart.com</Nav.Link>
                        </Nav.Item>
                        <Nav.Item><Nav.Link href={`mailto:support@rogerdart.com`} className={`m-0 p-0 text-black`}>support@rogerdart.com</Nav.Link>
                        </Nav.Item>
                        <Nav.Item><Nav.Link href={`mailto:career@rogerdart.com`} className={`m-0 p-0 text-black`}>career@rogerdart.com</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className={`subscribe-input-group`}>
                        <input type={`email`} placeholder={`Email`}/>
                        <button>Subscribe</button>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const BottomLinks = () => {
    
    return (
        <Container>
        <div className={`white-space`}></div>
        <p className={`text-center sub-footer-text`}>Copyright @{new Date().getFullYear()}, Rogerdart</p>
      </Container>
    )
}


export { Footer, BottomLinks };