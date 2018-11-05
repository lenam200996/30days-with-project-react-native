import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';

const {width,height} = Dimensions.get('window');

export default class ItemList extends React.Component {
    
     render() {
        const {container,viewcount,viewvalue} =style;
      return (
        <View style={container}>
            <View style={viewcount}>
                <Text>Lần {this.props.count}</Text>
            </View>
            <View style={viewvalue}>
                    <Text style={{color: '#000' }}>{this.props.value}</Text>    
            </View>
        </View>
      );
    }
  }

  const style=StyleSheet.create({
    container:{
        height: 50,
        borderBottomWidth: .5,
        borderBottomColor: '#fff',
        alignItems: 'center',
        justifyContent:'space-around',
        flexDirection:'row'
    },
    viewcount:{
        flex:1,
        alignItems:'center'
    },
    viewvalue:{
        flex:1,
        alignItems:'center',
        
    },
  
  })
  