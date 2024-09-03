import { useState } from "react";

export const Navbar = () => {


    return (
        <NavContainer>
            <Nav>
                <NavTitle href="/">
                    The Drunked
                </NavTitle>
                <NavList>
                    <NavListItem>
                        <NavLink href="/cocktails">Cocktails</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink href="/?????">Manage Cocktails</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink href="/???????">???????</NavLink>
                    </NavListItem>
                </NavList>
            </Nav>
        </NavContainer>
    );
};


import styled from 'styled-components';

const NavContainer = styled.div`
    background-color: rgb(37, 126, 116);
    color: rgb(240, 237, 238);
    font-size: 1rem;
`
const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(240, 237, 238);
    position: sticky;
    top: 0;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;

  @media (min-width: 481px) {
    flex-direction: row;
    align-items: center;
  }
`;

const NavTitle = styled.a`
  font-size: 1.2rem;

  font-weight: bold;
  text-decoration: none;
  color: rgb(240, 237, 238);
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
    background-color: rgb(49, 86, 89);
  }

  @media (min-width: 481px) {
    margin: 0 0.5rem;
  }
`;

