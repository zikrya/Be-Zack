import { useUserName } from "../components/profileInfo";
import { useProtectedRoute } from "../components/useProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { getUserName } from "../utils/firebase-config";

const Profile = () => {

    useProtectedRoute();

    const { currentUser } = useAuth();
    const { name: userName, loading } = useUserName();
    return (
        <div>
            <br />
            <h1>Profile</h1>
            {userName ? (
        <h2>Name: {userName}</h2>
      ) : (
        <h2>Name:</h2>
      )}
        </div>
     );
}

export default Profile;