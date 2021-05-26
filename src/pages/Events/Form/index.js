import { useState } from 'react'
import api from '../../../service/api'
import { useHistory } from 'react-router-dom'

import "./style.css";

const EventForm = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [localization, setLocalization] = useState("");
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const token = localStorage.getItem("@events-npds/token");
      const response = await api.post("/events", {
        name,
        description,
        organizer,
        localization,
        beginDate,
        endDate
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      history.push("/home");

    } catch (e) {

      const message = e.response.data.message;

      if (message === "Data final Invalida") {
        alert("As datas estão em ordem incorreta!");
      } else {
        console.log(e)
        alert(message);
      }
    }
  }

  const handleBack = () => {
    history.push("/home");
  }

  return (
    <div class="container-formulario">
      <div class="card-formulario">

        <span>
          <h2>Criar um novo Evento</h2>
          <button onClick={handleBack}>Voltar</button>
        </span>

        <form class="formulario" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label>Organizer</label>
          <input type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
          <label>Localization</label>
          <input type="text" value={localization} onChange={(e) => setLocalization(e.target.value)} />
          <label>Begin Date</label>
          <input type="date" value={beginDate} onChange={(e) => setBeginDate(e.target.value)} />
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  )
}

export default EventForm;