import React from "react";
import { Link, useLocation , useHistory } from "react-router-dom";

const Navbar = () => {
  let history = useHistory()
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    history.push("/login");
  }
  let location = useLocation();
  // useEffect(()=>{
  //   console.log("allll" + location.pathname)
  // },[location])
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        myNoteBook 
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="/navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${location.pathname === "/" ? "active" :""}`}>
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/about" ? "active" :""}`}>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
       {!localStorage.getItem("token") ? <form className="form-inline my-2 my-lg-0">
        <Link class="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link class="btn btn-primary mx-2" to="/signUp" role="button">SignUp</Link>
        </form>:<button onClick={handleLogout} className= "btn btn-primary"> LogOut</button>}
      </div>
    </nav>
  );
};

export default Navbar;
