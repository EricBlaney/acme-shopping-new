import axios from 'axios';
const auth = (state = {}, action)=> {
  if(action.type === 'SET_AUTH'){
    state = action.auth;
  }
  if(action.type === 'SET_ADMINAUTH'){
    state = action.adminAuth;
  }
  return state;
};

export const logout = ()=> {
  return (dispatch)=> {
      window.localStorage.removeItem('token');
    dispatch({ type: 'SET_AUTH', auth: {}});

  };
};

export const exchangeToken = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/sessions', {
        headers: {
          authorization: token
        }
      });
      const auth = response.data;
      dispatch({ auth, type: 'SET_AUTH'});
    }
  };
};

export const login = (credentials)=> {
  return async(dispatch)=> {
    try{
    let response = await axios.post('/api/sessions', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token); 
    response = await axios.get('/api/sessions', {
      headers: {
        authorization: token
      }
    });
    const auth = response.data;
    dispatch({ auth, type: 'SET_AUTH'});
  }catch(er){
    console.log(er)
    console.log(er.response.data.error)
    if(er.response.data.error.status === 401){
      alert('Wrong Username and/or Password. If you are an admin, please use the admin login.')
    }
}
}
}


export default auth;
