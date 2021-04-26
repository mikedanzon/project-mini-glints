const initialState = {
  id: localStorage.getItem('id') || '',
  token: localStorage.getItem('token') || '',
  isLogin: localStorage.getItem('token') ? true : false,
  userName: localStorage.getItem('userName') || '',
  name: localStorage.getItem('name') || '',
  image: localStorage.getItem('image') || '',
};

const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload, isLogin: true };
    case 'LOGOUT':
      return { ...state, ...action.payload, isLogin: false };
    case 'USER_DATA':
      return { ...state, ...action.payload };
    case 'CHANGE_NAME':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducers;
