

    const addBox = document.querySelector(".addcolor");
    const popUpBox = document.querySelector(".popup-box");
    const closeIcon = document.querySelector(".popup-box header i");
    const titleTag = document.querySelector("#input");
    const descTag = document.querySelector("textarea");
    const addBtn = document.querySelector(".add-note");
    const popupTitle = document.querySelector(".popup-box header p");

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let isUpdate = false;
    let updateId = null;

    // Adicionando evento para mostrar o popup ao clicar no botão de adicionar cor
    addBox.addEventListener("click", () => {
        titleTag.focus();
        popUpBox.classList.add("show");
    });

    // Evento para fechar o popup
    closeIcon.addEventListener("click", () => {
        popUpBox.classList.remove("show");
    });

    // Evento para adicionar ou atualizar a nota
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let noteTitle = titleTag.value,
            noteDesc = descTag.value;
        if (noteTitle || noteDesc) {

            let dateObj = new Date(),
                month = months[dateObj.getMonth()],
                day = dateObj.getDate(),
                year = dateObj.getFullYear();

            let noteInfo = {
                title: noteTitle,
                description: noteDesc,
                date: `${month} ${day} ${year}`
            }
            if (!isUpdate) {
                notes.push(noteInfo);
            } else {
                isUpdate = false;
                notes[updateId] = noteInfo;
            }
            localStorage.setItem("notes", JSON.stringify(notes));
            closeIcon.click();
            showNotes();
        }
    });


    // Recuperando as notas do localStorage
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    



    function showNotes() {
        document.querySelectorAll(".note").forEach(note => note.remove())
      notes.forEach((note, index) => {
        let liTag = `  
        <li class="note">
          <div class="details">
              <p>${note.title}</p>
              <span>${note.description}</span>
          </div>
          <div class="bottom-content">
              <span>${note.date}</span>
              <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
          </div>
         </li>`;
         document.querySelector(".wrapper").insertAdjacentHTML("beforeend", liTag);
      });
    };
    showNotes(); 



    function showMenu(elem){
        elem.parentElement.classList.add("show")
         document.addEventListener("click", e =>{
             if(e.target.tagName != "I" || e.target != elem){
                 elem.parentElement.classList.remove("show")
             }
         });
    }
    
    
  

    closeIcon.addEventListener("click", ()=>{
        titleTag.value = "";
        descTag.value = "";
    });


    // Função para deletar uma nota
    function deleteNote(noteId) {
        let confirmDel = confirm("Are you sure you want to delete this item?");
        if (!confirmDel) return;

        notes.splice(noteId, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
    }

    // Função para atualizar uma nota
    function updateNote(noteId, title, desc) {
        isUpdate = true;
        updateId = noteId;
        addBox.click();
        titleTag.value = title;
        descTag.value = desc;
        addBtn.innerText = "Update Note";
        popupTitle.innerText = "Update a Note";
    }

