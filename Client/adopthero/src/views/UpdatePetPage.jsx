import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { url } from "../api/url";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import Toastify from "toastify-js";

export default function UpdatePetPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataPet, setDataPet] = useState({})
  async function handleSubmit(e, name, age, breed, description, imageUrl, speciesId) {
    e.preventDefault();
    try {
      const body = { name, age: +age, breed, description, imageUrl, speciesId: +speciesId };
      const { data } = await axios.put(`${url}/pets/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Successfully update an animal",
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
      navigate(`/pets/${id}`);
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

  async function getPet() {
    try {
        const { data } = await axios.get(`${url}/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })
        setDataPet(data.data)
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

  useEffect(() => {
    getPet()
  }, [])

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-800">
      <Form handleSubmit={handleSubmit} dataPet={dataPet} propName="Update Animal"/>
    </div>
  );
}
