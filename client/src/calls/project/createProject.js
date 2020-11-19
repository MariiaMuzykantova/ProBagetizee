import apiInstance from '../apiInstance';

// @params projectData: {username, email, title}, token: jtw token of the user
const createProject = async (projectData, token) => {
  try {
    const res = await apiInstance.post('/projects/', projectData, {
      headers: { 'x-auth-token': token },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export default createProject;
