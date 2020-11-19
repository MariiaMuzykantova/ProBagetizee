import apiInstance from '../apiInstance';

// @params projectid, token: jtw token of the user
const deleteTask = async (taskId, token) => {
  try {
    const res = await apiInstance.delete(`/tasks/${taskId}`, {
      headers: { 'x-auth-token': token },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export default deleteTask;
