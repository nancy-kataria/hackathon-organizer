import './app.css';
import {
  RouterProvider,
} from "react-router-dom";
import Header from "./components/header";
import routes from "./router";

function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
