const formMed = document.getElementById('formNovoMedico');
const listaMedicos = document.getElementById('lista-medicos');

formMed.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeMed').value;
    const especialidade = document.getElementById('especialidadeMed').value;
    const sala = document.getElementById('salaMed').value;
    const horario = document.getElementById('horarioMed').value;
    const limite = parseInt(document.getElementById('limiteMed').value); 

    const novoCard = document.createElement('div');
    novoCard.className = 'card-medico';
    
    novoCard.innerHTML = `
        <div class="medico-header">
            <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Médico">
            <div class="medico-nome-area">
                <h3>${nome}</h3>
                <span class="especialidade-tag">${especialidade}</span>
            </div>
        </div>
        <div class="medico-detalhes">
            <p><i class="fas fa-door-open"></i> ${sala}</p>
            <p><i class="fas fa-clock"></i> ${horario}</p>
        </div>
        <div class="footer-card">
            <span class="status-vagas disponivel"><b class="vagas-count">${limite}</b> vagas hoje</span>
            <button class="btn-agendar" onclick="realizarAgendamento(this)">Agendar</button>
        </div>
    `;

    listaMedicos.appendChild(novoCard);
    formMed.reset();
    fecharModal();
});


function realizarAgendamento(botao) {
    const footer = botao.parentElement;
    const contadorElemento = footer.querySelector('.vagas-count');
    let vagasAtuais = parseInt(contadorElemento.innerText);

    if (vagasAtuais > 0) {
        vagasAtuais--;
        contadorElemento.innerText = vagasAtuais;

       
        if (vagasAtuais === 0) {
            const statusSpan = footer.querySelector('.status-vagas');
            statusSpan.classList.remove('disponivel');
            statusSpan.classList.add('cheio');
            statusSpan.innerHTML = 'Agenda Lotada';
            botao.disabled = true;
            botao.style.backgroundColor = "#64748b";
            botao.innerText = "Lotado";
        }
        
        
        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("Agendamento realizado com sucesso!");
        }
    }
}


function abrirModal() {
    const modal = document.getElementById('modalMedico');
    if (modal) {
        modal.style.display = "block";
    }
}

function fecharModal() {
    const modal = document.getElementById('modalMedico');
    if (modal) {
        modal.style.display = "none";
    }
}


window.onclick = function(event) {
    const modal = document.getElementById('modalMedico');
    if (event.target == modal) {
        fecharModal();
    }
}

let botaoAgendarClicado = null; 
function realizarAgendamento(botao) {
    botaoAgendarClicado = botao;
    document.getElementById('modalAgendamento').style.display = "block";
}

function fecharModalAgendamento() {
    document.getElementById('modalAgendamento').style.display = "none";
}

document.getElementById('formAgendarPaciente').addEventListener('submit', function(e) {
    e.preventDefault();


    const novoPaciente = {
        nome: document.getElementById('agendaNome').value,
        cpf: document.getElementById('agendaCPF').value,
        telefone: document.getElementById('agendaTelefone').value,
        convenio: document.getElementById('agendaConvenio').value,
        status: "Consulta"
    };

 
    localStorage.setItem('novoAgendamento', JSON.stringify(novoPaciente));

 
    const footer = botaoAgendarClicado.parentElement;
    const contadorElemento = footer.querySelector('.vagas-count');
    let vagasAtuais = parseInt(contadorElemento.innerText);
    
    if (vagasAtuais > 0) {
        vagasAtuais--;
        contadorElemento.innerText = vagasAtuais;
      
    }

  
    window.location.href = "pacientes.html";
});