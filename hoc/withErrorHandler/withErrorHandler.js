import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxilary/Auxiliary';

const withErrorHandler = (WrappedComponnent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount () {
            console.log('will unmount', this.reqInterceptor, this.resInterceptor);
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return(
                <Auxillary>
                    <Modal show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponnent {...this.props} />
                </Auxillary>
            );
        }
        
    }
}

export default withErrorHandler;