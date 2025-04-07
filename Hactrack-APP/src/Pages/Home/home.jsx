import { Link } from 'react-router';
import Navbar from '../../components/NavBar.jsx';
import { useUserContext } from "../../UserContext.jsx";
import React, { useState, useEffect } from "react";

function HackathonsTri() {
  const { user } = useUserContext();
  const [events, setEvents] = useState([]); // Utilisation d'un tableau pour stocker tous les événements
  const token = localStorage.getItem("token");
  const options = { hour: "2-digit", minute: "2-digit" };

  useEffect(() => {
    fetch("http://localhost:3002/hackathons", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.status === 200) {
          console.log("Données reçues :", json);
          setEvents(json); // Stocke tous les événements dans le state
        } else {
          console.error("Erreur API :", json);
        }
      })
      .catch((error) => console.error("Erreur de requête :", error));
  }, [token]);

  return (
    <div>
      <Navbar />
      <div className="home-container px-4 py-4 mt-20">
        <div className="home-content">
          <h1 className="text-center text-4xl font-extrabold text-gray-900 tracking-wide leading-tight mb-6">Page d'accueil Hacktrack</h1>
          <p className="text-center text-lg text-gray-700 mb-6">Bienvenue sur Hacktrack</p>

          {/* Liens de connexion */}
          <div className="flex justify-center gap-4 mb-6">
            <Link to="/connexion" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Connexion
            </Link>
            <Link to="/register" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Créer un compte
            </Link>
          </div>

          {/* Affichage des événements */}
          {events.length > 0 ? (
            <div className="flex flex-col justify-center items-center">
              <div className="hackathon-container flex flex-wrap justify-center gap-4">
                {events.slice(0, 4).filter((event) => new Date(event.startDate) > new Date()).map((event) => (
                  <a
                    key={event.id}
                    href="#"
                    className="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {event.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      <strong>Thème : </strong> {event.theme}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      <strong>Date : </strong>
                      Le {new Date(event.startDate).toLocaleDateString()} de{" "}
                      {new Date(event.startDate).toLocaleTimeString("FR-fr", options)} à{" "}
                      {new Date(event.endDate).toLocaleTimeString("FR-fr", options)}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      <strong>Équipes inscrites : </strong> {event.registeredTeams}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <p>Chargement des événements...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HackathonsTri;
