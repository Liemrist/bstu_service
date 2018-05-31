// @flow
import firebase from 'react-native-firebase';
import type { StudentInfo } from '../types';

export type PaymentInfo = {
  date: string,
  image: {
    name: string,
    url: string
  },
  isResolved: boolean,
  key: string,
  moneyAmount: string,
  paymentType: string
}

export const updateStudentInfo = (studentInfo: StudentInfo, uid: string): Promise<void> => {
  const updates = {};
  updates[`/students/${uid}`] = studentInfo;
  updates[`/specialties/${studentInfo.specialty}/${uid}`] = studentInfo;
  return firebase.database().ref('').update(updates);
};

export const getPaymentImageUrl = (storageImagePath: string): Promise<string> =>
  firebase.storage().ref(storageImagePath).getDownloadURL();

// $FlowFixMe property `key` is missing in `Promise`.
export const getNewPaymentKey = () => firebase.database().ref('').child('payments').push().key;

export const addPayment = async (uid: string, paymentInfo: PaymentInfo,
  storageImagePath: string, localImagePath: string): Promise<void> => {
  // $FlowFixMe string is incompatible with object
  await firebase.storage().ref(storageImagePath).putFile(localImagePath);

  const updates = {};
  updates[`/payments/${uid}/${paymentInfo.key}`] = paymentInfo;
  // FIXME: use more specific methods to add a record.
  // eslint-disable-next-line consistent-return
  return firebase.database().ref('').update(updates);
};

export const updatePayment = async (uid: string, paymentInfo: PaymentInfo,
  storageImagePath: string, localImagePath: ?string): Promise<void> => {
  if (localImagePath) {
    // $FlowFixMe string is incompatible with object.
    await firebase.storage().ref(storageImagePath).putFile(localImagePath);
  }

  const updates = {};
  updates[`/payments/${uid}/${paymentInfo.key}`] = paymentInfo;
  // FIXME: use more specific methods to add a record.
  // eslint-disable-next-line consistent-return
  return firebase.database().ref('').update(updates);
};

export const removePayment = async (
  databasePath: string, storagePath: string): Promise<void> => {
  await firebase.storage().ref(`${storagePath}`).delete();
  return firebase.database().ref(`/payments/${databasePath}`).remove();
};

export const getPaymentList = (uid: string): PaymentInfo[] =>
  // $FlowFixMe function once() requires another argument.
  firebase.database().ref(`/payments/${uid}`).once('value')
    // eslint-disable-next-line no-underscore-dangle
    .then(response => response._value);
