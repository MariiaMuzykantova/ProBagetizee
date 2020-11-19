import apiInstance from '../apiInstance';

// data: email, projectId
const addUserToProject = async ({ email, projectId }, token) => {
  try {
    const res = await apiInstance.post(
      '/projects/adduser',
      { email, projectId },
      {
        headers: { 'x-auth-token': token },
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export default addUserToProject;
