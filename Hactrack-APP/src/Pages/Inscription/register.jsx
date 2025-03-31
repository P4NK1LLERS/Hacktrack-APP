// Importation des modules
import React, { useState } from 'react';
import Navbar from '../../components/NavBar.jsx';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../UserContext.jsx';


function Register() {
  // Initialisation des variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userContext = useUserContext();
  


  const handleSignUp = () => {
    // Vérification du mot de passe
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setError(''); // Réinitialiser l'erreur

    fetch('http://localhost:3002/auth/register', { // Appel de l'API pour l'inscription
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name , password}), // Envoi des données
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        localStorage.setItem('token', data.token); // Stocker le token dans le local storage
        const user = { email: email, isAuthentified: true }; // Mettre le contexte à true si l'utilisateur est authentifié
        userContext.setUser(user);
        navigate('/dashboard'); // Rediriger vers le dashboard
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="signup-form">
        <h2>Inscription</h2>
        <div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> // Mettre à jour l'email
        </div>
        <div>
          <input type="text" placeholder="Prenom" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <input type="password" placeholder="Confirmez le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <button onClick={handleSignUp}>S'inscrire</button>  // Appeler la fonction handleSignUp
        </div>
      </div>
    </div>
  );
}

export default Register;
