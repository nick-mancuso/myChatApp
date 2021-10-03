import * as htmlGenerator from "./htmlGenerator.js";

let user;

export function init(user, channelName) {

    $("#auth-container").addClass("d-none");
    $("#chat").removeClass("d-none");
    $("#current-user-info").append(htmlGenerator.createCurrentUserHTML(user));
    $("#users-list").append(htmlGenerator.createOtherUserHTML(user));
    $("#channelName").text("# " + channelName)
}