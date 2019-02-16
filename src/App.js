import React, { Component } from 'react';
import './App.css';
const todoItems = [


]

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { todoItems }
    }

    render() {
        let items = this.state.todoItems;
        items = items.map((item, index) => {
            return(<TodoItem item={item} key={index} onDelete={this.onDelete.bind(this)} onSave={this.onSave.bind(this)} toggleComplete={this.toggleComplete.bind(this)}/>)
        });
        return(
            <div>
                <h1 className="header"> Hello</h1>
                <AddItem onAdd={this.onAdd.bind(this)} items={this.state.todoItems} />
                <ul className="todo-list">
                    {items}
                </ul>
            </div>
        )
    }

    onDelete(item) {
        var updatedItems = this.state.todoItems;
        updatedItems = updatedItems.filter((value, index) => {
            return item !== value;
        });
        this.setState({
            todoItems: updatedItems
        });
    }

    onAdd(newTaskName) {
        var updatedItems = this.state.todoItems;
        updatedItems.push({
            name: newTaskName,
            completed: false
        });
        this.setState({
            todoItems: updatedItems
        })
    }

    onSave(oldItem, newName) {
        var thisItem = this.state.todoItems.filter((item) => item === oldItem)[0];
        thisItem.name = newName;
        this.setState({
            todoItems: this.state.todoItems
        })
    }

    toggleComplete(clickedItem) {
        var thisItem = this.state.todoItems.filter((item) => item === clickedItem)[0];
        thisItem.completed = !thisItem.completed;
        this.setState({
            todoItems: this.state.todoItems
        })
    }
}

class AddItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            infoMessage: '',
            act: 0,
            index: '',
            datas: []
        }
    }
    componentDidMount(){
        this.refs.name.focus();
      }
    
      fSubmit = (e) =>{
        e.preventDefault();
        console.log('try');
    
        let datas = this.state.datas;
        let name = this.refs.name.value;
    

         let data = {
            name
          }
        if(this.state.act === 0){ 
            if(name.length==0)
            { 
             
        }
        else
        {
          datas.push(data);
        }

        }else{                      
          let index = this.state.index;
          datas[index].name = name;
       
        }    
    
        this.setState({
          datas: datas,
          act: 0
        });
    
        this.refs.myForm.reset();
        this.refs.name.focus();
      }
    

    

   
      
    render() {
        let datas = this.state.datas;
        return(
            <div className="App">
            <h2>{this.state.title}</h2>
            <form ref="myForm" className="myForm">
              <input type="text" ref="name" placeholder="your name" className="formField" />
              <button onClick={(e)=>this.fSubmit(e)} className="myButton">submit </button>
            </form>
            <pre>
              {datas.map((data, i) =>
                <li key={i} className="myList">
                  <h1 align="center">Hello {data.name}</h1>

                </li>
              )}
            </pre>
        
            <form className="add-item-form" onSubmit={this.handleSubmit.bind(this)}>
                <input className="add-item-input" type="text" placeholder="a new task to do..." ref="newItem" />
                <input className="add-item-button" type="submit" value="add" />
                <p className="add-item-info"> {this.state.infoMessage} </p>
                
            </form>
            </div>
    )
  }

  
  handleSubmit(e) {
    e.preventDefault()
    const value = this.refs.newItem.value
    const isInList = this.props.items.filter((item) => {
        return item.name.toUpperCase() == value.toUpperCase()
    }).length
    console.log(isInList)

    if (!value) {
        this.setState({
            infoMessage: 'you want to add an empty task?'
        })
    }  else {
        this.props.onAdd(value);
        this.refs.newItem.value = '';
        this.setState({
            infoMessage: ''
        })
    }
  }

}

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
    }

    render() {
        return(
            <li className="todo-item">
                {this.renderTodoItem()}
            </li>
        )
    }

    renderTodoItem() {
        var isCompleted = this.props.item.completed

        if(this.state.editing) {
            return (
                <form className="todo-item-wrapper" onSubmit={this.handleSave.bind(this)}>
                    <input className="editing-form-input" type="text" ref="editingItem" defaultValue={this.props.item.name} onFocus={this.handleFocus.bind(this)} autoFocus />
                    {this.renderButtons()}
                </form>
            )
        }

        return (
            <div className="todo-item-wrapper">
                <p className={isCompleted ? 'todo-item-name--completed' : 'todo-item-name' } onClick={this.props.toggleComplete.bind(this, this.props.item)}>{this.props.item.name}</p>
                {this.renderButtons()}
            </div>
        )
    }

    renderButtons() {
        if(this.state.editing) {
            return(
                <div>
                    <button className="button" type="button" onClick={this.handleSave.bind(this)}> save </button>
                    <button className="button" type="button" onClick={this.onCancel.bind(this)}> cancel </button>
                </div>
            )
        }
        return(
            <div>
                <button className="button" type="button" onClick={this.onEdit.bind(this)}> edit </button>
                <button className="button" type="button" onClick={this.props.onDelete.bind(this, this.props.item)}> delete </button>
            </div>
        )
    }

    onEdit() {
        this.setState ({
            editing: true
        })
    }

    onCancel() {
        this.setState ({
            editing: false
        })
    }

    handleSave(e) {
        e.preventDefault()
        this.setState ({
            editing: false
        })
        this.props.onSave(this.props.item, this.refs.editingItem.value)
    }

    handleFocus(e) {
        e.target.select()
    }

}


export default App;
