
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
        </div>
    `;
}


export function createMessageHTML(avatarSrc, text, name, timestamp) {
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