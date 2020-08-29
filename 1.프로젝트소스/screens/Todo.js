import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,TextInput} from 'react-native';
import {Icon} from 'native-base';
import {Feather} from '@expo/vector-icons';
import {EvilIcons} from '@expo/vector-icons';
import {Foundation} from '@expo/vector-icons';
import TodoTab from './TodoTab';
import PropTypes from "prop-types";

const {width,height} =Dimensions.get("window");

export default class Todo extends Component{
    constructor(props){
        super(props);
        this.state={isEditing:false,todoValue:props.text};
    }
    static propTypes={
        text:PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteTodo:PropTypes.func.isRequired,
        id:PropTypes.string.isRequired,
        uncompleteTodo:PropTypes.func.isRequired,
        completeTodo:PropTypes.func.isRequired,
        updateTodo:PropTypes.func.isRequired
    };
    
    
    render(){
        const {
            
            isEditing,
            todoValue} = this.state;
        const { text, id, deleteTodo,isCompleted } = this.props;
        
        return(
            <View style={styles.container}>
            <View style={styles.column}>
            <TouchableOpacity onPress={this.toggleComplete}>
                <View style={[styles.circle,isCompleted?
                    styles.completedCircle:
                    styles.uncompletedCircle]}/> 
            </TouchableOpacity>
                {isEditing ? (<TextInput style={[ styles.text,styles.input,isCompleted ? 
                styles.completedText : 
                styles.uncompletedText]} value={todoValue} multiline={true}
                onChangeText={this.controllInput} 
                returnKeyType={"done"}
                onBlur={this.finishEditing}
                underlineColorAndroid={"transparent"}
                />)
                 : 
                (<Text style={[styles.text,isCompleted ? 
                styles.completedText : 
                styles.uncompletedText]}>
                {text}
                </Text>)}
            </View>
            
            {isEditing ?(
                <View style={styles.actions}>
                <TouchableOpacity onPressOut={this.finishEditing}>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}><Foundation size={30} name='checkbox' /></Text>
                    </View>
            </TouchableOpacity>
            </View>
            ):(
            <View style={styles.actions}>
                <TouchableOpacity onPressOut={this.startEditing}>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}><EvilIcons size={32} name='pencil' /></Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={event => {
                event.stopPropagetion;
                    deleteTodo(id) }}>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}><Feather size={30} name='x-circle' /></Text>
                    </View>
            </TouchableOpacity>
            </View>)}
        
            
            </View>
            );
    }

   toggleComplete = (event) =>{
       event.stopPropagation();
       const {isCompleted,uncompleteTodo,completeTodo,id}=this.props;
       if(isCompleted){
           uncompleteTodo(id);
       }else{
           completeTodo(id);
       }
   };
   startEditing = (event) => {
    event.stopPropagation();
       this.setState({
           isEditing:true
       });
   };
   finishEditing = (event) => {
    event.stopPropagation();
       const {todoValue}=this.state;
       const{id,updateTodo}=this.props;
       updateTodo(id,todoValue);
       this.setState({
           isEditing:false
       });
   };
   controllInput = (text) =>{
       this.setState({todoValue:text});
   }

}
const styles=StyleSheet.create({
    container:{
        width:width-50,
        borderBottomColor:"#bbb",
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    circle:{
        width:30,
        height:30,
        borderRadius:15,
        borderWidth:3,
        marginRight:20,
        marginLeft:20
    },
    completeCircle:{
        borderColor:"#bbb"
    },
    uncompletedCircle:{
        borderColor:"#5F9EA0"
    },
    text:{
        fontWeight:"600",
        fontSize:20,
        marginVertical:20
    },
    completedText:{
        color:"#bbb",
        textDecorationLine:"line-through"
    },
    uncompletedText:{
        color:"#353839"
    },
    column:{
        flexDirection:"row",
        alignItems:"center",
        width:width/2,
       
    },
    actions:{
        flexDirection:"row"
    },
    actionContainer:{
        marginVertical:10,
        marginHorizontal:10

    },
    input:{
        marginVertical:15,
        width :width/2,
        paddingBottom:5
    }

});