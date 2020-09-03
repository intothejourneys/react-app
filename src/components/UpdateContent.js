import React from 'react';
import './App.css';

class UpdateContent extends React.Component { // crUd
    constructor(props) {
        super(props);
        this.state={
            id: this.props.data.id,
            title: this.props.data.title,
            description: this.props.data.description
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e) {
        this.setState({[e.target.name]: e.target.value}); // 이렇게 밖에 하나씩 함수를 분리해가며, 전체 코드를 간결화해 가는 것
    }
    render() {
    // console.log(this.props.data);
    // console.log('UpdateContent render');
        return (
            <article>
                <h2>Update</h2>
                <form action='create_process' method='POST'
                    onSubmit={function(e) {
                        e.preventDefault();
                        this.props.onSubmit(
                            this.state.id, // e.target.id.value,
                            this.state.title, // e.target.title.value,
                            this.state.description // e.target.description.value
                        );        
                    }.bind(this)}>
                    <input type='hidden' name='id' value={this.state.id}></input>
                    <p>
                        <input 
                            type='text' 
                            name='title' 
                            placeholder='title'
                            value={this.state.title} // 현재는 state를 변경하지 못하고 받아올 수만 있는 상태(read only), 따라서 아래와 같이
                            onChange={this.inputFormHandler}
                            // console.log(e.target.value);
                        ></input>
                    </p>
                    <p>
                        <teatarea 
                            name='description'
                            placeholder='description'
                            value={this.state.description}
                            onChange={this.inputFormHandler}
                            // console.log(e.target.value);
                        ></teatarea>
                    </p>
                    <p>
                        <input 
                            type='submit'
                        ></input>
                    </p>
                </form>
            </article>
        );
    }
}

  export default UpdateContent.js;