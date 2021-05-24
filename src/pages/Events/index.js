import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';

import api from '../../service/api'


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
      console.log(e)
      alert(e.response.data.message)
    }
  }

  useEffect(() => {
    getEvents();
  }, [])


  return (
    <div>
      <h1>Events</h1>
      <a href="/events/new">Criar Evento</a>

      <ul>
        {events.map((item) => <li key={item.id}>
          <a href={`/events/${item.id}/schedule`} >{item.name}</a>
          - {new Date(item.beginDate).toLocaleDateString()}
          - {new Date(item.endDate).toLocaleDateString()}
        </li>)}
      </ul>

    </div>
  )
}

export default Events;