import axios from "axios";
import { url } from "../api/url";
import { useState } from "react";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  async function googleLogin(codeResponse) {
    try {
      // console.log(codeResponse);
      const { data } = await axios.post(`${url}/google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });
      console.log(data);

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);

      Toastify({
        text: error.response.data.message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = { username, email, password, phoneNumber };
      const { data } = await axios.post(`${url}/register`, body);
      Toastify({
        text: data.message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "green",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      navigate("/login");
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/abstract-luxury-blur-dark-grey-black-gradient-used-as-background-studio-wall-display-your-products_1258-68034.jpg")',
        backgroundSize: "cover", // Ensures the image covers the entire container
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
      }}
    >
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/29805699/pexels-photo-29805699.jpeg?cs=srgb&dl=pexels-jaralol-29805699.jpg&fm=jpg")',
          }}
        />
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="https://cdn-icons-png.flaticon.com/512/5308/5308494.png"
                alt=""
              />
            </div>
            <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              Welcome back!
            </p>
            <div className="mt-6 flex justify-center items-center">
              <GoogleLogin onSuccess={googleLogin} />
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or sign up with email
              </a>
              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>
              <input
                id="loggingPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Sign Up
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
              <a
                className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                onClick={() => {
                  navigate("/login");
                }}
              >
                or sign in
              </a>
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
