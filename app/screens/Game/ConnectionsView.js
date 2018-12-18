import React, { PureComponent } from 'react';
import { View } from 'react-native';
import _ from 'lodash';

class ConnectionsView extends PureComponent {
    render() {
        const { connections, cells } = this.props;

        return Object.entries(connections).reduce((lines, [ , connection ]) => {
            let chain = [];
            for (let i = 1; i < connection.length; i += 1) {  
                const prev = connection[i];
                const cur = connection[i-1];

                var div1 = {row: prev[0], col: prev[1]};
                var div2 = {row: cur[0], col: cur[1]};

                const thickness = 15;
                let off1 = {x, y, width, height} = cells.find(cell => cell.row === div1.row && cell.col === div1.col);
                let off2 = {x, y, width, height} = cells.find(cell => cell.row === div2.row && cell.col === div2.col);
        
                var x1 = off1.x + off1.width / 2;
                var y1 = off1.y + off1.height / 2;

                var x2 = off2.x + off2.width / 2;
                var y2 = off2.y + off2.height / 2;

                var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

                var cx = ((x1 + x2) / 2) - (length / 2);
                var cy = ((y1 + y2) / 2) - (thickness / 2);

                var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

                chain.push(
                    <View key={_.uniqueId()} style={{
                        "position": 'absolute',
                        "height": thickness,
                        "backgroundColor": "rgba(0, 255, 255, 0.1)",
                        "left": cx,
                        "top": cy,
                        "width": length,
                        "transform": [{rotate: angle+"deg"}]
                    }}></View>
                ); 
            }
            return [...lines, chain];           
        }, []);
    }
}

export default ConnectionsView;
