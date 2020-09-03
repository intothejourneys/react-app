내부적으로 필요한 data나 상태들은 상위 component의 state를 통해 관리된다
또한 App의 state는 init의 역할을 하는 것 같다
// 관리를 편하게 하기 위해 리덕스를 공부하자, 또는 리액트 훅스

변경 사항이나 전달해줄 것들은 props를 통해 상위 component에서 하위 component로 전달된다
전달 받은 props의 값은 하위 component 안에서 수정할 수 없다

state나 props 모두 render() 함수를 호출한다

하위 component가 상위 component에 변화를 주기 위해서는 이벤트를 통해 setState를 사용한다