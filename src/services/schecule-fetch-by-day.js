import dayjs from "dayjs";
import { apiConfig } from "./api-config.js"

export async function scheduleFetchByDay({ date }) {
    try {
        // Faz a requisição.
        const response = await fetch(`${apiConfig.baseUrl}/schedules`)
        // Converte a requisição em json.
        const data = await response.json();

        // Filtra os agendamentos pelo dia selecionado.
        const dailySchedules = data.filter((schedule) =>
            dayjs(date).isSame(schedule.when, "day"))


        console.log(dailySchedules)
    } catch (error) {
        console.log(error);
        alert("Não foi possível buscar os agendamentos do dia selecionado");
    }
}