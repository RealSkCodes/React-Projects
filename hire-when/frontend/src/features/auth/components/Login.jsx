import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import InputField from "../../../shared/components/InputField.jsx";
import Button from "../../../shared/components/Button.jsx";
import EmailIcon from "../../../shared/assets/icons/EmailIcon.jsx";
import LockIcon from "../../../shared/assets/icons/LockIcon.jsx";
import { API_URL } from "../../../shared/helpers/constants.js";
import useAuth from "../../../shared/hooks/useAuth.js";

const Login = () => {
  // Custom Hooks
  const { setAuth } = useAuth();
  // States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [error, setError] = useState();
  // Other hooks
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("persist", stayLoggedIn);
    try {
      // Post the login user details to backend
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      // Response and errors handling and showing in UI
      if (response.status === 200) {
        // Store the username and accessToken in context
        setAuth({ userId: result.user_id, username: result.username, email: result.email, accessToken: result.access_token });
        console.log(result.message);
        setError(null);
        navigate(location?.state?.from?.pathname || "/", { replace: true });
      } else if (response.status === 401) setError("Invalid email or password");
      else if (response.status === 400) setError("Something went wrong");
      else {
        setError("Unexpected error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-background text-text">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center border border-border bg-background_3 rounded-lg p-5">
        <h1 className="text-3xl font-bold">Log Into</h1>
        <h2 className="text-lg font-extralight mb-5">your account</h2>
        <div className="flex items-center border border-blue-300 px-2 my-2 rounded-md">
          <EmailIcon />
          <InputField name="email" inpValue={formData.email} onInpChange={(e) => setFormData({ ...formData, email: e.target.value })} autoComplete="email" inpType="email" titleStyle="m-0" mainBgStyle="my-2" inpPlaceholder="Email" inpStyle="min-w-[200] md:min-w-[270px] mx-0 my-0 autofill-text-input" isRequired={true} autofocus />
        </div>
        <div className="flex items-center border border-blue-300 px-2 my-2 rounded-md">
          <LockIcon />
          <InputField name="password" inpValue={formData.password} onInpChange={(e) => setFormData({ ...formData, password: e.target.value })} autoComplete="current-password" inpType="password" titleStyle="m-0" mainBgStyle="my-2" inpPlaceholder="Password" inpStyle="min-w-[200] md:min-w-[270px] mx-0 my-0 autofill-text-input" isRequired={true} />
        </div>
        <Button type="submit" className="px-4 py-2 my-2 bg-gradient-to-br from-primary to-secondary text-text active:from-secondary active:to-primary">
          Log In
        </Button>
        <div className="flex justify-center items-center">
          <InputField inpType="checkbox" onInpChange={(e) => setStayLoggedIn(e.target.checked)} inpValue={stayLoggedIn} inpStyle="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <p className="text-blue-300 text-base pt-1">Keep me logged in</p>
        </div>
        {error && (
          <div className="border border-red-100 rounded-md bg-red-400 p-2 mt-2 text-text">
            <span>{error}</span>
          </div>
        )}
        <NavLink className="mt-2 underline" to="/signup">
          <span className="text-sm font-normal">Don't have an account? Register</span>
        </NavLink>
      </form>
    </div>
  );
};
export default Login;
