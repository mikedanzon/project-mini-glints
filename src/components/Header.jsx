import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import Logo from '../assets/img/logo.png';

function Header() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle = () => setModal(!modal);

  const toggle2 = () => setModal2(!modal2);

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
      <div className="header-normal">
        <div className="header-normal-logo">
          <img className="ml-5 mr-2" src={Logo} alt="logo" />
        </div>
        <div className="header-normal-search">
          <input
            type="text"
            className="header-search"
            placeholder="Search Movies"
          />
        </div>
        <div className="header-normal-login">
          <div className="header-normal-login-sign-in">
            <button onClick={toggle} className="btn btn-danger">
              User Login
            </button>
          </div>
        </div>
      </div>
      {/* Modal Login */}
      <Modal isOpen={modal} toggle={toggle}>
        <div className="modal-login">
          <img src={Logo} alt="logo" />
          <div className="modal-login-content">
            <div>Email / Username:</div>
            <div className="pt-1 pb-3">
              <input type="text" />
            </div>
            <div>Password:</div>
            <div className="pt-1 pb-4">
              <input type="text" />
            </div>
            <div>
              <button className="btn btn-danger mb-3">Login</button>
            </div>
            <div className="pb-3">
              <a href="/">Forgot your password ?</a>
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
              <input type="text" />
            </div>
            <div>Username</div>
            <div className="pt-1 pb-3">
              <input type="text" />
            </div>
            <div>Email</div>
            <div className="pt-1 pb-3">
              <input type="text" />
            </div>
            <div>Password</div>
            <div className="pt-1 pb-4">
              <input type="text" />
            </div>
            <div>
              <button className="btn btn-danger mb-3">Register</button>
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
