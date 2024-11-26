/*
A script that creates a menu in Bmr that you can use to load or create hypno messages, so have fun with it :P!
*/

var BMRHYPNO = {};

var bmrHypno = function() {
  var mainBox = document.createElement("div");
  var _menuModified = false;
  var _currentlyLoaded = {};
  var _preloadedHypnos = {
    "New one": {},
    "Load from file": "Load from file",
    "Random": {
      "first": {
        "type": "word",
        "value": "slut"
      },
      "second": {
        "type": "img",
        "value": "woah,url"
      }
    }
  };

  function startBmr() {
    //add mainBox to div id=menus in bmr
    mainBox.id="mainBox";
    //adds the close button and resets everything, uses css from bmr if mainBox was added to menus
    emptyMainBox();
    //adding the grid
    mainBox.appendChild(createBmrStartingGrid());

    if(!_menuModified) {
      //replacing the dropdown menu in Bmr to add Hypno to the list
      /*var menufunc=document.getElementById("menu").getElementsByClassName("button")[0].onclick.toString().substring(8).slice(0,-1);
      menufunc=menufunc.replace(/"Exit/gm,"\"Hypno\", onclick: () => document.getElementById(\"menus\").appendChild(startBmr())\},\{label:\"Exit");
      menufunc=menufunc.replace(/_menuButton/gm,"document.getElementById(\"menu\").getElementsByClassName(\"button\")[0]");
      document.getElementById("menu").getElementsByClassName("button")[0].onclick=new Function("e",menufunc);*/
      document.getElementById("menu").getElementsByClassName("button")[0].onclick = rewrittenDropdownFunction();
      _menuModified = true;
    }

    //stuff to delete later added just to mess around
    ACTION_BAR.TriggerMacro("","/s AHHHHHHHHHHHHHHHHHHHHHH It's working!!!!");
    return mainBox;
  }

  function createBmrStartingGrid() {
    emptyMainBox();
    var grid = document.createElement("div");
    grid.className = "grid-start";
    //add create btn
    grid.appendChild(createBmrCreateScreenBtn());
    //add load btn
    grid.appendChild(createBmrLoadScreenBtn());
    return grid;
  }

  function createBmrCreateScreenBtn() {
    let createBtn = document.createElement("div");
    createBtn.id = "createBtn";
    createBtn.className = "gridButton";
    createBtn.innerHTML = "C R E A T E";
    createBtn.onclick = loadCreateScreen;
    return createBtn;
  }

  function createBmrLoadScreenBtn() {
    let loadBtn = document.createElement("div");
    loadBtn.id = "loadBtn";
    loadBtn.className = "gridButton";
    loadBtn.innerHTML = "L O A D";
    loadBtn.onclick = (e) => { console.log("I haven't made the load screen yet :c"); };
    return loadBtn;
  }

  function loadCreateScreen() {
    emptyMainBox();
    //top container here (load from and close button in it)
    let topContainer = document.createElement("div");
    topContainer.id = "topContainer";
    topContainer.className = "gridContainer";
    //load from label
    let loadFromLabel = document.createElement("div");
    loadFromLabel.className = "gridLabel";
    loadFromLabel.innerHTML = "Load from:";
    topContainer.appendChild(loadFromLabel);
    //creating and loading the selection menu, along with the file btn
    let fileBtn = document.createElement("input");
    fileBtn.type = "file";
    fileBtn.id = "loadFileBtn";
    //what happens after the file is loaded
    //TODO TODO TODO TODO TODO TODO TODO TODO TODO, for now just console log
    let loaded = (e) => {
      let tmpFr = e.target;
      let result = tmpFr.result;
      console.log(result);
      //let resultJSON = JSON.parse(result);
    };
    //How are the files processed when you load them
    let process = (file) => {
      let fr = new FileReader();
      fr.readAsText(file);
      fr.addEventListener('loadend', loaded);
    };
    //Making it so you process the file when you choose it
    fileBtn.addEventListener('change', (e) => {
      let file = fileBtn.files[0];
      process(file);
    });
    //label for the fileBtn so I can css it
    let fileBtnLabel = document.createElement("label");
    fileBtnLabel.id = "loadFileLabel";
    fileBtnLabel.appendChild(fileBtn);
    fileBtnLabel.append("Load from file");
    topContainer.appendChild(loadSelections(fileBtnLabel));
    topContainer.appendChild(fileBtnLabel);
    fileBtnLabel.style.display="none";
    mainBox.appendChild(topContainer);

    mainBox.appendChild(createCreateScreenGrid());
  }

  function loadSelections(displayBtn) {
    var selections = document.createElement("select");
    for(i in _preloadedHypnos) {
      selections.options.add(new Option(i,_preloadedHypnos[i]));
    }
    selections.id = "selectHypno";
    selections.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex];
      if(selected.text == "Load from file") {
        displayBtn.style.display = "";
      } else {
        loadSelectionInGrid(selected);
        displayBtn.style.display = "none";
      }
    };
    return selections;
  }

  function loadSelectionInGrid(selection) {
    //the name
    document.getElementById("formNameInput").value = selection.text;
    //that's all I have for now
  }
  
  function createCreateScreenGrid() {
    let grid = document.createElement("div");
    grid.className = "menu-start";
    grid.id = "createMenu";
    //create name container
    let nameContainer = document.createElement("div");
    nameContainer.className = "gridContainer";
    nameContainer.id = "nameContainer";
    //add label and input to name container
    let nameLabel = document.createElement("div");
    nameLabel.id = "nameLabel";
    nameLabel.className = "gridLabel";
    nameLabel.innerHTML = "Choose a name for your set:";
    let nameInputContainer = document.createElement("div");
    let nameInput = document.createElement("input");
    nameInputContainer.id = "nameInputContainer";
    nameInput.id = "formNameInput";
    nameInput.className = "gridTextInput";
    nameInput.type = "text";
    nameInputContainer.appendChild(nameInput);
    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInputContainer);
    //add nameContainer to grid
    grid.appendChild(nameContainer);
    
    //add the selection boxes for word and img
    let selectTypeContainer = document.createElement("div");
    selectTypeContainer.id = "selectTypeContainer";
    selectTypeContainer.className = "gridContainer";
    //word box
    let wordTypeContainer = document.createElement("div");
    wordTypeContainer.id = "wordTypeContainer";
    wordTypeContainer.className = "typeContainer";
    wordTypeContainer.innerHTML = "Word/Text";
    wordTypeContainer.onclick = (e) => {
      wordTypeContainer.classList.add("activeType");
      imgTypeContainer.classList.remove("activeType");
      //TODO Change format of the inputs below
    };
    //img box
    let imgTypeContainer = document.createElement("div");
    imgTypeContainer.id = "imgTypeContainer";
    imgTypeContainer.className = "typeContainer";
    imgTypeContainer.innerHTML = "Image/Gif";
    imgTypeContainer.onclick = (e) => {
      wordTypeContainer.classList.remove("activeType");
      imgTypeContainer.classList.add("activeType");
      //TODO Change format of the inputs below
    };
    selectTypeContainer.appendChild(wordTypeContainer);
    selectTypeContainer.appendChild(imgTypeContainer);
    grid.appendChild(selectTypeContainer);

    //TODO, make a function that adds passed string as input button for grid
    //TODO first though, make it so it loads _currentlyLoaded
    return grid;
  }

  function emptyMainBox() {
    mainBox.innerHTML = "";
    var closeBtn = document.createElement("div");
    closeBtn.className = "button close";
    closeBtn.onclick = () => { mainBox.remove(); };
    mainBox.appendChild(closeBtn);
  }

  function rewrittenDropdownFunction(e) {
    /* The function in BMR, + hypno down there. Not replacing it like this in case I want to add more stuff to the menu
    const rect = document.getElementById("menu").getElementsByClassName("button")[0].getBoundingClientRect();
        DROPDOWN.instance.Open(e, [
          { label: "Inventory", onclick: () => MENU.Inventory.Open() },
          { label: "Macros", onclick: () => MENU.Macros.Open() },
          { label: "Messages", onclick: () => MENU.Messages.Open() },
          { label: "Myself", onclick: () => MENU.Myself.Open() },
          { label: "Profile", onclick: () => window.open(`/character/${GAME_MANAGER.instance.character.token}`) },
          { label: "Settings", onclick: () => MENU.Settings.Open() },
          { label: "Skills", onclick: () => MENU.Skills.Open() },
          { label: "Social", onclick: () => MENU.Social.Open() },
          { label: "Spells", onclick: () => MENU.Spells.Open({}) },
          { label: "Hypno", onclick: () => document.getElementById("menus").appendChild(startBmr())},
          { label: "Exit", onclick: () => this.ExitAlert() },
        ], rect.left, rect.bottom);
    */
   let _menuButton = document.getElementById("menu").getElementsByClassName("button")[0];
   let curFunc = _menuButton.onclick.toString(); 
   let newFunc = curFunc.substring(curFunc.indexOf("{")+1,curFunc.length-1);
   newFunc = newFunc.replace(/_menuButton/gm,'document.getElementById("menu").getElementsByClassName("button")[0]');
   let restOfTheFunc = 'MENU.Spells.Open({}) },\n{ label: "Hypno", onclick: () => document.getElementById("menus").appendChild(BMRHYPNO.start())}'
   newFunc = newFunc.replace(/MENU\.Spells\.Open\({}\) }/gm,restOfTheFunc);

   return new Function("e",newFunc);
  }

  BMRHYPNO.start = startBmr;
  GUI.instance.DisplayMessage("Everything was loaded correctly, hopefully! \\[T]/");

};

BMRHYPNO.load = bmrHypno;

console.log("testtttt");
/*-----------------------------
setName needed to remove intervals

type: img
value: url of the image/gif
opacity: ...
max-min width-height: ...
width-heigth: ...
transformRotation: ...
extra

type: word
value: "slut"
color: random OR an hex value chosen by color picker
opacity: value between 0 and 1(0 invisible, 1 totally visible
fontSize: random between two chosen values
fontType: ...nah
max-min width-height: ???? Probably adding text-wrap too
transformRotation: choose max deg and it will be between -deg and +deg
extra: an other css that you might want to add. simply parse it like: first line \n second line probably. trasform gets +
*/