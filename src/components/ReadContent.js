import React from 'react';
import './App.css';

class ReadContent extends React.Component { // cRud
    render() {
    // console.log('Content render');
        return (
            <article>
                <h2>{this.props.title}</h2>
                {this.props.decsription}
            </article>
        );
    }
}

  export default ReadContent.js;