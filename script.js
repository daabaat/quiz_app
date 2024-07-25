const quizData = [
  {
    question: "뉴진스 멤버가 아닌것은?",
    a: "하니",
    b: "민지",
    c: "원영",
    d: "혜인",
    correct: "c",
  },
  {
    question: "자바스크립트에서 함수 선언식의 예시는 무엇인가요?",
    a: "let myFunction = function() {}",
    b: "function myFunction() {}",
    c: "const myFunction = () => {}",
    d: "myFunction() => {}",
    correct: "b",
  },
  {
    question: "정답은c",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    correct: "c",
  },
  {
    question: "정답은d",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    correct: "d",
  },
];

//1. getElementByid로 보기,문제,버튼 태그 가져오기
//2. querySelectorAll로 라디오버튼 가져오기

// 라디오
const answerEls = document.querySelectorAll(".answer");
// 문제
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const div = document.getElementById("quiz");
// 버튼
const submitBtn = document.getElementById("submit");

//3. 화면에 첫번째 문제의 보기와 제목을 보여주기
// 문제를 보여주는 코드를 함수로 묶어서 만들기
let currentQuiz = 0;
// 점수
let score = 0;
// 첫번째 문제 출력
loadQuiz();

function loadQuiz() {
  const currentQuizData = quizData[currentQuiz];
  // 태그에 질문값 넣기
  questionEl.textContent = currentQuizData.question;
  a_text.textContent = currentQuizData.a;
  b_text.textContent = currentQuizData.b;
  c_text.textContent = currentQuizData.c;
  d_text.textContent = currentQuizData.d;
}

// 선택된 라디오 태그의 id값 가져오기
function getSelected() {
  let answer;

  answerEls.forEach((el) => {
    // el은 input태그
    // input태그에 checked 속성이 true라면
    // 태그의 id값을 answer에 넣기.
    if (el.checked) {
      answer = el.id;
    }
  });
  return answer;
}

// 체크 속성 초기화

function deselect() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

//4. 버튼을 클릭했을때 다음문제로 넘어가기
submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  //   선택된 id값이 존재한다면 실행
  if (answer) {
    // 선택한 값이 정답과 일치한다면
    if (answer === quizData[currentQuiz].correct) {
      // 점수 1점 추가
      score++;
    }
    //   문제 인덱스 1 추가
    //  퀴즈 불러오기 함수 호출
    currentQuiz++;
    deselect();
    // 문제 개수가 인덱스값보다 크다면
    if (currentQuiz < quizData.length) {
      loadQuiz();
    }
    // 문제를 다 풀었을 때 .
    else {
      div.innerHTML = `<h2>총 ${score}/${quizData.length}개 맞추셨습니다.</h2>
      <button onclick="location.reload()">다시하기</button>`;
    }
  }
});

//5. 선택된 input의 id값과 문제객체의 정답이 일치하는지 비교
//6. 문제를 다풀고나면 맞춘문제/전체문제 알려주기
//7. 재시작버튼을 누르면 처음으로 돌아가기
