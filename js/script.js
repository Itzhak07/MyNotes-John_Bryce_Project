var i =
  localStorage.getItem("notesOBJ") == null
    ? 0
    : Object.keys(JSON.parse(localStorage.getItem("notesOBJ"))).length;
var namesFromStorage =
  localStorage.getItem("notesOBJ") == null
    ? JSON.stringify([])
    : localStorage.getItem("notesOBJ");
var arrToSave = JSON.parse(namesFromStorage);

// Create a new note Function //
function newNote() {
  var noteTitle = document.getElementById("taskTitle").value;
  var noteDate = document.getElementById("taskDate").value;
  var noteTime = document.getElementById("taskTime").value;

  var newDivCol = document.createElement("DIV");
  newDivCol.setAttribute("class", "col-xl-3");
  var newDiv = document.createElement("DIV");
  newDiv.setAttribute("class", "card mx-auto animated fadeIn");
  newDivCol.appendChild(newDiv);
  var newDiv2 = document.createElement("DIV");
  newDiv2.setAttribute("class", "card-header");
  newDiv.appendChild(newDiv2);
  var delButton = document.createElement("BUTTON");
  delButton.setAttribute("id", i);
  delButton.setAttribute("class", "close delBtn");
  delButton.setAttribute("type", "button");
  delButton.setAttribute("aria-label", "close");
  delButton.setAttribute("onclick", "deleteNote(this)");
  newDiv2.appendChild(delButton);
  var btnIcon = document.createElement("I");
  btnIcon.setAttribute("class", "fas fa-trash-alt fa-xs");
  delButton.appendChild(btnIcon);
  var divCardBody = document.createElement("DIV");
  divCardBody.setAttribute("class", "card-body");
  var bodyP = document.createElement("p");
  bodyP.setAttribute("class", "card-text");
  var bodyPtext = document.createTextNode(noteTitle);
  bodyP.appendChild(bodyPtext);
  divCardBody.appendChild(bodyP);
  newDiv.appendChild(divCardBody);
  var cardFooter = document.createElement("DIV");
  cardFooter.setAttribute("class", "card-footer");
  var footerDateSpan = document.createElement("SPAN");
  var dateContent = document.createTextNode(noteDate);
  footerDateSpan.appendChild(dateContent);
  var footerTimeSpan = document.createElement("SPAN");
  var timeContent = document.createTextNode(noteTime);
  var brElement = document.createElement("BR");
  footerTimeSpan.appendChild(timeContent);
  cardFooter.appendChild(footerDateSpan);
  cardFooter.appendChild(brElement);
  cardFooter.appendChild(footerTimeSpan);
  newDiv.appendChild(cardFooter);
  var noteSec = document.getElementById("noteSection");
  noteSec.appendChild(newDivCol);
  document.getElementById("taskTitle").value = "";

  // Save to Local Storage //
  arrToSave[i] = {
    Title: noteTitle,
    Date: noteDate,
    Time: noteTime
  };

  i++;
  var myJSON = JSON.stringify(arrToSave);
  localStorage.setItem("notesOBJ", myJSON);

  return false;
}

// Load from Local Storage //
function loadLocalStorageNotes() {
  if (localStorage.getItem("notesOBJ") == null) {
    document.getElementById("noteSection").innerHTML = "";
  } else {
    var myJSON = localStorage.getItem("notesOBJ");
    var arrToSave = JSON.parse(myJSON);
    for (let index = 0; index < arrToSave.length; index++) {
      document.getElementById(
        "noteSection"
      ).innerHTML += ` <div class="col-xl-3">
            <div id="note ${index}" class="card mx-auto">
                <div class="card-header">
                <button  id=${index} class="close delBtn" type="button" aria-label="Close" onclick="deleteNote(this)">
                <i class="fas fa-trash-alt fa-xs"></i>
              </button>
                </div>
                <div class="card-body">
                    <p class="card-text">${arrToSave[index].Title}</p>
                </div>
                <div class="card-footer">
                    <span dir="ltr">${arrToSave[index].Date}</span>
                    <br>
                    <span>${arrToSave[index].Time}</span>
                </div>
            </div>
            </div>`;
    }
  }
}

// Delete Notes Button //
function deleteNote(div) {
  var id = div.getAttribute("id");
  var namesFromStorage =
    localStorage.getItem("notesOBJ") == null
      ? JSON.stringify([])
      : localStorage.getItem("notesOBJ");
  var arrToSave = JSON.parse(namesFromStorage);
  arrToSave.splice(id, 1);
  localStorage.setItem("notesOBJ", JSON.stringify(arrToSave));
  $(".delBtn").click(function() {
    $(this).remove();
  });

  document.getElementById("noteSection").innerHTML = "";
  i--;
  loadLocalStorageNotes();
}

// Current Date&Time Input //
var date = new Date();
var currentDate = date.toISOString().slice(0, 10);
document.getElementById("taskDate").value = currentDate;
showTime();

function showTime() {
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("taskTime").value = h + ":" + m;
}

function checkTime(t) {
  if (t < 10) {
    t = "0" + t;
  }
  return t;
}

// Delete ALL Notes & Clear LocalStorage //
function deleteAll() {
  var elem = document.getElementById("noteSection");
  elem.parentNode.removeChild(elem);
  localStorage.clear();
  location.reload();

  return;
}
