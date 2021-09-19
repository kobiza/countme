import firebase from 'firebase';

export const initDB = config => {
    firebase.initializeApp(config);
};

export const setIn = (path, data) => firebase.database().ref(path).set(data)

export const push = (path, data) => firebase.database().ref(path).push().set(data)

export const remove = (path) => firebase.database().ref(path).remove()

export const read = path => firebase.database().ref(path).once('value').then(snapshot => snapshot.val())

const getOffFunc = (path, eventType, callback) => {
    return () => {
        firebase.database().ref(path).off(eventType, callback);
    };
};

export const onValue = (path, callback) => {
    const onValueCallback = (snapshot) => {
        callback(snapshot);
    };

    firebase.database().ref(path).on('value', onValueCallback);

    return getOffFunc(path, 'value', onValueCallback);
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
