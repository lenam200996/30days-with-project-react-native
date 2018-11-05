import React ,{Component} from 'react'
import { View, Text, StyleSheet,
    StatusBar,Dimensions, TouchableOpacity,
    FlatList,Alert
} from 'react-native'
import ItemList from './ItemList';
const {width , height } = Dimensions.get('window');
export default class Watch extends Component {
    constructor(props){
        super(props);
        this.state = {
            miliseconds : 0,
            seconds: 0,
            minute: 0,
            stateButtonStart: 'Start',
            stateButtonStop: 'Resume',
            arrayItem: [],
            count: 0,
            stateRun : false,
        }
        console.ignoredYellowBox = ['Warning: Each']; 
    }

    componentDidMount(){
       
        {setInterval(()=>{
            if(this.state.stateRun){
                this.setState({
                    miliseconds: this.state.miliseconds + 1
                });
                if(this.state.miliseconds == 50) {
                    this.setState({
                        seconds: this.state.seconds + 1,
                        miliseconds: 0
                    });
                }
                if(this.state.seconds == 60) {
                    this.setState({
                        minute: this.state.minute + 1,
                        seconds: 0
                    });
                }
            }
        },10)}
    }

    _OnSplit = () => {
        const count  = this.state.count + 1;
        
        const obj ={ 'key':count.toString() , 'value':
        (this.state.minute<10?'0'+this.state.minute:this.state.minute)+':'
        +(this.state.seconds<10?'0'+this.state.seconds:this.state.seconds)+'.'
        + (this.state.miliseconds<10?'0'+this.state.miliseconds:this.state.miliseconds)};

        const arrTem = this.state.arrayItem.slice();
        arrTem.unshift(obj);
        this.setState(
            {
                arrayItem: arrTem,
                count: count
            }
        )
    }

    _OnStart = () => {
        if(this.state.stateButtonStart == 'Start'){
            this.setState(
                {
                    stateRun: true,
                    stateButtonStart:'Split',
                    stateButtonStop:'Pause'
                }
            )
        }
        if(this.state.stateButtonStart == 'Split'){
            this._OnSplit();
        }

        if(this.state.stateButtonStart == 'Reset'){
            this.setState(
                {
                    minute: 0,
                    seconds:0,
                    miliseconds:0,
                    stateButtonStart:'Start',
                }
            )
        }
       
    }
    _OnStop = () => {
        if(this.state.stateButtonStop == 'Pause'){
            this.setState(
                {
                    stateRun: false,
                    stateButtonStart:'Reset',
                    stateButtonStop:'Resume'
                }
            )
        }
        if(this.state.stateButtonStop == 'Resume' && this.state.stateButtonStart == 'Reset'){
            this.setState(
                {
                    stateRun: true,
                    stateButtonStart:'Split',
                    stateButtonStop:'Pause'
                }
            )
        }
       
    }
    render(){
        const {
            container,viewWatch,viewButton,viewList,textwatch,btn,viewminute,viewseconds,viewmiliseconds
        } = styles;
        return(
            <View style={container}>
                <StatusBar hidden={true}/>
                <View style={viewWatch}>
                    <View style={viewminute}>
                        <Text style={textwatch}>{this.state.minute<10?'0'+this.state.minute:this.state.minute}</Text>
                    </View>
                    <View style={viewseconds}>
                        <Text style={textwatch}>:{this.state.seconds<10? '0'+this.state.seconds:this.state.seconds}</Text>
                    </View>
                    <View style={viewmiliseconds}>
                        <Text style={textwatch}>.{this.state.miliseconds<10?'0'+this.state.miliseconds:this.state.miliseconds}</Text>
                    </View>
                   
                </View>
                <View style={viewButton}>
                    <TouchableOpacity style={btn} onPress={this._OnStart}>
                        <Text>{this.state.stateButtonStart}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btn} onPress={this._OnStop}>
                        <Text style={{color:this.state.stateRun?'red':'green'}}>{this.state.stateButtonStop}</Text>
                    </TouchableOpacity>
                </View>
                <View style={viewList}>
                    <FlatList
                        data={this.state.arrayItem}
                        keyExtractor={(item) => {item.key}}
                        renderItem={({item})=>
                            <ItemList value={item.value} count={item.key}/>
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        width: width,
        height: height
    },
    viewWatch:{
        flex: 1,
        width:width,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    viewButton:{
        flex: 1,
        backgroundColor:'lightgray',
        width:width,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around',
    },
    viewList:{
        flex: 2,
        width:width,
        backgroundColor:'lightgray',
    },
    textwatch:{
        fontSize:90,
        fontWeight: '100',
        color: '#000',
       
    },
    btn:{
        width: 60,
        height:60,
        borderRadius: 30,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
        
    },
    viewminute:{
       flex:1.1,
       alignItems:'flex-end'
    },
    viewseconds:{
        flex: 1,
        alignItems:'center'
    },
    viewmiliseconds:{
        flex:1.1,
        alignItems:'flex-start'
    }
})