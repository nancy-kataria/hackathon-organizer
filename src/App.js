import "./app.css";
import {  HashRouter } from "react-router-dom";
import Header from "./components/header";
import Router from "./router";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Router />
      </div>
    </HashRouter>
  );
}

export default App;
