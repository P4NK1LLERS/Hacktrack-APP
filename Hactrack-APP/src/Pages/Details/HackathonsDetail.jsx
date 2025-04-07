import React, { useState, useEffect } from "react";
import { useParams } from "react-router"; 
import Navbar from '../../components/NavBar.jsx'; //On importe la nav bar 
import { useUserContext } from "../../UserContext.jsx";

function HackathonDetail() {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null); 
  const { user } = useUserContext();
  const [name, setName] = useState('');
  const [error, setError] = useState(""); 

  const onCreateTeam = (e) => {
    e.preventDefault();

    if (!user.isAuthentified) { //On creer un fonction qui verifier que l'utilisateur est bien connecté 
      setError("Authentifiez-vous !!!!");
      console.log("Vous ne pouvez pas créer de team car non authentifié");
      return;
    }

    fetch(`http://localhost:3002/teams/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // On met dans le body le token pour prouver l'identité 
      },
      body: JSON.stringify({ //On envoie dans le corps le nom et l'id de team 
        name: name,
        hackathonId: parseInt(id),
      }),
    })
    .then(async (res) => {
      const json = await res.json();
      if (res.status === 201) {
        console.log("Success");
        setEvent(null); // On reenclenche le fecth apres la creation pour voir le changements sans devoir recharger la page 
      } else {
        console.error("Erreur API:", json);
        setError("Erreur lors de la création de l'équipe");
      }
    })
    .catch(() => setError("Erreur de connexion au serveur"));
  };

  const handleJoinTeam = (teamId) => { // Fonction permettant de rejoindre une equipe 
    if (!user.isAuthentified) { // On verifie que l'utilisateur est bien connecté 
      setError("Authentifiez-vous !!!!");
      console.log("Vous ne pouvez pas rejoindre une équipe car non authentifié");
      return;
    }

    fetch(`http://localhost:3002/teams/join/${teamId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        hackathonId: parseInt(id), // On met l'id du hackathons que l'on veut rejoindre 
        // Il est recuperer dans le const id 
      }),
    })
    .then(async (res) => {
      const json = await res.json();
      if (res.status === 201) { // Si reponse api est egale à 201 alors on affiche un mssage de succes 
        console.log("Succès ! Vous avez rejoint l'équipe.");
        setEvent(null); // On relance une v=nouvelle fois le fecth pour eviter de reactualiser 
      } else {
        console.error("Erreur API:", json);
        setError("Erreur lors de l'inscription à l'équipe");
      }
    })
    .catch(() => setError("Erreur de connexion au serveur"));
  };

    if(event == null){
      fetch(`http://localhost:3002/hackathons/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // on met le token dans le header AUtorization pour prouver l'identité 
        },
      })
      .then(async (res) => {
        const json = await res.json();
        if (res.status === 200) {
          setEvent(json); 
          console.log(json);
        } else {
          console.error("Erreur API :", json);
          setError("Erreur lors de la récupération des données du hackathon");
        }
      })
      .catch((error) => {
        console.error("Erreur de requête :", error);
        setError("Erreur de connexion au serveur");
      });
    }
    
    // tant que nous n'avons pas recuperé de Hackathons on affiche le message suivant. 
  if (!event) {
    return <p className="text-center text-lg text-gray-700">Chargement des détails du hackathon...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="home-container px-4 py-4 mt-20">
        <div className="home-content">
          <h1 className="text-center text-4xl font-extrabold text-gray-900 tracking-wide leading-tight mb-6">{event.name}</h1>
          <p className="text-center text-lg text-gray-700 mb-6">{event.theme}</p>
          <div className="flex flex-col justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong>Thème :</strong> {event.theme}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong>Date de début :</strong> {new Date(event.startDate).toLocaleDateString()}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong>Date de fin :</strong> {new Date(event.endDate).toLocaleDateString()}
              </p>
              <div className="flex justify-center gap-2 mt-4">
                <form onSubmit={onCreateTeam} className="w-full">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Prendre le nom renseigné dans le form pour utiliser dans la creation d'equipe 
                    className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nom de l'équipe"
                  />
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Créer une équipe
                  </button>
                </form>
              </div>
            </div>
            {event.teams?.length > 0 && ( // Boucle qui permet d'afficher tout les hackathons 
              <div className="mt-6 w-full px-4 lg:px-20">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Équipes :</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"> {/* Réduit le gap entre les éléments */}
                  {event.teams.map((team) => ( // Boucle pour afficer les equipes de chaque hackathons 
                    <div
                      key={team.id}
                      className="border p-3 rounded-xl dark:border-gray-600 bg-gray-50 dark:bg-gray-700 max-w-xs mx-auto" // Augmentation du border-radius à rounded-xl
                    >
                      <p className="font-medium text-gray-800 dark:text-white text-lg mb-2">{team.name}</p>

                      {team.users?.length > 0 && (
                        <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 mb-4">
                          {team.users.map((user) => ( // Boucle pour afficher tous les menbres d'un hackathons 
                            <li key={user.id}>{user.name}</li>
                          ))}
                        </ul>
                      )}

                      <button
                        onClick={() => handleJoinTeam(team.id)} // Au clique du bouton lancer la fonction pour rejoindre une équipe 
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                      >
                        S'inscrire à cette équipe
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}



            {error !== "" && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-center">
                Erreur : {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HackathonDetail;
