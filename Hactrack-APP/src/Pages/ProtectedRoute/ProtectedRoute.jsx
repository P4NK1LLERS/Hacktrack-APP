import {useNavigate} from 'react-router';
import { useEffect } from 'react';
import { useUserContext } from '../../UserContext';


// Fonction pour protéger les routes
export default function ProtectedRoute() {
    const userContext = useUserContext();
    const navigate = useNavigate();

    // Vérifier si l'utilisateur est authentifié
    if(!userContext.user.isAuthentified){
        useEffect(() => {
            console.log("Protected Route");
            navigate('/connexion'); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
        }, []);
    }
}