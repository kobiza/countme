import firebase from 'firebase';

export const initDB = config => {
    firebase.initializeApp(config);
};

export const setIn = (path, data) => firebase.database().ref(path).set(data)

export const push = (path, data) => firebase.database().ref(path).push().set(data)

export const remove = (path) => firebase.database().ref(path).remove()

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
