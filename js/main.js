const form = document.querySelector('[data-form]')
const listItems = document.querySelector('[data-list-items]')
const items = JSON.parse(localStorage.getItem('items')) || []

items.forEach(element => {
  createElement(element)
})

form.addEventListener('submit', e => {
  e.preventDefault()

  const name = e.target.elements['name']
  const quantity = e.target.elements['quantity']

  const itemExists = items.find(element => element.name === name.value)

  const currentItem = {
    name: name.value,
    quantity: quantity.value
  }

  if (itemExists) {
    currentItem.id = itemExists.id

    updateElement(currentItem)
    items[items.findIndex(element => element.id === itemExists.id)] =
      currentItem
  } else {
    currentItem.id = items[items.length - 1]
      ? items[items.length - 1].id + 1
      : 1

    createElement(currentItem)

    items.push(currentItem)
  }

  localStorage.setItem('items', JSON.stringify(items))

  name.value = ''
  quantity.value = ''
})

function createElement(item) {
  const newItem = document.createElement('li')
  newItem.classList.add('item')

  const numberItem = document.createElement('strong')
  numberItem.dataset.id = item.id
  numberItem.innerText = item.quantity

  newItem.appendChild(numberItem)
  newItem.append(item.name)
  newItem.appendChild(deleteButton(item.id))

  listItems.appendChild(newItem)
}

function updateElement(item) {
  document.querySelector(`[data-id="${item.id}"]`).innerText = item.quantity
}

function deleteButton(id) {
  const buttonElement = document.createElement('button')
  buttonElement.classList.add('deleteButton')
  buttonElement.innerText = 'x'

  buttonElement.addEventListener('click', function () {
    deleteElement(this.parentNode, id)
  })

  return buttonElement
}

function deleteElement(tag, id) {
  tag.remove()
  items.splice(
    items.findIndex(element => element.id === id),
    1
  )

  localStorage.setItem('items', JSON.stringify(items))
}
