import { Link } from "react-router-dom"


// Creating the typing for the props that are being brought into UserLogin from UserManagement
type UserLoginProps ={
    username: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit:any,
    handleRegister: any
}

// Form that gets displayed on the webpage
function UserLogin({username, setUsername, password, setPassword, handleSubmit, handleRegister}: UserLoginProps) {
  return (
    <form onSubmit={handleSubmit}>
        <label>Username:
            <input type='text' placeholder="Enter Username" value={username} onChange={(e:any) => setUsername(e.target.value)} required/>
        </label><br/>

        <label>Password:
            <input type='password' placeholder="Enter Password" value={password} onChange={(e:any) => setPassword(e.target.value)} required/>
        </label><br/>

        <button type='submit'>Submit</button>
        <button onClick={handleRegister}>Create Account</button>
        <Link to="/nutriapi">
          <button>Access Api</button>
        </Link>
    </form>
  )
}

export default UserLogin