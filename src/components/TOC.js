import React from 'react';
import './App.css';

class TOC extends React.Component { // Table of Content 목차!
    shouldComponentUpdate(newProps, newState){ // render 함수보다 먼저 호출되어 리 렌더링 여부를 결정 // return값이 false이면 render 함수는 호출되지 않는다
        // console.log('shouldComponentUpdate',
        //  newProps.data, // 바뀐 데이터
        //  this.props.data // 원본(현재) 데이터
        //  )
        // 이 기능 사용하려면 https://youtu.be/SkTUocMjXTg 보기
        if (this.props.data === newProps.data) {
            return false; // render 함수 비 호출
        }
        return true; // render 함수 호출
    }
    render() {
    // console.log('TOC render');
        const data = this.props.data;
        const list = [];
        let i = 0;
        while(i < data.length) {
            list.push(
                <li key={data[i].id}>
                    <a href={'/contents/'+data[i].id}>
                    onClick={function(id, e) {
                        // debugger; // 이 것을 통해 해당 태그(여기서는 e, 즉 이벤트 객체)의 구성 요소, 가지고 있는 메소드 등을 확인할 수 있다
                        e.preventDefault();
                        this.props.onChangePage(e.target.dataset.id); // 여기서의 props는 App의 render()의 TOC 태그 안의 함수
                                                                      // 이 함수를 여기서 실행()시킨다
                                                                      // 여기서 e 태그가 가진 target 메소드는 e가 속한 태그(여기서는 a)를 가리킨다
                    }.bind(this, data[i].id)}
                    {data[i].title}
                    </a>
                </li>);
            i++;
        } // 엘리먼트가 여러개이고 자동으로 생성되는 경우, key 값이 꼭 필요하다
          // a href는 링크(경로)를 나타내는 부분
          // App에서 data의 목록이 변경될 때마다, 적용을 위해 여기서 수작업으로 변경해 줄 필요 없이..
          // App에서 data의 state를 props로 내려주면, 여기서 자동으로 인식하고 변경할 수 있도록..
          // App이 주체지만 어쨌든 처리 및 실행은 이러한 하위 컴포넌트들에서 일어나니까..
          // App은 그 과정을 알 필요가 없다, 사용자의 입장에서만 알면 된다(data 전달)

          // 하나라도 변경될 때마다 저 과정(반복문)이 다 실행되어야 하나? 뒤에 또 나오겠지?

        return (
            <nav>
                <ul>
                    <li><a href='1.html'>HTML</a></li>
                    <li><a href='2.html'>CSS</a></li>
                    <li><a href='3.html'>Javascript</a></li>
                </ul>
            </nav>
        );
    }
  }

  export default TOC;