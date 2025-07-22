const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const notesList = document.getElementById('notesList');

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    noteContentInput.value += transcript;
  };
}

function saveNote() {
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();

  if (!title && !content) {
    alert("Please enter a title or some content.");
    return;
  }

  const timestamp = new Date().toLocaleString(); // Get current time

  const note = {
    title,
    content,
    timestamp
  };

  displayNote(note);
  noteTitleInput.value = '';
  noteContentInput.value = '';
}

function displayNote(note) {
  const li = document.createElement('li');

  li.innerHTML = `
    <strong>${note.title}</strong>
    <span class="timestamp">🕒 ${note.timestamp}</span>
    <textarea readonly>${note.content}</textarea>
    <br>
    <button class="edit-btn">✏️ Edit</button>
    <button class="delete-btn">🗑️ Delete</button>
  `;

  const editBtn = li.querySelector('.edit-btn');
  const deleteBtn = li.querySelector('.delete-btn');
  const textArea = li.querySelector('textarea');

  editBtn.onclick = () => {
    if (editBtn.textContent.includes('Edit')) {
      textArea.removeAttribute('readonly');
      textArea.focus();
      editBtn.textContent = '💾 Save';
    } else {
      textArea.setAttribute('readonly', true);
      editBtn.textContent = '✏️ Edit';
    }
  };

  deleteBtn.onclick = () => li.remove();

  notesList.prepend(li);
}
