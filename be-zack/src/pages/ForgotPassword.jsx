import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      setLoading(true);
      await forgotPassword(email);
      setMessage("A password reset link has been sent to your email.");
    } catch (error) {
      setError("Failed to send password reset email. Please check if the email is correct and try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          type="email"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <button disabled={loading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
