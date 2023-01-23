import React, {useState} from 'react';
import { useNavigate  } from 'react-router-dom';

const Signup = (props) => {

  const [user, setUser] = useState({name: "", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e)=>{
      e.preventDefault();
      if(user.cpassword !== user.password){
        props.showAlert("Password Mismatched!", "danger");
        return; 
      }
      
      const response = await fetch("http://localhost:5000/api/auth/createuser",{
        method: 'POST',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify({name: user.name, email: user.email, password: user.password})
      })
      const json = await response.json();
      console.log(json);
      if(json.success){
        //save the authtoken and redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        props.showAlert("Account Created Successfully!", "success");
      }else{
        props.showAlert("Invalid Credentials!", "danger");
      }
  }
  const onChange = (e)=>{
    setUser({...user ,[e.target.name]: e.target.value})
  }

  return (
    <div className='container mt-2'>
      <h2> Signup to use NoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required minLength={5} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button> 
        {/* disabled={note.title.length<5 || note.description.length<5} */}
      </form>
    </div>
  )
}

export default Signup
