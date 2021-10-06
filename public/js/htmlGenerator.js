export function createChannelHTML(channelName) {
    return `
        <div class="channel-container">
            <p class="channel-name">
               # ${channelName}
            </p>
        </div>
    `;
}

export function createOtherUserHTML(user) {
    return `
        <div class="user-container">
            <i class="fa fa-circle text-success"></i>
            ${user.displayName}
        </div>
    `;
}

export function createCurrentUserHTML(user) {
    return `
        <div class="current-user-container">
            <img class="user-img" src="${user.photoURL}" alt="">
            ${user.displayName}
            <div class="dropup">
                    <i class="fa fa-cog dropbtn" id="currentUserActions"></i>
                <div class="dropup-content d-none" id="dropUpContent">
                    <a href="#" id="logout">Log out</a>
                    <a href="#" id="changePassword">Change password</a>
                    <a href="#" id="changeDisplayName">Change display name</a>
                </div>
            </div>
        </div>
    `;
}


export function createMessageHTML(avatarSrc, text, name, timestamp) {
    return `
        <article class="msg-container msg-remote">
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

export function createMessageHTMLMyMessage(avatarSrc, text, name,
                                           timestamp, msgID) {
    return `
        <article id="${msgID}_message" class="msg-container msg-remote">
            <div class="msg-box">
                <img class="user-img"
                     src="${avatarSrc}" alt=""/>
                <div class="flr">
                    <div class="messages" id="${msgID}_messages">
                        <p class="msg" id="${msgID}_message_text">
                            ${text}
                        </p>
                    </div>
                    <span class="timestamp">
                        <span class="username">
                            ${name}
                        </span>
                        &bull;
                        <span id="${msgID}_posttime" class="posttime">
                            ${timestamp}
                        </span>
                    </span>
                </div>
            <div style="font-size: 0.60rem;">
            <i id="${msgID}_edit" class="fa fa-pencil" aria-hidden="true"></i>
            <i id="${msgID}_delete" class="fa fa-times" aria-hidden="true"></i>
            </div>
            </div>
        </article>    
    `;
}

export function createEditBoxHTML(msgID, existingText) {
    return `
    <input id="${msgID}_editBox" type="text" 
    class="form-control" autocomplete="off"
    value="${existingText}"
    >
    </div>
    
    
    `;
}