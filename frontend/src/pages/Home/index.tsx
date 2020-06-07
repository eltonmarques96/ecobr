import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./styles.css";

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="ECOBR" />
        </header>
        <main>
          <h1>Seu ponto de coleta de resíduos</h1>
          <p>Ajude a sua cidade a se tornar um lugar melhor</p>
          <Link to="/register">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre seu ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
