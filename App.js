import React from 'react';   
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';

class App extends React.Component {

// only for testing purpose
//  state = {
//    show: true
//  }

 //componentDidMount () {
   //setTimeout(()=>{
     //this.setState({show: false})
   //}, 5000)
 //}

  render () {
    return (
      <div>
        <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/' exact component={BurgerBuilder}/>
        </Switch>
       </Layout>
      </div>
    );
  }
}

export default App;
