import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';

import { connect } from 'react-redux';

import Pili, {
    Streaming,
    Player,
    StreamingConst
} from 'react-native-pili';

var {height, width} = Dimensions.get('window');

import close from '../img/close.png';

class PlayerView extends Component {

  static route = {
    navigationBar: {
      visible: false,
    },
  }


  constructor(props) {
    super(props);
    this._pop = this._pop.bind(this);
  }

  _pop() {
    this.props.navigator.pop();
  }

  render() {
    return(
    <View>
      <Player
          source={{
                        uri:this.props.route.params.url,
                        //controller: true,
                        timeout: 10 * 1000,
                        live:true,
                        hardCodec:false,
                      }}
          started={true}
          style={{
                      position:'absolute',
                      top:0,
                      left:0,
                      height:height,
                      width:width,
                      }}
          aspectRatio={2}
          />
      <View
          style={{height:60,backgroundColor:'transparent',alignItems:'flex-end',justifyContent:'center',marginRight:10}}>
        <TouchableOpacity onPress={this._pop} style={{height:40,width:40}}>
          <Image source={close}/>
        </TouchableOpacity>
      </View>
    </View>)
  }
}

export default connect()(PlayerView);