import apiInstance from '../apiInstance';

// @params userDetails: {email, password}
const authenticateUser = async (userDetails) => {
  try {
    const userData = await apiInstance.post('/user/login', userDetails);

    return userData;
  } catch (error) {
    throw error;
  }
};

export default authenticateUser;
