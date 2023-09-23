 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getDatabase, ref, push } from "ttps://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
 
 const appSettings = {
    databaseURL : "https://playground-df09d-default-rtdb.firebaseio.com/"
 }

 const app = initializeApp(appSettings)
 const database = getDatabase(app)
 const messajesInDB = ref(database, "messajes")

 const inputText = document.getElementById("text")
 const fromInput = document.getElementById("from")
 const toInput = document.getElementById("to")
 const publishBtn = document.getElementById("publish-btn")
 const endorsementList= document.getElementById("endorsement-list")

 publishBtn.addEventListener('click', function () {


    push(messajesInDB,  )
 })