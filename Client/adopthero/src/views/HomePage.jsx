import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../api/url";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchPets } from "../features/pet";

export default function HomePage() {
  const [species, setSpecies] = useState([]);
  const [filter, setFilter] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const { pets, loading, error } = useSelector((state) => state.pets);
  const dispatch = useDispatch();

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
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        style: { background: "red" },
      }).showToast();
    }
  }

  async function sendMessage() {
    if (!chatInput.trim()) return;

    const userMessage = { text: chatInput, sender: "You" };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    setChatLoading(true);
    try {
      const { data } = await axios.post(`${url}/popular-animal`, {
        message: chatInput,
      });
      const botMessage = { text: data.text, sender: "AI" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Error: Unable to get a response. Try again later.",
          sender: "AI",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  useEffect(() => {
    fetchSpecies();
  }, []);

  useEffect(() => {
    dispatch(fetchPets(filter));
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="flex justify-center pt-10">
        <select
          className="bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-48 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="">All Species</option>
          {species.map((s) => {
            return (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            );
          })}
        </select>
      </div>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen bg-black text-white">
            Loading...
          </div>
        </>
      ) : (
        <>
          <div className="p-10 grid grid-cols-6 gap-8">
            {pets.map((pet) => (
              <Card key={pet.id} pet={pet} />
            ))}
          </div>
        </>
      )}

      <div className="fixed bottom-4 right-4 w-72">
        <div
          className="bg-blue-600 text-white px-4 py-2 rounded-t-lg cursor-pointer"
          onClick={() => setChatOpen(!chatOpen)}
        >
          {chatOpen ? "Chat (Minimize)" : "Chat (Open)"}
        </div>
        {chatOpen && (
          <div className="bg-white shadow-lg rounded-b-lg flex flex-col h-96">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg text-sm ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center border-t border-gray-300 p-2">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !chatLoading) sendMessage();
                }}
                disabled={chatLoading}
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50"
                disabled={chatLoading}
              >
                {chatLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
