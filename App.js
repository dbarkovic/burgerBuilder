import React from 'react';   
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';

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
          <BurgerBuilder/> 
          <Checkout/>
       </Layout>
      </div>
    );
  }
}

export default App;
