import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import {
    remove, get, set, child, getDatabase,
    onChildAdded, push, ref, update
} from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js';
// import version must be 9.0.1
import * as fbauth from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";
/* Inspired by https://firebase.google.com/docs */

import * as htmlGenerator from "./htmlGenerator.js";
import * as chat from "./chat.js";

const firebaseConfig = {
    apiKey: "AIzaSyAdpaGbpdvZFS_J5BAPLVZxVW_vUlUVzbk",
    authDomain: "chat-app-233ed.firebaseapp.com",
    databaseURL: "https://chat-app-233ed-default-rtdb.firebaseio.com",
    projectId: "chat-app-233ed",
    storageBucket: "chat-app-233ed.appspot.com",
    messagingSenderId: "164333713364",
    appId: "1:164333713364:web:30280ad323df5e5c6a4841",
    measurementId: "G-HSB29G8SYD"
};

const app = initializeApp(firebaseConfig);
const allChannelsPrefix = "channels/";

const db = getDatabase();
const authorize = fbauth.getAuth(app);
console.log(authorize);
const allChannelsRef = ref(db, allChannelsPrefix);
let channelName = "general";
let channelRef = ref(db, allChannelsPrefix + channelName);

let user;

/** Initial setup */
// add event listener for  channels list
onChildAdded(allChannelsRef, channel => addChannel(channel));

// add event listener for messages in current channel
onChildAdded(channelRef, data => addMessage(data));


// let message = {
//     "msgIDHERE" : {
//         "history" : {
//             "uuid" : "adfsdff"
//         },
//         "msg" : "This is a message",
//         "ownerID" : "longID",
//         "reactions" : "later",
//         "time" : "mytime",
//         "userDisplay" : "nick"
//     }
// };

function sendMessage() {
    const text = getInputText();
    const date = new Date();
    const time = date.getTime();
    const datetime = (date.getMonth() + 1) + "/"
        + date.getDate() + "/"
        + date.getFullYear() + " @ "
        + date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds();

    let message = {
        "history" : { },
        "msg" : text,
        "ownerID" : user.uid,
        "reactions" : "",
        "time" : datetime,
        "userDisplay" : user.displayName,
        "userPhotoURL": user.photoURL
    };
    const newMessageRef = push(channelRef);
    set(newMessageRef, message);
    clearInputBox();
}

function getInputText() {
    const inputBox = document.getElementById("inputBox");
    return inputBox.value;
}

function clearInputBox() {
    const inputBox = document.getElementById("inputBox");
    inputBox.value = "";
    // TODO: clear input box
}

function addMessage(data) {
    const messageList = document.getElementById("messageList");

    // TODO: implement other elements

    const { history, msg, ownerID, reactions, time, userDisplay, userPhotoURL } = data.val();
    messageList.insertAdjacentHTML('beforeend',
        htmlGenerator.createMessageHTML(userPhotoURL, msg, userDisplay, time));
    // scroll to bottom
    messageList.scrollTop = messageList.scrollHeight;
}


function addChannel(channel) {
    const channelList = document.getElementById("channelList");
    channelList.insertAdjacentHTML('beforeend',
        htmlGenerator.createChannelHTML(channel.key))
}

// setup listeners
document.getElementById("send-button")
    .addEventListener("click", e => {
    sendMessage();
})


document.getElementById("loginWithGoogle")
    .addEventListener("click", e => {
    loginWithGoogle();
    })

document.getElementById("login-form")
    .addEventListener("submit", e => {
        e.preventDefault();
        let input = $("#login-form").serializeArray();
        loginWithEmailAndPassword(input[0].value, input[1].value);
    })

document.getElementById("register-form")
    .addEventListener("submit", e => {
        e.preventDefault();
        let input = $("#register-form").serializeArray();
        register(input[0].value, input[1].value, input[2].value, input[3].value);
    })

function loginWithEmailAndPassword(email, password) {

    fbauth.signInWithEmailAndPassword(authorize, email, password)
        .then(data => {
            user = data.user;
            chat.init(user, channelName);
        })
        .catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });
}

function loginWithGoogle() {
    let provider = new fbauth.GoogleAuthProvider();
    fbauth.signInWithPopup(authorize, provider)
        .then(data => {
            console.log(data.user);
            user = data.user;
            chat.init(data.user, channelName);
        }).catch(error => {
        console.log(error.code);
        console.log(error.message);
    });
}

function register(register_email, register_password, retype_password, displayName) {

    if (register_password === retype_password) {
        fbauth.createUserWithEmailAndPassword(
            authorize, register_email, register_password
        )
            .then(data => {
                user = data.user;
                chat.init(user, channelName);
            })
            .catch(error => {
                console.log(error.code);
                console.log(error.message);
            });
        if (authorize.currentUser !== null) {
            fbauth.updateProfile(authorize.currentUser, {
                displayName: displayName,
                photoURL: "//gravatar.com/avatar/56234674574535734573000000000001?d=retro"
            });
        }
    }
    else {
        alert("Passwords do not match!");
        // TODO: clear password inputs?
    }

}

function loadChatApp() {
    // $("#auth-container").addClass("d-none");
    // $("#chat").removeClass("d-none");
    // $("#current-user-info").append(htmlGenerator.createCurrentUserHTML(user));
    // $("#users-list").append(htmlGenerator.createOtherUserHTML(user));
    // $("#channelName").text("# " + channelName);
}
