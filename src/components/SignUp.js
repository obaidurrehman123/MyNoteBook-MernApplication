import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "" , cpassword:""});
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name ,email,password,cpassword} = credentials;
    const response = await fetch(`http://localhost:9000/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,email,password
      }),
    });
    const json = await response.json();
    //console.log("JwtToken" + json);
    console.log("i am json value" + json.success);
    if(json.success){
      //redirect
      localStorage.setItem("token" ,json.jwtData)
      history.push("/")
      props.showAlert("Account Created Successfully" , "success");
    }
    else{
      props.showAlert("Invalid credenrials" , "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            name="name"
          
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={onChange}
            name="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">ConfirmPassword</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Password"
            onChange={onChange}
            name="cpassword"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
