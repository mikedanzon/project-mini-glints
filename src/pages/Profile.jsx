import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Header from '../components/Header';
import { URL_MOVIEAPI } from '../helper/url';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Home from './Home';

function Profile() {
  const [pageMenu, setPageMenu] = useState(0);
  const auth = useSelector((state) => state.auth);
  const nameSet = useRef();
  const oldPassword = useRef();
  const newPassword = useRef();
  const emailPass = useRef();
  const emailNew = useRef();
  const dispatch = useDispatch();

  if (auth.isLogin === false) {
    return <Home />;
  }

  const changeFullName = () => {
    var config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };
    var body = {
      name: nameSet.current.value,
    };
    axios
      .put(`${URL_MOVIEAPI}/users/${auth.id}`, body, config)
      .then(() => {
        dispatch({
          type: 'CHANGE_NAME',
          payload: {
            name: nameSet.current.value,
          },
        });
        localStorage.setItem('name', nameSet.current.value);
        toast.success(`Your name now changed to ${nameSet.current.value}`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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

  const changePassword = () => {
    var config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };
    var body = {
      password: oldPassword.current.value,
      newPassword: newPassword.current.value,
    };
    axios
      .put(`${URL_MOVIEAPI}/users/${auth.id}`, body, config)
      .then(() => {
        toast.success(`Your password has been changed`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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

  const changeEmail = () => {
    var config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };
    var body = {
      password: emailPass.current.value,
      email: emailNew.current.value,
    };
    axios
      .put(`${URL_MOVIEAPI}/users/${auth.id}`, body, config)
      .then(() => {
        toast.success(`Your email has been changed`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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
  }

  return (
    <div className="profile-background">
      <Header />
      <div className="profile-main">
        <div className="profile-main-left text-center">
          <div className="profile-main-left-name pb-3">{auth.name}</div>
          <div className="profile-main-left-photo">
            {/* <img src={auth.image} alt="profileimage" /> */}
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="profileimage"
            />
          </div>
        </div>
        <div className="profile-main-right">
          <div className="profile-main-right-menu">
            {pageMenu === 1 ? (
              <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem onClick={() => setPageMenu(0)}>
                  Profile
                </BreadcrumbItem>
                <BreadcrumbItem onClick={() => setPageMenu(1)} active>
                  Settings
                </BreadcrumbItem>
              </Breadcrumb>
            ) : (
              <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem onClick={() => setPageMenu(0)} active>
                  Profile
                </BreadcrumbItem>
                <BreadcrumbItem onClick={() => setPageMenu(1)}>
                  Settings
                </BreadcrumbItem>
              </Breadcrumb>
            )}
          </div>
          <div className="profile-main-right-profile">
            {pageMenu === 1 ? (
              <div>
                <div className="font-weight-bold">
                  <div className="pb-1">Change Full Name</div>
                  <div className="pt-1 d-flex">
                    <div className="pr-3">
                      <input
                        type="text"
                        ref={nameSet}
                        placeholder="Your new name"
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '0.07rem 0.75rem' }}
                        onClick={changeFullName}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="font-weight-bold pt-3">
                  <div className="pb-1">Change Password</div>
                  <div className="pt-1 d-flex">
                    <div>
                      <input
                        type="password"
                        ref={oldPassword}
                        size="15"
                        placeholder="Password"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        ref={newPassword}
                        size="15"
                        placeholder="New Password"
                      />
                    </div>
                    <div className="pl-3">
                      <button
                        className="btn btn-danger"
                        onClick={changePassword}
                        style={{ padding: '0.07rem 0.75rem' }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="font-weight-bold pt-3">
                  <div className="pb-1">Change Email</div>
                  <div className="pt-1 d-flex">
                    <div>
                      <input
                        type="password"
                        ref={emailPass}
                        size="15"
                        placeholder="Password"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        ref={emailNew}
                        size="15"
                        placeholder="New Email"
                      />
                    </div>
                    <div className="pl-3">
                      <button
                        className="btn btn-danger"
                        onClick={changeEmail}
                        style={{ padding: '0.07rem 0.75rem' }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="pb-1">
                  <span className="font-weight-bold">Full Name</span>:{' '}
                  {auth.name}
                </div>
                <div className="border border-light"></div>
                <div className="pb-1 pt-1">
                  <span className="font-weight-bold">Username</span>:{' '}
                  {auth.userName}
                </div>
                <div className="border border-light"></div>
                <div className="pb-1 pt-1">
                  <span className="font-weight-bold">Bio</span>: Hello guys
                </div>
                <div className="border border-light"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
