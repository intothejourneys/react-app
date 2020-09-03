import React from 'react';
import './App.css';

class CreateContent extends React.Component { // Crud
    render() {
    // console.log('Content render');
        return (
            <article>
                <h2>Create</h2>
                <form action='create_process' method='POST'
                    // html에 있는 form 태그의 default 기능, 아래의 submit 클릭 시, action이 가리키는 페이지로 이동한다,
                    // 그러나 우리는 리액트를 통하여 페이지 전환 없이(전체 렌더링 없이) 실행할 것이기 때문에 아래의 e.preventDefault()를 사용해 이를 막아줌
                    onSubmit={function(e) { // html에 있는 form 태그의 default 기능, 아래의 submit 클릭 시 이 onSubmit 이벤트가 자동으로 실행된다
                        e.preventDefault();
                        this.props.onSubmit(
                        // debugger;
                            e.target.title.value,
                            e.target.description.value
                        ); // CreateContent에 이벤트로 설치된 onSubmit 함수를 실행
                            
                    }.bind(this)}
                >
                    <p>
                        <input type='text' name='title' placeholder='title'></input>
                    </p>
                    <p>
                        <teatarea name='description' placeholder='description'></teatarea>
                    </p>
                    <p>
                        <input type='submit'></input>
                    </p>
                </form>
            </article>
        );
    }
}

  export default CreateContent.js;