import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";

export default class BoardList extends Component{
    constructor(props){
        super(props)
       
        
    }
    static propTypes={
       username:PropTypes.string.isRequired
    };

    

    render(){
        const{username}=this.props;
         console.log(this.props.username);
         return (
           
            <View style={{width:'100%', height:50,marginTop:5,marginBottom:5,borderBottomColor:'#c9cacc',borderBottomWidth:1}}>
                <Text style={{color:'black'}}>{username} </Text>
                </View>
               
            
        )
        };
    



}
