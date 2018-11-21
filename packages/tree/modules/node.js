import React from 'react';
import PropTypes from 'prop-types';

class TreeNode extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            expand: !!this.props.expandAll
        };
    }


    handleChange(e) {
        this.props.onChange(e);
    }

    handleClick() {
        this.setState({expand: !this.state.expand});
    }

    render() {
        const {data, checked, children} = this.props;
        return (<li key={data.id}>
            {this.renderIcon()}
            <span>{data.text}</span>
            <input type="checkbox" value={data.id} checked={checked} onChange={this.handleChange.bind(this)}/>
            {this.state.expand ? children : null}</li>);
    }

    renderIcon() {
        if (!this.props.children) return;
        const {expandIcon, collapseIcon} = this.props;
        return (<i onClick={this.handleClick.bind(this)} className={this.state.expand ? expandIcon : collapseIcon}></i>);
    }
}

TreeNode.propTypes = {
    checked: PropTypes.bool,
    expandAll: PropTypes.bool,
    children: PropTypes.object,
    expandIcon: PropTypes.string,
    collapseIcon: PropTypes.string,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default TreeNode;
