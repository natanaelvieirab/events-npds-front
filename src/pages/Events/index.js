import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';

import api from '../../service/api'
import "./style.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  const PAGE_NUMBER = 0;
  const PAGE_SIZE = 50;

  const history = useHistory();

  const getEvents = async () => {
    try {
      const token = localStorage.getItem("@events-npds/token");
      const response = await api.get(`/events?pageNumber=${PAGE_NUMBER}&pageSize=${PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })

      setEvents(response.data);
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
    }
  }

  useEffect(() => {
    getEvents();
  }, [])

  const handleNewEvent = () => {
    history.push("/events/new");
  }

  return (
    <div class="container">
      <div class="card">
        <h1 class="title">Events</h1>

        <p>Eventos cadastrados:</p>

        <ul>
          {events.map((item) => <li key={item.id}>
            <div>
              <b>{item.name}</b>
              <br />
              Data de Inicio: {new Date(item.beginDate).toLocaleDateString()}
              <br />
              Data de Encerramento: {new Date(item.endDate).toLocaleDateString()}
              <br /> <br />
              <a href={`/events/${item.id}/schedule`}>Programação</a>

            </div>
          </li>)}
        </ul>

        <button class="new" onClick={handleNewEvent}>Criar Evento</button>

      </div>
    </div>
  )
}

export default Events;