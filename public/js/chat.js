import * as htmlGenerator from "./htmlGenerator.js";
import * as fbauth from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";

let user;

export function init(user, channelName, authorize) {
    console.log("in init!");
    $("#chat").removeClass("d-none").show();
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
    $("#users-list").append(htmlGenerator.createOtherUserHTML(user));
    $("#channelName").text("# " + channelName)
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