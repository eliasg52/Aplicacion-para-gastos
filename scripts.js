const sendData = document.querySelector('#submit-Button');
const form = document.querySelector('#form-body');
let transactionFormData = new FormData(form);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let transactionFormData = new FormData(form);
  let transactionObj = convertFormDataToTransactionObj(transactionFormData);
  saveTransactionObj(transactionObj);
  insertRowInTable(transactionObj);
});

document.addEventListener('DOMContentLoaded', (e) => {
  let transactionObjArray = JSON.parse(localStorage.getItem('transactionData'));
  transactionObjArray.forEach((element) => {
    insertRowInTable(element);
  });
});

const convertFormDataToTransactionObj = (transactionFormData) => {
  let transactionType = transactionFormData.get('transactionType');
  let transactionDescription = transactionFormData.get(
    'transactionDescription'
  );
  let transactionAmount = transactionFormData.get('transactionAmount');
  let transactionCategory = transactionFormData.get('transactionCategory');

  return {
    transactionType: transactionType,
    transactionDescription: transactionDescription,
    transactionAmount: transactionAmount,
    transactionCategory: transactionCategory,
  };
};

const insertRowInTable = (transactionObj) => {
  let transactionTableRef = document.getElementById('transactionTable');
  let newTransactionRowRef = transactionTableRef.insertRow(-1);

  let newTransactionCell = newTransactionRowRef.insertCell(0);
  newTransactionCell.textContent = transactionObj['transactionType'];

  newTransactionCell = newTransactionRowRef.insertCell(1);
  newTransactionCell.textContent = transactionObj['transactionDescription'];

  newTransactionCell = newTransactionRowRef.insertCell(2);
  newTransactionCell.textContent = transactionObj['transactionAmount'];

  newTransactionCell = newTransactionRowRef.insertCell(3);
  newTransactionCell.textContent = transactionObj['transactionCategory'];
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