import {
  Button,
  Modal,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

import userContext from '../../../context/userContext';
import MainContentWrapper from '../../MainContentWrapper/MainContentWrapper';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import projectContext from '../../../context/projectContext';
import getProjectByUserId from '../../../calls/project/getProjectsByUserId';
import addUserToProject from '../../../calls/project/addUserToProject';
import Alert from '@material-ui/lab/Alert';

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF',
  },
})(Typography);

const BackToLink = ({ to }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <WhiteTextTypography variant="h6">
      <BackWrapper>
        <ArrowBackIosIcon fontSize="small" /> Back
      </BackWrapper>
    </WhiteTextTypography>
  </Link>
);

const UserList = ({ users, onClick }) => (
  <UserListWrapper>
    <Typography gutterBottom variant="h5">
      Users
    </Typography>

    {users?.map((user, i) => (
      <Typography gutterBottom variant="body1" key={i}>
        {user}
      </Typography>
    ))}

    <Button
      size="small"
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={onClick}
    >
      Add user
    </Button>
  </UserListWrapper>
);

const ProjectPage = () => {
  const { userData } = useContext(userContext);
  const { projects, setProjects } = useContext(projectContext);
  const { id } = useParams();
  const [modalIsOpen, setOpenModal] = useState(false);
  const history = useHistory();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: '',
  });

  const currentProject = projects.find((project) => project._id === id);
  const users = currentProject?.users.map((user) => user.username);

  const isValid = formData.email.length > 3;

  const openModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setFormData({ email: '' });
  };

  const submitProject = async () => {
    try {
      const data = {
        email: formData.email,
        projectId: currentProject._id,
      };

      await addUserToProject(data, userData.token);

      const res = await getProjectByUserId(userData.token);
      setProjects(res.data);

      closeModal();
    } catch (err) {
      err.response.data.message && setError(err.response.data.message);
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      const res = await getProjectByUserId(userData.token);
      setProjects(res.data);
    };

    if (userData.user) {
      getProjects();
    }
  }, [userData]);

  return (
    <MainContentWrapper>
      <BackToLink to="/projects" />

      <Gutter />

      <BasicFlex>
        <Typography variant="h2">{currentProject?.title}</Typography>
      </BasicFlex>

      <Gutter />

      <Modal open={modalIsOpen} onClose={closeModal}>
        <ModalDiv>
          <Form>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="body1" gutterBottom>
              Please enter the email of the user that you wish to add to the
              project.
            </Typography>

            <TextField
              margin="normal"
              required={true}
              variant="outlined"
              label="Email"
              onChange={(e) => setFormData({ email: e.target.value })}
            />

            <div style={{ width: '10px', height: '10px' }} />

            <Button
              disabled={!isValid}
              size="large"
              variant="contained"
              color="primary"
              onClick={submitProject}
            >
              Add
            </Button>
          </Form>
        </ModalDiv>
      </Modal>

      <BasicFlex>
        <UserList onClick={openModal} users={users} />
      </BasicFlex>
    </MainContentWrapper>
  );
};

export default ProjectPage;

const UserListWrapper = styled.div`
  padding: 25px;
  border-radius: 6px;
  background-color: white;
`;

const BasicFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: center;
`;

const ModalDiv = styled.div`
  outline: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 6px;
`;

const Gutter = styled.div`
  height: 50px;
  width: auto;
`;

const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 10px;
  width: 68px;
  border-radius: 5px;
  background-color: #5b7cfd;
`;
