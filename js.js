/*
TODO: keyboard navigation, onsumbit, look like real element with dot until confirmed sumbitted, way to end inline submit?, talk to real db
			idea: insertboxes always exist, just hidden normally, same css trickery, onclick out disappear! expand to fit for textboxes
			BUG THAT DISSAPEARS WHEN INSPECTED (or resized)! INSERT BELOW!
			idea - make insert above below list items (like before?)
			REMOVE ALL FIDDLEY NUMBERS FROM CSS - SIMPLIFY CSS WHERE POSSIBLE
SHOULD COMMENTS BE CSS TRICKS OR JS?
WHAT ABOUT COMMENT INSERTS
WAY TO UPDATE PAGE ON NEW INFO (should be good ideomatic way for this)

TODO SOON:
top submit takes you to part of page where its submiting, clears itself
persistant ids for all comments stored on db so ideasite/#entertainment will work?
onsubmit from within - look like its part of the page show submitting... remove ... when its submitted

host on heliohost with SQLite
how to do this?

notify via email on comments to own submission?


TODO BUGS:
make way to add comments from selected bits
returning the file under to white bugs out
minimize on bottom for long comments

*/


document.addEventListener("DOMContentLoaded", function(e) {
  createCollapsableList(); //serverside in the future?
  createNavSidebar(); //serverside in the future?
  createHeaderPicker();
});

//adding the minimize and maximize bits
function createCollapsableList() {
  collapsableItems = document.getElementById("top").getElementsByTagName("LI");
  var incrementingId = 0;
  for (var i=0; i < collapsableItems.length; i++) {
    var item = collapsableItems[i];
    insertCollapser(item, incrementingId);
    incrementingId++;
  }
}

function insertCollapser(item, incrementingId) {
  var id = "id" + incrementingId;
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;
  var minimize = document.createElement("label");
  minimize.htmlFor = id;
  minimize.className = "minimize";
  minimize.innerHTML = "[-]";
  var maximize = document.createElement("label");
  maximize.htmlFor = id;
  maximize.className = "maximize";
  maximize.innerHTML = "[+]";
  item.insertBefore(maximize, item.firstChild); //lowest
  item.insertBefore(minimize, item.firstChild);
  item.insertBefore(checkbox, item.firstChild); //highest
}

//the header picker (semi magic)
function createHeaderPicker() {
  var button = document.getElementById("header-submit");
  button.onclick = function() { toggle('category-picker', 'flex'); };
  button.value = "+";
  button.type = "button";
  button.id = "header-button";
  var submit = document.getElementById("unused-button");
  submit.id = "header-submit";
  var inputs = document.getElementById("many-inputs");
  inputs = setupManyInputs(inputs);
  //appendChild inputs
}

function setupManyInputs(element) {
  addSelectItem(document.getElementById("top"), 0);
}

function updateManyInputs(changedNumber) {
	var noBlanks = true;
	var selectedIndexes = [];
	var manyInputs = document.getElementById("many-inputs");
	var selects = manyInputs.getElementsByTagName("select");
	for (var i = 0; i <= changedNumber; i++) {
		select = selects[i];
		index = select.selectedIndex;
		if (index === 0) {
			noBlanks = false;
		}
		else if (noBlanks) {
			selectedIndexes.push(index);
		}
	}
	while(manyInputs.firstChild) {
		manyInputs.removeChild(manyInputs.firstChild);
	}
	var lastUl = document.getElementById("top");
	for (var j=0; i <= changedNumber; j++) {
		index = selectedIndexes[j];
		addSelectItem(lastUl, j, index);
		if (lastUl.children.item(index-1).getElementsByTagName("UL").length > 0) {
			lastUl = lastUl.children.item(index-1).getElementsByTagName("UL")[0];
			if(j === selectedIndexes.length - 1) {
				addSelectItem(lastUl, j+1);
			}
		}
	}
}

function addSelectItem(ul, index, selectedIndex = -1) {
  var select = document.createElement("select");
  var blank = document.createElement("option");
  blank.selected = true;
  select.appendChild(blank);
  var lis = ul.children;
  for(var i=0; i < lis.length; i++) {
    var liText = lis[i].getElementsByClassName("content")[0].childNodes[0].nodeValue;
    var option = document.createElement("option");
    option.innerHTML = liText;
    select.appendChild(option);
    //option.value = UNIQUEID <- must have!
	//<option disabled selected value> -- select an option -- </option>
  }
  if (selectedIndex >= 0) {
	select.selectedIndex = selectedIndex;
  }
  select.onchange = function(j) { return function() { updateManyInputs(j); }; }(index); //MAGIC! look into how clojures work
  document.getElementById("many-inputs").appendChild(select);
}

function toggle(id, display) {
  var element = document.getElementById(id);
  var main = document.getElementById("main");
  var button = document.getElementById("header-button");
  if(element.style.display === "none" || element.style.display === "") {
    element.style.display = display;
    main.style.marginTop = "7.1rem";
    button.value = "-";
  }
  else {
    element.style.display = "none";
    main.style.marginTop = "5rem";
    button.value = "+";
  }
}

//TODO: these seem unseful to be made
//function insertIntoList() {
//	POSSIBILITY: This is called on every comment at beginiing, more DRY
//}
//
//function createNavSidebar() {
//
//}

//The insert inside UI
targetDiv = null;

function resetContent(div) {
    div.className = "content";
    inserts = div.getElementsByClassName("inserts");
    for(var i = 0; i < inserts.length; i++) {
        div.removeChild(inserts[i]);
    }
}

function setupContent(div) {
    div.className = "selectedContent";
    inserts = document.createElement("div");
    inserts.className = "inserts";
    insertBelow = document.createElement("input");
    insertBelow.type = "text";
    insertBelow.className = "insertBelow";
    insertUnder = document.createElement("input");
    insertUnder.type = "text";
    insertUnder.className = "insertUnder";
    inserts.appendChild(insertBelow);
    inserts.appendChild(insertUnder);
    div.appendChild(inserts);
}

document.onclick = function(event) {
    if(event.target.className === "content") {
        if(targetDiv !== null) {
            resetContent(targetDiv);
        }
        targetDiv = event.target;
        setupContent(targetDiv);
    }
    else if(event.target.className === "selectedContent") {
        //do nothing
    }
    else {
        if(targetDiv !== null) {
            resetContent(targetDiv);
        }
        targetDiv = null;
        if(event.target.className === "insertUnder") {
            //add into list
        }
        else if(event.target.className === "insertBelow") {
            //add into list
        }
    }
};
