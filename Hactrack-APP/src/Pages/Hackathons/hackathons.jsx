import Navbar from "../../components/NavBar.jsx";
import { useUserContext } from "../../UserContext.jsx";
import React, { useState, useEffect } from "react";
import "./hackathons.css";

function Hackathons() {
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
      <div className="home-container">
        <div className="home-content">
          <h1>Page d'accueil Hacktrack</h1>
          <p>Bienvenue {user?.name}, sur Hacktrack</p>

          {events.length > 0 ? (
            <div className="hackathon-container">
              {events.map((event) => (
                <div key={event.id} className="hackathon">
                  <h2>{event.name}</h2>
                  <p>
                    <strong>Thème : </strong> {event.theme}
                  </p>
                  <p>
                    <strong>Date : </strong>
                    Le {new Date(event.startDate).toLocaleDateString()} de{" "}
                    {new Date(event.startDate).toLocaleTimeString(
                      "FR-fr",
                      options
                    )}{" "}
                    à{" "}
                    {new Date(event.endDate).toLocaleTimeString(
                      "FR-fr",
                      options
                    )}
                  </p>
                  <p>
                    <strong>Équipes inscrites :</strong> {event.registeredTeams}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Chargement des événements...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hackathons;
