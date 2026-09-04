const สี = ["#667eea", "#f5576c", "#43e97b", "#fa709a", "#30cfd0"];
let i = 0;

document.getElementById("btn").addEventListener("click", () => {
  i = (i + 1) % สี.length;
  document.body.style.background = สี[i];
  document.getElementById("output").textContent = "เปลี่ยนสีแล้ว! " + สี[i];
});
document.getElementById("greet").addEventListener("click", () => {
  const name = document.getElementById("name").value;

  if (name === "") {
    document.getElementById("msg").textContent = "กรอกชื่อก่อนสิครับ 😅";
  } else {
    document.getElementById("msg").textContent = "สวัสดีครับคุณ " + name + "! 👋";
  }
});
document.getElementById("add").addEventListener("click", () => {
  const task = document.getElementById("task").value;

  if (task === "") return;

  const li = document.createElement("li");
  li.textContent = task;

  li.addEventListener("click", () => {
    li.remove();
  });

  document.getElementById("list").appendChild(li);
  document.getElementById("task").value = "";
});