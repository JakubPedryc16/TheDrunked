import { useEffect, useState } from "react";

export const Navbar = () => {

  const[role, setRole] = useState<string>("USER");
  useEffect(() => {

    async function getUserData() : Promise<void> {
        try {
            const userRole = localStorage.getItem("role");
            if(userRole) {
              setRole(userRole)
            } else {
              const res = await api.get("user/me");
              if(res.data?.role) {
                localStorage.setItem("role", res.data.role);
                setRole(res.data.role);
              }
            }
        } catch(error) {
            console.error(error)
        } 
      }
      getUserData();
      
    }, []);

  return (
    <NavContainer>
      <Nav>
        <NavTitle href="/">
          The Drunked
        </NavTitle>

        <NavList>

          
        <NavListItem>
            <NavLink href="/">Home</NavLink>
          </NavListItem>

          <NavListItem>
            <NavLink href="/cocktails">Cocktails</NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink href="/my-bar">My Bar</NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink href="/add-cocktail">New Cocktail</NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink href="/auth/logout">Logout</NavLink>
          </NavListItem>
          {role === "ADMIN" && (
            <>
              <NavListItem>
                <NavLink href="/add-ingredient">Ingredients</NavLink>
              </NavListItem>
              <NavListItem>
                <NavLink href="/add-tag">Tags</NavLink>
              </NavListItem>
              
            </>
          )}
        </NavList>
      </Nav>
    </NavContainer>
  );
};


import styled from 'styled-components';
import api from "../../utils/api";

const NavContainer = styled.div`
    background-color: rgba(30, 230, 187, 0.5);
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

