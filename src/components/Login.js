import React ,{useState} from "react";
import {useHistory} from "react-router-dom"

const Login = (props) => {
    const [credentials , setCredentials] = useState({email:"",password:""})
    let history = useHistory();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:9000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          //console.log("JwtToken" + json);
          console.log( "i am json value" + json.success);
          if(json.success){
            //redirect
            localStorage.setItem("token" ,json.jwtData)
            history.push("/")
            props.showAlert("LoggedIn Successfully" , "success");
          }
          else{
            props.showAlert("InvalidCredentials" , "danger ");
          }
        }
    const onChange =(e)=>{
        setCredentials({...credentials ,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
