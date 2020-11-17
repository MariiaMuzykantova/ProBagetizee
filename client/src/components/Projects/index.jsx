import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../context/userContext';

import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import createProject from '../../calls/project/createProject';
import getProjectByUserId from '../../calls/project/getProjectsByUserId';
import { useEffect } from 'react';
import deleteProjectById from '../../calls/project/deleteProjectById';

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
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
  });

  const submitProject = async () => {
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

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem('auth-token', '');
    history.push('/login');
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
        <Typography variant="h5">Your Projects</Typography>

        <Gutter />

        {projects.map((item, i) => (
          <ProjectPanel
            key={i}
            tags="tags"
            projectName={item.title}
            tasksDone={0}
            tasksAmount={0}
            peopleAmout={item.users.length}
            status="status"
            onClick={() => deleteProject(item._id)}
          />
        ))}

        <Gutter />

        <Form>
          <TextField
            variant="outlined"
            label="project title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Gutter />

          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={submitProject}
          >
            save
          </Button>
        </Form>
      </ContentArea>
    </MainWrapper>
  );
};

export default Projects;

const CenterdVerticDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  background-color: white;
  padding: 20px;
`;

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

const Panel = styled.div`
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 15px 25px;
  box-shadow: 0px 1px 1px 0px #888888;
  width: 90%;
  height: 90px;
  border-radius: 8px;
  display: flex;
  background-color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;
