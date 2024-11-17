import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Validation functions
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(postInputs.email);
  const isPasswordValid = postInputs.password.length >= 6; // Minimum password length 6
  const isNameValid = type === "signup" ? postInputs.name.trim().length > 0 : true; // Name is required for signup

  // Check if the form is valid
  const isFormValid = isEmailValid && isPasswordValid && isNameValid;

  // Handle Sign-Up or Sign-In based on the 'type' prop
  const handleAuthentication = () => {
    // Reset the errors first
    setErrors({
      name: "",
      email: "",
      password: "",
    });

    if (type === "signup") {
      if (localStorage.getItem(postInputs.email)) {
        setErrors((prev) => ({
          ...prev,
          email: "User already exists! Please sign in.",
        }));
      } else if (!isFormValid) {
        if (!isNameValid) {
          setErrors((prev) => ({ ...prev, name: "Name is required." }));
        }
        if (!isEmailValid) {
          setErrors((prev) => ({ ...prev, email: "Please enter a valid email." }));
        }
        if (!isPasswordValid) {
          setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters long." }));
        }
      } else {
        localStorage.setItem(postInputs.email, JSON.stringify(postInputs));
        navigate("/blogs"); // Redirect to blogs page on successful sign-up
      }
    } else if (type === "signin") {
      const userData = localStorage.getItem(postInputs.email);
      if (userData) {
        const storedUser = JSON.parse(userData);
        if (storedUser.password === postInputs.password) {
          navigate("/blogs"); // Redirect to blogs page on successful sign-in
        } else {
          setErrors((prev) => ({ ...prev, password: "Invalid password!" }));
        }
      } else {
        setErrors((prev) => ({ ...prev, email: "User not found! Please sign up." }));
      }
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-4xl font-extrabold pb-2">
            Welcome to InspireWrite! <br />
          </div>
          <div className="text-3xl font-extrabold">
            {type === "signup" ? "Create an account" : "Sign in to your account"}
          </div>
          <div className="text-slate-500 mt-3 mb-3">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
            <Link className="pl-2 underline" to={type === "signin" ? "/" : "/signin"}>
              {type === "signin" ? "Sign Up" : "Sign In"}
            </Link>
          </div>

          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Sahil Deshmukh"
              onChange={(e) =>
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                })
              }
              value={postInputs.name}
              error={errors.name}
            />
          )}

          <LabelledInput
            label="Email"
            placeholder="sahil@email.com"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              })
            }
            value={postInputs.email}
            error={errors.email}
          />

          <LabelledInput
            label="Password"
            type="password"
            placeholder="******"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              })
            }
            value={postInputs.password}
            error={errors.password}
          />

          <button
            type="button"
            className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={handleAuthentication}
            disabled={!isFormValid}
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value: string;
  error?: string;
}

function LabelledInput({ label, placeholder, onChange, type, value, error }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        value={value}
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default Auth;
