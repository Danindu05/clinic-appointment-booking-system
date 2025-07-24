import { db } from "./firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const q = query(
      collection(db, "patients"),
      where("username", "==", username),
      where("password", "==", password)
    );

    try {
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const user = snapshot.docs[0].data();
        if (user.role === "admin") {
          alert("Welcome, Admin!");
          window.location.href = "/admin-dashboard";
        } else {
          alert("Welcome, Patient!");
          window.location.href = "/patient-dashboard";
        }
      } else {
        alert("Invalid username or password.");
      }
    } catch (err) {
      alert("Login error: " + err.message);
    }
  });
});
