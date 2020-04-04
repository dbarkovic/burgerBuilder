import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer:false
    }

    sideDrawerCloseHandler = () => {
        this.setState=({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState=((prevState) => { return {showSideDrawer: !prevState.showSideDrawer};});
    }

    render () {
        return (    
        <Auxiliary>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
            <main>
                {this.props.children}
            </main>
        </Auxiliary>)
    };
}

export default Layout;