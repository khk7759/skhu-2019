import React, { Component } from 'react';
import {StyleSheet, Text, View, StatusBar,TextInput, Dimensions,Platform,ScrollView, AsyncStorage} from "react-native";
import {Icon} from 'native-base';
import {AppLoading} from 'expo';
import Todo from "./Todo";
import uuidv1 from "uuid/v1";

const {height,width}=Dimensions.get("window");

export default class TodoTab extends Component{
state={
    newTodo:"",
    loadedTodos:false,
    todos:{}
};
componentDidMount = () =>{
    this.loadTodos();
};
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='md-checkmark-circle-outline' style={{ color: tintColor }} />
        )
    }

    render(){
        const{newTodo,loadedTodos,todos}=this.state;
        console.log(todos);
        if(!loadedTodos){
            return <AppLoading />;
        }
        return (
            <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <Text></Text>
             <View style={styles.card}>
            <TextInput style={styles.input} placeholder={"New To do"} 
            value={newTodo} onChangeText={this.controlNewTodo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this.addTodo}
            underlineColorAndroid={"transparent"} />
             <ScrollView contentContainerStyle={styles.todos}>
                {Object.values(todos).reverse().map(todo =>(
                <Todo key={todo.id} 
                deleteTodo={this.deleteTodo} 
                uncompleteTodo={this.uncompleteTodo}
                completeTodo={this.completeTodo}
                updateTodo={this.updateTodo}
                {...todo}
                />
                ))}
             </ScrollView>
             </View>
            </View>
        );
    }
    controlNewTodo = text =>{
        this.setState({
            newTodo:text
        });
    };
    loadTodos = async () => {
        try{
            const todos=await AsyncStorage.getItem("todos");
            const parsedTodos=JSON.parse(todos);

            this.setState({
                loadedTodos:true,
                todos:parsedTodos || {}
            });
        }catch(err){
            console.log(err)
        }
    };
    addTodo=()=>{
        const {newTodo}=this.state;
        if(newTodo!== ""){
            this.setState(prevState=>{
                const ID=uuidv1();
                const newTodoObject={
                    [ID]:{
                        id:ID,
                        isCompleted:false,
                        text:newTodo,
                        createdAt:Date.now()
                    }
                };
            const newState={
                ...prevState,
                newTodo:"",
                todos:{
                    ...prevState.todos,
                    ...newTodoObject
                }
            };
            this.saveTodos(newState.todos);
            return {...newState};
            });
        }
    };
    deleteTodo = (id) =>{
        this.setState(prevState =>{
            const todos=prevState.todos;
            delete todos[id];
            const newState = {
                ...prevState,
                ...todos
            }
            this.saveTodos(newState.todos);
            return {...newState};
        })
    };
    uncompleteTodo = id =>{
        this.setState(prevState =>{
            const newState = {
                ...prevState,
                todos:{
                    ...prevState.todos,
                    [id]:{
                        ...prevState.todos[id],
                        isCompleted:false
                    }
                }
            };
            this.saveTodos(newState.todos);
            return {...newState};
        });
    };
    completeTodo = id =>{
        this.setState(prevState =>{
            const newState = {
                ...prevState,
                todos:{
                    ...prevState.todos,
                    [id]:{
                        ...prevState.todos[id],
                        isCompleted:true
                    }
                }
            };
            this.saveTodos(newState.todos);
            return {...newState};
        });
    };
    updateTodo = (id,text) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                todos:{
                    ...prevState.todos,
                    [id]:{...prevState.todos[id],text:text}
                }
            };
            this.saveTodos(newState.todos);
            return {...newState};
        });
    };
    saveTodos=newTodos => {
       
       const saveTodos=AsyncStorage.setItem("todos",JSON.stringify(newTodos));
    };
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#E0FFFF",
        alignItems:"center",
    },
    title:{
        color:"white",
        fontSize:30,
        marginTop:50,
        fontWeight:"200",
        marginBottom:30
    },
    card:{
        backgroundColor:"white",
        flex:1,
        width:width-25,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        ...Platform.select({
            ios:{
                shadowColor:"rgb(50,50,50)",
                shadowOpacity:0.5,
                shadowRadius:5,
                shadowOffset:{
                    height:-1,
                    width:0
                }
            },
            android:{
                elevation:3
            }
        })
    },
    input:{
        padding:20,
        borderBottomColor:"#bbb",
        borderBottomWidth:1,
        fontSize:25
    },
    todos:{
        alignItems:"center"
    }
});