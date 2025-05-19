import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js";

const form = document.querySelector('form');
const clientName = document.getElementById('client');
const selectedDate = document.getElementById('date');

const inputToday = dayjs(new Date()).format('YYYY-MM-DD');

// Carrega a data atual e define a data mínima
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
    event.preventDefault();

    try {
        const name = clientName.value.trim();
        // Verifica se o nome do cliente tem nome e se o nome tem pelo menos 3 caracteres
        if (!name || name.length < 3) {
            return alert('O nome do cliente precisa ter pelo menos 3 caracteres');
        }

        // Recupera o horário selecionado
        const hourSelected = document.querySelector('.hour-selected');
        // Verifica se o horário foi selecionado
        if (!hourSelected) {
            return alert('Selecione um horário');
        }

        // Recupera somente a hora
        const [batata, _] = hourSelected.innerText.split(':');


        // Insere a hora na data
        const when = dayjs(selectedDate.value).add(batata, 'hour');
        console.log(when);

        // Gera um ID do agendamento
        const id = new Date().getTime();

        await scheduleNew({
            id,
            name,
            when,
        })

    } catch (error) {
        alert("Não foi possível realizar o agendamento");
        console.log(error);
    }
}