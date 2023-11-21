import React from "react";
import Navigation from "./components/Navigation";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";


export default function App() {
  return <Navigation />;
}
