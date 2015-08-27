/*
    TodoList component
*/
'use strict';

var React     = require('react-native');
var Swipeout  = require('react-native-swipeout');
var invariant = require('invariant');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  PixelRatio,
  TouchableHighlight,
  TextInput,
  ScrollView
} = React;


var TodoList = React.createClass({
  _incID: 0,
  _todos: null,
  getInitialState: function() {
    var ds = new ListView.DataSource({
      // Always return true, because todolist row is deleting items frequently.
      rowHasChanged: (r1, r2) => true
    });
    var DEFAULT_TODO_ITEMS = ["eat", "drink", "read", "write", "learn", "coroutine"];
    // var DEFAULT_TODO_ITEMS = [];
    var self = this;
    this._todos = DEFAULT_TODO_ITEMS.map(function(item) {
      return {
        id: self._incID++,
        text: item,
      };
    });
    return {
      dataSource: ds.cloneWithRows(this._todos),
      addTodoinputText: ""
    };
  },

  render: function() {
    var header = (
        <Text style={styles.todolisttitle}>
            Todo List:
        </Text>
    );
    return this._todos.length > 0 ?
    (
      <View style={styles.todolist}>
          {header}
          <ScrollView>
          <ListView
            ref='listview'
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
          </ScrollView>
          {this._renderFooter()}
        </View>
    ):
    (
        <View style={styles.todolist}>
            {header}
            <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyState}>
                    Your Todo List is current Empty.
                </Text>
            </View>
            {this._renderFooter()}
        </View>
    )
  },

  _renderRow: function(item, sectionID, rowID, highlightRowFunc) {
    var swipeoutBtns = [
    {
      text: 'Delete',
      color: '#000000',
      backgroundColor: '#990000',
      onPress: () => this._onDeleteItem(item.id),
    }];
    return (
      <View>
        <Swipeout
          right={swipeoutBtns}
          autoClose={true}
          onOpen={()=> console.log(item)}>
          <View style={styles.swipeoutbtn}>
            <Text style={styles.swipeoutbtntext}> {item.text} </Text>
          </View>
        </Swipeout>
        <View style={styles.separator}/>
      </View>
    );
  },

  _renderFooter: function() {
    return (
      <View>
      <View style={styles.addTodoRow}>
        <TextInput
          ref='textinput'
          onChangeText={(text) => this.setState({ addTodoinputText: text}) }
          onSubmitEditing={this._onAddItem}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Add Todo Item..."
          value={this.state.addTodoinputText}
          style={styles.addTodoInput}
        />
        <TouchableHighlight
          style={styles.addTodoButton}
          onPress={this._onAddItem}
          underlayColor={"#0000cc"}>
          <View>
            <Text style={styles.addTodoButtonText}> Add </Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.separator}/>
      </View>
    )
  },

  _onAddItem: function() {
    var text = this.state.addTodoinputText;
    if (!text) return;
    console.log("Adding item -> " + text);

    this._todos.push({
        id: this._incID++,
        text: text
    });

    this.updateTodoList();
    this.setState({
        addTodoinputText: "",
    });

  },

  _onDeleteItem: function(itemID) {
    console.log("_onDeleteItem called for ", itemID);
    var index = null;
    for (var i = 0; i < this._todos.length; i++) {
      if (this._todos[i].id == itemID) {
          index = i;
      }
    }
    invariant(index != null, "%s itemID doesn't exist in this._todos", itemID + '');

    this._todos.splice(index, 1);
    this.updateTodoList();
  },

  getDatasource: function(todos: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(todos);
  },
  updateTodoList: function() {
    this.setState({
        dataSource: this.getDatasource(this._todos),
    });
  }
});

var styles = StyleSheet.create({
  todolist: {
    flex: 1,
    marginTop: 20,
    marginLeft: 5
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 5,
  },
  emptyState: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  addTodoRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addTodoInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
    marginLeft: 15,
  },
  addTodoButton: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: "#0080FF",
    borderRadius: 3,
  },
  addTodoButtonText: {
    fontSize: 15,
  },
  borderRadius: {
    borderWidth: 1,
    borderRadius: 1,
  }
});

module.exports = TodoList;
