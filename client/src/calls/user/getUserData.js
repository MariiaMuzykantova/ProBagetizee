import apiInstance from '../apiInstance';

// @params token: jtw token of the user
const getUserData = async (token) => {
  try {
    const result = await apiInstance.get('/user/', {
      headers: { 'x-auth-token': token },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export default getUserData;
