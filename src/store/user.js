import axios from 'axios';
const user = (state = [], action)=> {
  if(action.type === 'CREATE_USER'){
    state = action.user;
  }
  return state;
};

export const createUser = (credentials) => {
  return async(dispatch)=> {
    try{
      let user = (await axios.post('/api/users', credentials)).data;
        dispatch({ type: 'CREATE_USER', user });
    }
    catch(error) {
        console.log(error.response.data);
      if (error.response.data.includes("Cannot add duplicate email!")) {
        alert('Cannot add duplicate email')
      } else {
        console.log(error);
      }
    }
    }
  };


export default user;
