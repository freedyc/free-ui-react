import React from 'react';
import PropTypes from 'prop-types';
import utils from './utils';
import Node from './node';

class Tree extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedIds: this.props.selectedIds || [],
            tree: utils.arrayToTree(this.props.data, this.props)
        };
    }

    isSelected(value) {
        return this.state.selectedIds.indexOf(value) !== -1;
    }

    selectChild(value, checked, silent) {
        utils.findChild(utils.findChild(this.state.tree, ({id}) => {
            return id === value;
        }), ({id}) => {
            this.select(id, checked, silent)
        });
    }

    select(value, checked, silent) {
        const selectedIds = this.state.selectedIds;
        const index = selectedIds.indexOf(value);
        if (checked && index === -1) {
            selectedIds.push(value);
        } else if (!checked && index !== -1) {
            selectedIds.splice(index, 1);
        }
        if (!silent) this.setState({selectedIds});
    }

    handleChange({target: {value, checked}}) {
        this.select(value, checked);
        if (checked) this.selectChild(value, false, true);
        this.props.onChange(Array.from(this.state.selectedIds));
    }

    makeNode(data) {
        if (!data) return;
        const nodes = data.map(item => {
            const checked = this.isSelected(item.id);
            const childs = checked ? null : this.makeNode(item.children);
            return (<Node
                data={item}
                key={item.id}
                checked={checked}
                expandAll={this.props.expandAll}
                expandIcon={this.props.expandIcon}
                collapseIcon={this.props.collapseIcon}
                onChange={this.handleChange.bind(this)}>{childs}</Node>);
        });
        return (<ul>{nodes}</ul>);
    }

    render() {
        return this.makeNode(this.state.tree);
    }
}

Tree.propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    selectedIds: PropTypes.array,
    rootId: PropTypes.string,
    idAttribute: PropTypes.string,
    textAttribute: PropTypes.string,
    parentAttribute: PropTypes.string,
    expandAll: PropTypes.bool,
    expandIcon: PropTypes.string,
    collapseIcon: PropTypes.string
}

export default Tree;
