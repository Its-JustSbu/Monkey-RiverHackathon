import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../assets/globalVariables";
import styles from "./auth.module.css"

interface FormData {
  name: string;
  password: string;
  email: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [loadingSignup, setLoadingSignup] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setLoadingSignup(true);
    const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    const data = await response.json();

    if (response.ok) {
      setLoadingSignup(false);
      //toast.success("Successfully registered");
      navigate("/home");
    } else {
      //toast.error("Error signing you up")

    }
  };

  return (
    <main>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>  
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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
        <button type="submit"> Sign up</button>
      </form>
    </main>
  );
}
