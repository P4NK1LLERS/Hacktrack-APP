import { useNavigate } from "react-router";
import React, { useState } from "react";
import Navbar from "../../components/NavBar.jsx";
import { useUserContext } from "../../UserContext.jsx";
import { z } from "zod";

//Creer le schema pour validation des données
const loginSchema = z.object({
  email: z.string().email("L'email n'est pas valide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});


function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userContext = useUserContext();

  const handleSignUp = async () => {
    try {
      const validationResult = loginSchema.safeParse({ email, password });

      if (!validationResult.success) {
        setError(validationResult.error.errors[0].message);
        return;
      }

      const res = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), //On envoie le mail et passaword dans le corp de la requete
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Connexion réussie:", data.token);
        localStorage.setItem("token", data.token); // On stocke le token d'identification dans le local storage 
        const user = { email: email, isAuthentified: true }; // On indique que l'utilisateur à un statut de connecté
        userContext.setUser(user);
        navigate("/"); //Navigation vers la page d'accueuil 
      } else {
        setError("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      setError("Une erreur réseau est survenue. Veuillez réessayer.");
    }
  };
//html fait avec des classes tailwind pour un style epuré
  return (
    <div> 
      <Navbar />
      <div className="home-container px-4 py-4 mt-20 max-w-lg mx-auto flex justify-center items-center h-screen">
        <div className="home-content">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Connexion à votre compte
              </h5>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Votre email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Votre mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-600 text-center">{error}</p>}
              <div className="flex items-start">
                <a
                  href="#"
                  className="text-center text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Mot de passe oublié ?
                </a>
              </div>
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Se connecter
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Pas encore inscrit ?{" "}
                <a
                  onClick={() => navigate("/register")}
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Créer un compte
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
