// @flow
import React, { Component, Fragment } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { Input, Icon as RNIcon } from 'react-native-elements';
import { I18n } from '@my/framework';
import {
  HeaderRight,
  LabelPicker,
  MyButton,
  Screen
} from '@my/components';
import {
  changeDate,
  changeMoneyAmount,
  changePaymentType,
  сhangeSubject,
  сhangeLecturer,
  openImagePicker,
  removePaymentRequest,
  uploadPaymentRequest,
  type UploadPaymentType
} from './Payment.actions';
import type { PaymentImage } from './Payment.reducer';
import {
  selectDate,
  selectLecturer,
  selectSubject,
  selectImage,
  selectIsLoading,
  selectMoneyAmount,
  selectPaymentType
} from './Payment.selectors';
import styles, { colors } from './Payment.styles';

type PaymentProps = {
  date: string,
  image: PaymentImage,
  isLoading: boolean,
  lecturer: string,
  subject: string,
  subjects: string[],
  moneyAmount: string,
  lecturers: string[],
  // FIXME: use proper type for navigation.
  navigation: Object,
  paymentType: string,
  paymentTypes: string[],
  onChangeMoneyAmount: () => void,
  onChangePaymentType: () => void,
  onChangeSubject: (subject: string) => void,
  onChangeLecturer: (lecturer: string) => void,
  onDateChange: () => void,
  onOpenImagePicker: () => void,
  removePaymentRequest: () => void,
  uploadPaymentRequest: (type: UploadPaymentType) => void
}

// FIXME: use https://github.com/wix/react-native-calendars instead of DatePicker.
class Payment extends Component<PaymentProps> {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const screenType = navigation.getParam('intent', 'ADD');
    const onPress = () => Alert.alert(
      'Удаление',
      'Подтвердите удаление платежа',
      [
        { text: 'Отменить', style: 'cancel' },
        { text: 'Удалить', onPress: params.removePayment }
      ]
    );

    return {
      headerRight: screenType === 'EDIT'
        // eslint-disable-next-line react/jsx-no-bind
        ? <HeaderRight iconName="delete" onIconPress={ onPress } />
        : null
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ removePayment: this.props.removePaymentRequest });
  }

  addPayment = () => this.props.uploadPaymentRequest('ADD');

  editPayment = () => this.props.uploadPaymentRequest('EDIT')

  render() {
    const { date, image, moneyAmount, navigation, paymentType } = this.props;
    // FIXME: use constants for params.
    const screenType = navigation.getParam('intent', 'ADD');

    let imageSource = '';
    if (image.url) {
      imageSource = image.url;
    } else if (image.path) {
      imageSource = `file://${image.path}`;
    } else {
      imageSource = '';
    }

    const submitButtonText = screenType === 'EDIT'
      ? 'Сохранить изменения'
      : 'Готово';
    const isDataEmpty = !paymentType || !moneyAmount || !date || !image.name;

    return (
      <Screen>
        { this.props.isLoading
          ? <ActivityIndicator size="large" />
          : (
            <Fragment>
              <Image
                source={{ uri: imageSource }}
                style={ styles.image }
                resizeMethod="resize"
              />
              <View style={ styles.container }>
                <View style={ styles.rowContainer }>
                  <Input
                    label={ I18n.translate('student.payment.money') }
                    maxLength={ 8 }
                    containerStyle={ styles.input }
                    keyboardType="numeric"
                    value={ this.props.moneyAmount }
                    onChangeText={ this.props.onChangeMoneyAmount }
                  />
                  <RNIcon
                    color={ colors.greenDark }
                    containerViewStyle={ styles.buttonIcon }
                    name="insert-photo"
                    raised
                    reverse
                    size={ 20 }
                    onPress={ this.props.onOpenImagePicker }
                  />
                </View>
                <DatePicker
                  cancelBtnText="Закрыть"
                  confirmBtnText="Ок"
                  customStyles={{
                    placeholderText: styles.datePlaceholderText
                  }}
                  date={ date }
                  format="DD MM YYYY"
                  placeholder="Дата платежа"
                  style={ styles.datePicker }
                  onDateChange={ this.props.onDateChange }
                />
                <LabelPicker
                  label="Тип услуги"
                  pickerItems={ this.props.paymentTypes }
                  selectedValue={ this.props.paymentType }
                  onValueChange={ this.props.onChangePaymentType }
                />
                <LabelPicker
                  label="Название дисциплины"
                  pickerItems={ this.props.subjects }
                  selectedValue={ this.props.subject }
                  onValueChange={ this.props.onChangeSubject }
                />
                <LabelPicker
                  label="Преподаватель"
                  pickerItems={ this.props.lecturers }
                  selectedValue={ this.props.lecturer }
                  onValueChange={ this.props.onChangeLecturer }
                />
                { !!isDataEmpty && <Text style={ styles.errorText }>{'заполните все поля'.toUpperCase()}</Text> }
                <MyButton
                  containerViewStyle={ styles.buttonAdd }
                  title={ submitButtonText }
                  onPress={ screenType === 'EDIT'
                    ? this.editPayment
                    : this.addPayment }
                />
              </View>
            </Fragment>
          )}
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  // TODO: translate.
  const subjects = ['', 'БД', 'СУБД'];
  const paymentTypes = ['', 'Академическая задолженность', 'Обучение', 'Общежитие', 'Пеня'];
  const lecturers = ['', 'Иванов И. И'];

  return {
    date: selectDate(state),
    image: selectImage(state),
    isLoading: selectIsLoading(state),
    lecturer: selectLecturer(state),
    lecturers,
    moneyAmount: selectMoneyAmount(state),
    paymentType: selectPaymentType(state),
    paymentTypes,
    subject: selectSubject(state),
    subjects
  };
};

const mapDispatchToProps = {
  onChangeSubject: сhangeSubject,
  onChangeLecturer: сhangeLecturer,
  onDateChange: changeDate,
  onChangeMoneyAmount: changeMoneyAmount,
  onChangePaymentType: changePaymentType,
  onOpenImagePicker: openImagePicker,
  removePaymentRequest,
  uploadPaymentRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
