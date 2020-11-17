import apiInstance from '../apiInstance';

// @params token: jtw token of the user
const tokenIsValid = async (token) => {
  try {
    const result = await apiInstance.post('/user/tokenIsValid', null, {
      headers: { 'x-auth-token': token },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export default tokenIsValid;
