const turma = [
  { nome: "Ana Souza", media: 8.5 },
  { nome: "Bruno Lima", media: 5.2 }
];

const tabela = document.querySelector("#tabela");
const quadro = document.querySelector("#quadro");
const vazio = document.querySelector("#vazio");
const form = document.querySelector("#form-aluno");
const aviso = document.querySelector("#aviso");
const busca = document.querySelector("#busca");

function criarCelula(texto) {
  const celula = document.createElement("td");
  celula.textContent = texto;
  return celula;
}

function mostrarTurma(lista) {
  tabela.textContent = "";

  if (lista.length === 0) {
    quadro.hidden = true;
    vazio.hidden = false;
    return;
  }

  quadro.hidden = false;
  vazio.hidden = true;

  for (const aluno of lista) {
    const situacao = aluno.media >= 6 ? "aprovado" : "reprovado";
    const linha = document.createElement("tr");
    linha.classList.add(situacao);
    linha.title = "Dê duplo clique para remover este aluno";

    linha.append(
      criarCelula(aluno.nome),
      criarCelula(aluno.media.toFixed(1)),
      criarCelula(situacao)
    );

    linha.addEventListener("dblclick", function () {
      const posicao = turma.indexOf(aluno);
      turma.splice(posicao, 1);
      aviso.classList.remove("erro");
      aviso.textContent = `${aluno.nome} saiu da turma.`;
      atualizarTabela();
    });

    tabela.append(linha);
  }
}

function atualizarTabela() {
  const termo = busca.value.trim().toLowerCase();
  const achados = turma.filter((aluno) =>
    aluno.nome.toLowerCase().includes(termo)
  );

  mostrarTurma(achados);

  if (achados.length === 0 && termo !== "") {
    vazio.textContent = `Nenhum aluno com "${busca.value}".`;
  } else {
    vazio.textContent = "Nenhum aluno cadastrado.";
  }
}

busca.addEventListener("input", atualizarTabela);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = form.nome.value.trim();
  const nota = Number(form.nota.value);

  form.nome.classList.remove("campo-erro");
  form.nota.classList.remove("campo-erro");
  aviso.classList.remove("erro");

  if (nome === "") {
    form.nome.classList.add("campo-erro");
    aviso.classList.add("erro");
    aviso.textContent = "Escreva o nome do aluno.";
    form.nome.focus();
    return;
  }

  if (form.nota.value === "" || nota < 0 || nota > 10) {
    form.nota.classList.add("campo-erro");
    aviso.classList.add("erro");
    aviso.textContent = "A nota tem que ser de 0 a 10.";
    form.nota.focus();
    return;
  }

  turma.push({ nome, media: nota });
  form.reset();
  busca.value = "";
  aviso.textContent = `${nome} cadastrado(a)!`;
  form.nome.focus();
  atualizarTabela();
});

mostrarTurma(turma);
