/**
 * creat by JaAa
 */
'use strict';

var React = require('React');

var RightItemRenderer = React.createClass({
  propTypes: {
    render: React.PropTypes.func,
  },
  render: function(){
    return this.props.render();
  },
});

module.exports = RightItemRenderer;
