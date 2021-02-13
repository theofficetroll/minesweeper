import React from 'react';

class Cell extends React.Component {
  getValue() {
    const {value} = this.props;

    if(!value.isRevealed) {
      return value.isFlagged ? "F" : null;
    }

    if (value.isMine) {
      return "M";
    }

    if (value.neighbour === 0) {
      return null;
    }

    return value.neighbour;
  }

  render() {
    let { value, onClick, cMenu } = this.props;
    let className = 'cell' + (value.isRevealed ? '' : ' hidden') + (value.isMine ? ' is-mine' : '') + (value.isFlagged ? ' is-flag' : '');
    return (
      <div className={className} onClick={onClick} onContextMenu={cMenu}>
        {this.getValue()}
      </div>
    )
  }
}

export default Cell;
