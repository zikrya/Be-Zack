import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { currentUser } = useAuth();
    return (
        <div className="format">
            <br />
            <h1>BeZack</h1>
        </div>
     );
}

export default Home;