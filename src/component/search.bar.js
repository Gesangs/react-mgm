import React, {PropTypes} from 'react';
import classnames from 'classnames';

const SearchBar = React.createClass({
    propTypes: {
        defaultFocus: PropTypes.bool,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        onOK: PropTypes.func,
        onCancel: PropTypes.func
    },
    getDefaultProps(){
        return {
            id: '_mgm_search_bar_id' + (Math.random() + '').slice(2),
            defaultFocus: false,
            onOK: () => {
            },
            onCancel: () => {
            }
        };
    },
    getInitialState(){
        return {
            focus: this.props.defaultFocus
        };
    },
    render() {
        const cn = classnames('search-bar weui_search_bar', {
            'weui_search_focusing': this.state.focus
        });
        return (
            <div className={cn}>
                <form className="weui_search_outer" onSubmit={this.handleOK}>
                    <div className="weui_search_inner">
                        <i className="weui_icon_search"></i>
                        <input id={this.props.id} type="search" className="weui_search_input"
                               placeholder={this.props.placeholder}
                               onFocus={this.handleFocus}
                               onChange={this.handleChange}
                               value={this.props.value}/>
                        <a href="javascript:" className="weui_icon_clear"
                           onClick={this.handleClose.bind(this, true)}></a>
                    </div>
                    <label htmlFor={this.props.id} for="search_input" className="weui_search_text">
                        <i className="weui_icon_search"></i>
                        <span>{this.props.placeholder}</span>
                    </label>
                </form>
                <a href="javascript:" className="weui_search_cancel" onClick={this.handleClose.bind(this, false)}>取消</a>
            </div>
        );
    },
    handleFocus(event){
        event.preventDefault();
        this.setState({
            focus: true
        });
    },
    handleClose(clear, event){
        event.preventDefault();
        if (clear) {
            this.props.onChange('');
        }
        this.setState({focus: false});
        this.props.onCancel();
    },
    handleOK(event){
        event.preventDefault();
        this.props.onOK();
    },
    handleChange(event){
        this.props.onChange(event.target.value);
    }
});

export default SearchBar;