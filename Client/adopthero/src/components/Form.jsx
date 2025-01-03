import { useEffect, useState } from "react"
import Toastify from 'toastify-js'
import axios from 'axios'
import { url } from "../api/url"

export default function Form({ handleSubmit, propName, dataPet }) {
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [breed, setBreed] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [species, setSpecies] = useState([])
    const [shelterId, setShelterId] = useState("")
    const [speciesId, setSpeciesId] = useState("")


    async function fetchSpecies() {
        try {
            const { data } = await axios.get(`${url}/species`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setSpecies(data.data)
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
                onClick: function () { } // Callback after click
            }).showToast();
        }
    }

    useEffect(() => {
        fetchSpecies()
    }, [])

    useEffect(() => {
        if (dataPet) {
            setName(dataPet.name || "")
            setAge(dataPet.age || 0)
            setBreed(dataPet.breed || "")
            setDescription(dataPet.description || "")
            setImageUrl(dataPet.imageUrl || "")
            setSpeciesId(dataPet.speciesId || "")
        }
    }, [dataPet])

    return (
        <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-300 text-black">
            <h2 className="text-2xl font-bold pb-5 pt-5 flex justify-center">{propName}</h2>
            <form onSubmit={(e) => handleSubmit(e, name, age, breed, description, imageUrl, speciesId)}>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Pet name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block mb-2 text-sm font-medium">
                        Age
                    </label>
                    <input
                        type="text"
                        id="age"
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="breed" className="block mb-2 text-sm font-medium">
                        Breed
                    </label>
                    <input
                        type="text"
                        id="breed"
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                        onChange={(e) => setBreed(e.target.value)}
                        value={breed}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium">
                        Image Url
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                        onChange={(e) => setImageUrl(e.target.value)}
                        value={imageUrl}
                    />
                </div>
                <label htmlFor="species" className="block mb-2 text-sm font-medium">
                    Species
                </label>
                <select
                    className="bg-white text-black border border-gray-300 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-48 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-white dark:focus:border-white"
                    onChange={(e) => setSpeciesId(e.target.value)}
                    value={speciesId}
                >
                    <option value="">All Species</option>
                    {species.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>
                <div>
                    <p className="text-red-500 pb-5" />
                </div>
                <div className="flex items-center justify-center mb-4">
                    <button
                        type="submit"
                        className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
                    >
                        {propName}
                    </button>
                </div>
            </form>
        </div>

    )
}