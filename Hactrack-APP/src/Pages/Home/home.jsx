import React from 'react';
import { Link } from 'react-router';
import Navbar from '../../components/NavBar.jsx';
import './home.css';

// Page d'accueil
function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1>Bienvenue sur Hacktrack</h1>
        <p>Gérez vos hackathons efficacement et en toute simplicité.</p>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Hackathons X SNCF</h3>
            <p>Visualisez vos statistiques et performances.</p>
          </div>
          <div className="feature-card">
            <h3>Hackathons X MAF</h3>
            <p>Ajoutez, modifiez et supprimez des utilisateurs.</p>
          </div>
          <div className="feature-card">
            <h3>Hackathons X Nantes Metropole</h3>
            <p>Personnalisez votre espace selon vos besoins.</p>
          </div>
        </div>
        <div className="actions-container">
          <Link to="/connexion" className="btn btn-primary">Connexion</Link>
          <Link to="/register" className="btn btn-secondary">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
