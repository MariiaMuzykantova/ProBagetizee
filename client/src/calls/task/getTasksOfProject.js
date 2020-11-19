import apiInstance from '../apiInstance';

// @params token: jtw token of the user
const getTasksOfProject = async (projectId, token) => {
  try {
    const result = await apiInstance.get(`/tasks/${projectId}`, {
      headers: { 'x-auth-token': token },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export default getTasksOfProject;
