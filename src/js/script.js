const SAVED_EVENT = "saved-todo";
const STORAGE_KEY = "TODO_APPS";
const RENDER_EVENT = "render-todo";
const todos = [];

// Variabel global untuk menyimpan ID yang akan dihapus sementara
let todoIdToDelete = null;

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");

  document.getElementById("date").valueAsDate = new Date();

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }

  // Event Listener untuk Modal
  const modal = document.getElementById("delete-modal");
  const cancelBtn = document.getElementById("cancel-delete");
  const confirmBtn = document.getElementById("confirm-delete");

  // Jika tombol batal diklik
  cancelBtn.addEventListener("click", function () {
    closeModal();
    todoIdToDelete = null;
  });

  // Jika tombol konfirmasi hapus diklik
  confirmBtn.addEventListener("click", function () {
    if (todoIdToDelete !== null) {
      executeDeleteTask(todoIdToDelete);
      closeModal();
      todoIdToDelete = null;
    }
  });

  // Menutup modal jika user klik area gelap di luar modal
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      closeModal();
      todoIdToDelete = null;
    }
  });
});

function addTodo() {
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;
  const generatedID = generateID();

  const todoObject = generateTodoObject(
    generatedID,
    textTodo,
    timestamp,
    false
  );

  todos.push(todoObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();

  document.getElementById("form").reset();
  document.getElementById("date").valueAsDate = new Date();
  showToast("Berhasil menambahkan kegiatan!", "success");
}

function generateID() {
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  return { id, task, timestamp, isCompleted };
}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById("todos");
  const completedTODOList = document.getElementById("completed-todos");

  uncompletedTODOList.innerHTML = "";
  completedTODOList.innerHTML = "";

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted) {
      uncompletedTODOList.append(todoElement);
    } else {
      completedTODOList.append(todoElement);
    }
  }

  if (uncompletedTODOList.children.length === 0) {
    uncompletedTODOList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-mug-hot"></i>
        <p>Tidak ada kegiatan aktif. Santai dulu!</p>
      </div>`;
  }
});

function makeTodo(todoObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = todoObject.task;

  const textTimestamp = document.createElement("p");
  textTimestamp.innerHTML = `<i class="far fa-calendar-alt"></i> ${todoObject.timestamp}`;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  if (todoObject.isCompleted) container.classList.add("completed");

  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  // WRAPPER BUTTON 
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("action-buttons-wrapper");

  if (todoObject.isCompleted) {
    // Tombol Undo
    const undoButton = document.createElement("button");
    undoButton.classList.add("action-btn", "btn-undo");
    undoButton.innerHTML = '<i class="fas fa-undo"></i>';
    undoButton.title = "Kembalikan";

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id);
    });

    // Tombol Hapus 
    const trashButton = document.createElement("button");
    trashButton.classList.add("action-btn", "btn-trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.title = "Hapus Permanen";

    trashButton.addEventListener("click", function () {
      // Panggil fungsi tampilkan modal
      showDeleteModal(todoObject.id);
    });

    
    buttonWrapper.append(undoButton, trashButton);
  } else {
    // Tombol Check (Selesai)
    const checkButton = document.createElement("button");
    checkButton.classList.add("action-btn", "btn-check");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.title = "Tandai Selesai";

    checkButton.addEventListener("click", function () {
      addTaskToCompleted(todoObject.id);
    });

    // Tombol Hapus 
    const trashButton = document.createElement("button");
    trashButton.classList.add("action-btn", "btn-trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.title = "Hapus";
    trashButton.addEventListener("click", function () {
      // Panggil fungsi tampilkan modal
      showDeleteModal(todoObject.id);
    });

    buttonWrapper.append(checkButton, trashButton);
  }

  container.append(buttonWrapper);
  return container;
}

// --- FUNGSI MODAL ---
function showDeleteModal(id) {
  todoIdToDelete = id; 
  const modal = document.getElementById("delete-modal");
  modal.style.display = "flex"; 
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("delete-modal");
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// --- LOGIKA UTAMA ---

function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  showToast("Tugas selesai! Kerja bagus.", "success");
}

// Fungsi dipanggil oleh Modal
function executeDeleteTask(todoId) {
  const todoTarget = findTodoIndex(todoId);
  if (todoTarget === -1) return;

  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  showToast("Tugas berhasil dihapus.", "danger");
}

function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  showToast("Tugas dikembalikan ke aktif.", "success");
}

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) return todoItem;
  }
  return null;
}

function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) return index;
  }
  return -1;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() {
  if (typeof Storage === "undefined") {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast", type);

  const icon =
    type === "success"
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-exclamation-circle"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
