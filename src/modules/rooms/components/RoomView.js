import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, RefreshControl, InteractionManager } from 'react-native';
import { Beacons } from 'react-native-ibeacon';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class RoomView extends Component {

  state = {
    refreshing: false,
    thermostats: [],
    frontDoor: null,
    garageDoor: null,
  };

  static apiURL = 'https://graph.api.smartthings.com/api/smartapps/installations/2d504317-3766-4583-aa59-59e5a9cc16bc';
  static apiKey = '9aaf9b68-9302-4625-ab89-1d6338dff48d';

  getDashboard() {
    const url = Dashboard.apiURL + '/Dashboard';
    const options = {
      headers: {
        Authorization: 'Bearer ' + Dashboard.apiKey,
      }
    };

    return fetch(url, options);
  }

  fetchDashboard() {
    this.getDashboard()
    .then(res => {
      res.json()
      .then(data => {
        console.log(data);

        this.setState({
          thermostats: data.thermostats,
          frontDoor: data.locks[0],
          garageDoor: data.garageDoorControls[0],
        })
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  componentWillMount() {
    this.fetchDashboard();
    setInterval(() => InteractionManager.runAfterInteractions(this.fetchDashboard.bind(this)), 10000);
  }

  render() {
    const { thermostats, frontDoor, garageDoor } = this.state;

    return (
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.fetchDashboard.bind(this)}
          />
        }
      >
        <View style={[ styles.row ]}>
          {frontDoor !== null &&
            <TouchableOpacity style={[styles.tile, styles.halfTile, styles.frontDoorLockButton]}>
              <Text style={styles.tileText}>{frontDoor.status.toUpperCase()}</Text>
              <Text style={styles.tileLabel}>Front Door</Text>
            </TouchableOpacity>
          }
          {garageDoor !== null &&
            <TouchableOpacity style={[styles.tile, styles.halfTile, styles.frontDoorLockButton]}>
              <Text style={styles.tileText}>{garageDoor.status.toUpperCase()}</Text>
              <Text style={styles.tileLabel}>Garage Door</Text>
            </TouchableOpacity>
          }
        </View>
        {thermostats.length > 0 &&
        <ScrollView
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {thermostats.map((thermostat, i) => {
            return (
              <View key={i} style={[styles.tile, styles.thermostat]}>
                <View style={styles.thermostatStatus}>
                  <Text style={styles.thermostatTemperature}>{thermostat.temperature}°</Text>
                  <Text style={styles.thermostatMode}>{thermostat.mode.toUpperCase()}</Text>
                </View>
                <TouchableOpacity style={styles.thermostatAction}><Text style={styles.thermostatActionText}>∧</Text></TouchableOpacity>
                <TouchableOpacity style={styles.thermostatAction}><Text style={styles.thermostatActionText}>∨</Text></TouchableOpacity>
                <Text style={styles.tileLabel}>{thermostat.name}</Text>
              </View>
            );
            })
          }
        </ScrollView>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    marginTop: 20,
    flexDirection: 'column',
    padding: 4,
  },
  row: {
    flexDirection: 'row',
  },
  tile: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.16)',
    padding: 8,
    margin: 4,
  },
  halfTile: {
    width: deviceWidth / 2 - 12,
    height: deviceWidth / 2 - 12,
  },
  frontDoorLockButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: '400',
  },
  tileLabel: {
    position: 'absolute',
    fontSize: 12,
    bottom: 8,
    left: 8,
    right: 8,
    textAlign: 'right',
  },
  thermostat: {
    width: deviceWidth - 16,
    height: deviceWidth / 2 - 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thermostatStatus: {
    flex: 3,
    alignItems: 'center',
  },
  thermostatTemperature: {
    fontSize: 58,
    fontWeight: '300'
  },
  thermostatMode: {
    fontSize: 16,
  },
  thermostatAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    marginLeft: 8,
  },
  thermostatActionText: {
    color: 'white',
    fontSize: 22,    
    fontWeight: '900',
  },
});

export default RoomView