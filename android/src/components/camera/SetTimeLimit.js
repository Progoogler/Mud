import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: 'grey',
  },
  hourInput: {
    width: 25,
    fontSize: 24,
    color: 'white',
  },
  minutesInput: {
    width: 40,
    fontSize: 24,
    color: 'white',
  },
  timeDesc: {
    fontSize: 18,
    marginRight: 25,
  },
  setButton: {
    marginLeft: 40,
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'white',
  },
  buttonText: {
    fontSize: 28,
    color: 'white',
    padding: 4,
  }
});

class SetTimeLimit extends Component {
  constructor() {
    super();
    this.realm = new Realm();
    this.state = {
      hour: "1",
      minutes: "00",
    }
  }

  render() {
    console.log('TIME LIMIT', this.state.hour, this.state.minutes)
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.hourInput}
          onChangeText={(hour) => this._onChangeHour(hour)}
          value={this.state.hour} />
        <Text style={styles.timeDesc}>Hr</Text>
        <TextInput
          style={styles.minutesInput}
          onChangeText={(minutes) => this._onChangeMinutes(minutes)}
          value={this.state.minutes} />
        <Text style={styles.timeDesc}>Min</Text>
        <TouchableHighlight
          style={styles.setButton}
          onPress={this._updateTimeLimit.bind(this)} >
          <Text style={styles.buttonText}>Set Limit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  componentDidMount() {
    let timeLimit = this.realm.objects('TimeLimit');
    if (timeLimit.length > 0) {
      this.setState({hour: timeLimit[0].hour, minutes: timeLimit[0].minutes});
    }
  }

  _onChangeHour(hour) {
    if (typeof parseInt(hour) !== 'number') {
      //throw error
    }
    if (hour.length > 1) {
      //throw error
    }
    this.setState({hour});
  }

  _onChangeMinutes(minutes) {
    if (typeof parseInt(minutes) !== 'number') {
      //throw error
    }
    if (minutes.length > 2) {
      //throw error
    }// else if (minutes.length === 1) {
    //   minutes = "0" + minutes;
    // }
    this.setState({minutes});
  }

  _updateTimeLimit() {
    let minutes = `${parseInt(this.state.minutes) / 60}`;
    let newLimit;
    let timeLimit = this.realm.objects('TimeLimit');
    if (minutes.length === 1) {
      if (minutes === "1") {
        minutes = "00";
        this.setState({hour: this.state.hour + 1, minutes});
        newLimit = parseFloat(`${parseInt(this.state.hour)}.${parseInt(minutes)}`);
        this.realm.write(() => {
          timeLimit[0].float = newLimit;
        });
        this.props.onUpdateTimeLimit();
        return;
      } else if (minutes === "0") {
        newLimit = parseFloat(`${parseInt(this.state.hour)}.${parseInt(minutes)}`);
        this.realm.write(() => {
          timeLimit[0].float = newLimit;
        });
        this.props.onUpdateTimeLimit();
        return;
      }
    }
    minutes = minutes.slice(1);
    newLimit = this.state.hour + minutes;
    newLimit = parseFloat(newLimit);
    this.realm.write(() => {
      timeLimit[0].float = newLimit;
    });
    this.props.onUpdateTimeLimit();
  }
}

export default SetTimeLimit;
