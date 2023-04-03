const clients = [
    { id: 1,
        nom: "MANGA", 
        prenom: "FATOU", 
        telephone: "70 843 44 22", 
        email: "fatou@exemple.com",
        solde:2000, 
        photoDuclient: " https://images.unsplash.com/photo-1585870683904-a382fbb42754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
       transaction : [
            // { numero: "1", date: "10-01-2022", sens: "1", montant: "2000" },
       ] 
   },
       { 
        id: 2,
        nom: "DIOP",
         prenom: "OUMAR",
         telephone: "77 898 34 63", 
         email: "oumar@exemple.com", 
         solde:2000, 
         photoDuclient: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", 
         transaction : [
            // { numero: "1", date: "11-02-2022", sens: "1", montant: "2000" },x
    ]
       },

 {
    id: 3,
     nom: "SALL", 
     prenom: "FATOU", 
     telephone: "77 876 34 22",
     email: "fatou@exemple.com",
     solde:2000, 
     photoDuclient: "https://images.unsplash.com/photo-1606415918835-88d0614e75ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", 
     transaction :[
        { numero: "1", date: "10/08/22", sens: "1", montant: "2000" },
    ]
 },
 {
   id: 4, 
   nom: "BA",
   prenom: "KADIATA", 
   telephone: "77 122 34 55", 
   email: "kadiata@exemple.com",
   solde:3000, 
   photoDuclient: "https://images.unsplash.com/photo-1596305589440-2e180399a760?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
   transaction : [    
       { numero: "1", date: "10/08/22", sens: "1", montant: "2000" },
  ]
 }
];


const dataClient = document.getElementsByClassName("data")[0];
const select = document.querySelector("#trans");
const inputMontant = document.querySelector("#mnt");
const amount = 500;
const nextButton = document.getElementsByClassName("next")[0];
const photoClient = document.querySelector('.photo img');
const btnDetail = document.getElementById("btnDetail");
const form = document.querySelector(".form");
const bouttonEnregistrer = document.querySelector(".form button");


let lastName = document.getElementById("lastname");
let firstName = document.getElementById("firstname");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let solde = document.getElementById("solde");
let tbody = document.querySelector("tbody");
let nombreTrans = document.getElementById("nombreTrans");




// ================================================================================================
// Function declaration

function getUserById(id) {
    let u;
    clients.forEach(e => {
        if(id == e.id) {
            u = e;
            return
        }
    })
    return u;
}

function calculerSolde(id) {
    let u = getUserById(id), somme = 0;
    for (let t of u.transaction)
        somme += parseInt(t.sens) * t.montant;
    return somme;    
}

function remplirClient(id) {
    let user = getUserById(id);
    if (user != undefined){
        lastName.innerText = user.nom;
        firstName.innerText = user.prenom;
        phone.innerText =user.telephone;
        email.innerText = user.email;
        solde.innerText = calculerSolde(id);
        photoClient.src = user.photoDuclient;
        
        let ts = user.transaction;
        nombreTrans.innerHTML = ts.length;
        tbody.innerHTML = "";
        for (let t of ts) {
            tbody.innerHTML +=
            `
            <tr>
                <td>${t.numero}</td>
                <td>${t.date}</td>
                <td>${t.sens}</td>
                <td>${t.montant}</td>
            </tr>
            `;
        }
    }
}


remplirClient(1)


// ================================================================================================
// evenement

let current = 0;
nextButton.addEventListener("click",() => {
    let a = Math.floor(Math.random()*clients.length);
    while (a == current) {
        a = Math.floor(Math.random()*clients.length);
    } 
    current = a


remplirClient(clients[current].id);
} )


btnDetail.addEventListener("click", () => {
    form.classList.toggle("view");
})

bouttonEnregistrer.addEventListener("click", ()=> {
    let montant = inputMontant.value;
    if (verifieChampVide(inputMontant) == true ) {
        alert("Veuillez saisir tou les champs")
    } else {
        if (verifieMontantSuperieurA(montant)== false) {
            alert("Veuillez augmeneter")
        } else {
            if (verifieMontantRetrait(montant,clients[current].solde)== true) {
                alert("votre solede est insuffisant pour ce transfert")
            } else {
                console.log(montant);
                let sens = select.value
                sens = sens=="d" ? 1 : -1
                remplirClient(clients[current].id)
                clients[current].transaction.push( { montant:+montant, sens:sens, date:"gygtbybhy", numero:1})
                console.log(clients[current]);
            }

        }
        // inputMontant.value=""
    }
    
});


//sert à vérifier si un champ est vide;
function verifieChampVide(input) {
    if(input.value == "") {
        return true
    }
    return false
}
console.log(verifieMontantSuperieurA(12));

function verifieMontantSuperieurA(montant) {
    if(montant<500) {
        return false
    }return true
}
function verifieMontantRetrait(montant,solde) {
    if(montant > solde && select.value == "r") {
        return true
    } 
    return false

}