import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import BaseLayout from "./views/BaseLayout";
import HomePage from "./views/HomePage";
import PetDetailPage from "./views/PetDetailPage";
import AddPetPage from "./views/AddPetPage";
import UpdatePetPage from "./views/UpdatePetPage";
import ShelterPage from "./views/ShelterPage";
import ShelterPetPage from "./views/ShelterPetPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<BaseLayout/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets/:id" element={<PetDetailPage />} />
        <Route path="/add-pet" element={<AddPetPage />} />
        <Route path="/update-pet/:id" element={<UpdatePetPage />} />
        <Route path="/shelters" element={<ShelterPage />} />
        <Route path="/shelters/:id/pets" element={<ShelterPetPage />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

