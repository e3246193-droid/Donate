const list = document.querySelector("#list")
const inputs = document.querySelectorAll("input")
const add = document.querySelector("#add")

// CRUD Http methods
// C - create POST
// Read - GET
// Update - PUT / PATCH
// D - delete

const url = "https://6a74722215e0453fe1b4e1ae.mockapi.io/Cars"

async function getProduct() {
  try {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data);

    showProduct(data)

  } catch (error) {
    console.log(error);
  }
}

getProduct()

function showProduct(arr) {
  // Очищаем список перед отрисовкой, чтобы элементы не дублировались
  list.innerHTML = ""; 
  for (const pr of arr) {
    list.innerHTML += `
      <li>
        <h4>${pr.name}</h4>
        <img src="${pr.avatar}" width="100"/>
        <button onclick="changeProduct('${pr.id}')">Update</button>
      </li>`
  }
}

async function changeProduct(id) {
  try {
    const inputTitle = prompt("Enter title")
    const img = prompt("Enter url")
    
    // Если пользователь нажал Отмена, прерываем выполнение
    if (!inputTitle && !img) return;

    const res = await fetch(`${url}/${id}`, {
      method: "PUT", // Исправлено: было "metthoodp"
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name: inputTitle, avatar: img }) // Исправлены лишние закрывающие скобки
    })
    
    const data = await res.json()
    getProduct() // Обновляем список на странице
  } catch (error) {
    console.log(error);
  }
}