import { useNavigate } from "react-router";
import axios from "axios";
import { url } from "../api/url";
import Toastify from "toastify-js";
import Form from "../components/Form";

export default function AddPetPage() {
  const navigate = useNavigate();

  async function handleSubmit(e, name, age, breed, description, imageUrl, speciesId) {
    e.preventDefault();
    try {
      const body = { name, age: +age, breed, description, imageUrl, speciesId: +speciesId };
      const { data } = await axios.post(`${url}/pets`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Successfully added an animal",
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
  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-800">
      <Form handleSubmit={handleSubmit} propName="Add Animal"/>
    </div>
  );
}
