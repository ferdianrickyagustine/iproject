import { Link, useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function Navbar() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      localStorage.clear();
      navigate("/login");
      Toastify({
        text: "Successfully logout account",
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
    <nav className="sticky top-0 bg-indigo-600 p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Pet Adoption
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-indigo-200">
            Home
          </Link>
          <Link to="/shelters" className="text-white hover:text-indigo-200">
            Shelter
          </Link>
          {/* <Link to="/species" className="text-white hover:text-indigo-200">
                        Species
                    </Link> */}
          <Link to="/add-pet" className="text-white hover:text-indigo-200">
            Add Pet
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-indigo-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
