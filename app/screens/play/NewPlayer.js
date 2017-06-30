/**
 * Created by buhe on 16/5/4.
 */
import React, {
    PureComponent,
    PropTypes
} from 'react';
import {
    requireNativeComponent,
    View,
} from 'react-native';

class Player extends PureComponent {

  constructor(props, context) {
    super(props, context);
    this._onStart = this._onStart.bind(this);
    this._onLoading = this._onLoading.bind(this);
    this._onPaused = this._onPaused.bind(this);
    this._onShutdown = this._onShutdown.bind(this);
    this._onError = this._onError.bind(this);
    this._onPlaying = this._onPlaying.bind(this);
  }

  _onStart(event) {
    this.props._onStart && this.props._onStart(event.nativeEvent);
  }

  _onLoading(event) {
    this.props.onLoading && this.props.onLoading(event.nativeEvent);
  }

  _onPaused(event) {
    this.props.onPaused && this.props.onPaused(event.nativeEvent);
  }

  _onShutdown(event) {
    this.props.onShutdown && this.props.onShutdown(event.nativeEvent);
  }


  _onError(event) {
    this.props.onError && this.props.onError(event.nativeEvent);
  }

  _onPlaying(event) {
    this.props.onPlaying && this.props.onPlaying(event.nativeEvent);
  }

  render() {
    let nativeProps = Object.assign({}, this.props);
    nativeProps = Object.assign(nativeProps, {
      onStart: this._onStart,
      onLoading: this._onLoading,
      onPaused: this._onPaused,
      onShutdown: this._onShutdown,
      onPlayError: this._onError,
      onPlaying: this._onPlaying,
    });
    return (
        <RCTPlayer
            {...nativeProps}
            />
    )
  }
}

Player.propTypes = {
  source: PropTypes.shape({                          // 是否符合指定格式的物件
    uri: PropTypes.string.isRequired,
    controller: PropTypes.bool, //Android only
    timeout: PropTypes.number, //Android only
    hardCodec: PropTypes.bool, //Android only  //1 or 0  // 1 -> hw codec enable, 0 -> disable [recommended]
    live: PropTypes.bool, //Android only  //1 or 0 // 1 -> live
  }).isRequired,
  started:PropTypes.bool,
  muted:PropTypes.bool, //iOS only
  aspectRatio: PropTypes.oneOf([0, 1, 2, 3, 4]),
  onStar: PropTypes.func,
  onLoading: PropTypes.func,
  onPaused: PropTypes.func,
  onShutdown: PropTypes.func,
  onPlayError: PropTypes.func,
  onPlaying: PropTypes.func,
  ...View.propTypes,
}

const RCTPlayer = requireNativeComponent('RCTPlayer', Player);

module.exports = Player;
