import axios from "axios";
import { url } from "../api/url";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";

export default function ShelterPage() {
  const [shelters, setShelters] = useState([]);
  const navigate = useNavigate();

  async function fetchShelter() {
    try {
      const { data } = await axios.get(`${url}/shelters`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setShelters(data.shelters);
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

  useEffect(() => {
    fetchShelter();
  }, []);

  return (
    <div className="bg-gray-800">
      {shelters.map((shelter) => {
        return (
          <section
            key={shelter.id}
            className="container mx-auto p-10 flex antialiased "
          >
            <article className="bg-white flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-2xl transform duration-500 hover:-translate-y-1">
              <img
                className="w-full max-h-[400px] object-cover md:w-52"
                src="https://cdn.homepaketo.com/wp-content/uploads/2024/08/23144705/3215932159-8.jpg"
                alt=""
              />
              <div className="">
                <div className="p-5 pb-10">
                  <h1 className="text-2xl font-semibold text-gray-800 mt-4 underline">
                    {shelter.name}
                  </h1>
                  <p className="text-base text-gray-600 mt-2 leading-relaxed">
                    Address: {shelter.location}
                  </p>
                </div>
                <div className="bg-blue-50 p-5 w-full box-border">
                  <div className="sm:flex sm:justify-between w-full">
                    <div>
                      <div className="text-base text-gray-700">
                        <span className="text-gray-900 font-bold">Phone:</span>{" "}
                        {shelter.phone}
                      </div>
                      <div className="text-base text-gray-700 mb-5">
                        <span className="text-gray-900 font-bold">Email:</span>{" "}
                        {shelter.email}
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-red-600 hover:bg-red-700 font-bold text-white md:text-lg rounded-lg shadow-md"
                    onClick={() => {
                      navigate(`/shelters/${shelter.id}/pets`);
                    }}
                  >
                    See Pet
                  </button>
                </div>
              </div>
            </article>
          </section>
        );
      })}
    </div>
  );
}
