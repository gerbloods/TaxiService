import React from "react";
import { Container, Navbar, Nav} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = ( ) => {
        const navigate = useNavigate()

    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary fixed-top">
            <Container>
                <Navbar.Brand onClick={() => navigate('/')}>CrackWheel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link onClick={() => navigate('/')}>Главная</Nav.Link>
                        <Nav.Link onClick={() => navigate('/manage')}>Управление</Nav.Link>
                        <Nav.Link onClick={() => navigate('/reviews')}>Отзывы</Nav.Link>
                        <Nav.Link onClick={() => navigate('/orders')}>Заказы</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}

export default NavBar;