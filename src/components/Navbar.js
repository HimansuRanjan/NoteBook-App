import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(()=>{
    // eslint-disable-next-line
  }, [location]);

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
    
  }

  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active" : ""}`} to="/about">About</Link>
        </li>
      </ul>

      {!localStorage.getItem('token') ?<form className="d-flex">
        <Link className='btn btn-primary mx-2' to='/login' role='button'>Log in</Link> 
        <Link className='btn btn-primary mx-2' to='/signup' role='button'>Sign Up</Link>
      </form>:<button onClick={handleLogout} className='btn btn-primary'> Log Out</button>}

    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
