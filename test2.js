/*
A script that creates a menu in Bmr that you can use to load or create hypno messages, so have fun with it :P!
*/

//TODO replace all create element id classname innerhtml with a function, cause yes :////

var BMRHYPNO = {};

var bmrHypno = function() {
  var mainBox = createElement("div", "mainBox");
  var _menuModified = false;
  //should add the function that returns the baseTab, colorTab etc... to the right, then append that tab
  // probably???  TODO TODO TODO TODO
  var _tabs = {
    "word": {
      "Base":createWordBaseTab,
      "Color":"",
      "Effects":"",
      "Preview":""
    },
    "image": {
      "Base":"",
      "Effects":"",
      "Preview":""
    }
  };
  var _tabsTitles = [];
  var _tabsContainers = [];
  var _currentlyLoaded = {};
  var _preloadedHypnos = {
    "New one": {},
    "Load from file": "Load from file",
    "Random": {
      "name": "Random",
      "spawnTime": 1000,
      "values": [
        {
          "type": "word",
          "value": "slut"
        },
        {
          "type": "img",
          "value": "woah,url"
        }
      ]
    }
  };
  var _templateHypno = {
    "name": "",
    "spawnTime": "",
    "values": [

    ]
  }

  function startBmr() {
    //add mainBox to div id=menus in bmr
    //adds the close button and resets everything, uses css from bmr if mainBox was added to menus
    emptyMainBox();
    let closeButton = createElement("div","","button close");
    closeBtn.onclick = () => { mainBox.remove(); };
    mainBox.appendChild(closeButton);
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

    return mainBox;
  }

  function createBmrStartingGrid() {
    //emptyMainBox();
    var grid = createElement("div","","grid-start");
    //add create btn
    grid.appendChild(createBmrCreateScreenBtn());
    //add cast btn
    grid.appendChild(createBmrCastScreenBtn());
    //add remove btn
    grid.appendChild(createBmrRemoveScreenBtn());

    return grid;
  }

  function createBmrCreateScreenBtn() {
    let createBtn = createElement("div","createBtn","gridButton","C R E A T E");
    createBtn.onclick = loadCreateScreen;
    return createBtn;
  }

  function createBmrCastScreenBtn() {
    let castBtn = createElement("div","castBtn","gridButton","C A S T");
    castBtn.onclick = (e) => { console.log("I haven't made the cast screen yet :c"); };
    return castBtn;
  }

  function createBmrRemoveScreenBtn() {
    let removeBtn = createElement("div","removeBtn","gridButton","R E M O V E");
    removeBtn.onclick = (e) => { console.log("I haven't made the remove screen yet :c"); };
    return removeBtn;
  }

  function loadCreateScreen() {
    emptyMainBox();
    //top container here (load from and close button in it)
    let topContainer = createElement("div","topContainer","gridContainer");
    //load from label
    let loadFromLabel = createElement("div","","gridLabel","Load from:");
    topContainer.appendChild(loadFromLabel);
    //creating and loading the selection menu, along with the file btn
    let fileBtn = createElement("input","loadFileBtn");
    fileBtn.type = "file";
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
    let fileBtnLabel = createElement("label","loadFileLabel");
    fileBtnLabel.appendChild(fileBtn);
    fileBtnLabel.append("Load from file");
    topContainer.appendChild(loadSelections(fileBtnLabel));
    topContainer.appendChild(fileBtnLabel);
    fileBtnLabel.style.display="none";
    //backButton
    let backButton = createElement("input","backButton");
    backButton.type = "button";
    backButton.value = "<";
    backButton.onclick = startBmr;
    topContainer.appendChild(backButton);
    //closeButton
    let closeButton = createElement("div","closeButton","button close");
    closeBtn.onclick = () => { mainBox.remove(); };
    topContainer.appendChild(closeButton);
    mainBox.appendChild(topContainer);

    mainBox.appendChild(createCreateScreenGrid());
  }

  function loadSelections(displayBtn) {
    var selections = createElement("select","selectHypno");
    for(i in _preloadedHypnos) {
      selections.options.add(new Option(i,_preloadedHypnos[i]));
    }
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
    _currentlyLoaded = _preloadedHypnos[selection.text];
    document.getElementById("formNameInput").value = selection.text;
    document.getElementById("formSpawnInput").value = _currentlyLoaded.spawnTime;
    document.getElementById("formSpawnRange").value = _currentlyLoaded.spawnTime;
    //that's all I have for now
  }
  
  function createCreateScreenGrid() {
    let grid = createElement("div","createMenu","menu-start");
    //create name container
    let nameContainer = createElement("div","nameContainer","gridContainer");
    //add label and input to name container
    let nameLabel = createElement("div","nameLabel","gridLabel","Choose a name for your set:");
    let nameInputContainer = createElement("div","nameInputContainer");
    let nameInput = createElement("input","formNameInput","gridTextInput","","Name here.");
    nameInput.type = "text";
    nameInputContainer.appendChild(nameInput);
    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInputContainer);
    //add nameContainer to grid
    grid.appendChild(nameContainer);
    
    //create spawn container
    let spawnContainer = createElement("div","spawnContainer","gridContainer");
    //add label and inputs to spawn container
    let spawnLabel = createElement("div","spawnLabel","gridLabel","Choose how many milliseconds you want between each spawn:");
    let spawnInputContainer = createElement("div","spawnInputContainer");
    let spawnInput = createElement("input","formSpawnInput","gridTextInput","","ms here, can go past max.");
    let spawnInputRange = createElement("input","formSpawnRange");
    spawnInput.type = "text";
    spawnInputRange.type = "range";
    spawnInputRange.min = 100;
    spawnInputRange.max = 5000;
    //making the two inputs update each other //TODO LATER CHECK CORRECT VALUE
    spawnInput.oninput = (e) => {spawnInputRange.value = e.target.value;}
    spawnInput.onchange = (e) => {spawnInputRange.value = e.target.value;}
    spawnInputRange.oninput = (e) => {spawnInput.value = e.target.value;}
    spawnInputRange.onchange = (e) => {spawnInput.value = e.target.value;}
    //add them in container
    spawnInputContainer.appendChild(spawnInput);
    spawnInputContainer.appendChild(spawnInputRange);
    spawnContainer.appendChild(spawnLabel);
    spawnContainer.appendChild(spawnInputContainer);
    //add spawnContainer to grid
    grid.appendChild(spawnContainer);

    //add the selection boxes for word and img
    let selectTypeContainer = createElement("div","selectTypeContainer","gridContainer");
    //word box
    let wordTypeContainer = createElement("div","wordTypeContainer","typeContainer activeType","Word/Text");
    wordTypeContainer.onclick = (e) => {
      wordTypeContainer.classList.add("activeType");
      imgTypeContainer.classList.remove("activeType");
      //TODO Change format of the inputs below
    };
    //img box
    let imgTypeContainer = createElement("div","imgTypeContainer","typeContainer","Image/Gif");
    imgTypeContainer.onclick = (e) => {
      wordTypeContainer.classList.remove("activeType");
      imgTypeContainer.classList.add("activeType");
      //TODO Change format of the inputs below
    };
    selectTypeContainer.appendChild(wordTypeContainer);
    selectTypeContainer.appendChild(imgTypeContainer);
    grid.appendChild(selectTypeContainer);

    //creating the tabbed part
    let createTabbedContainer = createElement("div","create-tab-start");
    //fillTabs(createTabbedContainer);
    //changeTabType("word");
    grid.appendChild(createTabbedContainer);
    simpleTabCauseTired(createTabbedContainer);

    //TODO, make a function that adds passed string as input button for grid
    //TODO first though, make it so it loads _currentlyLoaded
    return grid;
  }

  function simpleTabCauseTired(aaa) {
    let tabsContainer = createElement("div","tabsTitleContainer");
    for(i in _tabs["word"]) {
      let tab = createElement("div",i+"Create","tabTitle wordTabTitle",i);
      tabsContainer.appendChild(tab);
    }
    aaa.appendChild(tabsContainer);
    aaa.appendChild(createWordBaseTab());
  }

  function fillTabs(wholeContainer) {
    let tabsTitleContainer = createElement("div","tabsTitleContainer");
    let tabsContainer = createElement("div","tabsContainer");
    for(i in _tabs) {
      for(j in _tabs[i]) {
        //creating titles for the tabs
        let tabTitle = createElement("div",i+j+"CreateTitle","tabTitle",j);
        _tabsTitles.push(tabTitle);
        tabsTitleContainer.appendChild(tabTitle);
        //creating the actual tab
        let tabContainer = _tabs[i][j]();
        tabsContainer.appendChild(tabContainer);
        _tabsContainers.push(tabContainer);
      }
    }
    wholeContainer.appendChild(tabsTitleContainer);
    wholeContainer.appendChild(tabsContainer);
  }

  function createWordBaseTab() {
    //the tab
    let tab = createElement("div","wordBaseTab","createTab");
    //all its elements
    //value
    let valueContainer = createElement("div","wordValueContainer","tabWordContainer");
    let wordValueLabel = createElement("div","wordValueLabel","gridLabel","Type the word/text that you wish to use:");
    valueContainer.appendChild(wordValueLabel);
    let wordValueInputContainer =createElement("div","wordValueInputContainer");
    let wordValueInput = createElement("input","wordValueInput","gridTextInput","","Text here.");
    wordValueInput.type = "text";
    wordValueInputContainer.appendChild(wordValueInput);
    valueContainer.appendChild(wordValueInputContainer);
    tab.appendChild(valueContainer);
    //time TODO
    let wordTimeContainer = createElement("div","wordTimeContainer","tabWordContainer");
    let wordTimeLabel = createElement("div","wordTimeLabel","gridLabel","How long before the word leaves? (in milliseconds)");
    let wordTimeInputContainer = createElement("div","wordTimeInputContainer");
    let wordTimeInput = createElement("input","wordTimeInput","gridTextInput","","ms here, can go past max.");
    let wordTimeRange = createElement("input","wordTimeRange");

    wordTimeInput.type = "text";
    wordTimeRange.type = "range";
    wordTimeRange.min = 10;
    wordTimeRange.max = 10000;
    //making the two inputs update each other //TODO LATER CHECK CORRECT VALUE
    wordTimeInput.oninput = (e) => {wordTimeRange.value = e.target.value;}
    wordTimeInput.onchange = (e) => {wordTimeRange.value = e.target.value;}
    wordTimeRange.oninput = (e) => {wordTimeInput.value = e.target.value;}
    wordTimeRange.onchange = (e) => {wordTimeInput.value = e.target.value;}

    wordTimeContainer.appendChild(wordTimeLabel);
    wordTimeContainer.appendChild(wordTimeInputContainer);
    wordTimeInputContainer.appendChild(wordTimeInput);
    wordTimeInputContainer.appendChild(wordTimeRange);
    tab.appendChild(wordTimeContainer);
    //position TODO
    let wordPositionContainer = createElement("div","wordPositionContainer","tabWordContainer");
    let wordPositionLabel = createElement("div","wordPositionLabel","gridLabel","Where should your word be?");
    let wordPositionInputContainer = createElement("div","wordPositionInputContainer");
    let wordPositionInputSelect = createElement("select","wordPositionInputSelect");
    let wordPositionInput1 = createElement("input","wordPositionInput1","gridTextInput","","% from top");
    let wordPositionInput2 = createElement("input","wordPositionInput2","gridTextInput","","% from left");

    wordPositionInput1.type = "text";
    wordPositionInput1.style.display = "none";
    wordPositionInput2.type = "text";
    wordPositionInput2.style.display = "none";
    wordPositionInputSelect.options.add(new Option("Random","Random"));
    wordPositionInputSelect.options.add(new Option("Precise Position","Precise Position"));
    wordPositionInputSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex];
      if(selected.text == "Random") {
        wordPositionInput1.style.display = "none";
        wordPositionInput2.style.display = "none";
      } else {
        wordPositionInput1.style.display = "";
        wordPositionInput2.style.display = "";
        let chooseWindow = createElement("div","chooseWindow","","Click where you would like your word top-left corner to be.");
        document.getElementById("scaler").appendChild(chooseWindow);
        chooseWindow.onclick = (evt) => {
          let boundRect=evt.target.getBoundingClientRect();
          wordPositionInput1.value = ((evt.clientX-boundRect.left)*100/boundRect.width).toFixed(2);
          wordPositionInput2.value = ((evt.clientY-boundRect.top)*100/boundRect.height).toFixed(2);
          chooseWindow.remove();
        };
      }
    };
    wordPositionContainer.appendChild(wordPositionLabel);
    wordPositionContainer.appendChild(wordPositionInputContainer);
    wordPositionInputContainer.appendChild(wordPositionInputSelect);
    wordPositionInputContainer.appendChild(wordPositionInput1);
    wordPositionInputContainer.appendChild(wordPositionInput2);
    tab.appendChild(wordPositionContainer);
    //font size TODO
    return tab;
  }

  function changeTabType(type) {
    //document.getElementById("create-tab-start").innerHTML="";
    let hideAll = document.querySelectorAll(".createTab, .tabTitle");
    for (i in allTabs) {
      allTabs[i].style.display = "none"; 
    }
    if(type=="word") {

    } else {

    }
  }

  function emptyMainBox() {
    mainBox.innerHTML = "";
    //var closeBtn = createElement("div","","button close");
    //closeBtn.onclick = () => { mainBox.remove(); };
    //mainBox.appendChild(closeBtn);
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

  function createElement(type = "div", id = "", className = "", innerHTML = "", placeholder = "") {
    let elm = document.createElement(type);
    elm.id = id;
    elm.className = className;
    elm.innerHTML = innerHTML;
    elm.placeholder = placeholder;
    return elm;
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

/*
Animation example:

temp0.animate(
{
	color: ["red","orange","yellow","green","blue","indigo","violet"]
},
{
duration: 3000,
fill: "both"
}).onfinish = ()=>{alert(0)};
temp0.animate(
{
	top: ["0%","50%","100%","0%"]
},
{
duration: 3000,
fill: "both"
}).onfinish = ()=>{alert(55)};
*/