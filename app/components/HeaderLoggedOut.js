import React, {useState} from 'react';
import Axios from 'axios';


const HeaderLoggedOut = (props) => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
      });
  
      const { username, password } = credentials;
  
      const login = async() => {
        try {
          const user = await Axios.post("http://localhost:5000/login", {
            username,
            password
          });
          if(user) {
            console.log('Successful Login!', user.data);
            props.setLoggedIn(true);
          } else {
            console.log('Incorrect username or password');
          }
        } catch(error) {
          console.log('Unable to login!');
        }
      };
  
      const handleChange = (name) => (e) => {
        const value = e.target.value;
        setCredentials({...credentials, [name]: value })
      };
  
      const handleSubmit = (e) => {
          e.preventDefault();
          login();
      };

    return (
        <form className="mb-0 pt-2 pt-md-0" onSubmit={handleSubmit}>
            <div className="row align-items-center">
            <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input onChange={handleChange('username')} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
            </div>
            <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input onChange={handleChange('password')} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
            </div>
            <div className="col-md-auto">
                <button className="btn btn-success btn-sm">Sign In</button>
            </div>
            </div>
        </form>
    );
};

export default HeaderLoggedOut;