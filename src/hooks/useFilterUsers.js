function useFilterUsers() {
    // returns function for filtering all users into peers and contacts
    function filter(currentUser, allUsersList, currentActiveChatId = 0) {
        const contactsList = [];
        const peerList = [];
        let currentActiveChatUser = {};
        let isContact = true;

        allUsersList.forEach((user) => {
            isContact = true;

            if (user.uid === currentUser.uid) {
                return;
            }

            currentUser.peers.forEach((peer) => {
                if (peer.peerId === user.uid) {
                    isContact = false;
                    peerList.push(user);

                    if (peer.peerId === currentActiveChatId) {
                        currentActiveChatUser = { ...user, meesageRoomPath: peer.messageRoomPath };
                    }
                }
            });

            if (isContact) {
                contactsList.push(user);
            }
        });

        return [peerList, contactsList, currentActiveChatUser];
    }

    return filter;
}

export default useFilterUsers;
