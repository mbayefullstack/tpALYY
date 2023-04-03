const clients = [
    { id: 1,
        nom: "MANGA", 
        prenom: "FATOU", 
        telephone: "70 843 44 22", 
        email: "fatou@exemple.com",
        solde:2000000, 
        photoDuclient: " https://images.unsplash.com/photo-1585870683904-a382fbb42754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
       transaction : [
            // { numero: "10", date: "10-01-2022", sens: "1", montant: "12000" },
            // { numero: "11", date: "20-01-2022", sens: "-1", montant: "20000" },
            // { numero: "12", date: "30-01-2022", sens: "1", montant: "3000" },
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
            // { numero: "10", date: "11-02-2022", sens: "1", montant: "2000" },
            // { numero: "10", date: "10-01-2022", sens: "1", montant: "12000" }
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
            // { numero: "", date: "", sens: "", montant: "" },
            // { numero: "", date: "", sens: "", montant: "" }
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
    //    { numero: "12", date: "10/08/22", sens: "1", montant: "1000" },
    //    { numero: "1", date: "10/08/22", sens: "-1", montant: "1000" }
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

let lengthClient = clients.length ;
let currentCLient = randomUser(lengthClient);




// ================================================================================================
// function declaration

function randomUser(max) {
    return Math.floor(Math.random() * max)
}

function printUser(user) {
   const photoeL = document.querySelector(".photo");
//    creation d'une image 
    let  photo = new Image();  
    photo.src = clients[currentCLient].photoDuclient
    photoeL.innerHTML = photo.outerHTML;
    photo.onload=()=>{      
        afficheClient(clients[currentCLient])
        afficherTransaction(currentCLient)    
   }
}

function afficheClient(client) {
    lastName.innerText= client.nom;
    firstName.innerText= client.prenom;
    phone.innerText= client.telephone;
    email.innerText= client.email;
    solde.innerText= client.solde;
}

function afficherTransaction(client) {    tbody.innerHTML = "";

    clients[client].transaction.forEach(t => {

        tbody.innerHTML +=`
        <tr>
        <td>${t.numero}</td>
        <td>${t.date}</td>
         <td>${t.sens}</td>
         <td>${t.montant}</td>
        </tr>        
        `
    })
}

function isValid(montant, amount, solde){
    if (montant == ""  && montant < amount && montant > solde) {
        return console.log("false");
    }else{
        return console.log("true");
    }
   
}

// function creationFlottant (nomDiv,nomClasse,texteP) {
//     let nomDiv = document.createElement("div");

//     nomDiv.classList.add("nomClasse");

//     nomClasse.innerHTML = `
//         <div class="nomclasse"> 
//         <p>texteP</p>
//         </div>`

//     document.body.appendChild(nomDiv)
// }

// ===============================================================================================
// appel function
// afficherTransaction(currentCLient)
// afficheClient(clients[currentCLient])
  printUser(clients[currentCLient])

// ============================================================================================
// evenement

nextButton.addEventListener("click", () => {
    currentCLient = randomUser(lengthClient)
    printUser(clients[currentCLient])
});


btnDetail.addEventListener(("click"),()=> {
    form.classList.toggle('view')
  })


  bouttonEnregistrer.addEventListener(("click"),()=> {
    let montant = inputMontant.value;
    let valid= isValid(montant, amount,  clients[currentCLient].solde )
    let length = clients[currentCLient].transaction.length;
    if (select.value == 'r') {  
       let transObject = {
        numero :0,
        date: new Date().toLocaleDateString(),
        sens:"",
        montant: montant
       }
       
       transObject.numero = clients[currentCLient].transaction[length-1]?.numero + 1
       transObject.sens = -1



        if (montant == "") {
            alert("Veuillez saisir un Montant SVP");
                                                                                                                  
        }else if (montant < amount) {
            alert('Vous ne pouvez pas retirez un montant supérieur à votre solde.')

        }else if (montant > clients[currentCLient].solde) {
             alert('Vous ne pouvez pas retirez un montant supérieur à votre solde.')

        }else{
            clients[currentCLient].solde = clients[currentCLient].solde - montant
            clients[currentCLient].transaction.push(transObject)
            printUser(clients[currentCLient])
             
        }    
        inputMontant.value = ""                
    }else if (select.value =="d") {
        let transObject = {
            numero :0,
            date: new Date().toLocaleDateString(),
            sens:"",
            montant: montant
           }
           
           transObject.numero = clients[currentCLient].transaction[length-1]?.numero + 1
           transObject.sens = 1;

           if (montant == "") {
            alert("Veuillez saisir un Montant SVP");
           } else {
            clients[currentCLient].solde = clients[currentCLient].solde + parseInt(montant)
            clients[currentCLient].transaction.push(transObject)
            printUser(clients[currentCLient])
           }
    // } else if (select.value == "t") {
    //     let montant = inputMontant.value;
    //     let numeroBeneficiaire =inputNumero.value;
    //     let valid = isValid(montant,amount, clients[currentCLient].solde);

    //     if(montant == "" || numeroBeneficiaire == "") {
    //         alert("Veuillez saisir un montant et un numéro de compte bénéficiaire SVP")
    //     } else if(montant > clients[currentCLient].solde) {
    //         alert("Veuillez saisir un montant et un numéro de compte bénéficiaire SVP");
    //     } else {
    //         let beneficaire = clients.find(client => client.numero === numeroBeneficiaire)
    //     }
    //     if (beneficaire === undefined) {
    //         alert("Le numéro de compte bénéficiaire est invalide.")
    //     } else {
    //         clients[currentCLient].solde -= montant;
    //         beneficaire.solde += parseInt(montant);
            
    //         let transObjectEmetteur ={
    //             numero: 0,
    //             date: new Date().toLocaleDateString(),
    //             sens: "",
    //             montant: montant
    //         };
    //         let transObjectBeneficiaire ={
    //             numero: 0,
    //                 date: new Date().toLocaleDateString(),
    //                 sens: "",
    //                 montant: montant
    //         };
    //         transObjectEmetteur.numero = clients[currentCLient].transaction[length - 1]?.numero +1;
    //         transObjectEmetteur.sens = -1;

    //         transObjectBeneficiaire.numero = beneficiaire.transaction[beneficiaire.transaction.length - 1]?.numero + 1;
    //             transObjectBeneficiaire.sens = 1;

    //             clients[currentCLient].transaction.push(transObjectEmetteur);
    //             beneficiaire.transaction.push(transObjectBeneficiaire);

    //             printUser(clients[currentCLient]);
    //         }

    //         inputMontant.value = "";
    //         inputNumero.value = "";
        }
    
        
    
  })
  let bouttonTransfert = document.getElementById("bouttonTransfert");
  bouttonTransfert.addEventListener("click", () => {
    let montant = inputMontant.value;
    let valid = isValid(montant, amount, clients[currentCLient].solde);
    let length = clients[currentCLient].transaction.length;
    if (select.value == "t") {
      let transObject = {
        numero: 0,
        date: new Date().toLocaleDateString(),
        sens: "",
        montant: montant,
        destinataire: "",
      };
  
      transObject.numero =
        clients[currentCLient].transaction[length - 1]?.numero + 1;
      transObject.sens = -1;
  
      let destinataire = inputDestinataire.value;
      let clientDest = clients.findIndex((c) => c.numero === destinataire);
  
      if (montant == "") {
        alert("Veuillez saisir un Montant SVP");
      } else if (montant > clients[currentCLient].solde) {
        alert("Vous ne pouvez pas transferer un montant supérieur à votre solde.");
      } else if (clientDest == -1) {
        alert("Le numéro du destinataire est incorrect.");
      } else if (clientDest == currentCLient) {
        alert("Vous ne pouvez pas transférer de l'argent à vous-même.");
      } else {
        clients[currentCLient].solde = clients[currentCLient].solde - montant;
        clients[currentCLient].transaction.push(transObject);
        clients[clientDest].solde = clients[clientDest].solde + parseInt(montant);
        transObject.destinataire = clients[clientDest].nom;
        printUser(clients[currentCLient]);
        alert("Transfert effectué avec succès !");
      }
      inputMontant.value = "";
      inputDestinataire.value = "";
    }
  });


/*---------------------------------------------------------------------TABLEAU---------------------------------------------------------------------*/

        /*
          if(inputtel == "") => depot normal
          else{
            transfert vers inputtel.value
            retaite sur celui qui envoi
            depot vers le receveur
          }
        */ 






