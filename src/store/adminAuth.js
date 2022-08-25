import axios from 'axios';

const adminAuth = (state = {}, action)=> {
  if(action.type === 'SET_ADMINAUTH'){
    state = action.adminAuth;
  }
  return state;
};

export const adminLogout = ()=> {
  return (dispatch)=> {
      window.localStorage.removeItem('token');
    dispatch({ type: 'SET_ADMINAUTH', adminAuth: {}});

  };
};

export const adminExchangeToken = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/sessions', {
        headers: {
          authorization: token
        }
      });
      const adminAuth = response.data;
      dispatch({ adminAuth, type: 'SET_ADMINAUTH'});
    }
  };
};

export const adminLogin = (credentials)=> {
  return async(dispatch)=> {
    let response = await axios.post('/api/sessions/admin', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token); 
    response = await axios.get('/api/sessions', {
      headers: {
        authorization: token
      }
    });
    const adminAuth = response.data;
    dispatch({ adminAuth, type: 'SET_ADMINAUTH'});
  };
};


export default adminAuth;