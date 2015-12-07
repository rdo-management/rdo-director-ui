import ClassNames from 'classnames';
import React from 'react';

export default class Loader extends React.Component {
  render() {
    let classes = ClassNames({
      'spinner': true,
      'spinner-xs': this.props.size === 'xs' || !this.props.size && this.props.inline,
      'spinner-sm': this.props.size === 'sm',
      'spinner-lg': this.props.size === 'lg',
      'spinner-inline': this.props.inline,
      'spinner-inverse': this.props.inverse
    });

    if(!this.props.loaded) {
      return this.props.inline ? (
        <span>
          <span className={classes}></span>
          {this.props.content}
        </span>
      ) : (
        <div style={{marginTop: `${this.props.height/2}px`,
                     marginBottom: `${this.props.height/2}px`}}>
          <div className={classes}/>
          <br/>
          <p className="text-center">{this.props.content}</p>
        </div>
      );
    }
    return React.createElement(this.props.component, {}, this.props.children);
  }
}
Loader.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  component: React.PropTypes.any, // Component to wrap children when loaded
  content: React.PropTypes.string,
  height: React.PropTypes.number,
  inverse: React.PropTypes.bool,
  loaded: React.PropTypes.bool,
  size: React.PropTypes.oneOf(['xs', 'sm', 'lg'])
};
Loader.defaultProps = {
  component: 'div',
  content: '',
  height: 'auto'
};
