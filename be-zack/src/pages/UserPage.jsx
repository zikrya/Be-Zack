import { useProtectedRoute } from "../components/useProtectedRoute";
import { useAuth } from "../context/AuthContext";
import{useState, useEffect} from "react"
import { updateUserName, getUserName } from "../utils/firebase-config";

const UserPage = () => {
    useProtectedRoute();
    const { currentUser } = useAuth();
    const [name, setName] = useState("");
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
      if (currentUser) {
        getUserName(currentUser.uid).then((name) => setDisplayName(name));
      }
    }, [currentUser]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (currentUser) {
        await updateUserName(currentUser.uid, name);
        setDisplayName(name);
        setName("");
      }
    };
    return (
        <div>
            <br />
            <h1>Update User Info</h1>
            <br />
            <h2>Hey {displayName ? displayName : "User"}!</h2>
            <form onSubmit={handleSubmit}>
            <div className="relative mb-3 xl:w-96" data-te-input-wrapper-init>
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleFormControlInputText"
    placeholder="Example label" />
  <label
    htmlFor="exampleFormControlInputText"
    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
    >Name
  </label>
</div>
<button type="submit">Update</button>
</form>
        </div>
     );
}

export default UserPage;
