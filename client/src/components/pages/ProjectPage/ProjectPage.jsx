import {
  Button,
  Modal,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

import userContext from '../../../context/userContext';
import MainContentWrapper from '../../MainContentWrapper/MainContentWrapper';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import projectContext from '../../../context/projectContext';
import getProjectByUserId from '../../../calls/project/getProjectsByUserId';
import addUserToProject from '../../../calls/project/addUserToProject';
import Alert from '@material-ui/lab/Alert';
import getTasksOfProject from '../../../calls/task/getTasksOfProject';
import createTask from '../../../calls/task/createTask';
import deleteTask from '../../../calls/task/deleteTask';
import updateTaskStatus from '../../../calls/task/updateTaskStatus';

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
    <BasicFlex>
      <Typography variant="h5">Users</Typography>

      <div style={{ height: '10px', width: '50px' }}></div>
      <Button
        size="small"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onClick}
      >
        Add user
      </Button>
    </BasicFlex>

    <div style={{ height: '10px', width: '20px' }}></div>
    <div style={{ height: '10px', width: '20px' }}></div>
    <div style={{ height: '10px', width: '20px' }}></div>

    {users?.map((user, i) => (
      <Typography gutterBottom variant="body1" key={i}>
        {user}
      </Typography>
    ))}
  </UserListWrapper>
);

const TaskPanel = ({
  title,
  description,
  onDelete,
  onUpdateStatus,
  status,
  create_date,
}) => (
  <TaskWrapper status={status}>
    <Typography variant="subtitle1">Status: {status}</Typography>

    <Typography variant="subtitle2">Created: {create_date}</Typography>

    <SmallGutter />

    <Typography variant="h5">{title}</Typography>

    <SmallGutter />

    <Typography variant="body1">{description}</Typography>

    <SmallGutter />
    <SmallGutter />

    <BasicFlex>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={onUpdateStatus}
      >
        Swap status
      </Button>

      <Button
        size="small"
        variant="outlined"
        color="secondary"
        onClick={onDelete}
      >
        Delete
      </Button>
    </BasicFlex>
  </TaskWrapper>
);

const ProjectPage = () => {
  const { userData } = useContext(userContext);
  const { projects, setProjects } = useContext(projectContext);
  const { id } = useParams();
  const [modalIsOpen, setOpenModal] = useState(false);
  const [taskModalIsOpen, setOpenTaskModal] = useState(false);
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: '',
  });

  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
  });

  const [tasks, setTasks] = useState([]);

  const currentProject = projects.find((project) => project._id === id);
  const users = currentProject?.users.map((user) => user.username);

  const isValid = formData.email.length > 3;
  const isTaskValid = taskFormData.title.length > 3;

  const openModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setFormData({ email: '' });
  };

  const openTaskModal = () => {
    setOpenTaskModal(true);
  };
  const closeTaskModal = () => {
    setOpenTaskModal(false);
    setTaskFormData({ title: '', description: '' });
  };

  const addUser = async () => {
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

  const addTask = async () => {
    try {
      const data = {
        title: taskFormData.title,
        description: taskFormData.description,
        projectId: id,
      };

      await createTask(data, userData.token);

      const res = await getTasksOfProject(id, userData.token);
      setTasks(res.data);

      closeTaskModal();
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskStatus1 = async (taskId) => {
    await updateTaskStatus(taskId, userData.token);

    const res = await getTasksOfProject(id, userData.token);
    setTasks(res.data);
  };

  const deleteTask1 = async (taskId) => {
    await deleteTask(taskId, userData.token);

    const res = await getTasksOfProject(id, userData.token);
    setTasks(res.data);
  };

  useEffect(() => {
    const getProjects = async () => {
      const res = await getProjectByUserId(userData.token);
      setProjects(res.data);
    };

    const getTasks = async () => {
      const res = await getTasksOfProject(id, userData.token);

      setTasks(res.data);
    };

    if (userData.user) {
      getTasks();
      getProjects();
    }
  }, [userData, setProjects, id]);

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
              onClick={addUser}
            >
              Add
            </Button>
          </Form>
        </ModalDiv>
      </Modal>

      <Flextwo>
        <div style={{ marginBottom: '500px', width: '350px' }}>
          <BasicFlex>
            <Typography variant="h5">Tasks</Typography>

            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={openTaskModal}
            >
              Add task
            </Button>
          </BasicFlex>

          <SmallGutter />
          <SmallGutter />

          {tasks?.map((task, i) => (
            <TaskPanel
              create_date={task.create_date}
              status={task.status}
              key={i}
              title={task.title}
              description={task.description}
              onUpdateStatus={() => updateTaskStatus1(task._id)}
              onDelete={(event) => {
                event.stopPropagation();
                deleteTask1(task._id);
              }}
            />
          ))}
        </div>

        <UserList onClick={openModal} users={users} />
      </Flextwo>

      <Modal open={taskModalIsOpen} onClose={closeTaskModal}>
        <ModalDiv>
          <Form>
            <Typography variant="body1" gutterBottom>
              Please enter the title and description of the task
            </Typography>

            <TextField
              margin="normal"
              required={true}
              variant="outlined"
              fullWidth
              label="Title"
              onChange={(e) =>
                setTaskFormData({ ...taskFormData, title: e.target.value })
              }
            />

            <TextField
              margin="normal"
              fullWidth
              required={false}
              variant="outlined"
              label="Description"
              onChange={(e) =>
                setTaskFormData({
                  ...taskFormData,
                  description: e.target.value,
                })
              }
            />

            <div style={{ width: '10px', height: '10px' }} />

            <Button
              disabled={!isTaskValid}
              size="large"
              variant="contained"
              color="primary"
              onClick={addTask}
            >
              Add
            </Button>
          </Form>
        </ModalDiv>
      </Modal>
    </MainContentWrapper>
  );
};

export default ProjectPage;

const TaskWrapper = styled.div`
  margin-bottom: 30px;
  border-radius: 8px;
  width: 300px;
  background-color: ${(props) =>
    props.status === 'Done' ? '#B4FFA8' : 'white'};
  padding: 15px 25px;
`;

const UserListWrapper = styled.div`
  padding: 25px;
  border-radius: 8px;
  background-color: white;

  margin: 0 auto;
  margin-top: 50px;
  align-self: flex-start;
`;

const BasicFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: center;
`;

const Flextwo = styled.div`
  display: flex;
  align-items: top;
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

const SmallGutter = styled.div`
  height: 10px;
  width: 10px;
`;
