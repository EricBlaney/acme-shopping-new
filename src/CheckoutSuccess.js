import React, { Component } from 'react';
import { Button, Result } from 'antd';
import { connect } from 'react-redux'
import { checkout, deleteCart, fetchCart, updateQuantity } from './store'

let timer;

class CheckoutSuccess extends Component {
    state = {
        seconds: 10
    }

    componentDidMount() {
        this.props.cart.lineItems.forEach(item => this.props.updateQuantity(item.product, 0));

        timer = setInterval(() => {
            this.setState(prevState => {
                if(prevState.seconds > 0) {
                    return {
                        seconds: prevState.seconds - 1
                    };
                } else {
                    this.toLandingpage();
                  return {
                    seconds: 0
                    };
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    toLandingpage = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <Result
                status = "success"
                title="Successfully Purchased Products!"
                subTitle = {`The page will automatically jump after ${this.state.seconds} seconds, please wait.`}
                extra={[
                    <Button type="primary" key="console" onClick={this.toLandingpage}>
                        Go Back To Landing Page
                    </Button>
                ]}
            />
        )
    }
}

const mapDispatch = (dispatch)=> {
    return {
        updateQuantity: (product, num)=> dispatch(updateQuantity(product, num))
    };
};

export default connect(state => state, mapDispatch)(CheckoutSuccess);
