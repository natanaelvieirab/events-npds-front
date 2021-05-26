import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

import api from '../../service/api';
import "../Events/style.css"

const Schedules = () => {

    const [schedules, setSchedules] = useState([]);

    const PAGE_NUMBER = 0;
    const PAGE_SIZE = 40;

    const { id: event_id } = useParams();

    const history = useHistory();

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

    const handleBack = () => {
        history.push("/home");
    }

    return (
        <div class="container">
            <div class="card">
                <span>
                    <h1>Programações</h1>

                    <button class="back" onClick={handleBack}>Voltar</button>
                </span>
                <a href={`/events/${event_id}/schedule/new`}>Criar nova programação</a>
                <p>Programação cadastrada:</p>
                <ul>
                    {schedules.map((item) => <li key={item.id}>
                        <div>
                            <b>{item.name}</b>
                            <br />
                            - Data de Inicio: {new Date(item.beginDate).toLocaleDateString()}
                            as {item.beginTime}

                            <br />

                            - Data de Encerramento: {new Date(item.beginDate).toLocaleDateString()}
                            as {item.endTime}
                        </div>
                    </li>)}
                </ul>


            </div>
        </div>
    );
}


export default Schedules;