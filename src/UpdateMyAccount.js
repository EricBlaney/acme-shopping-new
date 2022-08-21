import React from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser, exchangeToken} from './store'

class UpdateMyAccount extends React.Component{
    constructor(){
        super();
        this.state = {
            id: '',
          username: '',
          email: '',
          street: '',
          city: '',
          zipcode: '',
          avatar: ''
        };
        this.onChange = this.onChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
      }
    componentDidMount() {
        this.el.addEventListener('change', (ev) => {
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({avatar: reader.result})
            });
            reader.readAsDataURL(file);
        })
        try{
            this.props.exchangeToken();
        }
        catch(ex){
            console.log(ex);
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.auth.id !== prevState.id){
        return { id: nextProps.auth.id,
        username: nextProps.auth.username, 
        email: nextProps.auth.email,
        street: nextProps.auth.street || '',
        city: nextProps.auth.city || '',
        zipcode: nextProps.auth.zipcode || '',
        avatar: nextProps.auth.avatar  || ''
        };
        }
        else return null;
      }
    onChange(ev){
        this.setState({ [ev.target.name]: ev.target.value });
      }
    updateUser(ev) {
        ev.preventDefault();
        this.props.updateUser(this.state);
        
    }
    render() {
        const {updateUser, onChange} = this;
        const {avatar, username, email, street, city, zipcode} = this.state;
        
        return(
            <form onSubmit={ updateUser }>
            Update {this.state.username}'s details: <br></br>
            Avatar: 
            <input type='file' ref={ el => this.el = el }/>
            { avatar ? <img src={avatar} className="avatar"/> : null}
            Username: 
            <input name='username' onChange={ onChange } value={ username }/>
            Email:
            <input name='email' onChange={ onChange } value={ email }/>
            Street Address:
            <input name='street' onChange={ onChange } value={ street }/>
            City:
            <input name='city' onChange={ onChange } value={ city }/>
            Zipcode:
            <input name='zipcode' onChange={ onChange } value={ zipcode }/>
            <button type="submit" disabled={!username || !email}>Update</button> 
          </form>
        )
    }
}

const mapState = (state) => {
    
    return {
        auth: state.auth
    }
}

const mapDispatch = (dispatch) => {
    return{
        exchangeToken: () => dispatch(exchangeToken()),
        updateUser: (user) =>  dispatch(updateUser(user)),
        deleteUser: (user) => dispatch(deleteUser(user))
    }
}

export default connect(mapState, mapDispatch)(UpdateMyAccount);