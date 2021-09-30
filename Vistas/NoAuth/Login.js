//import liraries
import React, { Component } from 'react';
import { View, Text, Button,KeyboardAvoidingView,ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import LoginForm from '../Forms/LoginForm';
import styles from '../styles';
// create a component
class Login extends Component {
    constructor(props){
        super(props);
        this.state  = {
            autenticado: false,
            tipoUsuasrio: '',
        }
    }

    render() {
        const { navigation,login } = this.props;
        return (<View style={{flex:1, justifyContent:'center'}}>
            <KeyboardAvoidingView behavior="position">
                <View>
                    <LoginForm login={login} navigation={navigation}/>
                </View>
            </KeyboardAvoidingView>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        autenticado: state.autenticado
    }
}

const mapDispatchToProps = dispatch => ({
    login: (values) => {
        dispatch({ type: 'LOGIN',values})
    },
});


//make this component available to the app
export default connect(mapStateToProps,mapDispatchToProps)(Login);