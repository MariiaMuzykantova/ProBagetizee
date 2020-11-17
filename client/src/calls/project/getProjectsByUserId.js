import apiInstance from '../apiInstance';

// @params token: jtw token of the user
const getProjectByUserId = async (token) => {
  try {
    const result = await apiInstance.get('/projects/', {
      headers: { 'x-auth-token': token },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export default getProjectByUserId;
