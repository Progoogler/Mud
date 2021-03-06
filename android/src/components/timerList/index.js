import React, { Component } from 'react';
import {
  ListView,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import Realm from 'realm'; // TODO remove

import Title from './Title';
import Row from './Row';
import Footer from './Footer';
import Header from './ListViewHeader';
// mport HeaderButtons from './HeaderButtons'; PULL TO REFRESH
import Navigation from '../home/Header';

const styles = StyleSheet.create({
  container: {

  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  // footer: {
  //   height: 360,
  // }
});

class TimerList extends Component {
  constructor(props) {
    super(props);
    this.realm = new Realm(); // TODO REMOVE
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.list = this.props.navigation.state.params.timers;
    this.state = {
      dataSource: ds.cloneWithRows(this.list),
      refreshing: false,
    };
  }

  _updateList(index) {

  }

  _onRefresh() {
    this.setState({
      refreshing: true,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(this.list)
    });
    this.setState({refreshing: false});
  }

  render() {
        //console.log('TIME LIMIT', this.realm.objects('TimeLimit'))
    //console.log('props', this.props.navigation.state.params.timers.list)
    return (
      <View>
        <Navigation navigation={this.props.navigation} />
        <Title limit={this.props.navigation.state.params.timers[0].timeLength} />
        <ListView
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)} />
          }
          timers={this.props.navigation.state.params.timers}
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderFooter={() => <Footer/>}
        />
        <Footer />
      </View>
    );
  }
}

export default TimerList;
