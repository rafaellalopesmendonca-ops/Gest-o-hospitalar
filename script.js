const form = document.getElementById("formPaciente");
const lista = document.getElementById("listaPacientes");
const cpfInput = document.getElementById("cpf");
const telInput = document.getElementById("telefone");
const buscaInput = document.getElementById("busca");

function salvarDados() {
    localStorage.setItem("pacientes", lista.innerHTML);
    atualizarContador();
}

function atualizarContador() {
    const total = lista.getElementsByTagName("tr").length;
    const elementoContador = document.getElementById("totalPacientes");
    if (elementoContador) {
        elementoContador.innerText = total;
    }
}

function adicionarLinha(nome, cpf, telefone, convenio, prioridade) {
    const linha = document.createElement("tr");
    
    let classePrioridade = "";
    if (prioridade === "Emergência") classePrioridade = "prioridade-emergencia";
    else if (prioridade === "Urgente") classePrioridade = "prioridade-urgente";
    else classePrioridade = "prioridade-eletivo";

    linha.innerHTML = `
        <td><strong>${nome}</strong></td>
        <td>${cpf}</td>
        <td>${telefone}</td>
        <td><span class="badge-convenio">${convenio || 'Particular'}</span></td>
        <td><span class="badge-prioridade ${classePrioridade}">${prioridade}</span></td>
        <td>
            <button class="excluir" onclick="removerPaciente(this)">
                <i class="fas fa-trash-alt"></i> Excluir
            </button>
        </td>
    `;
    lista.appendChild(linha);
}

function removerPaciente(botao) {
    if (confirm("Deseja realmente excluir este paciente?")) { 
        botao.closest("tr").remove();
        salvarDados(); 
    }
}

form.onsubmit = function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = telInput.value;
    const convenio = document.getElementById("convenio").value;
    const prioridade = document.getElementById("prioridade").value;

    adicionarLinha(nome, cpf, telefone, convenio, prioridade);
    salvarDados();
    form.reset();
    
    return false;
};

cpfInput.oninput = function() {
    let valor = cpfInput.value.replace(/\D/g, ""); 
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    cpfInput.value = valor;
};

telInput.oninput = function() {
    let v = telInput.value.replace(/\D/g, ""); 
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); 
    v = v.replace(/(\d{5})(\d)/, "$1-$2");     
    telInput.value = v.substring(0, 15);       
};

buscaInput.oninput = function() {
    const termo = buscaInput.value.toLowerCase();
    const linhas = lista.getElementsByTagName("tr");

    Array.from(linhas).forEach(linha => {
        const textoNome = linha.cells[0].textContent.toLowerCase();
        const textoCPF = linha.cells[1].textContent.toLowerCase();
        
        if (textoNome.includes(termo) || textoCPF.includes(termo)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
};

window.onload = function() {
    const dados = localStorage.getItem("pacientes");
    if (dados) {
        lista.innerHTML = dados;
    }
    atualizarContador();
};

function imprimirRelatorio() {
    window.print();
}

function atualizarRelogio() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    
    const display = `${horas}:${minutos}:${segundos}`;
    document.getElementById("relogio").textContent = display;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();