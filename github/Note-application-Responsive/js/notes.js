/* This object contains all the functions of note */ 
var note = {
  editNote : function(noteTitle,keyIndex) { /*Edit an existing note*/
    //Find the keyIndex by iterating over localStorage
    for(var keyIndexInLocalStorage=0;keyIndexInLocalStorage<localStorage.length;keyIndexInLocalStorage++) {
      if(localStorage.key(keyIndexInLocalStorage) === noteTitle) {
        break;
      }
    }

    var noteContainerDiv = document.getElementById("noteMetaFor" + keyIndex);
    
    //Show Cancel button
    document.getElementById("editLinkFor" + keyIndex).style.display = "none";
    document.getElementById("deleteLinkFor" + keyIndex).style.display = "none";

    document.getElementById("saveEditLinkFor" + keyIndex).style.display = "block";
    document.getElementById("cancelEditLinkFor" + keyIndex).style.display = "block";
    
    var noteTitle = localStorage.key(keyIndex);
    var noteDesc = localStorage.getItem(noteTitle);

    var inputTemplate = 
      "<div>" +
        "<input type='text' id='noteTitleInputFor" + keyIndex + "' value='" + noteTitle + "' />" +
      "</div>" +
      "<div>" +
        "<textarea id='noteDescInputFor" + keyIndex + "'>" + noteDesc +"</textarea>"
      "</div>";

    noteContainerDiv.innerHTML = inputTemplate;

    document.getElementById("saveEditLinkFor" + keyIndex).onclick = function() {
      var newTitle = document.getElementById("noteTitleInputFor" + keyIndex).value;
      var newDesc = document.getElementById("noteDescInputFor" + keyIndex).value; 

      //Check if title already exists. If so, alert and return
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if(key === newTitle && newTitle!==noteTitle) {
          alert("A note with this title already exists. Please choose a different title !");
          return;
        }
      };

      note.deleteNote(noteTitle);
      note.saveNote(newTitle, newDesc);
    }

    document.getElementById("cancelEditLinkFor" + keyIndex).onclick = function() {
      var newNoteContainerHtml = note.getNoteContainerObj(keyIndex);
      document.getElementById("noteContainerFor" + keyIndex).innerHTML = newNoteContainerHtml;
    }
  },
  deleteNote:function(noteTitle, keyIndex) { /*Delete an existing note.*/
    for(var keyToBeDeletedIndex=0;keyToBeDeletedIndex<localStorage.length;keyToBeDeletedIndex++) {
      if(localStorage.key(keyToBeDeletedIndex) === noteTitle) {
        break;
      }
    }

    //Remove the note from local storage
    var key = localStorage.key(keyToBeDeletedIndex);
    localStorage.removeItem(key);

    this.displayNotes();
  },
  saveNote : function(noteTitle, noteDesc) { /*Save a new note */
    if(!noteTitle) { //Inserting a new note
      if(!document.getElementById('noteTitle').validity.valid) { //If title is not entered, return
        alert("Please enter a title for your note.");
        return;
      }
      noteTitle = document.getElementById("noteTitle").value;
      noteDesc = document.getElementById("noteDesc").value;
    }
    //Check if title already exists. If so, alert and return
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if(key === noteTitle) {
        alert("A note with this title already exists. Please choose a different title !");
        return;
      }
    };

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteDesc").value = "";

    localStorage.setItem(noteTitle, noteDesc);
    this.displayNotes();
  },
  getNoteContainerObj : function(keyIndex) { /*Create a note container to be displayed in the notes list*/
    var noteTitle = localStorage.key(keyIndex);
    var noteDesc = localStorage.getItem(noteTitle);

    var html = 
        "<div class='note-img'>" +
            "<div class='img'></div>" +
        "</div>" +
        "<div class='note-meta' id='noteMetaFor" + keyIndex + "'>" +
          "<div class='note-meta-title' id='noteTitleFor" + keyIndex + "'>" +
            noteTitle +
          "</div>" +

          "<div class='note-meta-desc' id='noteDescFor" + keyIndex + "'>" +
            noteDesc +
          "</div>" +
        "</div>" +
        "<div class='note-actions'>" +
          "<div class='edit-save' id='editLinkFor" + keyIndex + "' onclick='note.editNote(\"" + noteTitle + "\", " + keyIndex + ")'>Edit</div>" +
          "<div class='delete-cancel' id='deleteLinkFor" + keyIndex + "' onclick='note.deleteNote(\"" + noteTitle + "\")'>Delete</div>" +

          "<div class='edit-save' id='saveEditLinkFor" + keyIndex + "' style='display:none;'>Save</div>" +
          "<div class='delete-cancel' id='cancelEditLinkFor" + keyIndex + "' style='display:none;'>Cancel</div>" +
        "</div>";

    return html;
  },
  displayNotes : function() { /*This function displays the set of notes from localStorage object*/

    if(localStorage.length == 0) {
      document.getElementById('searchNotesInput').setAttribute("disabled","disabled"); //Disable search textbox
      document.getElementById('status').innerHTML = "<div class='message'>There are no notes to be displayed !!!</div>";
      return;
    }
    //Enable search textbox if localStorage is not empty.
    document.getElementById('searchNotesInput').removeAttribute("disabled","disabled");

    var notesHtml = "";
    //Iterate over local storage
    for (var i = localStorage.length-1; i >=0 ; i--){

      notesHtml += 
        "<div class='note-container' id='noteContainerFor" + i + "'>" +
            note.getNoteContainerObj(i) +
        "</div>";
    }
    document.getElementById('status').innerHTML =  notesHtml;
  },
  searchNotes : function(value) { /*Search the notes in the localStorage*/
    var tempLocalStorage = new Array();
    //If value is empty, render from localStorage
    if(!value) {
      document.getElementById("search-cancel-icon").style.display = "none";
      this.displayNotes();
      return;
    }
    document.getElementById("search-cancel-icon").style.display = "block";

    //Else perform case-insensitive search on the localStorage object
    value = value.toLowerCase();

    for(var i=0;i<localStorage.length;i++) {
      //Check if element is present in local storage
      var localStorageKey = localStorage.key(i);
      var localStorageValue = localStorage.getItem(localStorageKey);
      if(localStorageKey.toLowerCase().indexOf(value) != -1 || localStorageValue.toLowerCase().indexOf(value)!=-1) {
        var obj = {
          "title" : localStorageKey,
          "desc" : localStorage.getItem(localStorageKey)
        };
        tempLocalStorage.push(obj);
      }
    }

    if(tempLocalStorage.length == 0) {
      document.getElementById('status').innerHTML = "<div class='message'>No search results !!!</div>";
      return;
    }

    //Display search results
    var html = "";
    for(var keyIndex=0;keyIndex<tempLocalStorage.length;keyIndex++) {
      var noteTitle = tempLocalStorage[keyIndex].title;
      var noteDesc = tempLocalStorage[keyIndex].desc;

      html += 
        "<div class='note-container' id='noteContainerFor" + keyIndex + "'>" +
          "<div class='note-img'>" +
            "<div class='img'></div>" +
          "</div>" +
          "<div class='note-meta' id='noteMetaFor" + keyIndex + "'>" +
            "<div class='note-meta-title' id='noteTitleFor" + keyIndex + "'>" +
              noteTitle +
            "</div>" +
            "<div class='note-meta-desc' id='noteDescFor" + keyIndex + "'>" +
              noteDesc +
            "</div>" +
          "</div>" +
        "</div>";
    }
    document.getElementById('status').innerHTML =  html;
  },
  clearSearchTextbox : function() { /*Clear the search textbox*/
    document.getElementById("searchNotesInput").value = "";
    document.getElementById("search-cancel-icon").style.display = "none";
    this.displayNotes();
  }
}

note.displayNotes();