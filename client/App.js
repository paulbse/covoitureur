import React from "react";
import Navigation from "./components/Navigation";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.190:8000";


export default function App() {
  return <Navigation />;
}
