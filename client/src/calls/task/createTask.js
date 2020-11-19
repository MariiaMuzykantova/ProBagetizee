import apiInstance from '../apiInstance';

const createTask = async ({ title, projectId, description }, token) => {
  try {
    const res = await apiInstance.post(
      '/tasks/',
      { title, projectId, description },
      {
        headers: { 'x-auth-token': token },
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export default createTask;
