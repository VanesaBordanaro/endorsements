import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
  const textareaValue = inputText.value;
  const fromValue = fromInput.value;
  const toValue = toInput.value;

  if(textareaValue && fromValue && toValue) {
    clearFields(textareaValue, fromValue, toValue)
    pushData(textareaValue, fromValue, toValue)
    textareaValue.style.border = "none"
    fromValue.style.border = "none"
    toValue.style.border = "none"
  } else {
    clearFields(textareaValue, fromValue, toValue)
    textareaValue.style.border = "2px solid red"
    fromValue.style.border = "2px solid red"
    toValue.style.border = "2px solid red"
  }
});

function clearFields() {
    const textarea = document.getElementById("text");
    const from = document.getElementById("from");
    const to = document.getElementById("to");
    
    textarea.value = "";
    from.value = "";
    to.value = "";
}

function pushData(review, sender, to) {
    let arr = [review, sender, to, 0]
    push(endorsementInDB, arr)
}
onValue(endorsementInDB, function (snapshot) {
    endorsementList.innerHTML = ""
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      appendItemToMessagesListEl(currentItem);
    }
  }
});


function appendItemToMessagesListEl(review) {
  let reviewId = review[0];
  let reviewData = review[1];
  let reviewText = reviewData[0];
  let reviewFrom = reviewData[1];
  let reviewTo = reviewData[2];

  let newEl = document.createElement("li");
  let mainConEl = document.createElement("div");
  let toEl = document.createElement("h3");
  let reviewEl = document.createElement("p");
  let flexEl = document.createElement("div");
  let fromEl = document.createElement("h3");

  toEl.textContent = `To ${reviewTo}`;
  reviewEl.textContent = reviewText;
  fromEl.textContent = `From ${reviewFrom}`;

  newEl.appendChild(mainConEl);
  mainConEl.appendChild(toEl);
  mainConEl.appendChild(reviewEl);
  mainConEl.appendChild(flexEl);
  flexEl.appendChild(fromEl);

  let exactLocationInDB = ref(database, `endorsement/${reviewId}`)
  update(exactLocationInDB)

  endorsementList.append(newEl);
}
