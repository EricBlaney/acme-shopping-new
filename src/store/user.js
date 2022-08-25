import axios from 'axios';

const user = (state = {}, action)=> {
  if (action.type === 'SET_USERS'){
    return action.user
  }
  if (action.type === 'SET_USER'){
    return action.user
  }
  if(action.type === 'CREATE_USER'){
    return [action.user, ...state]
  }
  if(action.type === 'UPDATE_USERS'){
    
    return state.map(user => user.id === action.user.id ? action.user : user)
  }
  if(action.type === 'DELETE_USER') {
    return state.filter((user)=> user.id !== action.user.id)
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
        console.log(error.response);
      if (error.response.data.includes('Cannot add duplicate email')) {
        alert('Cannot add duplicate email')
      } else {
        console.log(error);
      }
    }
    }
  };

export const setUsers = () => {
    return async(dispatch)=>{
        const user = (await axios.get('/api/users')).data;
        dispatch({type: "SET_USERS", user})
    }
};

// export const updateUser = (user) => {
//     return async(dispatch) => {
//       try{
//         await axios.put(`/api/users`, user);
//         dispatch({type: "UPDATE_USER", user})
//       }
//       catch(ex){
//         console.log(ex)
//       }
//     }
// };

export const updateUsers = (user) => {
  return async(dispatch) => {
    try{
      await axios.put(`/api/users/${user.id}`, user);
      dispatch({type: "UPDATE_USERS", user})
    }
    catch(ex){
      console.log(ex)
    }
  }
};

export const deleteUser = (user) => {
  return async(dispatch) => {
      await axios.delete(`/api/users/${user.id}`);
      dispatch({ type: 'DELETE_USER', user})
  }
}

export const loadUser = (auth) => {
  return async(dispatch) => {
    dispatch({ type: 'SET_USER', user})
  }
}


export default user;
