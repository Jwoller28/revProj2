import React, { FormEvent, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../UserContext/UserContext';

function UserRegistration() {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[email, setEmail] = useState("");
    const[first_name, setFirstName] = useState("");
    const[last_name, setLastName] = useState("");
    const[photo_url, setPhotoUrl] = useState("");
    const navigate = useNavigate(); 
	
    function registerSubmit(event: FormEvent){

        event.preventDefault();
        const regUser = async () =>{
            try{
                const response = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username, password, email, first_name, last_name, photo_url})
                });
                
                const thingRet = response.json().then(data => console.log('Here is the data: ',data));
                console.log('Here is the thingRet variable: ', thingRet);
                // console.log('Here is the registered user response: ' ,response.json());

            }catch(error){
                console.log('Here is the error' ,error);
            }
        }
        regUser();
        console.log("Username:", username, "Password:", password, "Email:", email, "First Name:", first_name, "Last Name:", last_name, "Photo URL:", photo_url);
        
	navigate('/goals');
    }
  return (
    <>
        <form onSubmit={registerSubmit}>
        <label>Username:
            <input type='text' value={username} onChange={(e:any) => setUsername(e.target.value)}/>
        </label><br/>

        <label>Password:
            <input type='password' value={password} onChange={(e:any) => setPassword(e.target.value)}/>
        </label><br/>

        <label>Email:
            <input type='text' value={email} onChange={(e:any) => setEmail(e.target.value)}/>
        </label><br/>

        <label>First Name:
            <input type='text' value={firstName} onChange={(e:any) => setFirstName(e.target.value)}/>
        </label><br/>

        <label>Last Name:
            <input type='text' value={lastName} onChange={(e:any) => setLastName(e.target.value)}/>
        </label><br/>

        <label>Photo URL:
            <input type='text' value={photoUrl} onChange={(e:any) => setPhotoUrl(e.target.value)}/>
        </label><br/>

        <button type='submit'>Submit</button>
        </form>
    </>
  )
}

export default UserRegistration
