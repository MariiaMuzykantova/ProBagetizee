import React from 'react';
import styled from 'styled-components';
import MainSideNav from '../MainSideNav/MainSideNav';

const MainContentWrapper = ({ children }) => {
  return (
    <Wrapper>
      <MainSideNav />
      <ContentArea>{children}</ContentArea>
    </Wrapper>
  );
};

export default MainContentWrapper;

const Wrapper = styled.div`
  display: flex;
  background-color: lightblue;
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;

const ContentArea = styled.div`
  background-color: #e7eef7;
  flex: 1;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 40px;
`;
