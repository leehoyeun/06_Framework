// console.log("ajax-main.js loaded"); 자바스크립트와 연결이 잘되엇는지 로그로 확인해봄

// HTML상 요소 얻어와서 변수에 저장
// 할 일 개수 관련 요소
const totalCount = document.querySelector("#totalCount");
const completeCount = document.querySelector("#completeCount");
const reloadBtn = document.querySelector("#reloadBtn");
// 할 일 추가 관련 요소
const todoTitle = document.querySelector("#todoTitle");
const todoContent = document.querySelector("#todoContent");
const addBtn = document.querySelector("#addBtn");
// 할 일 목록 조회 관련 요소
const tbody = document.querySelector("#tbody");
// 할 일 상세 조회 관련 요소
const popupLayer = document.querySelector("#popupLayer");
const popupTodoNo = document.querySelector("#popupTodoNo");
const popupTodoTitle = document.querySelector("#popupTodoTitle");
const popupComplete = document.querySelector("#popupComplete");
const popupRegDate = document.querySelector("#popupRegDate");
const popupTodoContent = document.querySelector("#popupTodoContent");
const popupClose = document.querySelector("#popupClose");
// 상세 조회 팝업레이어 관련 버튼 요소
const changeComplete = document.querySelector("#changeComplete");
const updateView = document.querySelector("#updateView");
const deleteBtn = document.querySelector("#deleteBtn");
// 수정 레이어 관련 요소
const updateLayer = document.querySelector("#updateLayer");
const updateTitle = document.querySelector("#updateTitle");
const updateContent = document.querySelector("#updateContent");
const updateBtn = document.querySelector("#updateBtn");
const updateCancel = document.querySelector("#updateCancel");


/* 
fetch()API
비동기 요청을 수행하는 최신 JavaScript API 중 하나.

-promise 는 비동기 작업의 결과를 처리하는 방법중 하나
-> 어떤 결과가 올지는 모르지만 반드시 결과를 보내주겠다는 약속.
-> 비동기 작업이 맞이할 완료 또는 실패와 그 결과값을 나타내는 객체
-> 비동기 작업이 완료되었을 때 실행할 콜백함수를 지정하고,
 해당 작업의 성공 또는 실패 여부를 처리할 수 있도록 함.

promist 객체는 세 가지 상태를 가짐
- pending (대기 중) : 비동기 작업이 완료되지 않은 상태
- fulfilled (이행됨) : 비동기 작업이 성공적으로 완료된 상태
- rejected (거부됨) : 비동기 작업이 실패한 상태
  
  then() 메서드는 promise 객체가 fulfilled 상태일 때 실행할 콜백 함수를 지정하는 메서드
  catch() 메서드는 promise 객체가 rejected 상태일 때 실행할 콜백 함수를 지정하는 메서드
  finally() 메서드는 promise 객체의 상태와 상관없이 실행할 콜백 함수를 지정하는 메서드

  
*/

// 전체 Todo 개수 조회 및 출력하는 함수
function getTotalCount() {//함수 정의

  // 비동기로 서버에 전체 Todo 개수를 조회하는 요청
  // fetch() API 코드 작성

  fetch("/ajax/totalCount",) // 서버로 "ajax/totalCount"로 GET 요청
    // 첫번째 then (응답을 처리하는 역할)
    .then(response => {
      // 응답을 text로 변환하여 반환
      //이 응답(response)을 텍스트 형식으로 변환하는 콜백함
      //매개변수 response : 비동기 요청에 대한 응답이 담긴 객체
      console.log(response); // 응답을 콘솔에 출력

      return response.text(); // text() or json()
    })

    // 두 번째 then (첫번째에서 return (변환)된 데이터를 활용하는 역할)
    .then(result => { // 첫번째 콜백함수가 완료된 후 호출되는 콜백함수
      //변환된 텍스트 데이터(result)를 받아서
      //콘솔에 단순 출력
      // 매개변수 result : 첫번째 콜백함수에서 반환된 Promise 객체의 PromiseResult값
      // == result 매개변수로 받아서 처리
      console.log(result); // 결과를 콘솔에 출력

      // #totalCount인 span 태그의 내용으로 result 값을 대입
      totalCount.innerText = result;

    })

}

// 완료된 할 일 개수 조회 및 출력하는 함수
function getCompleteCount() {

  fetch("/ajax/completeCount") // 서버로 "ajax/completeCount"로 GET 요청
    .then(response => response.text())
    .then(result => {

      //#completCount 요소에 내용으로 result 값 출력
      completeCount.innerText = result; // 완료된 할 일 개수 출력
    });
}

// 새로고침 버튼이 클릭 되었을 때
reloadBtn.addEventListener("click", () => { // 클릭 이벤트 리스너 등록
  // 전체 Todo 개수 조회 함수 호출
  getTotalCount(); // 함수 호출
  // 완료된 Todo 개수 조회 함수 호출
  getCompleteCount(); // 함수 호출

  //전체목록 조회함수도 호출 예정!  
  selectTodoList(); //완료!
});

// 할 일 추가 버튼이 클릭 시 동작
addBtn.addEventListener("click", () => { // 클릭 이벤트 리스너 등록


  if (todoTitle.value.trim().length === 0 || todoContent.value.trim().length === 0) {
    alert("제목이나 내용은 비어있을 수 없습니다!");
  }

  //POST 방식 fetch() 비동기 요청 보내기
  // -요청 주소 : "/ajax/add"
  // -데이터 전달방식 (method) : POST
  // -전달 데이터 : todoTitle값, todoContent값
  //JS <-> jaca
  //JSON (JavaScript object notaion) : 데이터를 표현하는 문법
  //{"name":"홍길동",
  // "age":20,
  // "skil":["javascript","java"]
  //}

  // todoTitle과 todoContent를 저장한 JS 객체 생성
  const param = {
    //key : value
    "todoTitle": todoTitle.value,
    "todoContent": todoContent.value
  }

  fetch("/ajax/add", {
    //key:value
    method: "POST", // POST 방식으로 요청
    headers: { "Content-Type": "application/json" }, // 요청데이터의 형식을 JSON으로 지정
    body: JSON.stringify(param) //param이라는 JS 객체를 JSON(string)으로 변환
  })

    .then(resp => resp.text()) // 반환된 값을 text로 변환
    .then(result => {
      // 첫번째 then()에서 반환된 값을 받아서 result에 저장
      console.log(result); // 결과를 콘솔에 출력

      if (result > 0) { //성공

        alert("추가 성공!!!");

        //추가 성공했다면 작성했던 제목 과 내용은 비워주기
        todoTitle.value = ""; // 제목 입력란 비우기
        todoContent.value = ""; // 내용 입력란 비우기

        //할 일이 새롭게 추가되었으므로
        // 전체 Todo 개수 조회하는 함수 재호출
        getTotalCount(); // 함수 호출

        // -> 전체 Todo 목록을 다시 조회하는 함수도 호출 예정
        selectTodoList(); //완료!!
      }
      else { //실패
        alert("추가 실패..."); // 실패 알림
      }

    });


});


//-----------------------------
//비동기 할 일 전체 목록을 조회하는 함수
const selectTodoList = () => {

  fetch("/ajax/selectList")
    .then(resp => resp.json()) //응답결과를 JSON으로 받음
    .then(todoList => {
      //매개변수 todoList:
      // 첫번째 then 에서 resp.text() / resp.json() 했냐에 따라
      // 단순 텍스트이거나 , JS Objcet 일 수 있음.

      //만약 resp.text() 사용했다면 문자열(JSON이 그대로 노출)
      // ->JSON.parse() 이용하여 JS Object 타입으로 변환 가능
      // ex) console.log(JSON.parse(todoList)); 

      //JSON.parse(JSON 데이터) : string -> JS object
      //-string 형태의 JSON 데이터를 JS Object 타입으로 변환

      //JSON.stringify(JS Object) : JS Object -> string
      //-JS Object 타입을 string 형태의 JSON 데이터로 변환
      console.log(todoList);

      // ------------------------------------------

      // 기존에 출력되어 있던 할 일 목록을 모두 비우기
      tbody.innerHTML = ""; // tbody 요소의 HTML 내용을 비움

      // tbody에 tr/td 요소를 생성해서 내용 추가
      for (let todo of todoList) {
        //tr 태그 생성
        const tr = document.createElement("tr"); //<tr></tr>

        //JS 객체에 존재하는 key 모음 배열 생성
        const arr = ['todoNo', 'todoTitle', 'complete', 'regDate',];

        for (let key of arr) {
          const td = document.createElement("td"); //<td></td>

          // 제목인 경우
          if (key === 'todoTitle') {
            const a = document.createElement("a"); //<a></a> a태그 생성
            a.innerText = todo[key]; // todo['todoTitle'] 값 대입
            a.href = "/ajax/detail?todoNo=" + todo.todoNo; // 상세조회 요청 주소
            td.append(a); // td에 a태그 추가
            tr.append(td); // tr에 td 추가

            //a태그 클릭 시 페이지 이동 막기(비동기 요청 사용을 위해)
            a.addEventListener("click", e => {
              e.preventDefault(); // 기본이벤트 동작 막기

              //할 일 상세 조회 비동기 요6청 함수 호출
              selectTodoList(e.target.href); // 상세조회 요청 주소를 매개변수로 전달

            });

            continue; // 다음 반복으로 넘어감

          }

          // 제목이 아닌 경우
          td.innerText = todo[key]; // todo['todoNo'] , todo['todoTitle'] ... 등등
          tr.append(td); // tr의 마지막요소 현재 td 추가하기
        }

        tbody.append(tr); // tbody에 tr 추가하기


      }











    });
}


//비동기로 할 일 상세 조회하는 함수
// const selectTodo = (url) => {
//   // 매개변수 url == "/ajax/detail?todoNo=1" 형태의 문자열

//   //fetch요청 시 url 이용
// }







selectTodoList(); // 함수 호출
getTotalCount(); // 함수 호출
getCompleteCount(); // 함수 호출