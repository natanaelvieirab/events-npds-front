import { useState } from "react";
import { useHistory, useParams } from "react-router";

import api from "../../../service/api";
import "../../Events/Form/style.css";

const SchedulesForm = () => {

    const history = useHistory();

    const { id: event_id } = useParams();


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [presenter, setPresenter] = useState("");
    const [localization, setLocalization] = useState("");
    const [beginDate, setBeginDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [beginTime, setBeginTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [workload, setWorkload] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("@events-npds/token");
            const response = await api.post(`/events/${event_id}/schedule`, {
                name,
                description,
                presenter,
                localization,
                beginDate,
                endDate,
                beginTime,
                endTime,
                workload
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            history.push(`/events/${event_id}/schedule`);

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
        history.push(`/events/${event_id}/schedule`);
    }

    return (
        <div class="container-formulario" style={{ height: "140vh" }}>
            <div class="card-formulario">

                <span>
                    <h2>Criar uma nova Programação</h2>
                    <button onClick={handleBack}>Voltar</button>
                </span>

                <form class="formulario" onSubmit={handleSubmit}  >

                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <label>Apresentador</label>
                    <input type="text" value={presenter} onChange={(e) => setPresenter(e.target.value)} />

                    <label>Localization</label>
                    <input type="text" value={localization} onChange={(e) => setLocalization(e.target.value)} />

                    <label>Hora de inicio</label>
                    <input type="text" value={beginTime} onChange={(e) => setBeginTime(e.target.value)} />

                    <label>Hora de encerramento</label>
                    <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

                    <label>Data de inicio</label>
                    <input type="date" value={beginDate} onChange={(e) => setBeginDate(e.target.value)} />

                    <label>Data de encerramento</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                    <label>Duração</label>
                    <input type="text" value={workload} onChange={(e) => setWorkload(e.target.value)} />

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default SchedulesForm;