import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Modal, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import UserContext from '../../../context/userContext';
import deleteProjectById from '../../../calls/project/deleteProjectById';
import createProject from '../../../calls/project/createProject';
import getProjectByUserId from '../../../calls/project/getProjectsByUserId';
import MainSideNav from '../../MainSideNav/MainSideNav';

const ProjectPanelItem = ({ children }) => (
  <div style={{ flex: 1 }}>{children}</div>
);

const ProjectPanel = ({
  projectName,
  tasksAmount,
  tasksDone,
  peopleAmout,
  status,
  tags,
  onClick,
}) => (
  <Panel>
    <ProjectPanelItem>
      <Typography variant="h6">{projectName}</Typography>
      <Typography variant="body1">{tags}</Typography>
    </ProjectPanelItem>

    <ProjectPanelItem>
      <Typography variant="h6">
        {tasksDone}/{tasksAmount}
      </Typography>
      <Typography variant="body1">Tasks done</Typography>
    </ProjectPanelItem>

    <ProjectPanelItem>
      <Typography variant="h6">{peopleAmout}</Typography>
      <Typography variant="body1">People</Typography>
    </ProjectPanelItem>

    <ProjectPanelItem>
      <Typography variant="h6">{status}</Typography>
      <Typography variant="body1">Status</Typography>
    </ProjectPanelItem>

    <CenterdVerticDiv>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        onClick={onClick}
      >
        Delete
      </Button>
    </CenterdVerticDiv>
  </Panel>
);

const Projects = () => {
  const { userData } = useContext(UserContext);

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
  });

  const [modalIsOpen, setOpenModal] = useState(false);

  const openModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setFormData({ title: '' });
  };

  const isValid = formData.title.length > 3;

  const submitProject = async () => {
    closeModal();
    const token = userData.token;
    const title = formData.title;

    await createProject({ title }, token);

    const res = await getProjectByUserId(userData.token);
    setProjects(res.data);
  };

  const deleteProject = async (projectId) => {
    await deleteProjectById(projectId, userData.token);

    const res = await getProjectByUserId(userData.token);
    setProjects(res.data);
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
    <MainWrapper>
      <MainSideNav />

      <ContentArea>
        <BasicFlex>
          <Typography variant="h5">Your Projects</Typography>

          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={openModal}
          >
            Create new project
          </Button>
        </BasicFlex>

        <Modal open={modalIsOpen} onClose={closeModal}>
          <ModalDiv>
            <Form>
              <Typography variant="body1" gutterBottom>
                Please enter the title for the project.
              </Typography>

              <Typography variant="body1" gutterBottom>
                The title must be atleast 4 characters long
              </Typography>

              <TextField
                margin="normal"
                required={true}
                variant="outlined"
                label="Title of the project"
                onChange={(e) => setFormData({ title: e.target.value })}
              />

              <div style={{ width: '10px', height: '10px' }} />

              <Button
                disabled={!isValid}
                size="large"
                variant="contained"
                color="primary"
                onClick={submitProject}
              >
                save
              </Button>
            </Form>
          </ModalDiv>
        </Modal>

        <Gutter />

        {projects.length === 0 ? (
          <>
            <Typography variant="h6" gutterBottom>
              You dont have any projects yet. Please begin by creating a new one
              or requesting access to some existing one.
            </Typography>
          </>
        ) : (
          <>
            {projects.map((item, i) => (
              <ProjectPanel
                key={i}
                tags="tags"
                projectName={item.title}
                tasksDone={0}
                tasksAmount={0}
                peopleAmout={item.users.length}
                status={item.status}
                onClick={() => deleteProject(item._id)}
              />
            ))}
          </>
        )}

        <Gutter />
      </ContentArea>
    </MainWrapper>
  );
};

export default Projects;

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

const CenterdVerticDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 6px;
`;

const MainWrapper = styled.div`
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

const Gutter = styled.div`
  height: 50px;
  width: auto;
`;

const Panel = styled.div`
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 15px 25px;
  box-shadow: 0px 1px 1px 0px #888888;

  height: 90px;
  border-radius: 8px;
  display: flex;
  background-color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;
