const btnTheme = document.querySelector('.btn-theme');
const body = document.body;
const form = document.querySelector('.form-paciente');
const tabela = document.querySelector('.tabela-pacientes tbody');
const btnCadastrar = document.querySelector('.btn-cadastrar');
const inputCPF = document.querySelector('input[placeholder="CPF"]');
const inputTelefone = document.querySelector('input[placeholder="Telefone"]');

let linhaSendoEditada = null;

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { hour12: false });
    const clockElement = document.getElementById('time');
    if (clockElement) clockElement.textContent = timeString;
}

btnTheme.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = btnTheme.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

inputCPF.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length > 11) value = value.slice(0, 11); 
    
    e.target.value = value
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
});

inputTelefone.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    e.target.value = value
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const dados = {
        nome: form.querySelector('input[placeholder="Nome completo"]').value,
        cpf: inputCPF.value,
        telefone: inputTelefone.value,
        convenio: form.querySelector('input[placeholder="Convênio"]').value,
        status: form.querySelector('select').value
    };

    if (linhaSendoEditada) {
        linhaSendoEditada.cells[0].textContent = dados.nome;
        linhaSendoEditada.cells[1].textContent = dados.cpf;
        linhaSendoEditada.cells[2].textContent = dados.telefone;
        linhaSendoEditada.cells[3].textContent = dados.convenio;
        linhaSendoEditada.cells[4].textContent = dados.status;
        
        btnCadastrar.textContent = "Cadastrar Paciente";
        linhaSendoEditada = null;
    } else {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${dados.nome}</td>
            <td>${dados.cpf}</td>
            <td>${dados.telefone}</td>
            <td>${dados.convenio}</td>
            <td>${dados.status}</td>
            <td>
                <button class="editar" onclick="editarPaciente(this)">✏</button>
                <button class="excluir" onclick="removerLinha(this)">🗑</button>
            </td>
        `;
        tabela.appendChild(novaLinha);
    }

    form.reset();
});

function editarPaciente(botao) {
    linhaSendoEditada = botao.closest('tr');
    
    form.querySelector('input[placeholder="Nome completo"]').value = linhaSendoEditada.cells[0].textContent;
    inputCPF.value = linhaSendoEditada.cells[1].textContent;
    inputTelefone.value = linhaSendoEditada.cells[2].textContent;
    form.querySelector('input[placeholder="Convênio"]').value = linhaSendoEditada.cells[3].textContent;
    form.querySelector('select').value = linhaSendoEditada.cells[4].textContent;

    btnCadastrar.textContent = "Salvar Alterações";
    window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
}

function removerLinha(botao) {
    if (confirm("Deseja realmente excluir este paciente?")) {
        botao.closest('tr').remove();
    }
}

setInterval(updateClock, 1000);
updateClock();

function abrirModal() {
    document.getElementById('modalMedico').style.display = "block";
}

function fecharModal() {
    document.getElementById('modalMedico').style.display = "none";
}


window.onclick = function(event) {
    let modal = document.getElementById('modalMedico');
    if (event.target == modal) {
        fecharModal();
    }
}

window.addEventListener('load', () => {
    const agendamentoPendente = localStorage.getItem('novoAgendamento');
    
    if (agendamentoPendente) {
        const p = JSON.parse(agendamentoPendente);
        
        
        adicionarLinha(p.nome, p.cpf, p.telefone, p.convenio, "Consulta");
        

        salvarDados();
        localStorage.removeItem('novoAgendamento');
        
        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao(`Paciente ${p.nome} agendado com sucesso!`);
        }
    }
});