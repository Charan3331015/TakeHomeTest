import React, {useState,setState} from 'react';
import './styles.css';
import Axious from 'axios';

function RegistrationForm() {
    
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    window.history.replaceState(null, 'registration',"/registration")
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = () => {
        if(!(firstName && email && password && confirmPassword)){
            alert("Plesae fill all the mandatory fields")
        }
        else if(!(password == confirmPassword)){
            alert("Password and Confirm Password are not matching");
            setConfirmPassword('');
        }
        else{
        var requestObj= {
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "password":password
        }
       
        console.log("tirusdfsdf",requestObj)
        
        Axious.post('http://localhost:4200/registration', requestObj)
        .then((response)=>{
            if (response.data&&response.data =='duplicate key value violates unique constraint "user_pkey"'){
                alert("Email already exist, Please provide other email");
                setEmail("");
            }
            else if(response.data&&response.data =='Insertion was successful'){
                alert("User Registration Successful");
                window.location.reload()
            }
            console.log("resp", response.data);
        }).catch(function(error){
            alert(error.message)
        })
       
    }
    }

    return(
        <div className="form">
            <div className="row col-12 d-flex justify-content-center text-black">
                <h3>Registration</h3>
            </div>
            <div className="form-body">
                <div className="username">
                    <label className="form__label required" for="firstName">First Name </label>
                    <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                </div>
                <div className="lastname">
                    <label className="form__label" for="lastName">Last Name </label>
                    <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </div>
                <div className="email">
                    <label className="form__label required" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form__label required" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label required" for="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div class="footer">
                <button className="btn btn-success" onClick={()=>handleSubmit()} type="submit">Register</button>
                <span style={{"margin":"20px",color:"blue"}} onClick={()=>window.location.reload()}>Sign In</span>
            </div>
        </div>
       
    )       
}

export default RegistrationForm