// hooks/useUserName.js
import { useState, useEffect } from "react";
import { getUserName } from "../utils/firebase-config";
import { useAuth } from "../context/AuthContext";

export function useUserName() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      if (currentUser) {
        const userName = await getUserName(currentUser.uid);
        setName(userName);
      }
      setLoading(false);
    };

    fetchUserName();
  }, [currentUser]);

  return { name, loading };
}
