window.addEventListener('beforeunload',save);
function save() {
    localStorage.db = JSON.stringify(db);
}

const allAccounts = document.querySelector('#allAccounts');
const addAccountView = document.querySelector('#add-account-view');
const accountsView = document.querySelector('#accounts-view');
const allLinks = document.querySelectorAll('.nav-link');
const allViews = document.querySelectorAll('.view');
const idInput = document.querySelector('[placeholder="id"]');
const nameInput = document.querySelector('[placeholder="name"]');
const lastnameInput = document.querySelector('[placeholder="lastname"]');
const emailInput = document.querySelector('[placeholder="email"]');
const phoneInput = document.querySelector('[placeholder="phone"]');
const saveBtn = document.querySelector('#save');
const eId = document.querySelector('.eId');
const eName = document.querySelector('.eName');
const eLastname = document.querySelector('.eLastname');
const eEmail = document.querySelector('.eEmail');
const ePhone = document.querySelector('.ePhone');
const editBtn = document.querySelector('#edit');
let id;
// const accountsViewBtn = document.querySelector('[href="accounts-view"]');
// const addAccountViewBtn = document.querySelector('[href="add-account-view"]');

editBtn.addEventListener('click',saveEditAccount);
saveBtn.addEventListener('click',saveAccount);

function saveEditAccount() {
    const editedAccount = {
        id: eId.value,
        name: eName.value,
        lastname: eLastname.value,
        email: eEmail.value,
        phone: ePhone.value
    }
    db[id] = editedAccount;
    createAccountsTable();
    showView('#accounts-view');
}

function saveAccount() {
    const newAccount = {
        id: idInput.value,
        name: nameInput.value,
        lastname: lastnameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    }
    db.push(newAccount);
    idInput.value = "";
    nameInput.value = "";
    lastnameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    createAccountsTable();
    showView('#accounts-view');
}

for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener('click',showView)
}
function showView(e) {
    for (let i = 0; i < allViews.length; i++) {
        allViews[i].style.display = "none"
    }
    if (e instanceof Event) {
        e.preventDefault();
        let id = `#${this.getAttribute("href")}`;
        document.querySelector(id).style.display = "block";
    } else {
        document.querySelector(e).style.display = "block";
    }   
}


// addAccountViewBtn.addEventListener('click',function (e) {
//     e.preventDefault();
//     addAccountView.style.display = "block";
//     accountsView.style.display = "none"
// });
// accountsViewBtn.addEventListener('click',function (e) {
//     e.preventDefault();
//     addAccountView.style.display = "none";
//     accountsView.style.display = "block"
// });


createAccountsTable();

function createAccountsTable() {
    let htmlAccounts = ``;
    for (let i = 0; i < db.length; i++) {
        const account = db[i];
        htmlAccounts+=`
        <tr>
            <td>${account.id}</td>
             <td>${account.name}</td>
            <td>${account.lastname}</td>
            <td>${account.email}</td>
            <td>${account.phone}</td>
            <td><button data-id=${i} class="edit-btn btn btn-sm btn-warning form-control">Edit</button></td>
            <td><button data-id=${i} class="delete-btn btn btn-sm btn-danger form-control">Delete</button></td>
        </tr>  `
     }
     allAccounts.innerHTML = htmlAccounts;
     const allEditBtns = document.querySelectorAll('.edit-btn');
     const allDeleteBtns = document.querySelectorAll('.delete-btn');

     for (let i = 0; i < allDeleteBtns.length; i++) {
        allDeleteBtns[i].addEventListener('click',deleteAccount);
        allEditBtns[i].addEventListener('click',editAccount);        
     }
}

function deleteAccount() {
    let id = this.getAttribute('data-id');
    db.splice(id,1); //ova metoda brise polje sa datim id a ovo jedan znaci samo tog korisnika
    createAccountsTable();
    showView('#accounts-view');
}

function editAccount() {
    id = this.getAttribute('data-id'); //ovom varijablom uzimamo id od onog na cije polje smo kliknuli
    let selectedAccount = db[id]; //ovom varijablom zadajemo vrednosti input polju onog id na koji kliknemo
    eId.value = selectedAccount.id;
    eName.value = selectedAccount.name;
    eLastname.value = selectedAccount.lastname;
    eEmail.value = selectedAccount.email;
    ePhone.value = selectedAccount.phone;
    showView('#edit-account-view');

}

