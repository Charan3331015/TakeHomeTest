import React, { useState, setState } from 'react';
import RegistrationForm from './registration';
import './styles.css';
import Axious from 'axios';
import Home from './home';
import Button from 'react-bootstrap/Button';
function LoginForm() {


    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoginFlag, setLoginFlag]=useState(true)
    const [isHomePage, setHomePageFlag] = useState(false);
    const [isRegisterFlag, setRegisterFlag] = useState(false);
    const [userName, setuserData] = useState('');
    window.history.replaceState(null, 'login',"/login")
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }

    }

    const loginSubmit = () => {
        if(email && password){
        var requestObj = {

            "email": email,
            "password": password
        }


        Axious.post('http://localhost:4200/login', requestObj)
            .then((response) => {
                if (response.data.rowCount != 0) {
                    setuserData(response.data.rows[0].firstname +" "+ response.data.rows[0].lastname)
                    console.log("username", userName);
                    alert("Login Successful")
                    setHomePageFlag(true)
                    setLoginFlag(false)
                    setRegisterFlag(false)
                }
                else {
                    alert("Invalid Email or  Wrong Password entered")
                }
            }).catch(function (error) {
                alert(error.message)
            })

        }
        else{
            alert("Please enter email id and password")
        }
    }
    const registerUser = ()=>{
        setRegisterFlag(true)
        setLoginFlag(false);
    }
    if(isLoginFlag){

    
    return (
            
        <div className="form">
            <div className="form-body">
            <div className="row col-12 d-flex justify-content-center text-black">
                <h3>Login</h3>
            </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
                </div>

            </div>
            <div class="footer">
                <Button variant="success" style={{margin:"10px"}} onClick={() => loginSubmit()} type="submit" class="btn">Login</Button>
                <Button variant="danger" style={{margin:"10px"}} onClick={() => registerUser()} type="submit" class="btn">Sign Up</Button>

            </div>
        </div>
    )
    }
    if(isRegisterFlag){
        return <RegistrationForm/>
    }
    else{
        return <Home userData={userName}/>
    }
}

export default LoginForm