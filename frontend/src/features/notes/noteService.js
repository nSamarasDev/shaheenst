import axios from 'axios';

const API_URL = '/api/employees/';

// Get ticket notes
const getNotes = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + employeeId + '/notes', config);

  return response.data;
};

// Create ticket note
const createNote = async (noteText, employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + employeeId + '/notes',
    {
      text: noteText,
    },
    config
  );

  return response.data;
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
