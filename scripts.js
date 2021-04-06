const sendData = document.querySelector('#submit-Button');
const form = document.querySelector('#form-body');
let transactionFormData = new FormData(form);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let transactionFormData = new FormData(form);
  let transactionObj = convertFormDataToTransactionObj(transactionFormData);
  saveTransactionObj(transactionObj);
  insertRowInTable(transactionObj);
  form.reset();
});

const drawCategories = () => {
  let categories = ['Alquiler', 'Comida', 'Diversion'];
  for (category of categories) {
    instertCategory(category);
  }
};

const instertCategory = (categoryName) => {
  const selectElement = document.getElementById('transactionCategory');
  let htmlToInsert = `<option> ${categoryName} </option>`;
  selectElement.insertAdjacentHTML('beforeend', htmlToInsert);
};

document.addEventListener('DOMContentLoaded', function (event) {
  drawCategories();
  let transactionObjArray = JSON.parse(localStorage.getItem('transactionData'));
  transactionObjArray.forEach((element) => {
    insertRowInTable(element);
  });
});

//funcion encargada de generar un ID para cada elemento
const getNewTransacionId = () => {
  let lastTransactionId = localStorage.getItem('lastTransactionId') || '-1';
  let newTransactionId = JSON.parse(lastTransactionId) + 1;
  localStorage.setItem('lastTransactionId', JSON.stringify(newTransactionId));
  return newTransactionId;
};

const convertFormDataToTransactionObj = (transactionFormData) => {
  let transactionType = transactionFormData.get('transactionType');
  let transactionDescription = transactionFormData.get(
    'transactionDescription'
  );
  let transactionAmount = transactionFormData.get('transactionAmount');
  let transactionCategory = transactionFormData.get('transactionCategory');
  let transactionId = getNewTransacionId();

  return {
    transactionType: transactionType,
    transactionDescription: transactionDescription,
    transactionAmount: transactionAmount,
    transactionCategory: transactionCategory,
    transactionId: transactionId,
  };
};

const insertRowInTable = (transactionObj) => {
  let transactionTableRef = document.getElementById('transactionTable');

  let newTransactionRowRef = transactionTableRef.insertRow(-1);
  newTransactionRowRef.setAttribute(
    'data-transaction-id',
    transactionObj['transactionId']
  );

  let newTransactionCell = newTransactionRowRef.insertCell(0);
  newTransactionCell.textContent = transactionObj['transactionType'];

  newTransactionCell = newTransactionRowRef.insertCell(1);
  newTransactionCell.textContent = transactionObj['transactionDescription'];

  newTransactionCell = newTransactionRowRef.insertCell(2);
  newTransactionCell.textContent = transactionObj['transactionAmount'];

  newTransactionCell = newTransactionRowRef.insertCell(3);
  newTransactionCell.textContent = transactionObj['transactionCategory'];

  let newDeleteCell = newTransactionRowRef.insertCell(4);
  let deleteButton = document.createElement('BUTTON');
  deleteButton.classList.add('waves-effect', 'waves-light', 'btn-small');
  deleteButton.textContent = 'Eliminar';
  newDeleteCell.append(deleteButton);

  deleteButton.addEventListener('click', (e) => {
    let transactionRow = e.target.parentNode.parentNode;
    let transactionId = transactionRow.getAttribute('data-transaction-id');
    transactionRow.remove();
    deleteTransactionObj(transactionId);
  });
};

//Le paso como parametro el transactionId que quiero eliminar
const deleteTransactionObj = (transactionId) => {
  //Obtengo las transacciones de mi base de datos y desconvierto de JSON a objeto
  let transactionObjArray = JSON.parse(localStorage.getItem('transactionData'));
  //Busco el indice / la posicion de la transaccion que quiero eliminar
  let transactionIndexInArray = transactionObjArray.findIndex(
    (elemento) => elemento.transactionId == transactionId
  );
  //Elimino el elemento de esa posicion
  transactionObjArray.splice(transactionIndexInArray, 1);
  //Convierto de objeto a JSON para poder guaradrlo en el LocalStorage
  let transactionArrayJSON = JSON.stringify(transactionObjArray);
  //Guardo mi array de transacciones JSON en el local storage
  localStorage.setItem('transactionData', transactionArrayJSON);
};

const saveTransactionObj = (transactionObj) => {
  //Se comprueba el contenido, si es null, se ejecuta lo que esta del lado derecho de los pipes,osea se creo un array vacio
  //esto es para cuando se crea por primera vez y no hay nada en el local storage guardado.
  let myTransactionArray =
    JSON.parse(localStorage.getItem('transactionData')) || [];
  myTransactionArray.push(transactionObj);
  //Convierto mi array de transacacciones a JSON
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  //Guardo mi array de transacciones JSON en el local storage
  localStorage.setItem('transactionData', transactionArrayJSON);
};
