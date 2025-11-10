import React, { useContext } from 'react'; 
import { NavLink, useNavigate } from 'react-router'; 
import { AuthContext } from '../Auth/AuthProvider';
import { toast } from 'react-toastify';


function Register() {
   
    const { createUser, googleLogin, setUser, updateUser } = useContext(AuthContext);

    const navigate = useNavigate();


    const validatePassword = (password) => {
        if (password.length < 6) { return "Password must be at least 6 characters long."; }
        if (!/[A-Z]/.test(password)) { return "Password must include at least one uppercase letter (A-Z)."; }
        if (!/[a-z]/.test(password)) { return "Password must include at least one lowercase letter (a-z)."; }
        return null; 
    };

    const handleRegister = (e) => {
        e.preventDefault();
        
        const form = e.target;
        const name = form.name.value;
        const imageUrl = form.imageUrl.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            toast.error("Error: Passwords do not match!");
            return; 
        }

        const validationError = validatePassword(password);
        if (validationError) {
            toast.error(`Validation Failed: ${validationError}`);
            return;
        }

        createUser(email, password)
        .then((result) => {
            const user = result.user;
            
           
            updateUser({
                displayName: name,
                photoURL: imageUrl,
            })
            .then(() => {
                
                const updatedUser = { ...user, displayName: name, photoURL: imageUrl };
                setUser(updatedUser);
              
                navigate('/');
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
               
                setUser(user);
                toast.error("Registration successful, but profile update failed.");
            });
        })
        .catch((error) => {
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);
            toast.error("Registration Failed. Please try again.");
        });
    };

    const handleGoogleLogin = () => { 
        googleLogin()
            .then((result) => {
                const user = result.user;
                
              
                setUser(user); 
                
               
                   navigate('/');
            })
            .catch((error) => {
                console.error("Error code:", error.code);
                console.error("Error message:", error.message);
                toast.error("Login Failed. Please try again.");
            });
    }

    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <form onSubmit={handleRegister} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
                <legend className="fieldset-legend">Register</legend>
                
                <label className="label">Name</label>
                <input type="text" className="input" name="name" placeholder="Name" required />
                <label className="label">Image URL</label>
                <input type="text" className="input" name="imageUrl" placeholder="Image URL" required />
                <label className="label">Email</label>
                <input type="email" className="input" name="email" placeholder="Email" required />

                <label className="label">Password</label>
                <input type="password" className="input" name="password" placeholder="Password" required />
                <label className="label">Confirm Password</label>
                <input type="password" className="input" name="confirmPassword" placeholder="Confirm Password" required />

                <button type='submit' className="btn btn-neutral mt-4">Register</button>

                <button onClick={handleGoogleLogin} type="button" className="btn bg-white text-black border-[#e5e5e5] mt-3">
                    <svg
                        aria-label="Google logo"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Continue with Google
                </button>
                <p>Have any account? <span className="text-red-500"><NavLink to="/login">Login</NavLink></span></p>
            </form>
        </div>
    )
}

export default Register;