import React, { useRef, useState } from 'react';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
} from 'reactstrap';
import Logo from '../assets/img/logo.png';
import axios from 'axios';
import { URL_MOVIEAPI } from '../helper/url';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Header() {
  const [modal, setModal] = useState(false); // modal Login
  const [modal2, setModal2] = useState(false); // modal Register
  const [dropdownOpen, setOpen] = useState(false); // user button
  const userLogin = useRef();
  const passLogin = useRef();
  const userRegis = useRef();
  const emailRegis = useRef();
  const nameRegis = useRef();
  const passRegis = useRef();
  const confPassRegis = useRef();
  const auth = useSelector((state) => state.auth); // initialState in authReducers
  const dispatch = useDispatch();

  const handleLogin = () => {
    axios
      .post(`${URL_MOVIEAPI}/users/login`, {
        userName: userLogin.current.value,
        password: passLogin.current.value,
      })
      .then((res) => {
        dispatch({
          type: 'LOGIN',
          payload: {
            id: res.data.id,
            token: res.data.token,
          },
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('id', res.data.id);
        toast.success('You are now logged in!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toggle();
        axios.get(`${URL_MOVIEAPI}/users/${res.data.id}`).then((res) => {
          dispatch({
            type: 'USER_DATA',
            payload: {
              userName: res.data.data.userName,
              name: res.data.data.name,
              image: res.data.data.imageUrl,
            },
          });
          localStorage.setItem('userName', res.data.data.userName);
          localStorage.setItem('name', res.data.data.name);
          localStorage.setItem('image', res.data.data.imageUrl);
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Logout!', 'You have been logged out.', 'success');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('userName');
        localStorage.removeItem('image');
        dispatch({
          type: 'LOGOUT',
          payload: {
            id: '',
            token: '',
          },
        });
      }
    });
  };

  const handleRegister = () => {
    axios
      .post(`${URL_MOVIEAPI}/users/signup`, {
        userName: userRegis.current.value,
        email: emailRegis.current.value,
        name: nameRegis.current.value,
        password: passRegis.current.value,
        confirmPassword: confPassRegis.current.value,
        role: 'user',
      })
      .then(() => {
        toast.success('You can login with your new account now!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toggleLogin();
      })
      .catch((err) => {
        toast.error(err.response.data.data[0].msg, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const toggle = () => setModal(!modal);

  const toggle2 = () => setModal2(!modal2);

  const toggleBtn = () => setOpen(!dropdownOpen);

  const toggleRegister = () => {
    setModal(false);
    return setModal2(true);
  };

  const toggleLogin = () => {
    setModal2(false);
    return setModal(true);
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <div className="header-normal">
        <div className="header-normal-logo">
          <a href="/">
            <img className="ml-5 mr-2" src={Logo} alt="logo" />
          </a>
        </div>
        <div className="header-normal-search">
          <input
            type="text"
            className="header-search"
            placeholder="Search Movies"
          />
        </div>
        {auth.isLogin ? (
          <div className="header-normal-user">
            <div className="header-normal-user-button">
              <ButtonDropdown isOpen={dropdownOpen} toggle={toggleBtn}>
                <DropdownToggle caret color="danger">
                  {auth.name}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>User Menu</DropdownItem>
                  <Link to={`/profile/${auth.id}`}>
                    <DropdownItem>Profile Settings</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              {/* <button onClick={handleLogout} className="btn btn-danger">
                {auth.name}
              </button> */}
            </div>
          </div>
        ) : (
          <div className="header-normal-login">
            <div className="header-normal-login-sign-in">
              <button onClick={toggle} className="btn btn-danger">
                User Login
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Modal Login */}
      <Modal isOpen={modal} toggle={toggle}>
        <div className="modal-login">
          <img src={Logo} alt="logo" />
          <div className="modal-login-content">
            <div>Email / Username:</div>
            <div className="pt-1 pb-3">
              <input type="text" ref={userLogin} />
            </div>
            <div>Password:</div>
            <div className="pt-1 pb-4">
              <input type="password" ref={passLogin} />
            </div>
            <div>
              <button className="btn btn-danger mb-3" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div className="modal-login-register">
              Don't have an account yet?
              <button className="btn btn-dark ml-2" onClick={toggleRegister}>
                Sign up here!
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* Modal Register */}
      <Modal className="modal-register-main" isOpen={modal2} toggle={toggle2}>
        <div className="modal-register">
          <img src={Logo} alt="logo" />
          <div className="modal-register-content">
            <div>Full Name</div>
            <div className="pt-1 pb-3">
              <input type="text" ref={nameRegis} placeholder="Your full name" />
            </div>
            <div>Username</div>
            <div className="pt-1 pb-3">
              <input
                type="text"
                ref={userRegis}
                placeholder="Do not use space"
              />
            </div>
            <div>Email</div>
            <div className="pt-1 pb-3">
              <input
                type="text"
                ref={emailRegis}
                placeholder="example@gmail.com"
              />
            </div>
            <div>Password</div>
            <div className="pt-1 pb-3">
              <input type="password" ref={passRegis} />
            </div>
            <div>Confirm Password</div>
            <div className="pt-1 pb-4">
              <input type="password" ref={confPassRegis} />
            </div>
            <div>
              <button className="btn btn-danger mb-3" onClick={handleRegister}>
                Register
              </button>
            </div>
            <div className="modal-register-login">
              Already have an account?
              <button className="btn btn-dark ml-2" onClick={toggleLogin}>
                Login here!
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Header;
