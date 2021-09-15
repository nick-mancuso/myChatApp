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

let userName = "Donny";
let screenName = "Donny Kerabatsos";
let channelName = "general";

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
function createChannelHTML(channel) {
    return `
        <div class="channel-container">
            <i class="fa fa-hashtag" id="channel-hashtag"></i>
            <p class="channel-name">
               ${channel}
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
function getInputText() {

}