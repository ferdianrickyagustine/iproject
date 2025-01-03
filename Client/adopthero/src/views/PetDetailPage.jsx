import axios from "axios";
import { url } from "../api/url";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Toastify from "toastify-js";

export default function PetDetailPage() {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const navigate = useNavigate();

  async function fetchPetDetail() {
    try {
      const { data } = await axios.get(`${url}/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setPet(data.data);
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

  async function handleAdopt() {
    try {
      const { data } = await axios.post(
        `${url}/pets/${id}/adopt`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
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
      navigate(`/`);
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

  async function handleDelete() {
    try {
      const { data } = await axios.delete(`${url}/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
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
      navigate(`/`);
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

  async function handleUpload(e, id) {
    try {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("file", image);

      const { data } = await axios.patch(`${url}/pets/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

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

      fetchPetDetail();
    } catch (error) {
      Toastify({
        text: error.response.data.error || "Failed to upload image",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    }
  }
  useEffect(() => {
    fetchPetDetail();
  }, []);

  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gray-900 p-5">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-10 md:px-10 bg-yellow-500 pt-10 pb-10 rounded-2xl">
          <div className="pl-10">
            <h1 className="mb-2 text-3xl font-bold text-white">
              <span className="text-red-500 underline drop-shadow-2xl">
                Hi,
              </span>
              <span className="underline drop-shadow-2xl"> My name is </span>
              <span className="text-black underline drop-shadow-2xl">
                {pet.name}
              </span>
            </h1>
            <p className="mb-6 mt-4 text-white text-2xl">{pet.description}</p>
            <div className="flex justify-center space-x-5 pb-5">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white p-5 py-3 font-semibold"
                onClick={() => {
                  navigate(`/update-pet/${pet.id}`);
                }}
              >
                Update
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
              <button
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white p-5 py-3 font-semibold hover:bg-red-500"
                onClick={handleDelete}
              >
                Delete
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    d="M19 5L4.99998 19M5.00001 5L19 19"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div>
              <button
                className="flex w-full items-center justify-center gap-1 rounded-2xl bg-rose-500 p-5 py-3 font-semibold text-white hover:bg-rose-700"
                onClick={handleAdopt}
              >
                Adopt Me
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-10">
            <div className="relative p-10 flex justify-center">
              <div
                className="group relative w-96 h-96 rounded-full overflow-hidden border-4 border-yellow-700 shadow-lg cursor-pointer"
                onClick={() =>
                  document.getElementById(`fileInput${pet.id}`).click()
                }
              >
                <img
                  src={pet.imageUrl}
                  alt="Pet"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl font-bold">
                    Edit Photo
                  </span>
                </div>
              </div>
              <input
                type="file"
                id={`fileInput${pet.id}`}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleUpload(e, pet.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
