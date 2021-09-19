import firebase from 'firebase';

export const initDB = config => {
    firebase.initializeApp(config);
};

export const setIn = (path, data) => new Promise((resolve, reject) => {
    firebase.database().ref(path).set(data)
        .then(resolve)
        .catch(reject);
});

export const push = (path, data) => new Promise((resolve, reject) => {
    firebase.database().ref(path).push().set(data)
        .then(resolve)
        .catch(reject);
});

export const remove = (path) => new Promise((resolve, reject) => {
    firebase.database().ref(path).remove()
        .then(resolve)
        .catch(reject);
});

export const read = path => new Promise((resolve, reject) => {
    firebase.database().ref(path).once('value')
        .then(snapshot => resolve(snapshot.val()))
        .catch(reject);
});

export const onValue = (path, callback) => {
    const onValueCallback = (snapshot) => {
        callback(snapshot);
    };

    firebase.database().ref(path).on('value', onValueCallback);

    return getOffFunc(path, 'value', onValueCallback);
};

const getOffFunc = (path, eventType, callback) => {
    return () => {
        firebase.database().ref(path).off(eventType, callback);
    };
};

export const onChildChanged = (path, callback) => {
    const onChildChangedCallback = (childSnapshot, prevChildKey) => {
        callback(childSnapshot, prevChildKey);
    };

    firebase.database().ref(path).on('child_changed', onChildChangedCallback);

    return getOffFunc(path, 'child_changed', onChildChangedCallback);
};

export const onChildAdded = (path, callback) => {
    const onChildAddedCallback = (childSnapshot, prevChildKey) => {
        callback(childSnapshot, prevChildKey);
    };

    firebase.database().ref(path).on('child_added', onChildAddedCallback);

    return getOffFunc(path, 'child_added', onChildAddedCallback);
};

export const onChildRemoved = (path, callback) => {
    const onChildRemovedCallback = (childSnapshot, prevChildKey) => {
        callback(childSnapshot, prevChildKey);
    };

    firebase.database().ref(path).on('child_removed', onChildRemovedCallback);

    return getOffFunc(path, 'child_removed', onChildRemovedCallback);
};

//add offChildChanged
