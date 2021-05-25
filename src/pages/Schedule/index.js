import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import api from '../../service/api';


const Schedules = () => {

    const [schedules, setSchedules] = useState([]);

    const PAGE_NUMBER = 0;
    const PAGE_SIZE = 40;

    const { id: event_id } = useParams();

    const getSchedules = async () => {
        try {

            const token = localStorage.getItem("@events-npds/token");

            const response = await api
                .get(`/events/${event_id}/schedule?pageNumber=${PAGE_NUMBER}&pageSize=${PAGE_SIZE}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            console.log(response.data);
            setSchedules(response.data);
        } catch (e) {
            alert("deu algum erro na programação");
        }
    }

    useEffect(() => {
        getSchedules();
    }, [])

    return (
        <div>
            <h1>Programações</h1>

            <a href={`/events/${event_id}/schedule/new`}>Criar nova programação</a>

            <ul>
                {schedules.map((item) => <li key={item.id}>

                    <b>{item.name}</b>
                    <br />
                    - Data de Inicio: {new Date(item.beginDate).toLocaleDateString()}
                     as {item.beginTime}

                    <br />

                    - Data de Encerramento: {new Date(item.beginDate).toLocaleDateString()}
                     as {item.endTime}

                </li>)}
            </ul>
        </div>
    );
}


export default Schedules;