import React, { useEffect, useState } from "react";
import "./styles.css";
import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../../services/api";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const CreatePoints: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    async function loadItems() {
      const response = await api.get("items");
      setItems(response.data);
    }
    loadItems();
  }, []);
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
            <>
              <Map center={[-12.9828638, -38.4887373]} zoom={15}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-12.9828638, -38.4887373]} />
              </Map>
            </>
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
              {items.map((item) => {
                return (
                  <li key={item.id}>
                    <img src={item.image_url} alt={item.title} />
                    <span>{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <button type="submit">Cadastrar ponto de coleta</button>
        </form>
      </div>
    </>
  );
};

export default CreatePoints;
