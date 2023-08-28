let addTask = document.getElementById('addTask')
let modalTask = document.getElementById('modalTask')
let closeTask = document.getElementById('closeTask')
let taskForm = document.getElementById('myForm') // Adicione uma referência ao formulário

addTask.addEventListener('click', function() {
  modalTask.style.display = 'block'
})

closeTask.addEventListener('click', function() {
  modalTask.style.display = 'none'
})

window.addEventListener('click', function(event) {
  if (event.target === modalTask) {
    modalTask.style.display = 'none'
  }
})

// Adicione um event listener para o formulário
taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o comportamento padrão de recarregar a página

  // Obtém o valor do campo de título
  let titleInput = document.getElementById('title')
  let titleValue = titleInput.value.trim()

  // Obtém o elemento onde a mensagem de erro será exibida
  let errorMessage = document.getElementById('error-message')

  // Verifica se o campo de título está vazio
  if (titleValue === '') {
    errorMessage.innerHTML = '<p>É necessário preencher o título.</p>'
  } else {
    errorMessage.innerHTML = ''

    let addCard = document.getElementById('cardContainer')
    addCard.innerHTML += `<div class="draggable z-10 cursor-move bg-main m-5 flex rounded-xl justify-center" draggable="true">
      <h2 class="text-main p-3 text-3xl">${titleValue}</h2>
      <div class="flex m-4 bg-main rounded edit-card">
        <a href="#"><svg role="graphics-symbol" viewBox="0 0 16 16" class="pencil py-1" style="width: 26px; height: 24px; display: block; fill: white; flex-shrink: 0;"><path d="M3.926 13.307H14.11c.183 0 .34-.066.472-.199a.644.644 0 00.198-.471.652.652 0 00-.198-.479.644.644 0 00-.472-.198H5.272l-1.346 1.347zm-.704-.636l7.683-7.684-1.312-1.319-7.69 7.684-.67 1.606c-.037.1-.017.191.06.273.083.082.174.105.274.069l1.655-.63zm8.34-8.326l.738-.732c.182-.187.278-.376.287-.567.009-.192-.068-.374-.232-.547l-.267-.267c-.169-.168-.351-.246-.547-.232-.196.014-.385.11-.567.287l-.739.732 1.327 1.326z"></path></svg></a>
        <a href="#" class="delete-card"><svg role="graphics-symbol" viewBox="0 0 13 3" class="dots px-1" style="width: 22px; height: 22px; display: block; fill: white; flex-shrink: 0;"><g><path d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"></path><path d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"></path><path d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"></path></g></svg></a>
      </div>
        <div class="delete-modal hidden">
            <p>Tem certeza de que deseja excluir este card?</p>
            <button class="delete-button">Excluir</button>
            <button class="cancel-button">Cancelar</button>
        </div>
    </div>`
    cards.push({ title: titleValue });
    // Salve os cards no localStorage
    saveCardsToLocalStorage(cards);

    // Limpa o campo de título após a criação do card
    titleInput.value = ''

    // Fecha o modal
    modalTask.style.display = 'none'
  }
})

// Função para salvar os cards no localStorage
function saveCardsToLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
}
// Função para recuperar os cards do localStorage
function getCardsFromLocalStorage() {
    const storedCards = localStorage.getItem('cards');
    return storedCards ? JSON.parse(storedCards) : [];
}

const cards = getCardsFromLocalStorage();

// Renderize os cards na página
const cardContainer = document.getElementById('cardContainer');
cards.forEach(card => {
  cardContainer.innerHTML += `<div class="draggable z-10 cursor-move bg-main m-5 flex rounded-xl justify-center items-center" draggable="true">
    <div class="w-10/12">  
      <h2 class="text-main p-3 text-3xl">${card.title}</h2>
    </div>  
    <div class="rounded edit-card">
      <a href="#" class="delete-card"><svg class="fill-current text-main" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 50 50">
      <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z"></path>
      </svg></a>
    </div>
    <div class="delete-modal absolute bg-second rounded flex flex-col hidden">
        <button class="delete-button text-main p-2 rounded bg-red">Excluir</button>
        <button class="cancel-button text-main p-2 rounded">Cancelar</button>
    </div>
  </div>`;
});

// Seleciona todos os ícones de três pontos (ícones de exclusão)
const deleteIcons = document.querySelectorAll('.delete-card');

// Event listener para abrir o modal de exclusão
deleteIcons.forEach(icon => {
  icon.addEventListener('click', function(event) {
    // Impede o comportamento padrão do link
    event.preventDefault();

    // Encontra o modal de exclusão correspondente a este botão de exclusão
    const modal = this.closest('.draggable').querySelector('.delete-modal');

    // Exibe o modal de exclusão
    modal.style.display = 'block';
  });
});

// Event listener para o botão "Excluir" nos modais de exclusão
const deleteButtons = document.querySelectorAll('.delete-button');

deleteButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Seleciona o card correspondente ao botão "Excluir"
    const card = this.parentElement.parentElement; // Acessa o pai do pai (o card)

    // Remove o card do DOM
    card.remove();

    // Remove o card do array de cards e atualiza o localStorage
    const cardTitle = card.querySelector('h2').textContent;
    const updatedCards = cards.filter(card => card.title !== cardTitle);
    saveCardsToLocalStorage(updatedCards);

    // Fecha o modal de exclusão
    this.parentElement.style.display = 'none';
  });
});

// Seleciona todos os elementos com a classe "draggable"
const draggables = document.querySelectorAll(".draggable");
// Seleciona todas as áreas de destino (dropzones)
const dropzones = document.querySelectorAll(".dropzone");
// Adiciona manipuladores de eventos aos elementos arrastáveis
draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    });
});
// Adiciona manipuladores de eventos aos elementos arrastáveis
dropzones.forEach(dropzone => {
  dropzone.addEventListener("dragover", e => {
      e.preventDefault();
  });

  dropzone.addEventListener("drop", e => {
      e.preventDefault();
      const draggable = document.querySelector(".dragging");
      if (draggable) {
          dropzone.appendChild(draggable);
      }
  });
});

// Adiciona manipuladores de eventos aos elementos arrastáveis (incluindo os dinâmicos)
document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("draggable")) {
      e.target.classList.add("dragging");
  }
});

document.addEventListener("dragend", e => {
  if (e.target.classList.contains("draggable")) {
      e.target.classList.remove("dragging");
  }
});
