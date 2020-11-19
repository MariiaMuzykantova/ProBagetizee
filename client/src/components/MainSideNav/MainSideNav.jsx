import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, withStyles } from '@material-ui/core';

import UserContext from '../../context/userContext';

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF',
  },
})(Typography);

const LogoutButton = ({ onClick }) => (
  <LogoutButtonWrapper onClick={onClick}>
    <WhiteTextTypography variant="h6">Logout</WhiteTextTypography>
  </LogoutButtonWrapper>
);

const NavItem = ({ isActive, text, to }) => (
  <Link style={{ textDecoration: 'none' }} to={to}>
    <NavItemWrapper isActive={isActive}>
      <WhiteTextTypography variant="h6">{text}</WhiteTextTypography>
    </NavItemWrapper>
  </Link>
);

// Main component
const MainSideNav = () => {
  const location = useLocation();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem('auth-token', '');
    history.push('/login');
  };
  return (
    <MainWrapper>
      <WhiteTextTypography style={{ paddingLeft: '40px' }} variant="h5">
        ProBudgetizer
      </WhiteTextTypography>

      <Gutter />
      <Gutter />

      <div>
        <NavItem
          isActive={location.pathname === '/projects'}
          text="Projects"
          to="/projects"
        />
        <NavItem
          isActive={location.pathname === '/profile'}
          text="Profile"
          to="/profile"
        />
        {userData.user && <LogoutButton onClick={logout} />}
      </div>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  background-color: #5b7cfd;
  padding-top: 40px;
  width: 250px;
`;

const LogoutButtonWrapper = styled.button`
  background-color: transparent;
  border: none;
  height: 70px;
  padding-left: 40px;
  display: flex;
  width: 100%;
  align-items: center;
  vertical-align: center;
  &:hover {
    background-color: coral;
    cursor: pointer;
  }
`;

const NavItemWrapper = styled.div`
  background-color: ${(props) => (props.isActive ? '#2854ff' : undefined)};
  height: 70px;
  padding-left: 40px;
  display: flex;
  width: 100%;
  align-items: center;
  vertical-align: center;
  &:hover {
    background-color: #2854ff;
    cursor: pointer;
  }
`;

const Gutter = styled.div`
  height: 50px;
  width: auto;
`;

export default MainSideNav;
