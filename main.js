const allAccounts = document.querySelector('#allAccounts');
const addAccountView = document.querySelector('#add-account-view');
const accountsView = document.querySelector('#accounts-view');
const allLinks = document.querySelectorAll('.nav-link');
const allViews = document.querySelectorAll('.view');
// const accountsViewBtn = document.querySelector('[href="accounts-view"]');
// const addAccountViewBtn = document.querySelector('[href="add-account-view"]');
for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener('click',showView)
}
function showView(e) {
    e.preventDefault();
    for (let i = 0; i < allViews.length; i++) {
        allViews[i].style.display = "none"
    }
    let id = `#${this.getAttribute("href")}`;
    document.querySelector(id).style.display = "block";
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
        </tr>  `
     }
     allAccounts.innerHTML = htmlAccounts;
}

