import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../api/url";
import Toastify from "toastify-js";
import { useNavigate, useParams } from "react-router";
import Card from "../components/Card";

export default function ShelterPetPage() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchPets() {
    try {
      const { data } = await axios.get(`${url}/shelters/${id}/pets`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setPets(data.data.Pets);
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

  async function fetchSpecies() {
    try {
      const { data } = await axios.get(`${url}/species`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setSpecies(data.data);
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
    fetchSpecies();
  }, []);

  useEffect(() => {
    fetchPets()
  }, [])

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="flex justify-center pt-10">
        <label className="sr-only">Underline select</label>
      </div>
      <div className="p-10 grid grid-cols-6 gap-8">
        {pets.map((pet) => {
          return <Card key={pet.id} pet={pet} />;
        })}
      </div>
    </div>
  );
}
