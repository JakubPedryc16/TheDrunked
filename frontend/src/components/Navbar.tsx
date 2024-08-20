import { useState } from "react";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Nav>
            <NavTitle href="/">
                Website
            </NavTitle>
            <Menu className="menu" onClick={() => setMenuOpen(!menuOpen)}>

            </Menu>
            <NavList className={menuOpen ? "open" : ""}>
                <NavListItem>
                    <NavLink href="/about">About</NavLink>
                </NavListItem>
                <NavListItem>
                    <NavLink href="/services">Services</NavLink>
                </NavListItem>
                <NavListItem>
                    <NavLink href="/contact">Contact</NavLink>
                </NavListItem>
            </NavList>
        </Nav>
    );
};


import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f172a;
  color: white;
  position: sticky;
  top: 0;
  flex-direction: column;

  @media (min-width: 481px) {
    flex-direction: row;
    align-items: center;
  }
`;

const NavTitle = styled.a`
  font-size: 1.5rem;
  margin: 1rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.25rem;


  @media (min-width: 481px) {
    flex-direction: row;
    display: flex;
    margin-bottom: 0;
    width: auto;
  }
`;

const NavListItem = styled.li`
  list-style: none;
  width: 100%;
  text-align: center;

  @media (min-width: 481px) {
    width: auto;
    text-align: left;
  }
`;

const NavLink = styled.a`
  display: block;
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  margin: 0.2rem 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: #172554;
  }

  @media (min-width: 481px) {
    margin: 0 0.5rem;
  }
`;

const Menu = styled.div`
  display: flex;
  position: absolute;
  top: 0.75rem;
  right: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
  width: 2.25rem;
  height: 2rem;

  @media (min-width: 481px) {
    display: none;
  }
`;

