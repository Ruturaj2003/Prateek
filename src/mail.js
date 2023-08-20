const firebaseConfig = {
  //   copy your firebase config informations


    apiKey: "AIzaSyDGpCGFds53869rMXIscnZ8LjKRTvU5-iw",
    authDomain: "farmers-5f9f9.firebaseapp.com",
    databaseURL: "https://farmers-5f9f9-default-rtdb.firebaseio.com",
    projectId: "farmers-5f9f9",
    storageBucket: "farmers-5f9f9.appspot.com",
    messagingSenderId: "857702547283",
    appId: "1:857702547283:web:528ed83e2b9d6732472ba6"

};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");
  var passwordid = getElementVal("passwordid");

  saveMessages(name, emailid, msgContent,passwordid);//

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent,passwordid) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
    password: passwordid,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};