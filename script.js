import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = { databaseURL: "https://playground-df09d-default-rtdb.firebaseio.com/"};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementInDB = ref(database, "endorsement");

const inputText = document.getElementById("text");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const publishBtn = document.getElementById("publish-btn");
const endorsementList = document.getElementById("endorsement-list");

publishBtn.addEventListener("click", function () {

    const message = {
        senderName : fromInput.value,
        receiverName : toInput.value,
        endorsement : inputText.value
    }

  clearFields(inputText)
  clearFields(fromInput)
  clearFields(toInput)

  push(endorsementInDB, message)
});

function clearFields(inputField) {
    inputField.value = ""
}

onValue(endorsementInDB, function(snapshot) {
    
    let itemsArray = Object.entries(snapshot.val())

    clearEndorsementList()

    itemsArray.forEach(function(message) {
        endorsementList.innerHTML += createEndorsementCard(message)
    })
});

function clearEndorsementList() {
    endorsementList.innerHTML = ""
}

function createEndorsementCard(message) {
    return ` <li class = "card">
        <div class= "card-header">
            To <span>${message[1].receiverName}</span>
        </div>
        ${message[1].endorsement}
        <div class = "card-footer">
            From ${message[1].senderName}</span>
        </div>
    </li>`
}
