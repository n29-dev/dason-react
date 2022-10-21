function useFilterUsers() {
    // returns function for filtering all users into peers and contacts
    function filter(currentUser, allUsersList) {
        const contactsList = [];
        const peerList = [];

        allUsersList.forEach((user) => {
            if (user.uid === currentUser.uid) {
                return;
            }

            let isContact = true;

            currentUser.peers.forEach((peer) => {
                if (peer.peerId === user.uid) {
                    isContact = false;
                    peerList.push(user);
                }
            });

            if (isContact) {
                contactsList.push(user);
            }
        });

        return [peerList, contactsList];
    }

    return filter;
}

export default useFilterUsers;
