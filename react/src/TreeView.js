/**
 * Created by hakan on 15/02/2017.
 */
import React from 'react';
import {Treebeard} from 'react-treebeard';
import FontAwesome from 'react-fontawesome';
import Data from './data/Data';
import * as filters from './filter';
import styles from './styles';

class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Data};
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
    }

    onFilterMouseUp(e) {
        const filter = e.target.value.trim();
        if (!filter) {
            return this.setState({Data});
        }
        var filtered = filters.filterTree(Data, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState({Data: filtered});
    }

    render() {
        return (
            <div>
                <div style={styles.searchBox}>
                    <div className="input-group">
                        <span className="input-group-addon">
                          <FontAwesome name="search"/>
                        </span>
                        <input type="text"
                               className="form-control"
                               placeholder="Search..."
                               onKeyUp={this.onFilterMouseUp.bind(this)}
                        />
                    </div>
                </div>
                <Treebeard
                    data={this.state.Data}
                    onToggle={this.onToggle}
                />
            </div>
        );
    }
}

export default TreeView;