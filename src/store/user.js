import axios from 'axios';

const user = (state = [], action)=> {
  if(action.type === 'CREATE_USER'){
    state = action.user;
  }
  if(action.type === 'UPDATE_USER'){
    state = action.user;
  }
  if(action.type === 'DELETE_USER') {
    state = [];
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

export const updateUser = (user) => {
    return async(dispatch) => {
      try{
        await axios.put(`/api/users`, user);
        dispatch({type: "UPDATE_USER", user})
      }
      catch(ex){
        console.log(ex)
      }
    }
}

export const deleteUser = (user) => {
  return async(dispatch) => {
      await axios.delete(`/api/users/${user.id}`);
      dispatch({ type: 'DELETE_user', user})
  }
}

export const loadUser = (user) => {
  return async(dispatch) => {
    await axios.get(``)
  }
}


export default user;
