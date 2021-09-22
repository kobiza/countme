import firebase from "firebase";
import EventType = firebase.database.EventType;
import DataSnapshot = firebase.database.DataSnapshot;

type FBCallback = (a: DataSnapshot, b?: string | null) => any;

export const initDB = (config: Object) => {
  firebase.initializeApp(config);
};

export const setIn = (path: string, data: any) =>
  firebase.database().ref(path).set(data);

export const push = (path: string, data: any) =>
  firebase.database().ref(path).push().set(data);

export const remove = (path: string) => firebase.database().ref(path).remove();

const getOffFunc = (
  path: string,
  eventType: EventType,
  callback: FBCallback
) => {
  return () => {
    firebase.database().ref(path).off(eventType, callback);
  };
};

export const onValue = (path: string, callback: FBCallback) => {
  const onValueCallback = (snapshot: DataSnapshot) => {
    callback(snapshot);
  };

  firebase.database().ref(path).on("value", onValueCallback);

  return getOffFunc(path, "value", onValueCallback);
};
