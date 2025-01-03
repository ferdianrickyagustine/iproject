import axios from 'axios'
import { url } from '../api/url'
import { useState } from 'react'
import Toastify from 'toastify-js'
import { useNavigate } from 'react-router'


export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const body = { username, email, password, phoneNumber }
            const { data } = await axios.post(`${url}/register`, body)
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
                onClick: function(){} // Callback after click
              }).showToast();
              navigate("/login")

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
                onClick: function(){} // Callback after click
              }).showToast();
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen"
            style={{
                backgroundImage: 'url("https://img.freepik.com/free-photo/abstract-luxury-blur-dark-grey-black-gradient-used-as-background-studio-wall-display-your-products_1258-68034.jpg")',
                backgroundSize: 'cover',  // Ensures the image covers the entire container
                backgroundPosition: 'center',  // Centers the image
                backgroundRepeat: 'no-repeat'  // Prevents the image from repeating
            }}
        >
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div
                    className="hidden bg-cover lg:block lg:w-1/2"
                    style={{
                        backgroundImage:
                            'url("https://images.pexels.com/photos/29805699/pexels-photo-29805699.jpeg?cs=srgb&dl=pexels-jaralol-29805699.jpg&fm=jpg")'
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
                        <a
                            href="#"
                            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <div className="px-4 py-2">
                                <svg className="w-6 h-6" viewBox="0 0 40 40">
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#FFC107"
                                    />
                                    <path
                                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                        fill="#FF3D00"
                                    />
                                    <path
                                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                        fill="#4CAF50"
                                    />
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#1976D2"
                                    />
                                </svg>
                            </div>
                            <span className="w-5/6 px-4 py-3 font-bold text-center">
                                Sign in with Google
                            </span>
                        </a>
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
                                onClick={() => {navigate("/login")}}
                            >
                                or sign in
                            </a>
                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}