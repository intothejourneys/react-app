import React from 'react';
import './App.css';

class Control extends React.Component { // CRUD
    render() { 
        return (
            <ul>
                <li>
                    <a href='/create' onClick={function(e) {
                        e.preventDefault();
                        this.props.onChangeMode('create');
                    }.bind(this)}
                    >create</a>
                </li>
                <li>
                    <a href='/update' onClick={function(e) {
                        e.preventDefault();
                        this.props.onChangeMode('update');
                    }.bind(this)}
                    >update</a>
                </li>
                <li>
                    <input onClick={function(e) {
                        e.preventDefault();
                        this.props.onChangeMode('delete');
                    }.bind(this)} type='button' value='delete'
                    ></input>
                </li>
            </ul>
            // create와 update는 클릭시 링크를 타고 페이지(?)로 넘어가 처리가 실행되지만, delete는 바로 실행된다
        );
    }
  }

  export default Control;