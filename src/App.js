import "./app.css";
import {  BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Router from "./router";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
