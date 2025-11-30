import "./styles/styles.css"

const input = document.querySelector('#input-item');
const btnSubmit = document.querySelector('button[type="submit"]');
const notification = document.querySelector('.noti');
const message = notification.querySelector('p');
const btnCloseNoti = notification.querySelector('.close-noti');

const listItems = document.querySelector('.items-list');

let idItem = 0

window.onload = load()

input.focus();

function createItem(item, id, check) {
  const liElement = document.createElement('li');
  liElement.classList.add('item');

  liElement.innerHTML = `
    <label class="item_content">
      <input type="checkbox" id="item-${id}" name="itens" value="${item}" ${check ? "checked" : ""}/>
      <span>${item}</span>
    </label>

    <button type="button" class="item_remove" aria-label="Remover ${item}">
      
    </button>
  `;

  listItems.prepend(liElement);
}

function loadLocalStorage() {
  const data = localStorage.getItem("LIST")
  return data ? JSON.parse(data) : []
}

function load() {
  listItems.innerHTML = ""
  const list = loadLocalStorage()
  list.forEach(item => {
    if(item.selected){
      createItem(item.name, item.id, item.selected)
    } else {
      createItem(item.name, item.id, item.selected)
    }
  })
}

function saveItem(item) {
  const list = loadLocalStorage()
  list.push(item)

  localStorage.setItem("LIST", JSON.stringify(list))

  load()

}

btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();

  if (input.value === '') {
    notification.classList.remove('hidden');
    message.innerHTML = `<p>Digite um item para adicionar</p>`;
    notification.classList.add('show');

    return;
  }

  const item = {
    id: idItem++,
    name: input.value,
    selected: false
  }

  saveItem(item)

  input.value = '';
  input.focus();
});

listItems.addEventListener('click', (event) => {
  const isButton = event.target.closest('.item_remove');
  if (!isButton) return;

  const itemToRemove = event.target.closest('.item');
  const nameItem = itemToRemove.querySelector('span').textContent;

  const list = loadLocalStorage()

  const newList = list.filter(item => {
    return item.name != nameItem
  })

  localStorage.setItem("LIST", JSON.stringify(newList))
  load()

  itemToRemove.remove();

  notification.classList.remove('hidden');
  message.innerHTML = `<p>O item <strong>${nameItem}</strong> foi removido da lista</p>`;


});

listItems.addEventListener('click', (event) => {
  const isCheck = event.target.closest('input[type="checkbox"]');;
  if (!isCheck) return;

  const itemName = (event.target.nextElementSibling).innerText
  const itens = loadLocalStorage()

  const newList = itens.map(item => {
    return item.name === itemName ? { ...item, selected: item.selected ? false : true } : item       
  })

  localStorage.setItem("LIST", JSON.stringify(newList))
  
});

btnCloseNoti.addEventListener('click', () => {
  notification.classList.add('hidden');
});