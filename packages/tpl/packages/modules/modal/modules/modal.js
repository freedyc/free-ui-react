import React, { Component }  from 'react';
import Portal from './portal';
import Header from './header';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 500,
            top: 40,
            initLeft: 500,
            initTop: 40,
        }
    }

    static defaultProps = {
        closeDocClick: true,
        closeEsc: true,
        drapHeader: true,
        showHeader: true,
        showMask: true,
        size: {width: 520, height: 450},
    }

    updatePostions = (left, top) => {
        this.setState({ left: left, top: top });
    }

    updateInitPos = () => {
        const {
            left,
            top,
            initLeft,
            initTop
        } = this.state
        if(left === initLeft && top === initTop) return false;
        console.log('%c init left, top value change:','color: green', `left=${left}, top:${top}`);
        console.log(this);
        this.setState({initLeft: left, initTop: top});
    }

    render() {
        const {
            open,
            close,
            size
        } = this.props;

        const { width, height } = size;
        // api
        const  {
            showMask,
            drapHeader,
            showHeader,
            closeEsc
        } = this.props;
        const {
            left,
            top,
            initLeft,
            initTop
        } = this.state;
        console.log("Modal render");
        return (
            <Portal open={ open }>
                <div>
                    <ModalMask {...{showMask}} />
                    <ModalWrap {...{left, top, width, height, close}}>
                        <Header
                            updatePostions={ this.updatePostions }
                            updateInitPos={ this.updateInitPos }
                            close={close}
                            initLeft={initLeft}
                            initTop={initTop}
                            width={width}
                            height={height}
                            showHeader={showHeader}
                            drapHeader={drapHeader}
                            closeEsc={closeEsc}
                        />
                        { this.props.children }
                    </ModalWrap>
                </div>
            </Portal>
        )
    }
}

const ModalMask = (props) => {
    const clazz = props.showMask ? 'ddi-modal-mask' : '';
    return (<div className={clazz}></div>)
}

const ModalWrap = (props) => {
    const {
        left,
        top,
        width,
        height,
        close,
        isClickWrap=true
    } = props;
    const clazz = "ddi-modal-wrap";
    const handleClick = (e) => {
        e.stopPropagation();
        const className = e.target.className;
        console.log("%c trigger click", "color:green ", `Click element: ${e.target.className}`);
        if(className !== clazz) return false;
        if(isClickWrap) close();
    }

    return (
        <div className={clazz} onClick={handleClick}>
            <div
                className="ddi-modal-content"
                style={{left: left+'px', top: top+'px', width: width+'px', height: height+'px'}}>
                { props.children }
            </div>
        </div>
    )
}
export default Modal;
