import React, {Component} from 'react';
import jsplumb from 'jsplumb';
import './index.less'

class Home extends Component {
    state = {
        TabData: [{
            Name: '1',
        }, {Name: '2'}, {Name: '3'}, {Name: '4'}]
    };

    componentDidMount() {
        let jsPlumbIn = jsplumb.jsPlumb.getInstance({
            Connector: ['Straight'],
            ConnectionOverlays: [
                ['PlainArrow', {width: 5, length: 12, location: 0.5}]
            ],
            Container: 'jslumbContent',//容器位置
        });
        jsPlumbIn.ready(() => {
            let common = {
                isSource: true,
                isTarget: true,
                maxConnections: -1,
                connector: ['Straight'],
                paintStyle: {
                    stroke: 'blue',
                    fill: 'blue',
                    radius: 5,
                },
                hoverPaintStyle: {
                    outlineStroke: 'lightblue'
                },
            };
            this.state.TabData.map((item, index) => {
                jsPlumbIn.addEndpoint('item_' + index, {
                    anchor: 'Left',
                }, common);
                jsPlumbIn.addEndpoint('item_' + index, {
                    anchor: 'Right',
                }, common);
                jsPlumbIn.draggable('item_' + index);
            });
            // 链接成功回调
            jsPlumbIn.bind('connection', function (info) {
                console.log(info);
            });

            jsPlumbIn.bind('click', function (conn) {
                jsPlumbIn.deleteConnection(conn);
            });
            jsPlumbIn.bind('beforeDrop', function (conn) {
                //验证是否可以链接
                if (conn.sourceId === conn.targetId) {
                    return false;
                } else {
                    return true;
                }
            });
            let connect = {
                source: 'item_0',
                target: 'item_1',
                anchor: ['Continuous', {faces: ['right', 'left']}],
                endpoint: ['Dot', {radius: 5}, common],
                connector: ['Straight'],
                endpointStyle: {fill: 'rgba(0,0,0,0)', outlineStroke: 'rgba(0,0,0,0)'},
                overlays: [['PlainArrow', {width: 5, length: 12, location: 0.5}]]
            };
            jsPlumbIn.connect(connect);
            connect.target = 'item_3';
            jsPlumbIn.connect(connect);
        });

    }

    render() {
        let diagramContainer = {
            position: 'relative',
            width: '1498px',
            height: '800px',
            border: '1px solid gray'
        };
        return (
            <div className="jsplumbContent">

                <div className="Dotcon" id="jslumbContent" style={diagramContainer}>
                    {this.state.TabData.length && this.state.TabData.map((item, index) => {
                        let Id = 'item_' + index,
                            Style = {
                                position: 'absolute',
                                height: '40px',
                                width: '80px',
                                border: '1px solid blue',
                                color: 'blue',
                                left: index === 0 ? 20 : index * 200,
                                top: index % 2 ? 50 : 100,
                                textAlign: 'center',
                                lineHeight: '40px',
                            };
                        return (
                            <div
                                id={Id}
                                onDoubleClick={() => this.SaveItem(item, index)}
                                style={Style} key={index}
                                className="item">
                                {item.Name}
                            </div>);
                    })}
                </div>
            </div>
        );
    }

    SaveItem() {
        //双击事件
        // 可进行编辑操作
    }

}

export default Home;