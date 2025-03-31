import React from 'react';
import { Link, useNavigate } from 'react-router';
import './NavBar.css';
import { useUserContext } from '../UserContext.jsx';

function Navbar() {
  const navigate = useNavigate();
  const userContext = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token si deconnexion
    userContext.setUser({ email: '', isAuthentified: false }); // Mettre le contexte à false si deconnexion
    navigate('/Connexion'); // Se diriger vers la page de connexion
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Register">Register</Link></li>
        <li><Link to="/Hackathons">Hackathons</Link></li>

        {!userContext.user.isAuthentified ? ( {/* Si l'utilisateur n'est pas authentifié alors afficher les liens de connexion*/},
          <li><Link to="/Connexion">Connexion</Link></li>
        ) : (
          <>
            <li><Link to="/Dashboard">Dashboard</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-button">Déconnexion</button> {/* Bouton de déconnexion qui appelle la fonction handleLogout*/}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
