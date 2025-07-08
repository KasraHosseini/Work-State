let btnSet = [document.querySelector(".note-box-btn"), document.querySelector(".timer-box-btn"), document.querySelector(".task-box-btn")];
let timerBtn = [document.querySelector(".play-pause-btn"), document.querySelector(".edit-btn"), document.querySelector(".refresh-btn")];
function AddRemove(target) {
  target.classList.toggle("active");
}
btnSet.map((elem) => {
  document.querySelector(`.${elem.classList[0].replace(/btn/, "cls")}`).addEventListener("click", () => {
    AddRemove(elem);
    AddRemove(document.querySelector(`.${elem.classList[0].replace(/-btn/, "")}`));
  });
  elem.addEventListener("click", () => {
    AddRemove(document.querySelector(`.${elem.classList[0].replace(/-btn/, "")}`));
    AddRemove(elem);
  });
});
let flag = false;
let fst = [25, 00];
let time = fst;
let timerIV;
timerBtn.map((elem) => {
  elem.addEventListener("click", () => {
    switch (elem.classList[0]) {
      case "play-pause-btn":
        AddRemove(elem);
        if (elem.classList[1] == "active") {
          elem.innerHTML = "<i class='fa fa-pause'></i>";
          if (!flag) {
            flag = true;
            time = time[0] * 60 + time[1];
            timerIV = setInterval(() => {
              time--;
              document.querySelector(".timer-time").value = `${Math.trunc(time / 60)}:${time % 60}`;
            }, 1000);
          } else {
            timerIV = setInterval(() => {
              time--;
              document.querySelector(".timer-time").value = `${Math.trunc(time / 60)}:${time % 60}`;
            }, 1000);
          }
        } else {
          elem.innerHTML = "<i class='fa fa-play'></i>";
          clearInterval(timerIV);
        }
        break;
      case "edit-btn":
        AddRemove(elem);
        if (elem.classList[1] == "active") {
          document.querySelector(".timer-time").toggleAttribute("readonly");
        } else {
          flag = false;
          document.querySelector(".timer-time").toggleAttribute("readonly");
          fst = [Number(document.querySelector(".timer-time").value.split(":")[0]), Number(document.querySelector(".timer-time").value.split(":")[1])];
          time = fst;
        }

        break;
      case "refresh-btn":
        document.querySelector(".timer-time").value = `${fst[0]}:${fst[1]}`;
        flag = false;
        time = fst;
    }
  });
});

// let Task = `

//   <button class="complete"><i class="fa fa-circle-check"></i></button>
//   <input type="text" readonly />
//   <div>
//     <button class="edit-task-btn"><i class="fa fa-duotone fa-pencil-alt"></i></button>
//     <button class="del-task-btn"><i class="fa fa-duotone fa-trash-alt"></i></button>
//   </div>

// `;
let taskInput = document.querySelector(".task-input");
let taskBar = document.querySelector(".task-bar");
document.querySelector(".add-task").addEventListener("click", () => {
  let Task = document.createElement("div");
  Task.classList.add("task");
  Task.innerHTML = `
  <button class="complete-task-btn"><i class="fa fa-circle-check"></i></button>
  <input type="text" readonly value="${taskInput.value}" /> 
  <div>
    <button class="edit-task-btn"><i class="fa fa-duotone fa-pencil-alt"></i></button>
    <button class="del-task-btn"><i class="fa fa-duotone fa-trash-alt"></i></button>
  </div>`;
  Task.querySelector(".complete-task-btn").addEventListener("click", () => {
    AddRemove(Task);
  });
  Task.querySelector(".edit-task-btn").addEventListener("click", () => {
    AddRemove(Task.querySelector(".edit-task-btn"));
    AddRemove(Task.querySelector("input"));

    Task.querySelector("input").toggleAttribute("readonly");
  });
  Task.querySelector(".del-task-btn").addEventListener("click", () => {
    Task.remove();
  });
  taskBar.appendChild(Task);
});
