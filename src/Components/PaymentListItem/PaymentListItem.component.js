// @flow
import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { type PaymentData } from '../../Product/types';
import colors from '../colors';
import styles from './PaymentListItem.styles';

type PaymentListItemProps = {
  item: PaymentData,
  onPress: (payment: PaymentData) => void
}

function PaymentListItem(props: PaymentListItemProps) {
  const { item, onPress } = props;

  const handleOnPress = () => onPress(item);

  const subtitle = (
    <View style={ styles.subtitle }>
      <Text>{item.date}</Text>
      <Text style={ styles.paymentTypeText }>{item.paymentType}</Text>
    </View>
  );

  let icon = require('../assets/receipt.png'); // eslint-disable-line global-require

  if (item.status !== 'declined') {
    icon = item.status === 'approved'
      ? require('../assets/receipt_gr.png') // eslint-disable-line global-require
      : require('../assets/receipt_yel.png'); // eslint-disable-line global-require
  }

  return (
    <ListItem
      leftAvatar={{ source: icon }}
      avatarContainerStyle={ styles.avatar }
      avatarStyle={ styles.avatar }
      containerStyle={ styles.container }
      chevronColor={ colors.greenDark }
      subtitle={ subtitle }
      title={ `${item.moneyAmount} BYN` }
      underlayColor={ colors.greenDark }
      // eslint-disable-next-line react/jsx-no-bind
      onPress={ handleOnPress }
    />
  );
}

export default PaymentListItem;
