// 유저가 값을 입력한다
// + 버튼을 누르면 > 할 일이 추가된다 / 어디에? 할 일 리스트에
// delete 버튼을 누르면 > 할 일이 삭제된다
// check 버튼을 누르면 > 할 일이 끝나면서 취소선이 생긴다
// > 1. check 버튼을 클릭하면, true or false
// > 2. true 상태라면, Done상태로 간주, 배경색 변경과 취소선
// > 3. false 상태라면, In Progress 상태이므로 그대로

// 진행중, 완료 탭을 누르면 > 언더바가 이동한다
// 진행중 탭은 > 진행 중인 아이템만 , 완료 탭은 > 완료된 아이템만
// 전체 탭을 누르면 > 다시 전체 아이템으로 돌아온다

let taskInput = document.getElementById("task_input");
let addButton = document.getElementById("add_button");
let taskList = [];
addButton.addEventListener("click", addTask);

function addTask() {
  // let taskContent = taskInput.value;  // 이것은 스트링타입이다. 하나의 정보만을 담을 수 있는 변수이기에 아래처럼 task 라는 객체로 바꾸어줄 것임
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }
  taskList.push(task);
  console.log(taskList);
  render()
} // 강의에서는 let taskContent = taskInput.value 선언하였는데.. 꼭 해야하나?

function render() { //taskList를 화면에 그려주는 함수
  let resultHTML = ``;
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML +=
        `
        <div class="task">
          <div class="task_done">
            ${taskList[i].taskContent}
          </div>
          <div>
            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
          </div>
        </div>
      `
    } else {
      resultHTML +=
        `
      <div class="task">
        <div>
          ${taskList[i].taskContent}
        </div>
        <div>
          <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
          <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
      </div>
    `
    }
  }
  document.getElementById("task_board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete
      render()
      break;
    }
  }
}

console.log(taskList)

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (id == taskList[i].id) {
      taskList.splice(i, 1);
      break;
    }
  }
  console.log(taskList)
}

function randomIDGenerate() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
}