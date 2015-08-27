/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Swipeout = require('react-native-swipeout');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  PixelRatio
} = React;

var HelloWorld = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return {
      dataSource: ds.cloneWithRows(todos),
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TodoList
          todoitems={this.state.dataSource}
          onDeleteTodo={this.onDeleteTodo}
        />
      </View>
    );
  },
  onDeleteTodo: function(item) {
    console.log("deleting item -> " + item);
    var index = todos.indexOf(item);
    todos.splice(index, 1);
    this.setState({
      dataSource: this.getDatasource(todos),
    })
    // this.state.dataSource = ds.cloneWithRows(todos);
    console.log(this.state.dataSource);
  },
  getDatasource: function(todos: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(todos);
  }
});

var TodoList = React.createClass({
  render: function() {
    console.log(this.props.todoitems._dataBlob.s1);
    return (
      <View style={styles.todolist}>
          <Text style={styles.todolisttitle}>
            Todo List:
          </Text>
          <ListView
            dataSource={this.props.todoitems}
            renderRow={this._renderRow}
          />
        </View>
      )
  },
  _onButtonPress: function(item) {
    console.log("_onButtonPress called.");
    console.log(arguments);
    this.props.onDeleteTodo(item);
  },
  _renderRow: function(item, sectionID, rowID, highlightRowFunc) {
    var swipeoutBtns = [
    {
      text: 'Button',
      color: '#000000',
      backgroundColor: '#990000',
      onPress: () => this._onButtonPress(item),
    }];
    return (
      <View>
        <Swipeout
          right={swipeoutBtns}
          autoClose={true}
          onOpen={()=> console.log(item)}>
          <View style={styles.swipeoutbtn}>
            <Text style={styles.swipeoutbtntext}> {item} </Text>
          </View>
        </Swipeout>
        <View style={styles.separator}/>
      </View>
    );
  }
});

var todos = ["eat", "drink", "read", "write", "learn", "coroutine"];

var styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  todolist: {
    flex: 1,
    marginTop: 20,
    marginLeft: 5
  },
  todolisttitle: {
    color: '#999999',
    marginLeft: 10,
  },
  swipeoutbtn: {
    backgroundColor: '#F5FCFF',
    height: 30,
  },
  swipeoutbtntext: {
    fontSize: 20,
    marginLeft: 15,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  }
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
