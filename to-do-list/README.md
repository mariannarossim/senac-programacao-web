# To-Do List

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Aplicação de lista de tarefas desenvolvida com **HTML**, **CSS** e **JavaScript puro**, sem o uso de frameworks ou bibliotecas externas.

---

## Objetivo

Demonstrar, em um projeto pequeno e funcional, como construir uma aplicação web interativa do zero, exercitando os principais fundamentos do desenvolvimento front-end. O projeto foi pensado para servir de base prática a conceitos discutidos em aula, como manipulação do DOM, persistência de dados no cliente e organização de código.

---

## Funcionalidades

- Adição de tarefas com nível de prioridade (Baixa, Média, Alta)
- Edição e exclusão de tarefas existentes
- Marcação de tarefas como concluídas
- Indicador visual diferenciado por prioridade
- Persistência local: as tarefas permanecem salvas após o recarregamento da página
- Atalhos de teclado: **Enter** para adicionar, **Esc** para cancelar uma edição
- Resumo das tarefas exibido na página inicial

---

## Conceitos aplicados

| Área           | O que o projeto demonstra                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------- |
| **HTML**       | Estrutura semântica, formulários, acessibilidade (`aria-label`, `label`)                          |
| **CSS**        | Variáveis CSS, Flexbox, responsividade, gradientes, transições, `backdrop-filter`                 |
| **JavaScript** | Manipulação do DOM, tratamento de eventos, template strings, `localStorage`, prevenção de XSS com `textContent` |

---

## Paleta de cores

As cores são definidas como variáveis CSS em `:root`, o que facilita a manutenção e garante consistência visual em todo o projeto.

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
├── index.html         # página inicial (landing)
├── README.md
├── css/
│   ├── index.css
│   └── list.css
├── html/
│   └── list.html      # página da lista de tarefas
└── js/
    └── list.js        # lógica da lista
```

---

## Como executar

O projeto não possui dependências nem etapa de build. Basta abrir o arquivo `index.html` no navegador.

**Opção 1 — Abertura direta:** clique duas vezes sobre o `index.html` para abri-lo no navegador padrão.

**Opção 2 — Servidor local (recomendado):** utilizando a extensão *Live Server* no Visual Studio Code, clique com o botão direito sobre `index.html` e selecione *Open with Live Server*. Essa opção é preferível pois habilita o recarregamento automático e simula o comportamento de um servidor web real.

---

## Detalhes de implementação

Os pontos a seguir destacam decisões técnicas que merecem atenção durante o estudo do código.

### 1. Uso de `textContent` em vez de `innerHTML`

Para inserir conteúdo digitado pelo usuário, utilizamos `textContent` em vez de `innerHTML`. Essa escolha impede que entradas como `<script>alert('XSS')</script>` sejam interpretadas como HTML, prevenindo uma vulnerabilidade clássica conhecida como **Cross-Site Scripting (XSS)**.

### 2. Persistência com `localStorage`

Os dados são armazenados no próprio navegador em formato de string JSON. A conversão é feita com `JSON.stringify` ao salvar e `JSON.parse` ao recuperar os dados. Vale destacar que o `localStorage` é específico do navegador e do domínio: ao acessar a aplicação em outro dispositivo ou navegador, os dados não estarão disponíveis.

### 3. Atributos `data-*` para estilização dinâmica

A cor do indicador de prioridade é definida no CSS por meio de seletores de atributo, eliminando a necessidade de classes condicionais no JavaScript:

```css
.prioridade[data-nivel="Alta"]::before {
  background: var(--danger);
}
```

No JavaScript, basta atribuir o valor diretamente ao dataset do elemento:

```js
elemento.dataset.nivel = "Alta";
```

---

## Desafios propostos

Sugestões para os alunos que quiserem expandir o projeto:

1. Implementar **filtros** por status (todas, pendentes, concluídas)
2. Adicionar **ordenação automática** por prioridade (Alta → Média → Baixa)
3. Incluir **data e hora de criação** em cada tarefa
4. Permitir **arrastar e soltar** (drag-and-drop) para reordenar as tarefas
5. Implementar alternância entre **modo claro e escuro**
6. Adicionar funcionalidade de **exportar e importar** a lista em formato JSON
7. Substituir o `localStorage` por uma integração com **API REST** (conteúdo futuro)

---

## Licença

Material didático de uso livre para fins educacionais, mantendo os créditos da autora.
