import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import {
    remove, get, set, child, getDatabase,
    onChildAdded, push, ref, update
} from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js';

/* Inspired by https://firebase.google.com/docs */

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
const allChannelsRef = ref(db, allChannelsPrefix);
let channelRef = ref(db, allChannelsPrefix + channelName);

// let userName = "Donny";
// let screenName = "Donny Kerabatsos";
let channelName = "general";

let owner = {
    "username": "Donny",
    "ownerID": "asdf123",
    "avatarSrc": "//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
};

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

    let message = {
        "history" : { },
        "msg" : text,
        "ownerID" : owner.ownerID,
        "reactions" : "",
        "time" : time,
        "userDisplay" : owner.username
    };

    const newMessageRef = push(channelRef);
    set(newMessageRef, message);
    clearInputBox();
}

function getInputText() {
    const inputBox = document.getElementById("inputBox");
    return inputBox.value();
}

function clearInputBox() {
    const inputBox = document.getElementById("inputBox");
    // TODO: clear input box
}

function addMessage(data) {
    const messageList = document.getElementById("messageList");

    // TODO: implement other elements
    // below constant might need to just be data, not data.val()
    const { msgID : { history : { uuid }, msg, ownerID, reactions, time, userDisplay } } = data;
    messageList.insertAdjacentHTML('beforeend', createMessageHTML(
        "//gravatar.com/avatar/00034587632094500000000000000000?d=retro",
        msg, userDisplay, time
    ));
}

function createMessageHTML(avatarSrc, text, name, timestamp) {
    return `
        <article class="msg-container msg-remote" >
            <div class="msg-box">
                <img class="user-img"
                     src="${avatarSrc}" alt=""/>
                <div class="flr">
                    <div class="messages">
                        <p class="msg" >
                            ${text}
                        </p>
                    </div>
                    <span class="timestamp">
                        <span class="username">
                            ${name}
                        </span>
                        &bull;
                        <span class="posttime">
                            ${timestamp}
                        </span>
                    </span>
                </div>
            </div>
        </article>    
    `;
}

function addChannel(channel) {
    const channelList = document.getElementById("channelList");
    channelList.insertAdjacentHTML('beforeend', createChannelHTML(channel.key))
}

function createChannelHTML(channelName) {
    return `
        <div class="channel-container">
            <i class="fa fa-hashtag" id="channel-hashtag"></i>
            <p class="channel-name">
               ${channelName}
            </p>
        </div>
    `;
}

function createCurrentUserHTML(avatarSrc, name) {
    return `
        <div class="current-user-container">
            <img class="user-img" src="${avatarSrc}" alt="">
            ${name}
        </div>
    `;
}
