const input = document.querySelector('input[type="text"]');
const btnSubmit = document.querySelector('button[type="submit"]');
const notification = document.querySelector('.noti');
const message = notification.querySelector('p');
const btnCloseNoti = notification.querySelector('.close-noti');

const listItems = document.querySelector('.items-list');

let idItem = 0

input.focus();

function addItem(item) {
  const liElement = document.createElement('li');
  liElement.classList.add('item');
  idItem++

  liElement.innerHTML = `
    <label class="item_content">
      <input type="checkbox" id="item-${idItem}" name="itens" value="${item}" />
      <span>${item}</span>
    </label>

    <button type="button" class="item_remove" aria-label="Remover ${item}">
      <img src="icons/recicle.svg" alt="">
    </button>
  `;
  return liElement;
}

btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();

  if (input.value === '') {
    notification.classList.remove('hidden');
    message.innerHTML = `<p>Digite um item para adicionar</p>`;
    notification.classList.add('show');
    
    return;
  }

  listItems.prepend(addItem(input.value));

  input.value = '';
  input.focus();
});

listItems.addEventListener('click', (event) => {
  const isButton = event.target.closest('.item_remove');
  if (!isButton) return;

  const itemToRemove = event.target.closest('.item');
  const nameItem = itemToRemove.querySelector('span').textContent;

  itemToRemove.remove();

  notification.classList.remove('hidden');
  message.innerHTML = `<p>O item <strong>${nameItem}</strong> foi removido da lista</p>`;


});

btnCloseNoti.addEventListener('click', () => {
  notification.classList.add('hidden');
});