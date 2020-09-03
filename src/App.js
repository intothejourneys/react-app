// 브라우저에 나타나는 화면은 index.html을 실행한 결과이며 // 그 중 id='root' 안에 컴포넌트들이 들어간다
// 실행 소스들은 src 폴더 안에 있는데 // 그 중 index.js가 진입 파일이다
// index.js에서 id 값이 root인 것을 선택 후, App 태그(리액트로 만든 사용자 정의 태그(원래 html에는 없는 태그) 즉, 컴포넌트)를 렌더링하고 있으므로, 
// App.js의 내용들이 최종적으로 화면에 나타난다 // 그 안에서도 App이 최상위의 컴포넌트로 다른 컴포넌트들은 이 안에 포함된다
// App은 스펙과 같다

// JSX // node module인 create react app이 자동으로 컨버팅 해준다(Javascrip 코드로)
// 프로젝트를 만들 때 create react app으로 만들 것

import React from 'react';
// import React, { Component } from 'react'; 이렇게 구조 분해 할당으로 사용하면,
// 아래서 class xxx extends component로만 표시 가능!
import './App.css';
import Subject from './component/Subject';
import TOC from './components/TOC';
import CreateContent from './component/CreateContent';
import ReadContent from './component/ReadContent';
import UpdateContent from './components/UpdateContent';
import Control from './component/Control';

// pure.html의 코드들을 react component화
// 이후 component별로 파일로 분리하는 작업이 필요(components 폴더 생성하여 안에 파일 생성) // 완료
// import, export 신경쓰기

// class App extends React.Component { // 가장 최상위의 리액트 컴포넌트 App
//   render() {
//       return (
//           <div className='App'>
//               <Subject></Subject>
//               <TOC></TOC>
//               <Content></Content>
//           </div>
//       );
//   } // 위에서 제작한 사용자 정의 태그(react component,현재는 파일들로 분리함)들이 App의 render()안에 들어간다
// }   // App이라는 컴포넌트 안의 Subject, TOC, Content라는 하위 컴포넌트들
       // App에서 <Subject title='WEB' subTitle='world wide web!'></Subject>와 같이 하드 코딩하는 것은 효율적이지 않다
       // 따라서 props화 해 준다

       // Subject(하위 컴포넌트)는 App(상위 컴포넌트)가 내려주는 props 값만 받을 수 있고, 그 값의 변경이 불가하므로
       // 따라서 props(title, subTitle)의 값들을 State로 만들고, 그걸 Subject에 props로 전달하면 추후 변경이 가능하다(State 끌어 올리기, 추후 공부)
    
    class App extends React.Component {
        constructor(props) {
            super(props);
            // 초기 값으로 <Subject title='WEB" subTitle="world wide web!"></Subject>의 title="WEB" subTitle="world wide web!"를 설정하기
            // component가 실행될 때 render()보다 먼저 실행되며, constructor() 안에 작성한다
            this.max_content_id = 3; // 현재 contents 데이터의 마지막 엘리먼트의 id // UI에 영향을 줄 이유가 없기 때문에 state를 사용하지 않는다
            this.state = {
                mode: 'welcome', // 'create', 'read', 'update', 'delete' // 기본 선택
                selected_content_id: 2, // 1,3 // 기본 선택
                subject: {title: 'WEB', subTitle: 'world wide web!'},
                welcome: {title: 'Welcome', description: 'Hellom React!'},
                contents: [
                    {id: 1, title: 'HTML', description: 'HTML is ...'},
                    {id: 2, title: 'CSS', description: 'CSS is ...'},
                    {id: 3, title: 'Javascript', description: 'Javascript is ...'}
                ]
            } // State 값의 초기 값
              // 대게 data는 따로 파일에 저장되어 있거나 외부 API를 사용한다
        }
        getReadContent() {
            let i = 0;
                while(i < this.state.contents.length) {
                    let data=this.state.contents[i];
                    if (data.id === this.state.selected_content_id) {
                        return data;
                        // break;
                    }
                    i++;
                }
        }
        getContent() {
            let _title = null;
            let _description = null;
            let _article = null;
            if (this.state.mode === 'welcome') {
                _title = this.state.welcome.title;
                _description = this.state.welcome.description;
                _article = <ReadContent title={_title} description={_description}></ReadContent>;
            }
            else if (this.state.mode === 'read') {
                // let i = 0;
                // while(i < this.state.contents.length) {
                //     let data=this.state.contents[i];
                //     if (data.id === this.state.selected_content_id) {
                //         _title = data.title;
                //         _description = data.description;
                //         break;
                //     }
                //     i++;
                // } // getReadContent 함수로 분리해 줌 // 재 사용 가능하도록
                var _content = this.getReadContent();
                _article = <ReadContent title={_content.title} description={_content.description}></ReadContent>;
            }
            else if (this.state.mode === 'create') {
                _article = <CreateContent onSubmit={function(_title, _description) {
                    // this.state.contents에 새로운 content를 추가
                    // console.log(_title, _description)
                    this.max_content_id = this.max_content_id ++;
                    // this.state.contents.push({
                    //     id: this.max_content_id, title: _title, description: _description

                    // }); // push는 원본 데이터를 변경하기 때문에 쓰지 않는 것이 좋다, concat을 쓸 것(원본 데이터를 변경하지 않음) // 큰 프로그램이 아니면 상관 없다
                    // var _contents = this.state.contents.concat(
                    //     {id: this.max_content_id, title: _title, description: _description}
                    // ) // 아래와 같이 변경
                    var _contents = Array.from(this.state.contents); // 원본을 복사한 새로운 배열 생성 // 원본 바꾸지 않음, 나중에 퍼포먼스를 튜닝할 때 수월함(부모, 자식, 매번 모든 컴포넌트 렌더링 실행 x)
                    _contents.push({id: this.max_content_id, title: _title, description: _description});
                    this.setState({
                        contents: _contents, // 리 렌더링 실행 여부를 개발자가 결정할 수 있도록 특수한 함수 존재 shoudComponentUpdate() // TOC에서 확인
                        mode: 'read', // 이렇게 mode를 read로 해 줌으로 인해,
                                      // TOC에만 새 목록의 제목이 나타나는 것이 아닌, Content에 새 목록의 내용도 나타남
                        id: this.max_content_id
                    }.bind(this))}}
                ></CreateContent>
            }
            else if (this.state.mode === 'update') { // Create와 Read를 합친 것과 비슷하게 작동한다 // 위의 create와 비교해 보자 // 가장 어렵다
                _content = this.getReadContent();
                _article = 
                    <UpdateContent 
                        data={_content} 
                        onSubmit={function(_id, _title, _description) {
                            var _contents = Array.from(this.state.contents);
                            var i = 0;
                            while(i<_contents.length) {
                                if (_contents[i].id === _id) {
                                    _contents[i] ={id: _id, title: _title, description: _description};
                                    break;
                                }
                                i++;
                            }
                            this.setState({
                                contents: _contents,
                                mode: 'read'
                            }.bind(this))}}
                    ></UpdateContent>
            }
            return _article;
        }
        render() {
            // console.log('App render');
            return (
                <div className='App'>
                    {/* 사용자 정의 태그(Subject)에, 사용자 정의 속성(title, subTitle), 사용자 정의 이벤트(onChangePage)를 만듬 */}
                    <Subject
                        title={this.state.subject.title} // 속성의 값의 경로 // Subject.js로 가서 설정해 줌
                        subTitle={this.state.subject.subTitle}
                        onChangePage={function() { // 이벤트 함수 // a 태그 클릭으로 페이지가 바뀔 때 State가 props로 전달되어 Subject에서 실행된다 
                            this.setState({
                                mode: 'welcome'
                            }); // Subject.js로 가서 onClick을 설정해 줌
                        }.bind(this)}
                        >
                    </Subject>
                    {/* 이벤트 실행
                        Subject component의 a 태그 클릭 시, App의 State를 변경하는 것이 원래의 목적이나(State 끌어 올리기, 추후 개선),
                        일단은 위처럼 Subject component 부분을 주석 처리하고, 아래처럼 Subject 안의 내용을 App에 직접 가져와 상세 경로만 변경해 사용*/}
                    {/* <header>
                        <h1>
                            <a href='/' onClick={function(e) { // onClick 이벤트, 함수의 첫번째 매개 변수의 값을 e
                            console.log(e);
                            e.preventDefault(); // 해당 태그(여기선 a)의 default(기본) 동작을 방지
                                                // 즉 여기서는, 링크 클릭 후 뜬 alert 창을 닫을 시, a 태그의 기본 동작에 의해 페이지 전체가 재 로딩되는 것을 방지해 준다
                            // alert('Hello')}} // 클릭시 실행할 동작 예시
                            // debugger;
                            // this.state.mode= 'welcome'; // 클릭시 실행할 동작, App의 mode 값을 변경하는 것이 목적
                            // 그러나 이 코드에는 두가지 문제가 있는데,
                            // 1. 이벤트 실행으로 호출되는 함수의 this에는 아무 값도 세팅되어있지 않다 - 함수 뒤에 bind(this)를 해주어야 한다, 그럼 해당 component가 this가 가리키는 값이 된다
                            // 2. 이렇게 직접 State를 변경해 줄 수 없다(constructor에서만 가능), 그러므로 아래처럼 setState() 사용
                            this.setState({
                                mode: 'welcome'
                            })}.bind(this)} // App을 이 메소드의 this에 대입
                            >{this.state.subject.title}</a>
                        </h1>
                        {this.state.subject.subTitle}
                    </header> */}
                    <TOC
                        onChangePage={function(id) { // TOC 부분의 목록 클릭에 따라 해당 내용이 Content에 뜨게 하는 것
                            this.setState=({
                                mode: 'read',
                                selected_content_id: Number(id)
                            }); // TOC.js로 가서 onClick을 설정해 줌 // id의 기본 설정이 문자열이므로 숫자로 변경
                        }.bind(this)}
                        data={this.state.contents} // TOC.js로 가서 data를 설정해 줌
                    >
                    </TOC>
                    <Control onChangeMode={function(_mode) {
                        if (_mode === 'delete') { // 삭제
                            if (window.confirm('정말 삭제하시겠습니까?')) {
                                var _contents = Array.from(this.state.contents);
                                var i = 0;
                                while (i<_contents.length) {
                                    if (_contents[i].id === this.state.selected_content_id) {
                                        _contents.splice(i,1);
                                        break; // while 이므로
                                    }
                                    i++;
                                }
                                this.setState({ // 삭제 후 상태 변경
                                    mode: 'welcome',
                                    contents: _contents
                                })
                                alert('삭제되었습니다');
                            }
                        }
                        else { // 페이지 전환
                            this.setState({
                                mode: _mode
                            });
                        }
                    }.bind(this)}
                    ></Control>
                    {/* <CreateContent></CreateContent>
                    <ReadContent title={_title} description={_description}></ReadContent> */}
                    {this.getContent()}
                </div>
            ); // 여기 App 안에 표시된 하위 컴포넌트와 파일로 따로 저장된 실제 하위 컴포넌트간의 작동 연관성을 파악해야 겠다 
               // 이벤트 강의 7~8 이후부터는 어려워서 완벽히 이해하지는 못했다, 하면서 알아가야지
        }
    }

// 위의 사용자 정의 태그(react component)들은 현재 모두 정적(static)인 상태
// 동적(dynamic)으로 만들기 위해서는

// ex)

// App의 Subject 태그 안에 props와 내용을 추가
// <Subject title='WEB' subTitle='world wide web!'></Subject>

// Subject component에 해당 props로 주어진 항목을 생성
// <header>
//    <h1>{this.props.title}</h1>
//       {this.props.subTitle}
// </header>

// App에 다른 내용의 Subject 태그를 추가할 수 있다
// <Subject title='React' subTitle='what a cool library'></Subject>

// App으로부터 props를 내려 받아 서로 다른 결과를 만들어 내는(재 사용이 가능한) 똑똑한 react component 엘리먼트를 생성!
// props는 상위 컴포넌트에서 하위 컴포넌트로만 이동하며, 실행 주체는 하위 컴포넌트? 드러나는건 상위 컴포넌트
// 하위 컴포넌트의 내용이 상위 컴포넌트 아래 들어가 있다(크롬 콘솔 element 창에서 확인, JSX -< javascript)
// React developers tool을 설치 후 크롬 콘솔 창에서 React를 선택해서 보면 편하다(JSX)

// props는 컴포넌트의 외부에 존재하며, 컴포넌트의 사용자에게 중요한 정보이다(props를 이용해 컴포넌트를 조작할 수 있다)
// State는 컴포넌트의 내부에 존재하여, 사용자는 알 필요가 없는 것

// 컴포넌트를 사용하는 외부의 props와 / props에 따라서 컴포넌트를 실제로 구현하는 내부의 State
// 이 둘은 철저히 분리되어야 한다 / 제품의 외부와 내부처럼

export default App;
