import React, { useState } from "react";
import Navbar from "../../components/NavBar.jsx";
import { useNavigate } from "react-router";
import { useUserContext } from "../../UserContext.jsx";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("L'email n'est pas valide."),
  name: z.string().min(1, "Le nom est requis."),
  password: z
    .string()
    .min(8, "Le mot de passe doit faire au moins 8 caractères."), // on valides les données avec ZOD 
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, { // on valides les données avec ZOD 
  confirmPassword: z.string(),
  message: "Les mots de passe ne correspondent pas.",  // on valides les données avec ZOD 
  confirmPassword: z.string(),
  path: ["confirmPassword"],
});

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userContext = useUserContext();

  const handleSignUp = () => {
    const formData = { email, name, password, confirmPassword };

    const result = schema.safeParse(formData);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setError(""); // Reset error

    fetch("http://localhost:3002/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }), // on envoie dans le body , l'email , le nom et le pssaword 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("token", data.token); // on stock le token d'identification 
        const user = { email: email, isAuthentified: true }; // on change l'etat de connexion de l'utilisateur 
        userContext.setUser(user);
        navigate("/"); // on va à la page racine (/home)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
// utilisation de classes tailwind css pour un rendu propre et epuré 
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto mt-32">
        <form className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Create your account
          </h5>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Change la valeur de email avec ce qu'on recupere dans le form
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your first name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // idem 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="First Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // idem 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm your password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // idem  
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <button
            type="button"
            onClick={handleSignUp}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign Up
          </button>

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")} // on envoie sur le formulaire de connexion 
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
