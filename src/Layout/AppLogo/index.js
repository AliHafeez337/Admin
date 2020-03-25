import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import Hamburger from 'react-hamburgers';

import AppMobileMenu from '../AppMobileMenu';
// import applogo from './../../../public/logo.png';

import {
    setEnableClosedSidebar,
    setEnableMobileMenu,
    setEnableMobileMenuSmall,
} from '../../reducers/ThemeOptions';

class HeaderLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            mobile: false,
            activeSecondaryMenuMobile: false,
            showlogo: true
        };
    }

    toggleEnableClosedSidebar = () => {
        let {enableClosedSidebar, setEnableClosedSidebar} = this.props;
        this.state.showlogo = enableClosedSidebar;
        // console.log(this.state.showlogo);
        // console.log(enableClosedSidebar);
        setEnableClosedSidebar(!enableClosedSidebar);
    }

    state = {
        openLeft: false,
        openRight: false,
        relativeWidth: false,
        width: 280,
        noTouchOpen: false,
        noTouchClose: false,
    };

    render() {
        let {
            enableClosedSidebar,
        } = this.props;

        const {
        } = this.state;

        return (
            <Fragment>
                <div className="app-header__logo">
                    {/* <div className="logo-src"/> */}
                    {/* <div><h3>Logo</h3></div> */}
                    {this.state.showlogo ?
                        <div>
                        <img src="logo.png" alt="AppLogo" style={{height: '30px'}}/>
                        </div>
                        : null
                    }
                    <div className="header__pane ml-auto">
                        <div onClick={this.toggleEnableClosedSidebar}>
                            <Hamburger
                                active={enableClosedSidebar}
                                type="elastic"
                                onClick={() => this.setState({active: !this.state.active})}
                            />
                        </div>
                    </div>
                </div>
                <AppMobileMenu/>
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({

    setEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable)),
    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),
    setEnableMobileMenuSmall: enable => dispatch(setEnableMobileMenuSmall(enable)),

});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);