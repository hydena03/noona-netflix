import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link } from 'react-router-dom'; 

const AppLayout = () => {
  return (
    <div>
      <Navbar expand="lg" className="px-5 bg-black" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Rewrite_Netflix_Logo_Design_History_Evolution_0_1024x1024.jpg?v=1695284106"
              width="120"
              height="70"
              className="d-inline-block align-top"
              alt="Navbar Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/" style={{ color: 'white' }}>Home</Nav.Link>
              <Nav.Link as={Link} to="/movies" style={{ color: 'white' }}>Movies</Nav.Link> 
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default AppLayout;
