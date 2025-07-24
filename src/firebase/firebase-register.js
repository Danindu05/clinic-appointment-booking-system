// src/firebase/firebase-register.js

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.js";

/**
 * Registers a new patient in the Firestore 'patients' collection.
 * @param {Object} patientData - The patient details (name, email, phone, dob, gender, medicalNotes).
 * @returns {Promise<boolean>} - Returns true if successful, false if an error occurred.
 */
export default async function registerPatient(patientData) {
  try {
    const docRef = await addDoc(collection(db, "patients"), patientData);
    console.log("Patient registered with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error registering patient: ", error);
    return false;
  }
}
