/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React    = require('react-native');
var TodoList = require('./TodoList');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  PixelRatio,
  TouchableHighlight
} = React;

var HelloWorld = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TodoList
          todoitems={this.state.dataSource}
        />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
