import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursor:'pointer',
            clientx: null,
            clienty: null,
            isDragging: false
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.move = this.move.bind(this);
        this.up = this.up.bind(this);
        this.keydown = this.keydown.bind(this);
        this.resize = this.resize.bind(this);

        document.addEventListener('mousemove', this.move, false);
        document.addEventListener('mouseup', this.up, false);
        document.addEventListener('keydown', this.keydown, false);
        window.addEventListener('resize', this.resize, false);

        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;

    }

    static defaultProps = {
        title: '',
        loading: false
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("%c header update", "color: orange", nextState, nextProps)
        if(nextProps.initLeft === this.props.initLeft && nextProps.initTop === this.props.initTop) return false;
        console.log("%c update Component", "color: green");
        return true;
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.move, false);
        document.removeEventListener('mouseup', this.up, false);
        document.removeEventListener('keydown', this.keydown, false);
        window.removeEventListener('resize', this.resize, false);
    }

    move(e) {
        const {
            isDragging,
            clientx,
            clienty,
        } = this.state;
        const {
            initLeft,
            initTop,
            height,
            width
        } = this.props;
        const nega = (v) => v > 0 ? v : 0;
        if (isDragging && initLeft !== undefined) {
            const { innerWidth, innerHeight } = this;
            let nLeft = nega(e.pageX - clientx + initLeft);
            let nTop = nega(e.pageY - clienty + initTop);
            nLeft = nLeft + width > innerWidth ? nega(innerWidth-width) : nLeft;
            nTop = nTop + height > innerHeight ? nega(innerHeight-height) : nTop;
            this.props.updatePostions(nLeft, nTop);
        }
        return false;
    }

    up(e) {
        this.setState({
            isDragging: false,
            clientx: 0,
            clienty: 0
        });
        this.props.updateInitPos();
    }

    resize() {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        console.log('%c The window resize:', 'color: green', `width:${this.innerWidth} height:${this.innerHeight}`);
    }

    keydown(e) {
        const { closeEsc } = this.props;
        if (closeEsc && (e.key === "Escape" || e.which === 27)) {
            console.log('%c close modal', 'color: blue');
            this.props.close();
        }
    }

    handleMouseDown(e){
        e.stopPropagation();
        e.preventDefault();
        console.log('%c header first click:', 'color: green',`pageX: ${e.pageX}, pageY: ${e.pageY}`);
        this.setState({
            clientx: e.pageX,
            clienty: e.pageY,
            isDragging: true
        });
        return false
    }

    render () {
        const {
            close,
            loading,
            title,
            showHeader
        } = this.props;
        if(!showHeader) { return null}
        return (
            <div className="ddi-modal-header" onMouseDown={this.handleMouseDown} >
                { loading ? <span className="loading"></span> : null }
                <span className="title">{title}</span>
                <i className="close" onClick={close}></i>
            </div>
        )
    }
};

export default Header;
