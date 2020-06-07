import React, { useEffect, useState, ChangeEvent } from "react";
import "./styles.css";
import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../../services/api";
import { LeafletMouseEvent } from "leaflet";
import axios from "axios";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUF {
  sigla: string;
}

interface IBGECity {
  nome: string;
}

const CreatePoints: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUFs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUF, setSelectedUF] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    async function loadItems() {
      const response = await api.get("items");
      setItems(response.data);
    }

    async function loadUFInitial() {
      const response = await axios.get<IBGEUF[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const ufInitials = response.data.map((UF) => UF.sigla);
      setUFs(ufInitials);
    }

    loadItems();
    loadUFInitial();
  }, []);

  function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUF(event.target.value);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  useEffect(() => {
    async function loadCities() {
      const response = await axios.get<IBGECity[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`
      );
      const cityNames = response.data.map((city) => city.nome);
      setCities(cityNames);
    }
    if (selectedUF !== "0") {
      loadCities();
    }
  }, [selectedUF]);
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
              <Map
                center={[-12.9828638, -38.4887373]}
                zoom={15}
                onclick={handleMapClick}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={selectedPosition} />
              </Map>
            </>
            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">UF</label>
                <select
                  name="uf"
                  id="uf"
                  onChange={handleSelectUF}
                  value={selectedUF}
                >
                  <option value="0">Selecione uma UF</option>
                  {ufs.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={handleSelectCity}
                >
                  <option value="0">Selecione uma cidade</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
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
