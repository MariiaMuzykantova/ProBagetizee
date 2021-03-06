import React, { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../../context/userContext';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import pic from '../../../static/images/profile_pic.jpg';
import MainContentWrapper from '../../MainContentWrapper/MainContentWrapper';

const useStyles = makeStyles({
  root: {
    maxWidth: 875,
  },
  media: {
    height: 340,
  },
});

const Profile = () => {
  const { userData } = useContext(UserContext);

  const classes = useStyles();

  return (
    <MainContentWrapper>
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
              {userData.user ? userData.user.username : undefined}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              My moto is to live life right here and now! :)
            </Typography>
            <Gutter />
            <Gutter />
            <Typography variant="body2" color="textSecondary" component="p">
              <b>Email:</b> {userData.user ? userData.user.email : undefined}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>
    </MainContentWrapper>
  );
};

export default Profile;

const Gutter = styled.div`
  height: 50px;
  width: auto;
`;
