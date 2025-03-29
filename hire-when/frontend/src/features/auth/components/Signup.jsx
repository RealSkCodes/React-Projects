import { NavLink, useNavigate } from "react-router";
import InputField from "../../../shared/components/InputField.jsx";
import Button from "../../../shared/components/Button.jsx";
import { useState } from "react";
import { API_URL } from "../../../shared/helpers/constants.js";
import UserIcon from "../../../shared/assets/icons/UserIcon.jsx";
import EmailIcon from "../../../shared/assets/icons/EmailIcon.jsx";
import LockIcon from "../../../shared/assets/icons/LockIcon.jsx";

const Signup = () => {
  // States
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  // Other hooks
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      // Response and errors handling and showing in UI
      if (response.status === 201) {
        // Store the username and accessToken in context
        console.log(result.message);
        setError(null);
        navigate("/login");
      } else if (response.status === 409) setError("Email already exists");
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
        <h1 className="text-3xl font-bold">Register</h1>
        <h2 className="text-lg font-extralight mb-5">your account</h2>
        <div className="flex items-center border border-blue-300 px-3 my-2 rounded-md">
          <UserIcon />
          <InputField inpValue={formData.username} onInpChange={(e) => setFormData({ ...formData, username: e.target.value })} name="username" autoComplete="username" autofocus={true} inpType="text" titleStyle="m-0" mainBgStyle="my-2" inpPlaceholder="Username" inpStyle="min-w-[200] md:min-w-[270px] mx-0 my-0 autofill-text-input" isRequired={true} />
        </div>
        <div className="flex items-center border border-blue-300 px-3 my-2 rounded-md">
          <EmailIcon />
          <InputField inpValue={formData.email} onInpChange={(e) => setFormData({ ...formData, email: e.target.value })} name="email" autoComplete="email" inpType="email" titleStyle="m-0" mainBgStyle="my-2" inpPlaceholder="Email" inpStyle="min-w-[200] md:min-w-[270px] mx-0 my-0 autofill-text-input" isRequired={true} />
        </div>
        <div className="flex items-center border border-blue-300 px-3 my-2 rounded-md">
          <LockIcon />
          <InputField pattern="(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&;*\-]).{8,}" inpValue={formData.password} onInpChange={(e) => setFormData({ ...formData, password: e.target.value })} name="password" autoComplete="new-password" inpType="password" titleStyle="m-0" mainBgStyle="my-2" inpPlaceholder="Password" inpStyle="min-w-[200] md:min-w-[270px] mx-0 my-0 autofill-text-input" isRequired={true} />
        </div>
        <Button type="submit" className="px-4 py-2 my-2 bg-gradient-to-br from-primary to-secondary text-text active:from-secondary active:to-primary">
          Sign Up
        </Button>
        {error && (
          <div className="border border-red-100 rounded-md bg-red-400 p-2 mt-2 text-text">
            <span>{error}</span>
          </div>
        )}
        <NavLink className="mt-2 underline" to="/login">
          <span className="text-sm font-normal">Already a user? Login</span>
        </NavLink>
      </form>
    </div>
  );
};
export default Signup;
