import React, { useState } from "react";
import styles from "./Profile.module.css";

function Profile() {
  const [name, setName] = useState("User Name");
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("user@example.com");
  const [role] = useState("Member");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add save logic here
    alert("Profile updated!");
  };
  return (
    <div className={styles.profilecontainer}>
      <h2>Edit Profile</h2>
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`}
        alt="Profile"
        className={styles.imgcontainer}
      />
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>
            Change Password:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>
            <input type="checkbox" style={{ marginRight: "0.5rem" }} />
            Receive newsletter
          </label>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>
            <input type="checkbox" style={{ marginRight: "0.5rem" }} />
            Enable notifications
          </label>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong>Role:</strong> {role}
        </div>
        <button type="submit" style={{ marginTop: "1.5rem" }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
