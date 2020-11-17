import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../context/userContext';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import getUserData from '../../calls/user/getUserData';
import pic from "../../static/images/profile_pic.jpg"

const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF',
    },
})(Typography);

const NavItem = ({ isActive, text }) => (
    <NavItemWrapper isActive={isActive}>
        <WhiteTextTypography variant="h6">{text}</WhiteTextTypography>
    </NavItemWrapper>
);

const useStyles = makeStyles({
    root: {
        maxWidth: 875,
    },
    media: {
        height: 340,
    },
});

const Profile = () => {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const classes = useStyles();
    const getUserName = async () => {
        const user = await getUserData(userData.token)
        setUserName(user.data.username)
        setUserEmail(user.data.email)
    }

    getUserName()

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
            <LeftPanel>
                <WhiteTextTypography style={{ paddingLeft: '40px' }} variant="h5">
                    ProBudgetizer
                </WhiteTextTypography>

                <Gutter />
                <Gutter />

                <div>
                    <NavItem isActive text="Projects" />
                    <NavItem text="Profile" />
                    <NavItem text="About" />
                    <NavItem text="Contact list" />
                    <NavItem text="Help" />
                    {userData.user && <button onClick={logout}>Log out</button>}
                </div>
            </LeftPanel>

            <ContentArea>
                <Typography variant="h5">Profile</Typography>

                <Gutter />
                <Gutter />
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={pic}
                            title="Profile pic"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {userName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                My moto is to live life right here and now! :)
                            </Typography>
                            <Gutter />
                            <Gutter />
                            <Typography variant="body2" color="textSecondary" component="p">
                                <b>Email:</b> {userEmail}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            <b>Phone number:</b> +358 12345678
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Edit
                        </Button>
                    </CardActions>
                </Card>

            </ContentArea>
        </MainWrapper>
    );
}


export default Profile;

const MainWrapper = styled.div`
  display: flex;
  background-color: lightblue;
  height: 100vh;
  width: 100vw;
`;

const LeftPanel = styled.div`
  background-color: #5b7cfd;
  padding-top: 40px;
  width: 250px;
`;

const ContentArea = styled.div`
  background-color: #e7eef7;
  flex: 1;
  padding-left: 100px;
  padding-top: 40px;
`;


const Gutter = styled.div`
  height: 50px;
  width: auto;
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
