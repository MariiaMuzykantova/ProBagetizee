import apiInstance from '../apiInstance';

const updateTaskStatus = async (taskId, token) => {
  try {
    const res = await apiInstance.post(
      'tasks/updatestatus/',
      { taskId },
      {
        headers: { 'x-auth-token': token },
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export default updateTaskStatus;
