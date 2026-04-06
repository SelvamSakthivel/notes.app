const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");
const message = document.getElementById("message");

let notes = [];

// Load Notes
function loadNotes() {
    const data = localStorage.getItem("notesApp");
    notes = data ? JSON.parse(data) : [];
    displayNotes();
}

// Save Notes
function saveNotes() {
    localStorage.setItem("notesApp", JSON.stringify(notes));
}

// Add Note
function addNote() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        message.textContent = "Title and Content required!";
        message.style.color = "red";
        return;
    }

    const note = {
        id: Date.now(),
        title,
        content,
        timestamp: new Date().toLocaleString()
    };

    notes.push(note);
    saveNotes();
    displayNotes();

    titleInput.value = "";
    contentInput.value = "";

    message.textContent = "Note added successfully!";
    message.style.color = "green";
}

// Display Notes
function displayNotes() {
    notesContainer.innerHTML = "";

    if (notes.length === 0) {
        notesContainer.innerHTML = "<p>No notes yet!</p>";
        return;
    }

    notes.slice().reverse().forEach(note => {
        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content.length > 100 
                ? note.content.substring(0,100) + "..." 
                : note.content}</p>
            <small>${note.timestamp}</small><br>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
        `;

        notesContainer.appendChild(div);
    });
}

// Delete Note
function deleteNote(id) {
    if (!confirm("Delete this note?")) return;

    notes = notes.filter(note => note.id !== id);
    saveNotes();
    displayNotes();
}

// Event Listener
addBtn.addEventListener("click", addNote);

// Init
loadNotes();