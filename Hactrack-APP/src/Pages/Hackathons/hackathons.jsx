import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/NavBar.jsx";
import { useUserContext } from "../../UserContext.jsx";

function Hackathons() {
  const { user } = useUserContext();
  const [events, setEvents] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1); // afficher la premiere page par default 

  const onPageDecrement = (e) => { // Foncction qui permet d'increment un compteur pour gerer la pagination 
    e.preventDefault();
    if (pageNumber == 1) {
      return;
    }
    setPageNumber(pageNumber - 1); // Si on clique sur precendent alors on decrement le nombre actuel de la page 
    setEvents(null);
  };

  const onPageIncrement = (e) => { // Idem pour ici mais on incremente 
    e.preventDefault();
    if (pageNumber == 3) {
      return;
    }
    setPageNumber(pageNumber + 1);
    setEvents(null);
  };

  if (events == null) {
    fetch(`http://localhost:3002/hackathons?page=${pageNumber}&limit=3`, { // dans les parametres de la requete API on specifie que l'on veut 3 élements par page 
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.status === 200) {
          setEvents(json);
          console.log(json);
        } else {
          console.error("Erreur API :", json);
        }
      })
      .catch((error) => console.error("Erreur de requête :", error));
  }

  const handleHackathonClick = (id) => {
    navigate(`/hackathon/${id}`); // Redirige vers la page de détails du hackathon avec l'ID
  };

  return (
    <div>
      <Navbar />
      <div className="home-container px-4 py-4 mt-20">
        {" "}
        {/* Ajout du margin-top pour décaler le contenu */}
        <div className="home-content">
          <h1 className="text-center text-4xl font-extrabold text-gray-900 tracking-wide leading-tight mb-6">
            Page d'accueil Hacktrack
          </h1>
          <p className="text-center text-lg text-gray-700 mb-6">
            Bienvenue sur Hacktrack
          </p>
          {events != null ? (
            <div className="flex flex-col justify-center items-center">
              <div className="hackathon-container flex flex-wrap justify-center gap-4">
                {events.map((event) => (
                  <a
                    key={event.id}
                    href="#"
                    className="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    onClick={() => handleHackathonClick(event.id)} // Clique pour aller sur la page de détails
                  >
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {event.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      <strong>Thème : </strong> {event.theme}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      <strong>Date : </strong>
                      Le {new Date(
                        event.startDate
                      ).toLocaleDateString()} de{" "}
                      {new Date(event.startDate).toLocaleTimeString()} à{" "}
                      {new Date(event.endDate).toLocaleTimeString()}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      <strong>Équipes inscrites : </strong>{" "}
                      {event.registeredTeams}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <p>Chargement des événements...</p>
          )}
          <div className="page-button flex justify-center gap-2 mt-4">
            <button
              onClick={onPageDecrement} // au clique du bouton on appelle la fonction decremente 
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Précédent
            </button>
            <button
              onClick={onPageIncrement}// au clique du bouton on appelle la fonction incremente
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hackathons;
