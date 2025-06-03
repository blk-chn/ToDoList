document.getElementById("addTask").addEventListener("click", ()=> {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") return; //空のタスクを防ぐ

    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = taskText;

    //削除ボタン追加
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", ()=> {
        li.remove();
        saveTasks(); //保存処理
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = ""; //入力をクリア

    saveTasks(); //ローカルストレージへ保存
});

//ローカルストレージに保存
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.textContent.replace("削除", "").trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//ローカルストレージから読み込む
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;

        //削除ボタン追加
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.addEventListener("click", ()=> {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

//ページ読み込み時にタスクを表示
document.addEventListener("DOMContentLoaded", loadTasks);