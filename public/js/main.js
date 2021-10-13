import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import {
    getDatabase,
    onChildAdded,
    onChildChanged,
    onValue,
    push,
    ref,
    remove,
    set
} from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js';
// import version must be 9.0.1
import * as fbauth from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";
/* Inspired by https://firebase.google.com/docs */
import * as htmlGenerator from "./htmlGenerator.js";

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
let isAdmin = false;
let usersRef = ref(db, `/users`);


let user;

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

function getTime() {
    const date = new Date();
    return (date.getMonth() + 1) + "/"
        + date.getDate() + "/"
        + date.getFullYear() + " @ "
        + date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds();
}


function sendMessage(text) {

    let message = {
        "history" : { },
        "msg" : text,
        "ownerID" : user.uid,
        "reactions" : "",
        "time" : Date.now(),
        "userDisplay" : user.displayName,
        "userPhotoURL": user.photoURL,
        "edited": "false"
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
    const { history, msg, ownerID, reactions, time, userDisplay, userPhotoURL, edited } = data.val();
    const msgID = data.key;

    if (ownerID === user.uid) {
        // add pencil and x

        let timeWithPossibleEdited = timeConverter(time);
        if (edited === 'true') {
            timeWithPossibleEdited  += " * edited";
        }

        messageList.insertAdjacentHTML('beforeend',
            htmlGenerator.createMessageHTMLMyMessage(
                userPhotoURL, msg, userDisplay, timeWithPossibleEdited, msgID
            ));

        const messageEditButtonRef = $("#" + msgID + "_edit");
        messageEditButtonRef.on("click", e => {
            e.preventDefault();
            const existingMessageText =  $("#" + msgID + "_message_text");
            $("#" + msgID + "_messages")
                .append(htmlGenerator.createEditBoxHTML(msgID, existingMessageText[0].innerText));
            existingMessageText.hide();
            $(document).on('keyup', function (e) {
                e.preventDefault();
                editMessage(e, msgID);
            });
        });

        const deleteButtonRef = $("#" + msgID + "_delete");
        deleteButtonRef.on("click", e => {
            e.preventDefault();
            alert("Are you sure you want to delete this message?");
            remove(ref(db, allChannelsPrefix + channelName + "/" + msgID));
            $("#" + msgID + "_message").remove();
        });
    }
    else if (isAdmin) {
        // is admin, add x
        let timeWithPossibleEdited = timeConverter(time);
        if (edited === 'true') {
            timeWithPossibleEdited  += " * edited";
        }
        messageList.insertAdjacentHTML('beforeend',
            htmlGenerator.createMessageHTMLAdminMessage(
                userPhotoURL, msg, userDisplay, timeWithPossibleEdited, msgID
            ));

        const adminDeleteButtonRef = $("#" + msgID + "_delete");
        adminDeleteButtonRef.on("click", e => {
            if (isAdmin) {
                e.preventDefault();
                alert("Are you sure you want to delete this message?");
                remove(ref(db, allChannelsPrefix + channelName + "/" + msgID))
                    .then($("#" + msgID + "_message").remove())
                    .catch(e => {
                        console.log(e);
                    });
            }
        });

    }
    else {
        // normal user and not my message
        let timeWithPossibleEdited = timeConverter(time);
        if (edited === 'true') {
            timeWithPossibleEdited  += " * edited";
        }
        messageList.insertAdjacentHTML('beforeend',
            htmlGenerator.createMessageHTML(userPhotoURL, msg, userDisplay, timeWithPossibleEdited));
    }

    messageList.scrollTop = messageList.scrollHeight;
}

function editMessage(e, msgID) {
    const currentChannelAndMessagePath = allChannelsPrefix + channelName + "/" + msgID;
    const editBoxRef = $("#" + msgID + "_editBox");
    if (e.key === "Enter") {
        set(ref(db, currentChannelAndMessagePath + "/msg"), editBoxRef.val());
        set(ref(db, currentChannelAndMessagePath + "/edited"), "true");
        set(ref(db, currentChannelAndMessagePath + "/time"), Date.now());
        editBoxRef.hide();
        $("#"+ msgID + "_message_text").show();
    }
    if (e.key === "Escape") {
        editBoxRef.remove();
        $("#"+ msgID + "_message_text").show();
    }
}


function addChannel(channel) {
    const channelList = document.getElementById("channelList");
    channelList.insertAdjacentHTML('beforeend',
        htmlGenerator.createChannelHTML(channel.key))
}

// setup listeners
document.getElementById("send-button")
    .addEventListener("click", e => {
        const text = getInputText();
        if (text !== "") {
            sendMessage(text);
        }
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
            let JSONString = JSON.stringify({
                "displayName" : "",
                "role" : "",
                "admin" : "false"
            });
            let newUserJSON = JSON.parse(JSONString);
            newUserJSON.displayName = user.displayName;
            set(ref(db, "/users/" + user.auth.lastNotifiedUid), newUserJSON);
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
            user = data.user;
            let JSONString = JSON.stringify({
                    "displayName" : "",
                    "role" : "",
                    "admin" : "false"
            });
            let newUserJSON = JSON.parse(JSONString);
            newUserJSON.displayName = user.displayName;
            set(ref(db, "/users/" + user.auth.lastNotifiedUid), newUserJSON);
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
                console.log("here in register");
                user = data.user;
                console.log(user);
                if (authorize.currentUser !== null) {
                    fbauth.updateProfile(authorize.currentUser, {
                        displayName: displayName,
                        photoURL: "//gravatar.com/avatar/56234674574535734573000000000001?d=retro"
                    });
                    console.log(user.auth.lastNotifiedUid);

                    let JSONString = JSON.stringify({
                        "displayName" : "",
                        "role" : "",
                        "admin" : "false"
                    });
                    let newUserJSON = JSON.parse(JSONString);
                    newUserJSON.displayName = displayName;
                    console.log("displayName");
                    console.log(displayName);
                    set(ref(db, "/users/" + user.auth.lastNotifiedUid), newUserJSON);

                }
            })
            .catch(error => {
                console.log(error.code);
                console.log(error.message);
            });

    }
    else {
        alert("Passwords do not match!");
        // TODO: clear password inputs?
    }

}

fbauth.onAuthStateChanged(authorize, userInfo => {
    if (!!userInfo) {
        init(userInfo, channelName, authorize);
        user = userInfo;
    } else {
        tearDown();
    }
});

function tearDown() {
    $("#auth-container").removeClass("d-none");
    $("#chat").addClass("d-none");
    $("#current-user-info").empty();
    $("#users-list").empty();
    $("#channelName").text("");
}

function init(user, channelName, authorize) {

    //check user role
    onValue(ref(db, `/users/${authorize.currentUser.uid}/admin`),
        ss => {
            isAdmin = !!ss.val();
    });

    $("#chat").removeClass("d-none");
    $("#auth-container").addClass("d-none");
    $("#current-user-info").append(htmlGenerator.createCurrentUserHTML(user));
    $("#currentUserActions").on("click", e => {
        const dropUpContent = $("#dropUpContent");

        if (dropUpContent.hasClass("d-none")) {
            dropUpContent.removeClass("d-none");
        }
        else {
            dropUpContent.addClass("d-none");
        }

    })

    // onChildAdded(usersRef, uid => {
    //
    //     $("#users-list").append(htmlGenerator.createOtherUserHTML(user));
    //
    // });

    $("#channelName").text("# " + channelName)

    // add event listener for channels list
    onChildAdded(allChannelsRef, channel => addChannel(channel));

    // add event listener for messages in current channel
    onChildAdded(channelRef, data => addMessage(data));

    onChildChanged(channelRef, data => {
        const { history, msg, ownerID, reactions,
            time, userDisplay, userPhotoURL, edited } = data.val();

        $("#" + data.key + "_posttime").html(timeConverter(time) + " * edited");
        $("#" + data.key + "_message_text").html(msg);
    })


    // Set up drop up user menu
    $("#logout").on("click", e => {
        fbauth.signOut(authorize)
            .then(function() {
                console.log("log out successful");
            }, function(error) {
                console.log(error);
            });
    })
    $("#changePassword").on("click", e => {
        alert("doesn't work yet!");
    })
    $("#changeDisplayName").on("click", e => {
        alert("doesn't work yet!");
    })
}


// stolen from https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function timeConverter(timestamp) {
    const a = new Date(timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    let min = a.getMinutes();
    if (min < 10)
        min = "0" + min;
    return hour + ':' + min + ' ' + month + ' ' + date + ', ' + year;
}