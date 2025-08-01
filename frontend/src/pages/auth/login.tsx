import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../assets/globalVariables";
import styles from "./auth.module.css";

interface UserView {
  name: string;
  email: string;
  password: string;
}

export default function LogIn() {
  const navigate = useNavigate();
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserView>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingLogin(true);
    try {
      const response = await fetch(`${BACKEND_URL}Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Data posted successfully:", data);

      // Handle success
      if (response.ok) {
        setLoadingLogin(false);
        localStorage.setItem("auth", data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className={styles.body}>
      <main>
        <h1>Welcome back</h1>
        <form onSubmit={handleLogIn}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit"> Log in</button>
        </form>
      </main>
    </div>
  );
}
