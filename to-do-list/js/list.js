// ============================================================
// To-Do List — Lista de Tarefas
// ------------------------------------------------------------
// Conceitos demonstrados:
//   - Manipulação do DOM (createElement, querySelector)
//   - Eventos (click, keydown, load)
//   - Persistência com localStorage
//   - Segurança: uso de textContent para evitar XSS
// ============================================================

// ----- Seleção de elementos -----
const tarefaInput   = document.getElementById("tarefaInput");
const prioridade    = document.getElementById("prioridade");
const btnAdicionar  = document.getElementById("btnAdicionar");
const listaTarefas  = document.getElementById("listaTarefas");
const mensagem      = document.getElementById("mensagem");

// Guarda a tarefa que está sendo editada (null quando não há edição)
let tarefaEmEdicao = null;

// ----- Inicialização -----
window.addEventListener("load", carregarTarefas);

// Botão "Adicionar"
btnAdicionar.addEventListener("click", adicionarTarefa);

// Permite enviar com Enter, cancelar com Esc
tarefaInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        adicionarTarefa();
    } else if (e.key === "Escape" && tarefaEmEdicao) {
        cancelarEdicao();
    }
});

// ----- Funções -----

function adicionarTarefa() {

    const texto = tarefaInput.value.trim();

    if (texto === "") {
        mostrarMensagem("Digite uma tarefa antes de adicionar.");
        return;
    }

    if (tarefaEmEdicao) {
        // EDITAR tarefa existente
        const textoTarefa      = tarefaEmEdicao.querySelector(".texto-tarefa");
        const prioridadeTarefa = tarefaEmEdicao.querySelector(".prioridade");

        textoTarefa.textContent      = texto;
        prioridadeTarefa.textContent = `Prioridade: ${prioridade.value}`;
        prioridadeTarefa.dataset.nivel = prioridade.value;

        cancelarEdicao(false); // limpa estado sem mensagem
    } else {
        // NOVA tarefa
        const tarefa = {
            texto: texto,
            prioridade: prioridade.value,
            concluida: false
        };
        criarTarefa(tarefa);
    }

    salvarLocalStorage();

    tarefaInput.value = "";
    prioridade.value  = "Baixa";
    limparMensagem();
}

function criarTarefa(tarefa) {

    const li = document.createElement("li");
    li.classList.add("tarefa");

    if (tarefa.concluida) {
        li.classList.add("concluida");
    }

    // --- Bloco de informações ---
    const info = document.createElement("div");
    info.classList.add("info");

    const spanTexto = document.createElement("span");
    spanTexto.classList.add("texto-tarefa");
    // textContent = seguro contra XSS (não interpreta HTML)
    spanTexto.textContent = tarefa.texto;

    const spanPrioridade = document.createElement("span");
    spanPrioridade.classList.add("prioridade");
    spanPrioridade.textContent = `Prioridade: ${tarefa.prioridade}`;
    spanPrioridade.dataset.nivel = tarefa.prioridade;

    info.append(spanTexto, spanPrioridade);

    // --- Bloco de ações ---
    const acoes = document.createElement("div");
    acoes.classList.add("acoes");

    const btnEditar   = criarBotao("btnEditar",   "✎", "Editar tarefa");
    const btnConcluir = criarBotao("btnConcluir", "✔", "Marcar como concluída");
    const btnExcluir  = criarBotao("btnExcluir",  "✖", "Excluir tarefa");

    acoes.append(btnEditar, btnConcluir, btnExcluir);

    li.append(info, acoes);

    // --- Listeners dos botões ---
    btnEditar.addEventListener("click", () => iniciarEdicao(li));

    btnConcluir.addEventListener("click", () => {
        li.classList.toggle("concluida");
        salvarLocalStorage();
    });

    btnExcluir.addEventListener("click", () => {
        // Se a tarefa excluída estava em edição, cancela
        if (tarefaEmEdicao === li) cancelarEdicao(false);
        li.remove();
        salvarLocalStorage();
    });

    listaTarefas.appendChild(li);
}

function criarBotao(classe, simbolo, rotulo) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add(classe);
    btn.textContent = simbolo;
    btn.setAttribute("aria-label", rotulo);
    btn.title = rotulo;
    return btn;
}

function iniciarEdicao(li) {
    tarefaEmEdicao = li;

    tarefaInput.value = li.querySelector(".texto-tarefa").textContent;

    const nivel = li.querySelector(".prioridade").dataset.nivel;
    prioridade.value = nivel || "Baixa";

    btnAdicionar.textContent = "Salvar";
    tarefaInput.focus();

    mostrarMensagem("Editando tarefa — pressione Esc para cancelar.");
}

function cancelarEdicao(comMensagem = true) {
    tarefaEmEdicao = null;
    btnAdicionar.textContent = "Adicionar";
    tarefaInput.value = "";
    prioridade.value  = "Baixa";

    if (comMensagem) {
        mostrarMensagem("Edição cancelada.");
        setTimeout(limparMensagem, 2000);
    } else {
        limparMensagem();
    }
}

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

function limparMensagem() {
    mensagem.textContent = "";
}

// ----- Persistência com localStorage -----

function salvarLocalStorage() {
    const tarefas = [];

    document.querySelectorAll(".tarefa").forEach(li => {
        tarefas.push({
            texto:      li.querySelector(".texto-tarefa").textContent,
            prioridade: li.querySelector(".prioridade").dataset.nivel,
            concluida:  li.classList.contains("concluida")
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.forEach(criarTarefa);
}
