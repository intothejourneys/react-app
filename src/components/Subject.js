import React from 'react';
import './App.css';

class Subject extends React.Component { // 주제!
    render() { 
    // console.log('Subject render');
    // component 안에는 여러가지 내용들이 들어갈 수 있지만, render 메소드는 반드시 필요하다
    // function render() //메소드이지만 class 안의 함수는 function 생략 가능하다
        return (
            <header>
                <h1><a href="/" onClick={function(e) { // 할당된 라우터 주소가 없는 가장 기본 페이지, onClick을 하면
                    e.preventDefault(); // 기본 기능 방지
                    this.props.onChangePage() // onChangePage 함수를 props로 전달받아 실행 
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.subTitle}
                {/* title과 subTitle 표시 */}
            </header>
            // 컴포넌트는 하나의 최상위 태그만 사용해야 한다, 여기서는 header 태그
        );
    }
  }

  export default Subject;

  // props, state, event가 함께 dynamic을 만든다

  // Subject의 title 클릭 시, Content에 Subject의 subTitle의 값이 출력되게 만들기
  // TOC의 title 클릭 시, Content에 해당 title의 contents의 값이 출력되게 만들기

  // props나 state가 바뀌면 state를 가지고 있는 component(App)의 render 함수가 다시 호출 된다
  // 그 render 함수 하위에 있는 component들(Subject, TOC, Content) 각자가 가지고 있는 render 함수들도 다시 호출 된다
  // 즉 브라우저 화면이 다시 그려지게 된다

  // App의 this.state 안에 모드를 분리 // App의 render() 안에서 조건문으로 렌더링 및 출력
  // 하위 컴포넌트들의 리 렌더 여부와는 상관 없음(하위 컴포넌트들은 모두 리 렌더링) 및 출력
  // 초기 값은 App의 this.state다, 그걸 시작으로 변경

  // Subject ex)

  // Subject의 title 부분의 코드를 a href를 통해 링크화 한다
  // 링크에 이벤트를 설치한다
  // Subject의 title을 클릭 시 App의 state가 바뀌고, 바뀐 state가 props의 값으로 Content에 전달되어,
  // Content에 subTitle의 값이 출력된다(변경된다)
  