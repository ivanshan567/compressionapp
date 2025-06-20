import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: transparent;
  padding: 1.5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 2rem;
  
  &:last-child {
    margin-right: 0;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #3b3150;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  font-size: 1.1rem;
  
  &:hover {
    color: #635985;
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <NavLink href="#" active>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Services</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Contact</NavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navbar; 