import React from "react";
import "./styles.css";
import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const CreatePoints: React.FC = () => {
  return (
    <>
      <div id="page-create-point">
        <header>
          <img src={logo} alt="ECOBR" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>
        <form action="">
          <h1>Cadastre seu ponto de coleta</h1>
          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <div className="field">
              <label htmlFor="name">Nome do ponto de coleta</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" />
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input type="text" name="whatsapp" id="whatsapp" />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço do mapa</span>
            </legend>
            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">UF</label>
                <select name="uf" id="uf">
                  <option value="0">Selecione uma UF</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select name="city" id="city">
                  <option value="0">Selecione uma cidade</option>
                </select>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Items de coleta</h2>
              <span>Selecione um ou mais itens abaixo</span>
            </legend>
            <ul className="items-grid">
              <li>
                <img src="" alt="oil" />
                <span>Oléo de cozinha</span>
              </li>
              <li>
                <img src="" alt="oil" />
                <span>Oléo de cozinha</span>
              </li>
              <li>
                <img src="" alt="oil" />
                <span>Oléo de cozinha</span>
              </li>
              <li>
                <img src="" alt="oil" />
                <span>Oléo de cozinha</span>
              </li>
              <li>
                <img src="" alt="oil" />
                <span>Oléo de cozinha</span>
              </li>
              <li>
                <img src="" alt="oil" />
                <span>Oléo de cozinha</span>
              </li>
            </ul>
          </fieldset>
          <button type="submit">Cadastrar ponto de coleta</button>
        </form>
      </div>
    </>
  );
};

export default CreatePoints;
