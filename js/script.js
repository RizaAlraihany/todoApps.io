const SAVED_EVENT = "saved-todo";
const STORAGE_KEY = "TODO_APPS";

// Menjalankan kode ini setelah seluruh DOM terisi penuh
document.addEventListener("DOMContentLoaded", function () {
  // Mengambil elemen form dengan id 'form'
  const submitForm = document.getElementById("form");

  // Menambahkan event listener pada form untuk mendengarkan event submit
  submitForm.addEventListener("submit", function (event) {
    alert("list kamu telah berhasil di tambahkan");
    // Mencegah form dari pengiriman secara default
    event.preventDefault();
    // Memanggil fungsi addTodo untuk menambahkan todo baru
    addTodo();
  });
});

// Fungsi untuk menambahkan todo baru
function addTodo() {
  // Mengambil nilai dari input dengan id 'title'
  const textTodo = document.getElementById("title").value;
  // Mengambil nilai dari input dengan id 'date'
  const timestampt = document.getElementById("date").value;

  // Menghasilkan ID baru untuk todo yang akan ditambahkan
  const generatedID = generateID();

  // Membuat objek todo baru
  const todoObject = generateTodoObject(
    generatedID,
    textTodo,
    timestampt,
    false // Status isCompleted diatur ke false (belum selesai)
  );

  // Menambahkan todo baru ke dalam array todos
  todos.push(todoObject);

  // Mengirimkan event untuk merender todo ke tampilan
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Fungsi untuk menghasilkan ID unik berdasarkan timestamp saat ini
function generateID() {
  return +new Date(); // Mengembalikan timestamp sebagai ID
}

// Fungsi untuk membuat objek todo
function generateTodoObject(id, task, timestampt, isCompleted) {
  return {
    id, // ID dari todo
    task, // Teks dari todo
    timestampt, // Timestamp dari todo
    isCompleted, // Status penyelesaian todo
  };
}

// Array untuk menyimpan daftar todos
const todos = [];
// Konstanta untuk mendefinisikan event render
const RENDER_EVENT = "render-todo";

// Menambahkan event listener untuk mendengarkan event RENDER_EVENT
document.addEventListener(RENDER_EVENT, function () {
  // Menampilkan daftar todos di konsol setiap kali event render terjadi
  console.log(todos);

  // Mengambil elemen untuk daftar todo yang belum selesai
  const uncompletedTODOList = document.getElementById("todos");
  // Mengosongkan konten dari elemen daftar todo yang belum selesai
  uncompletedTODOList.innerHTML = "";

  // Mengambil elemen untuk daftar todo yang sudah selesai
  const completedTODOList = document.getElementById("completed-todos");
  // Mengosongkan konten dari elemen daftar todo yang sudah selesai
  completedTODOList.innerHTML = "";

  // Melakukan iterasi melalui setiap item todo dalam array todos
  for (const todoItem of todos) {
    // Membuat elemen todo untuk setiap item
    const todoElement = makeTodo(todoItem);

    // Memeriksa apakah todo belum selesai
    if (!todoItem.isCompleted) {
      // Menambahkan elemen todo yang belum selesai ke dalam daftar yang sesuai
      uncompletedTODOList.append(todoElement);
    } else {
      // Menambahkan elemen todo yang sudah selesai ke dalam daftar yang sesuai
      completedTODOList.append(todoElement);
    }
  }
});

function makeTodo(todoObject) {
  // Membuat elemen <h2> untuk menampilkan judul tugas
  const textTitle = document.createElement("h2");
  // Mengatur konten HTML dari elemen judul dengan tugas dari objek todo
  textTitle.innerHTML = todoObject.task;

  // Membuat elemen <p> untuk menampilkan timestamp
  const textTimestampt = document.createElement("p");
  // Mengatur konten HTML dari elemen timestamp dengan waktu dari objek todo
  textTimestampt.innerHTML = todoObject.timestampt;

  // Membuat elemen <div> sebagai wadah untuk judul dan timestamp
  const textContainer = document.createElement("div");
  // Menambahkan kelas 'inner' untuk styling
  textContainer.classList.add("inner");
  // Menambahkan elemen judul dan timestamp ke dalam wadah
  textContainer.append(textTitle, textTimestampt);

  // Membuat elemen <div> utama untuk item todo
  const container = document.createElement("div");
  // Menambahkan kelas 'item' dan 'shadow' untuk styling
  container.classList.add("item", "shadow");
  // Menambahkan wadah judul dan timestamp ke dalam elemen utama
  container.append(textContainer);
  // Mengatur atribut id untuk elemen utama berdasarkan id dari objek todo
  container.setAttribute("id", `todo-${todoObject.id}`);

  // Memeriksa apakah todo sudah selesai
  if (todoObject.isCompleted) {
    // Membuat tombol untuk mengembalikan todo ke status belum selesai
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button"); // Menambahkan kelas untuk styling

    // Menambahkan event listener untuk tombol undo
    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id); // Memanggil fungsi untuk mengembalikan todo
    });

    // Membuat tombol untuk menghapus todo
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button"); // Menambahkan kelas untuk styling

    // Menambahkan event listener untuk tombol trash
    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(todoObject.id); // Memanggil fungsi untuk menghapus todo
    });

    // Menambahkan tombol undo dan trash ke dalam elemen utama
    container.append(undoButton, trashButton);
  } else {
    // Jika todo belum selesai, membuat tombol untuk menandai sebagai selesai
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button"); // Menambahkan kelas untuk styling

    // Menambahkan event listener untuk tombol check
    checkButton.addEventListener("click", function () {
      addTaskToCompleted(todoObject.id); // Memanggil fungsi untuk menandai todo sebagai selesai
    });

    // Menambahkan tombol check ke dalam elemen utama
    container.append(checkButton);
  }

  // Mengembalikan elemen utama yang telah dibuat
  return container;
}
// Fungsi untuk menandai todo sebagai selesai
function addTaskToCompleted(todoId) {
  // Mencari todo berdasarkan ID
  const todoTarget = findTodo(todoId);

  // Jika todo tidak ditemukan, keluar dari fungsi
  if (todoTarget == null) return;

  // Mengubah status isCompleted menjadi true
  todoTarget.isCompleted = true;
  // Mengirimkan event untuk merender ulang tampilan
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Fungsi untuk mencari todo berdasarkan ID
function findTodo(todoId) {
  // Melakukan iterasi melalui setiap item todo dalam array todos
  for (const todoItem of todos) {
    // Jika ID todo cocok, kembalikan todo tersebut
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  // Jika tidak ditemukan, kembalikan null
  return null;
}

// Fungsi untuk menghapus todo dari daftar yang sudah selesai
function removeTaskFromCompleted(todoId) {
  // Mencari indeks todo berdasarkan ID
  const todoTarget = findTodoIndex(todoId);

  // Jika todo tidak ditemukan (indeks -1), keluar dari fungsi
  if (todoTarget === -1) return;

  // Menghapus todo dari array todos berdasarkan indeks
  todos.splice(todoTarget, 1);
  // Mengirimkan event untuk merender ulang tampilan
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Fungsi untuk mengembalikan todo ke status belum selesai
function undoTaskFromCompleted(todoId) {
  // Mencari todo berdasarkan ID
  const todoTarget = findTodo(todoId);

  // Jika todo tidak ditemukan, keluar dari fungsi
  if (todoTarget == null) return;

  // Mengubah status isCompleted menjadi false
  todoTarget.isCompleted = false;
  // Mengirimkan event untuk merender ulang tampilan
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Fungsi untuk mencari indeks todo berdasarkan ID
function findTodoIndex(todoId) {
  // Melakukan iterasi melalui setiap item todo dalam array todos
  for (const index in todos) {
    // Jika ID todo cocok, kembalikan indeksnya
    if (todos[index].id === todoId) {
      return index;
    }
  }
  // Jika tidak ditemukan, kembalikan -1
  return -1;
}
// Menambahkan event listener untuk mendengarkan event RENDER_EVENT
document.addEventListener(RENDER_EVENT, function () {
  // mengambil element container dari TODO
  const uncompletedTODOList = document.getElementById("todos");
  uncompletedTODOList.innerHTML = "";
  // Mengosongkan konten dari elemen daftar todo

  // Melakukan iterasi melalui setiap item todo dalam array todos
  for (const todoItem of todos) {
    // Membuat elemen todo untuk setiap item
    const todoElement = makeTodo(todoItem);

    if (!todoItem.isCompleted) {
      uncompletedTODOList.append(todoElement);
    }
  }
});

function saveData() {
  if (isStorageExist) {
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

document.addEventListener("SAVED_EVENT", function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

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

document.addEventListener("DOMContentLoaded", function () {
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
