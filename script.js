const tbodyEl = document.getElementById("productTableBody");

const idEl = document.getElementById("id");
const nameEl = document.getElementById("name");
const priceEl = document.getElementById("price");
const categoryEl = document.getElementById("category");
const descriptionEl = document.getElementById("description");
const modalEl = document.getElementById("crud-modal");
const updateBtnEl = document.getElementById("updateBtn");
const createBtnEl = document.getElementById("createBtn");

const products = [];
let productsIndex;
let editIndex = null;
let isEdit = false;

function openCreateModal() {
  clearInput();
  productsIndex = null;

  createBtnEl.classList.remove("hidden");
  updateBtnEl.classList.add("hidden");

  openModal();
}

function createProduct() {
  const newProduct = {
    id: products.length + 1,
    name: nameEl.value,
    price: priceEl.value,
    category: categoryEl.value,
    description: descriptionEl.value,
  };

  products.push(newProduct);
  renderProduct();
  closeModal(); // ✅ close modal
  clearInput();

  // reset state
  productsIndex = null;
  createBtnEl.classList.remove("hidden");
  updateBtnEl.classList.add("hidden");
}

function renderProduct() {
  tbodyEl.innerHTML = "";
  products.forEach((product, index) => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-gray-50 transition";

    tr.innerHTML = `
  <td class="px-6 py-4 text-gray-700">${product.id}</td>

  <td class="px-6 py-4 font-medium text-gray-900">
    ${product.name}
  </td>

  <td class="px-6 py-4 text-green-600 font-semibold">
    $${product.price}
  </td>

  <td class="px-6 py-4">
    <span class="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
      ${product.category}
    </span>
  </td>

  <td class="px-6 py-4 text-gray-500">
    ${product.description || "-"}
  </td>

  <td class="px-6 py-4 text-center space-x-2">
    <button
      class="px-3 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
      onclick="edit(${index})"
    >
      Edit
    </button>

    <button
      class="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
      onclick="deleteProduct(${index})"
    >
      Delete
    </button>
  </td>
`;

    tbodyEl.append(tr);
  });
}
renderProduct();

function edit(index) {
  const product = products[index];
  console.log(`edit on: ${product}`);
  productsIndex = index;
  idEl.value = product.id;
  nameEl.value = product.name;
  priceEl.value = product.price;
  categoryEl.value = product.category;
  descriptionEl.value = product.description;
  createBtnEl.classList.add("hidden");
  updateBtnEl.classList.remove("hidden");
  openModal();
}

function clearInput() {
  idEl.value = "";
  nameEl.value = "";
  priceEl.value = "";
  categoryEl.value = "";
  descriptionEl.value = "";
}
function update() {
  if (productsIndex === null) return;

  products[productsIndex] = {
    id: products[productsIndex].id, // keep same id
    name: nameEl.value,
    price: priceEl.value,
    category: categoryEl.value,
    description: descriptionEl.value,
  };

  renderProduct();
  closeModal();
  clearInput();

  productsIndex = null;
  createBtnEl.classList.remove("hidden");
  updateBtnEl.classList.add("hidden");
}
function deleteProduct(index) {
  const product = products[index];
  products.splice(index, 1);
  alert(`you sure to delete ${product.name}`);
  renderProduct();
}

function openModal() {
  document.getElementById("crud-modal").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("crud-modal").classList.add("hidden");
}
