import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Home/Navbar.jsx";
import Footer from "../components/Home/Footer.jsx";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/user/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setFullName(res.data.fullname);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/api/v1/user/users/${id}`, {
        fullname,
        email,
      });
      setUser(res.data);
      setEditMode(false);
      setFullName("");
      setEmail("");
      // handleUpdate("");
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile.");
    }
  };

  if (!user) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor : "#e6f3f4"}}>
      <Navbar />

      <div className="p-6 max-w-lg mx-auto flex-1">
        <h2 className="text-2xl font-bold mb-4">👤 User Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!editMode}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editMode}
              className="w-full p-2 border rounded"
            />
          </div>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"  style={{backgroundColor : "#145E7C"}}
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
           style={{backgroundColor : "#145E7C"}} >
              Save Changes
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserProfile;
