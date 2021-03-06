// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { I18n } from '@my/framework';
import { colors, HeaderRight } from '@my/components';
import type { StudentInfo } from '../../types';
import {
  loadStudentListRequest,
  openPaymentList
} from './StudentList.actions';
import { selectIsLoading, selectStudentList } from './StudentList.selectors';
import styles from './StudentList.styles';

type StudentListProps = {
  isLoading: boolean,
  studentList: StudentInfo[],
  loadStudentList: () => void,
  onOpenPaymentList: (student: StudentInfo) => void
}

// TODO: add type for state.
class StudentList extends Component<StudentListProps, any> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <HeaderRight
      iconName="finance"
      // eslint-disable-next-line
      onIconPress={ () => navigation.navigate('Charts.Dean') }
    />
  });

  state = {
    searchValue: ''
  };

  componentDidMount() {
    this.props.loadStudentList();
  }

  onSearchInputChange = (searchValue: string) => this.setState({ searchValue });

  keyExtractor = (studentInfo: StudentInfo) => studentInfo.uid;

  filterItems = () => {
    const { searchValue } = this.state;
    const { studentList } = this.props;

    const searchValueUpper = searchValue.toUpperCase();
    const filterBySearchValue = item => item.surname.toUpperCase().includes(searchValueUpper);

    return searchValueUpper
      ? studentList.filter(filterBySearchValue)
      : studentList;
  };

  renderEmptyItem = () => (<View style={ styles.emptyItemContainer }>
    <Text>{ I18n.translate('studentList.pullToRefresh') }</Text>
  </View>)

  renderItem = ({ item }) => (
    <ListItem
      containerStyle={ styles.listItem }
      keyExtractor={ this.keyExtractor }
      title={ `${item.surname} ${item.name} ${item.middleName}` }
      subtitle={ item.studentId }
      // eslint-disable-next-line react/jsx-no-bind
      onPress={ () => this.props.onOpenPaymentList(item) }
    />)

  render() {
    return (
      <View style={ styles.container }>
        <SearchBar
          clearIcon
          value={ this.state.searchValue }
          borderColor={ colors.greenLight }
          containerStyle={ styles.searchBarContainer }
          onChangeText={ this.onSearchInputChange }
          placeholder="Искать имя..." // TODO: add translation.
        />
        <FlatList
          data={ this.filterItems() }
          keyExtractor={ this.keyExtractor }
          ListEmptyComponent={ this.renderEmptyItem }
          refreshing={ this.props.isLoading }
          renderItem={ this.renderItem }
          style={ styles.flatList }
          onRefresh={ this.props.loadStudentList }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  studentList: selectStudentList(state)
});

const mapDispatchToProps = {
  loadStudentList: loadStudentListRequest,
  onOpenPaymentList: openPaymentList
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
