import React from 'react';
import styled from '@emotion/styled';

const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: 1000,
  padding: '10px 0', // Adding some padding for better appearance
}));

const ListItem = styled('li')(() => ({
  display: 'inline-block',
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Ul = styled('ul')(() => ({
  listStyleType: 'none',
  margin: 5,
  padding: 0,
  display: 'flex',
  
}));

const TopNavbar = () => {
  return (
    <Navbar>
      <Ul>
        <ListItem>
          <Link href={'/'}>Home</Link>
        </ListItem>
        <ListItem>
          <Link href={'/users'}>Users</Link>
        </ListItem>
      </Ul>
    </Navbar>
  );
};

export default TopNavbar;
