import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrarVagas from "./pages/registrar-vagas/registrar-vagas";
import ConsultarVagas from "./pages/consultar-vagas/consultar-vagas";
import Toast from "./shared/Toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

const App = () => {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Gerenciamento de vagas</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Cadastrar vagas</Link>
            <Link className="nav-link" to="/consulta-vagas">Consultar vagas</Link>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<RegistrarVagas showToast={showToast} />} />
          <Route path="/consulta-vagas" element={<ConsultarVagas showToast={showToast} />} />
        </Routes>
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </Router>
  );
};

export default App;
