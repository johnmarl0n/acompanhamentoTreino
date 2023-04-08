'use strict';
//Ajustando a posição do meu footer de maneira dinâmica
const a = document.querySelector('header');
const b = document.querySelector('main');
const c = document.querySelector('footer');
const altura = a.clientHeight + b.clientHeight + c.clientHeight;

if (altura > 500) {
    document.querySelector('footer').classList.add('footer-relative');
}

//Usando o Local Storage
//Enviando os dados para o Local Storage
const setBancoA = (bancoDadosA) => localStorage.setItem('treinoA', JSON.stringify(bancoDadosA));
const setBancoB = (bancoDadosB) => localStorage.setItem('treinoB', JSON.stringify(bancoDadosB));
const setBancoC = (bancoDadosC) => localStorage.setItem('treinoC', JSON.stringify(bancoDadosC));

//Pegando dados do banco, testando se vazio
const getBancoA = () => JSON.parse(localStorage.getItem('treinoA')) ?? [];
const getBancoB = () => JSON.parse(localStorage.getItem('treinoB')) ?? [];
const getBancoC = () => JSON.parse(localStorage.getItem('treinoC')) ?? [];

//Criando item Treino A
const criarItemA = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `<input type="checkbox" ${status} data-indice = ${indice}>
                      <div>${tarefa}</div>
                      <input type="button" value="X" data-indice = ${indice}>
                     `
    document.getElementById('todoListA').appendChild(item);
}

//Criando item Treino B
const criarItemB = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `<input type="checkbox" ${status} data-indice = ${indice}>
                      <div>${tarefa}</div>
                      <input type="button" value="X" data-indice = ${indice}>
                     `
    document.getElementById('todoListB').appendChild(item);
}

//Criando item Treino C
const criarItemC = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `<input type="checkbox" ${status} data-indice = ${indice}>
                      <div>${tarefa}</div>
                      <input type="button" value="X" data-indice = ${indice}>
                     `
    document.getElementById('todoListC').appendChild(item);
}

//Limpar tarefas
const limparTarefas = () => {
    const todoListA = document.getElementById('todoListA');
    while (todoListA.firstChild) {
        todoListA.removeChild(todoListA.lastChild);
    };

    const todoListB = document.getElementById('todoListB');
    while (todoListB.firstChild) {
        todoListB.removeChild(todoListB.lastChild);
    };

    const todoListC = document.getElementById('todoListC');
    while (todoListC.firstChild) {
        todoListC.removeChild(todoListC.lastChild);
    };
}

//Ler Banco de Dados
const atualizarTela = () => {
    limparTarefas();
    const bancoDadosA = getBancoA();
    bancoDadosA.forEach( (item, indice) => criarItemA(item.tarefa, item.status, indice));

    const bancoDadosB = getBancoB();
    bancoDadosB.forEach( (item, indice) => criarItemB(item.tarefa, item.status, indice));

    const bancoDadosC = getBancoC();
    bancoDadosC.forEach( (item, indice) => criarItemC(item.tarefa, item.status, indice));
}

const inserirTarefaA = (evento) => {
    const tecla = evento.keyCode || evento.which;
    const texto = evento.target.value;
    if (tecla === 13 || tecla === 9) {
        const bancoDadosA = getBancoA();
        bancoDadosA.push ({'tarefa': texto, 'status': ''});
        setBancoA(bancoDadosA);
        atualizarTela();
        evento.target.value = '';
    }
}

const inserirTarefaB = (evento) => {
    const tecla = evento.keyCode || evento.which;
    const texto = evento.target.value;
    if (tecla === 13 || tecla === 9) {
        const bancoDadosB = getBancoB();
        bancoDadosB.push ({'tarefa': texto, 'status': ''});
        setBancoB(bancoDadosB);
        atualizarTela();
        evento.target.value = '';
    }
}

const inserirTarefaC = (evento) => {
    const tecla = evento.keyCode || evento.which;
    const texto = evento.target.value;
    console.log(tecla);
    if (tecla === 13 || tecla === 9) {
        const bancoDadosC = getBancoC();
        bancoDadosC.push ({'tarefa': texto, 'status': ''});
        setBancoC(bancoDadosC);
        atualizarTela();
        evento.target.value = '';
    }
}

//Alimentar banco local e atualizar tela
document.getElementById('novoA').addEventListener('keydown', inserirTarefaA);
document.getElementById('novoB').addEventListener('keydown', inserirTarefaB);
document.getElementById('novoC').addEventListener('keydown', inserirTarefaC);

//Remover o item selecionado
const removerItemA = (indice) => {
    const bancoDadosA = getBancoA();
    bancoDadosA.splice (indice, 1);
    setBancoA(bancoDadosA);
    atualizarTela();
}

const removerItemB = (indice) => {
    const bancoDadosB = getBancoB();
    bancoDadosB.splice (indice, 1);
    setBancoB(bancoDadosB);
    atualizarTela();
}

const removerItemC = (indice) => {
    const bancoDadosC = getBancoC();
    bancoDadosC.splice (indice, 1);
    setBancoC(bancoDadosC);
    atualizarTela();
}

//Atualizar o item
const atualizarItemA = (indice) => {
    const bancoDadosA = getBancoA();
    bancoDadosA[indice].status = bancoDadosA[indice].status === '' ? 'checked' : '';
    setBancoA(bancoDadosA);
    atualizarTela();
}

const atualizarItemB = (indice) => {
    const bancoDadosB = getBancoB();
    bancoDadosB[indice].status = bancoDadosB[indice].status === '' ? 'checked' : '';
    setBancoB(bancoDadosB);
    atualizarTela();
}

const atualizarItemC = (indice) => {
    const bancoDadosC = getBancoC();
    bancoDadosC[indice].status = bancoDadosC[indice].status === '' ? 'checked' : '';
    setBancoC(bancoDadosC);
    atualizarTela();
}

//Atualizar o banco com o checked com índice
const clickItemA = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItemA(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItemA(indice);
    }
}

const clickItemB = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItemB(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItemB(indice);
    }
}

const clickItemC = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItemC(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItemC(indice);
    }
}

//Atualizando o banco local com o 'checked' da tarefa
document.getElementById('todoListA').addEventListener('click', clickItemA);
document.getElementById('todoListB').addEventListener('click', clickItemB);
document.getElementById('todoListC').addEventListener('click', clickItemC); 

//Carregando os itens para a tela
atualizarTela();