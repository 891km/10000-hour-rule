const $inputGoal = document.getElementById("input-goal");
const $inputHour = document.getElementById("input-hour");
const $submitBtn = document.getElementById("submit-btn");
const $sectionOutput = document.querySelector(".goal-output");
const $outputGoal = document.getElementById("output-goal");
const $outputHour = document.getElementById("output-hour");

$submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const goal = $inputGoal.value;
  const hour = $inputHour.value * 1;

  // 입력값 검증
  if (!goal) {
    alert("훈련 목표를 입력해주세요");
    $inputGoal.focus();
    return;
  }

  if (!hour || hour <= 0 || hour > 24) {
    alert("0 ~ 24 사이의 올바른 시간을 입력해주세요");
    $inputHour.focus();
    return;
  }

  // 출력
  $sectionOutput.scrollIntoView({ behavior: "smooth" });
  updateOutput($outputGoal, goal);
  updateOutput($outputHour, Math.ceil(10000 / hour));

  // 입력 초기화
  $inputGoal.value = "";
  $inputHour.value = "";
});

function updateOutput(element, content) {
  element.classList.remove("entered");
  element.style.transition = "";

  setTimeout(() => {
    element.textContent = content;
    element.classList.add("entered");
    element.style.transition = "all 1s";

    // transition이 끝났을 때 제거
    element.addEventListener("transitionend", removeTransition);
  }, 300);
}

function removeTransition(e) {
  e.target.style.transition = "";
  e.target.removeEventListener("transitionend", removeTransition);
}
