// @flow
import React, { Component, Fragment } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import {
  LabelInput,
  MyButton,
  Screen
} from '@my/components';
import {
  changeEmail,
  changePassword,
  logIn,
  preAuthentication,
  signUp,
  toggleIsRemember
} from './Authentication.actions';
import {
  selectEmail,
  selectIsLoading,
  selectIsRemember,
  selectPassword
} from './Authentication.selectors';
import styles, { colors } from './Authentication.styles';

type AuthenticationProps = {
  email: string,
  isLoading: boolean,
  isRemember: boolean,
  password: string,
  onChangeEmail: () => void,
  onChangePassword: () => void,
  onLogIn: () => void,
  onPreAuthentication: () => void,
  onPressIsRemember: () => void,
  onSignUp: () => void
};

class Authentication extends Component<AuthenticationProps> {
  constructor(props: AuthenticationProps) {
    super(props);
    props.onPreAuthentication();
  }

  render() {
    const {
      email,
      isLoading,
      isRemember,
      password,
      onChangeEmail,
      onChangePassword,
      onLogIn,
      onSignUp,
      onPressIsRemember
    } = this.props;

    return (
      <Screen>
        { isLoading
          ? <ActivityIndicator size="large" />
          : <Fragment>
            <LabelInput
              isError={ !email }
              keyboardType="email-address"
              placeholder="Электронная почта"
              value={ email }
              onChangeText={ onChangeEmail }
            />
            <LabelInput
              containerViewStyle={ styles.input }
              isError={ !password }
              placeholder="Пароль"
              secureTextEntry
              value={ password }
              onChangeText={ onChangePassword }
            />
            <MyButton
              containerViewStyle={ styles.button }
              title="Войти"
              onPress={ onLogIn }
            />
            <MyButton
              title="Зарегистрироваться"
              onPress={ onSignUp }
            />
            <CheckBox
              checked={ isRemember }
              checkedColor={ colors.greenDark }
              containerStyle={ styles.checkBox }
              title="Запомнить меня"
              onPress={ onPressIsRemember }
            />
          </Fragment> }
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  email: selectEmail(state),
  isLoading: selectIsLoading(state),
  isRemember: selectIsRemember(state),
  password: selectPassword(state)
});

const mapDispatchToProps = {
  onChangeEmail: changeEmail,
  onPreAuthentication: preAuthentication,
  onPressIsRemember: toggleIsRemember,
  onChangePassword: changePassword,
  onLogIn: logIn,
  onSignUp: signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
