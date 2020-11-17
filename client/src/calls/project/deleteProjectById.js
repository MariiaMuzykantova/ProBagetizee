import apiInstance from '../apiInstance';

// @params projectid, token: jtw token of the user
const deleteProjectById = async (projectId, token) => {
  try {
    const res = await apiInstance.delete(`/projects/${projectId}`, {
      headers: { 'x-auth-token': token },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export default deleteProjectById;
