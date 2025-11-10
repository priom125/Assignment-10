import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";

function Login() {
  const { signIn, googleLogin,setUser } = use(AuthContext);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });
    signIn(email, password)
      .then((result) => {
        console.log("User Login Complete:", result.user);
         const user = result.user;
        setUser(user);
       
           navigate('/');

      })
      .catch((error) => {
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
         toast.error("Login Failed. Please try again.");
      });
  };

const ContinueWithLogin = () => {
    googleLogin()
   .then((result) => {
            const user = result.user; 
            
          
            console.log("User Email:", user.email);
            console.log("User DisplayName from Google:", user.displayName);
            console.log("User PhotoURL from Google:", user.photoURL);
            
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
      <form
        onSubmit={handleLogin}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 "
      >
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          name="email"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          name="password"
          placeholder="Password"
        />

        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>

        <button onClick={ContinueWithLogin} type="button" className="btn bg-white text-black border-[#e5e5e5] mt-3">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Continue with Google
        </button>
        <p>
          Don't have any account?{" "}
          <span className="text-red-500">
            <NavLink to="/register">Register</NavLink>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
