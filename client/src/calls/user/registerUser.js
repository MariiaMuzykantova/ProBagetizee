import apiInstance from '../apiInstance';

// @params userDetails: {email, username, password, passwordCheck}
const registerUser = async (userDetails) => {
  try {
    const result = await apiInstance.post('/user/register', userDetails);

    return result;
  } catch (error) {
    throw error;
  }
};

export default registerUser;
