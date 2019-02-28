import React, { PureComponent } from 'react';
import { View } from 'react-native';
import _ from 'lodash';

class ConnectionsView extends PureComponent {
  render() {
    const { connections, cells } = this.props;

    return Object.entries(connections).reduce((lines, [, connection]) => {
      const chain = [];
      for (let i = 1; i < connection.length; i += 1) {
        const prev = connection[i];
        const cur = connection[i - 1];

        var div1 = { row: prev[0], col: prev[1] };
        var div2 = { row: cur[0], col: cur[1] };

        const thickness = 15;
        const off1 = {
          x, y, width, height,
        } = cells.find(cell => cell.row === div1.row && cell.col === div1.col);
        const off2 = {
          x, y, width, height,
        } = cells.find(cell => cell.row === div2.row && cell.col === div2.col);

        const x1 = off1.x + off1.width / 2;
        const y1 = off1.y + off1.height / 2;

        const x2 = off2.x + off2.width / 2;
        const y2 = off2.y + off2.height / 2;

        const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

        const cx = ((x1 + x2) / 2) - (length / 2);
        const cy = ((y1 + y2) / 2) - (thickness / 2);

        const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

        chain.push(
          <View
            key={_.uniqueId()}
            style={{
              position: 'absolute',
              height: thickness,
              backgroundColor: 'rgba(255, 1, 1, 0.1)',
              left: cx,
              top: cy,
              width: length,
              transform: [{ rotate: `${angle}deg` }],
            }}
          />,
        );
      }
      return [...lines, chain];
    }, []);
  }
}

export default ConnectionsView;
