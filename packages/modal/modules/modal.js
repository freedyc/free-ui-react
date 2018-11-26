import Portal from '@dengyongchao/portal';
import React, { Component }  from 'react';
import Header from './header';

class Modal extends Component {
    static defaultProps = {
        closeOnDcumentClick: false,
        closeOnEsc: true,
        drapHeader: true,
        showHeader: true,
        showMask: true,
        size: { width: 520, height: 400 },
        close: () => {}
    }

    constructor(props) {
        super(props);
        console.log(props, "constructor");
        this.state = {
            left: 500,
            top: 40,
            initLeft: 500,
            initTop: 40,
        }
    }
    afterOpen = () => {
        console.log("after Open");
        console.log(this.props, this.state);
        const { open, size } = this.props;
        console.log("update", open, size)
        const { innerHeight, innerWidth } = window;
        const wc = (innerWidth - size.width)/2;
        const hc = (innerHeight - size.height)/2;
        this.setState({
            left: wc,
            top: hc,
            initLeft: wc,
            initTop: hc,
        })
    }

    componentDidMount() {
        console.log("Dig Mount", this.state, this.props)
    }
    componentWillMount() {
        console.log("will Mount");
    }
    componentDidUpdate() {
        console.log("did update")
    }
    componentWillUpdate() {
        
        // const { open, size } = this.props;
        // console.log("update", open, size)
        // const { innerHeight, innerWidth } = window;
        // if(!open) {
        //     const wc = (innerWidth - size.width)/2;
        //     const hc = (innerHeight - size.height)/2;
        //     this.setState({
        //         left: wc,
        //         top: hc,
        //         initLeft: wc,
        //         initTop: hc,
        //     })
        // }
    }

    updatePosition = (left, top) => {
        this.setState({ left: left, top: top });
    }

    updateInitPosition = () => {
        const {
            left,
            top,
            initLeft,
            initTop
        } = this.state
        if(left === initLeft && top === initTop) return false;
        // console.log('%c init left, top value change:','color: green', `left=${left}, top:${top}`);
        // console.log(this);
        this.setState({initLeft: left, initTop: top});
    }

    render() {
        const {
            open,
            close,
            size,
            title,
            loading,
            children,
            footer,
        } = this.props;

        const { width, height } = size;
        // api
        const  {
            showMask,
            drapHeader,
            showHeader,
            closeOnEsc,
            closeOnDcumentClick,
        } = this.props;

        const {
            left,
            top,
            initLeft,
            initTop
        } = this.state;
        if (!open) {
            return null;
        }
        return (
            <Portal open={open} afterOpen={this.afterOpen}>
                <div>
                    <ModalMask {...{showMask}} />
                    <ModalWrap {...{left, top, width, height, close, closeOnDcumentClick}}>
                        <Header
                            updatePosition={this.updatePosition }
                            updateInitPosition={this.updateInitPosition }
                            close={close}
                            initLeft={initLeft}
                            initTop={initTop}
                            width={width}
                            height={height}
                            showHeader={showHeader}
                            drapHeader={drapHeader}
                            closeOnEsc={closeOnEsc}
                            title={title}
                            loading={loading}
                        />
                        <div className="ddi-modal-body">
                            { children }
                        </div>
                        <div className="ddi-modal-footer">
                            { footer }
                        </div>
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
        closeOnDcumentClick,
        children,
    } = props;
    const clazz = "ddi-modal-wrap";
    const handleClick = (e) => {
        e.stopPropagation();
        if (closeOnDcumentClick) {
            const className = e.target.className;
            if (className !== clazz) return false;
            close();
        }
    }

    return (
        <div className={clazz} onClick={handleClick}>
            <div
                className="ddi-modal-content"
                style={{left: left+'px', top: top+'px', width: width+'px', height: height+'px'}}>
                { children }
            </div>
        </div>
    )
}

export default Modal;
