import { useNavigate } from "react-router";

export default function Card({ pet }) {
    const navigate = useNavigate()

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:animate-pulse"
      onClick={() => {navigate(`/pets/${pet.id}`)}}
      >
        <img src={pet.imageUrl} alt={pet.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
          <p className="text-gray-600">{pet.species} - {pet.breed}</p>
          <p className="text-gray-600">{pet.age} years old</p>
        </div>
      </div>
    );
  }