# To-Do List

Aplicativo simples de lista de tarefas, desenvolvido com **HTML**, **CSS** e **JavaScript puro**.

---

## Objetivo

Demonstrar, em um projeto pequeno e funcional, como construir uma aplicação web interativa do zero — sem frameworks — exercitando os principais fundamentos do front-end.

---

## Funcionalidades

- Adicionar tarefas com nível de prioridade (Baixa, Média, Alta)
- Editar e excluir tarefas existentes
- Marcar tarefas como concluídas
- Indicador visual colorido por prioridade
- Persistência local: as tarefas continuam salvas após recarregar a página
- Atalhos de teclado: **Enter** para adicionar, **Esc** para cancelar uma edição
- Resumo de tarefas exibido na página inicial

---

## Conceitos aplicados

| Área           | O que o projeto demonstra                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------- |
| **HTML**       | Estrutura semântica, formulários, acessibilidade (`aria-label`, `label`)                          |
| **CSS**        | Variáveis CSS, Flexbox, responsividade, gradientes, transições, `backdrop-filter`                 |
| **JavaScript** | Manipulação do DOM, eventos, template strings, `localStorage`, prevenção de XSS com `textContent` |

---

## Paleta de cores

As cores são definidas como variáveis CSS em `:root`, o que facilita a manutenção e a consistência visual em todo o projeto.

**Marca**

| Variável          | Valor     | Uso                                 |
| ----------------- | --------- | ----------------------------------- |
| `--primary`       | `#7c3aed` | Botões, bordas de foco, destaques   |
| `--primary-dark`  | `#5b21b6` | Gradiente dos botões (estado final) |
| `--primary-light` | `#a78bfa` | Links, textos de destaque suave     |

**Status das tarefas**

| Variável    | Valor     | Uso                                  |
| ----------- | --------- | ------------------------------------ |
| `--success` | `#22c55e` | Prioridade Baixa, botão Concluir     |
| `--warning` | `#f59e0b` | Prioridade Média, mensagens de aviso |
| `--danger`  | `#ef4444` | Prioridade Alta, botão Excluir       |

**Fundos**

| Variável   | Valor                       | Uso                                  |
| ---------- | --------------------------- | ------------------------------------ |
| `--bg-1`   | `#0f172a`                   | Início do gradiente de fundo         |
| `--bg-2`   | `#1e1b4b`                   | Meio do gradiente de fundo           |
| `--bg-3`   | `#312e81`                   | Final do gradiente de fundo          |
| `--card`   | `rgba(255, 255, 255, 0.08)` | Superfície dos cards (glassmorphism) |
| `--border` | `rgba(255, 255, 255, 0.10)` | Bordas dos cards e inputs            |

**Tipografia**

| Variável       | Valor     | Uso                     |
| -------------- | --------- | ----------------------- |
| `--text`       | `#f8fafc` | Texto principal         |
| `--text-light` | `#cbd5e1` | Texto secundário        |
| `--text-muted` | `#94a3b8` | Textos de apoio, rodapé |

---

## Estrutura de pastas

```
to-do-list/
├── index.html          ← página inicial (landing)
├── README.md
├── css/
│   ├── index.css
│   └── list.css
├── js/
│   └── list.js         ← lógica da lista
└── html/
    └── list.html       ← página da lista de tarefas
```

---

## Como executar

Não há dependências nem build. Basta abrir o `index.html` no navegador.

**Opção 1 — duplo clique:** abra `index.html` direto no navegador.

**Opção 2 — servidor local (recomendado):** com a extensão _Live Server_ do VS Code, clique com o botão direito em `index.html` → _Open with Live Server_.

---

## Detalhes de implementação que valem estudar

### 1. Por que `textContent` em vez de `innerHTML`?

Ao inserir texto digitado pelo usuário, usamos `textContent`. Isso impede que entradas como `<script>alert('XSS')</script>` sejam interpretadas como HTML — uma vulnerabilidade clássica chamada **Cross-Site Scripting (XSS)**.

### 2. `localStorage`

Os dados ficam salvos no próprio navegador, em formato de string JSON. Para guardar objetos usamos `JSON.stringify` e para ler de volta `JSON.parse`.

### 3. Atributos `data-*`

A cor do indicador de prioridade é definida no CSS através de um seletor de atributo:

```css
.prioridade[data-nivel="Alta"]::before {
  background: red;
}
```

No JS, basta atribuir `elemento.dataset.nivel = "Alta"`.

---

## Desafios propostos

Para os alunos que quiserem ir além:

1. **Filtrar** as tarefas por status (todas / pendentes / concluídas)
2. **Ordenar** automaticamente por prioridade (Alta → Média → Baixa)
3. Adicionar **data de criação** em cada tarefa
4. Permitir **arrastar e soltar** (drag-and-drop) para reordenar
5. Implementar **modo claro / escuro**
6. Exportar/importar a lista como arquivo **JSON**
7. Substituir o `localStorage` por uma **API REST** (estudo futuro)

---

## Licença

Material didático de uso livre para fins educacionais.
