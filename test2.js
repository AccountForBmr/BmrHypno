/*
A script that creates a menu in Bmr that you can use to load or create hypno messages, so have fun with it :P!
*/

//TODO replace all create element id classname innerhtml with a function, cause yes :////

var BMRHYPNO = {};

var bmrHypno = function() {
  var mainBox = createElement("div", "mainBox");
  var jsColor = {};
  var _menuModified = false;
  //should add the function that returns the baseTab, colorTab etc... to the right, then append that tab
  // probably???  TODO TODO TODO TODO
  var _tabs = {
    "word": {
      "Base":createWordBaseTab,
      "Color":createWordColorTab,
      "Effects":createWordEffectsTab,
      "Preview":createWordPreviewTab
    },
    "image": {
      "Base":createImgBaseTab,
      "Effects":createImgEffectsTab,
      "Preview":createImgPreviewTab
    }
  };
  var _tabsTypes = [];
  var _tabsTitles = [];
  var _tabsContainers = [];
  var _colorPickers = [];
  var _currentlyLoaded = {};
  var _preloadedHypnos = {
    "New one": {
      "name": "",
      "spawnTime": "",
      "values": [
        {
          "type": "word",
          "value": "",
          "leaveTime": "",
          "position": "Random",
          "font": ["",""],
          "color": "Random",
          "border": "None"
        }
      ]
    },
    "Load from file": "Load from file",
    "Random": {
      "name": "Random",
      "spawnTime": 1000,
      "values": [
        {
          "type": "word",
          "value": "slut",
          "leaveTime": 4120,
          "position": ["1.00%","3.14%"],
          "font": ["64","128"],
          "color": "#abc123",
          "border": "#def456"
        },
        {
          "type": "img",
          "value": "woah,url"
        }
      ]
    }
  };
  var _preloadedGradients = {
    "New one": {
      0: {
        "type": "linear-gradient",
        "direction": "to top",
        "colors": ["gray","gray"],
        "positions": ["",""]
      },
      "blendMode": "normal"
    },
    "Rainbow1": {
      0: {
        "type": "linear-gradient",
        "direction": "to right",
        "colors": ["red","orange","yellow","green","blue","indigo","violet"],
        "positions": ["","","","","","",""]
      },
      "blendMode": "overlay"
    },
    "ShadowBelow": {
      0: {
        "type": "linear-gradient",
        "direction": "to bottom",
        "colors": ["#848484","#848484"],
        "positions": ["",""]
      },
      1: {
        "type": "linear-gradient",
        "direction": "to bottom",
        "colors": ["#FFFFFF00","#000000FF"],
        "positions": ["","75%"]
      },
      "blendMode": "overlay"
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
    closeButton.onclick = () => { mainBox.remove(); };
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
    let topContainerHTML = `
    <div id="topContainer" class="gridContainer">
      <div id="" class="gridLabel">Load from:</div>
      <select id="selectHypno" class="selectContainer">
      </select>
      <label id="loadFileLabel" class="" style="display: none;">
        <input id="loadFileBtn" class="" placeholder="" type="file">Load from file
      </label>
      <input id="backButton" class="" placeholder="" type="button" value="<">
      <div id="closeButton" class="button close"></div>
    </div>
    `;
    /* testing insertAdjacentHTML

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
    closeButton.onclick = () => { mainBox.remove(); };
    topContainer.appendChild(closeButton);
    mainBox.appendChild(topContainer);
    */
    mainBox.insertAdjacentHTML("beforeend",topContainerHTML);
    let fileBtn = document.getElementById("loadFileBtn");
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
    let backButton = document.getElementById("backButton");
    backButton.onclick = startBmr;
    let closeButton = document.getElementById("closeButton");
    closeButton.onclick = () => { mainBox.remove(); };
    let selectHypno = document.getElementById("selectHypno");
    loadSelections(selectHypno);
    //mainBox.appendChild(createCreateScreenGrid());
    createCreateScreenGrid();
  }

  function loadSelections(selections) {
    /*var selections = createElement("select","selectHypno","selectContainer");
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
    return selections;*/
    let displayBtn = document.getElementById("loadFileLabel");
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
  }

  function loadSelectionInGrid(selection) {
    //name
    _currentlyLoaded = _preloadedHypnos[selection.text];
    document.getElementById("formNameInput").value = selection.text;
    //spawnTime
    document.getElementById("formSpawnInput").value = _currentlyLoaded.spawnTime;
    document.getElementById("formSpawnRange").value = _currentlyLoaded.spawnTime;
    //values[0]
    let cur = _currentlyLoaded.values[0];
    if(_currentlyLoaded.values[0].type == "word") {
      changeTabType("word");
      //word
      document.getElementById("wordValueInput").value = cur.value;
      //leaveTime
      document.getElementById("wordTimeInput").value = cur.leaveTime;
      document.getElementById("wordTimeRange").value = cur.leaveTime;
      //position
      let selectPos = document.getElementById("wordPositionInputSelect");
      let pos1 = document.getElementById("wordPositionInput1");
      let pos2 = document.getElementById("wordPositionInput2");
      if(cur.position == "Random") {
        selectPos.selectedIndex = 0;
        pos1.style.display = "none";
        pos2.style.display = "none";
      } else {
        selectPos.selectedIndex = 1;
        pos1.style.display = "";
        pos2.style.display = "";
        pos1.value = cur.position[0];
        pos2.value = cur.position[1];
      }
      //font
      document.getElementById("wordFontInput1").value = cur.font[0];
      document.getElementById("wordFontInput2").value = cur.font[1];
      //color
      let selectCol = document.getElementById("wordColorSelect");
      let col1 = document.getElementById("wordColorInput");
      if(cur.color == "Random") {
        selectCol.selectedIndex = 0;
        col1.style.display = "none";
      } else {
        selectCol.selectedIndex = 1;
        col1.style.display = "";
        _colorPickers[0].fromString(cur.color);
      }
      //border
      let selectBor = document.getElementById("wordBorderSelect");
      let bor1 = document.getElementById("wordBorderInput");
      if(cur.border == "None") {
        selectBor.selectedIndex = 0;
        bor1.style.display = "none";
      } else {
        selectBor.selectedIndex = 1;
        bor1.style.display = "";
        _colorPickers[1].fromString(cur.border);
      }
      //gradient TODO
    }
    //that's all I have for now
  }
  
  function createCreateScreenGrid() {
    let createMenuHTML = `
    <div id="createMenu", class="menu-start">
      <div id="nameContainer" class="gridContainer">
        <div id="nameLabel" class="gridLabel">Choose a name for your set:</div>
        <div id="nameInputContainer">
          <input id="formNameInput" class="gridTextInput" placeholder="Name here." type="text">
        </div>
      </div>
      <div id="spawnContainer" class="gridContainer">
        <div id="spawnLabel" class="gridLabel">Choose how many milliseconds you want between each spawn:</div>
        <div id="spawnInputContainer" class="">
          <input id="formSpawnInput" class="gridTextInput" placeholder="ms here, can go past max." type="text">
          <input id="formSpawnRange" class="" placeholder="" type="range" min="100" max="5000">
        </div>
      </div>
      <div id="selectTypeContainer" class="gridContainer">
        <div id="wordTypeContainer" class="typeContainer activeType">Word/Text</div>
        <div id="imgTypeContainer" class="typeContainer">Image/Gif</div>
      </div>
      <div id="create-tab-start">
      </div>
    </div>
    `;
    /*
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
      //TODO Change format of the inputs below
      changeTabType("word");
    };
    _tabsTypes.push(wordTypeContainer);
    //img box
    let imgTypeContainer = createElement("div","imgTypeContainer","typeContainer","Image/Gif");
    imgTypeContainer.onclick = (e) => {
      //TODO Change format of the inputs below
      changeTabType("image");
    };
    _tabsTypes.push(imgTypeContainer);
    selectTypeContainer.appendChild(wordTypeContainer);
    selectTypeContainer.appendChild(imgTypeContainer);
    grid.appendChild(selectTypeContainer);

    //creating the tabbed part
    let createTabbedContainer = createElement("div","create-tab-start");
    fillTabs(createTabbedContainer);
    grid.appendChild(createTabbedContainer);
    //simpleTabCauseTired(createTabbedContainer);

    //TODO, make a function that adds passed string as input button for grid
    //TODO first though, make it so it loads _currentlyLoaded
    return grid;
    */
    mainBox.insertAdjacentHTML("beforeend",createMenuHTML);
    //making the two inputs update each other //TODO LATER CHECK CORRECT VALUE
    let spawnInput = document.getElementById("formSpawnInput");
    let spawnInputRange = document.getElementById("formSpawnRange");
    spawnInput.oninput = (e) => {spawnInputRange.value = e.target.value;}
    spawnInput.onchange = (e) => {spawnInputRange.value = e.target.value;}
    spawnInputRange.oninput = (e) => {spawnInput.value = e.target.value;}
    spawnInputRange.onchange = (e) => {spawnInput.value = e.target.value;}
    //select word/img
    //word
    let wordTypeContainer = document.getElementById("wordTypeContainer");
    let imgTypeContainer = document.getElementById("imgTypeContainer");
    wordTypeContainer.onclick = (e) => {
      //TODO Change format of the inputs below
      changeTabType("word");
    };
    //img
    imgTypeContainer.onclick = (e) => {
      //TODO Change format of the inputs below
      changeTabType("image");
    };
    _tabsTypes.push(wordTypeContainer);
    _tabsTypes.push(imgTypeContainer);
    //creating the tabbed part
    let createTabbedContainer = document.getElementById("create-tab-start");
    fillTabs(createTabbedContainer);
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
    wholeContainer.appendChild(tabsTitleContainer);
    wholeContainer.appendChild(tabsContainer);
    let whichTabInfo = 0;
    for(i in _tabs) {
      for(j in _tabs[i]) {
        //creating titles for the tabs
        let curTabInfo = whichTabInfo;
        let tabTitle = createElement("div",i+j+"CreateTitle","tabTitle",j);
        tabTitle.onclick = (e) => {
          changeTab(curTabInfo);
        };
        _tabsTitles.push(tabTitle);
        tabsTitleContainer.appendChild(tabTitle);
        //creating the actual tab
        let tabContainer = _tabs[i][j]();
        //tabsContainer.appendChild(tabContainer); added to _tabs[i][j] so I can get the ids
        _tabsContainers.push(tabContainer);
        whichTabInfo+=1;
      }
    }
    changeTabType("word");
  }

  function createWordBaseTab() {
    /*
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
    let wordPositionInputSelect = createElement("select","wordPositionInputSelect","selectContainer");
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
          wordPositionInput1.value = ((evt.clientX-boundRect.left)*100/boundRect.width).toFixed(2)+"%";
          wordPositionInput2.value = ((evt.clientY-boundRect.top)*100/boundRect.height).toFixed(2)+"%";
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
    let wordFontContainer = createElement("div","wordFontContainer","tabWordContainer");
    let wordFontLabel = createElement("div","wordFontLabel","gridLabel","Font size? (Random between the 2)");
    let wordFontInputContainer = createElement("div","wordFontInputContainer");
    let wordFontInput1 = createElement("input","wordFontInput1","gridTextInput","","Min value.");
    let wordFontInput2 = createElement("input","wordFontInput2","gridTextInput","","Max value.");
    let fontMin = createElement("div","fontPreviewMin","fontPreview","Min");
    let fontMax = createElement("div","fontPreviewMax","fontPreview","Max");
    fontMin.style.display = "none";
    fontMax.style.display = "none";
    
    wordFontInput1.type = "text";
    wordFontInput2.type = "text";

    wordFontInput1.onfocus = (e)=>{
      fontMin.style.display = "";
      fontMax.style.display = "";
    };
    wordFontInput1.onblur = (e)=>{
      fontMin.style.display = "none";
      fontMax.style.display = "none"
    };
    wordFontInput1.oninput = (e)=>{
      fontMin.style.fontSize = wordFontInput1.value+"px";
      fontMax.style.fontSize = wordFontInput2.value+"px";
    }
    wordFontInput1.onchange = wordFontInput1.oninput;
    wordFontInput2.onfocus = wordFontInput1.onfocus;
    wordFontInput2.onblur = wordFontInput1.onblur;
    wordFontInput2.oninput = wordFontInput1.oninput;
    wordFontInput2.onchange = wordFontInput1.onchange;

    wordFontContainer.appendChild(wordFontLabel);
    wordFontContainer.appendChild(wordFontInputContainer);
    wordFontInputContainer.appendChild(wordFontInput1);
    wordFontInputContainer.appendChild(wordFontInput2);
    wordFontInputContainer.appendChild(fontMin);
    wordFontInputContainer.appendChild(fontMax);
    tab.appendChild(wordFontContainer);
    return tab;
    */
    //// insertAdjacentHTML from here on
    let tab = createElement("div","wordBaseTab","createTab");
    let createWordBaseTabHTML = `
    <div id="wordValueContainer" class="tabWordContainer">
      <div id="wordValueLabel" class="gridLabel">Type the word/text that you wish to use:</div>
      <div id="wordValueInputContainer">
        <input id="wordValueInput" class="gridTextInput" placeholder="Text here." type="text">
      </div>
    </div>
    <div id="wordTimeContainer" class="tabWordContainer">
      <div id="wordTimeLabel" class="gridLabel">How long before the word leaves? (in milliseconds)</div>
      <div id="wordTimeInputContainer">
        <input id="wordTimeInput" class="gridTextInput" placeholder="ms here, can go past max." type="text">
        <input id="wordTimeRange" placeholder="" type="range" min="10" max="10000">
      </div>
    </div>
    <div id="wordPositionContainer" class="tabWordContainer">
      <div id="wordPositionLabel" class="gridLabel">Where should your word be?</div>
      <div id="wordPositionInputContainer">
        <select id="wordPositionInputSelect" class="selectContainer">
          <option value="Random">Random</option>
          <option value="Precise Position">Precise Position</option>
        </select>
        <input id="wordPositionInput1" class="gridTextInput" placeholder="% from top" type="text" style="display: none;">
        <input id="wordPositionInput2" class="gridTextInput" placeholder="% from left" type="text" style="display: none;">
      </div>
    </div>
    <div id="wordFontContainer" class="tabWordContainer">
      <div id="wordFontLabel" class="gridLabel">Font size? (Random between the 2)</div>
      <div id="wordFontInputContainer">
        <input id="wordFontInput1" class="gridTextInput" placeholder="Min value." type="text">
        <input id="wordFontInput2" class="gridTextInput" placeholder="Max value." type="text">
        <div id="fontPreviewMin" class="fontPreview" style="display: none;">Min</div>
        <div id="fontPreviewMax" class="fontPreview" style="display: none;">Max</div>
      </div>
    </div>
    `;
    tab.insertAdjacentHTML("beforeend",createWordBaseTabHTML);
    document.getElementById("tabsContainer").appendChild(tab);

    //time
    let wordTimeInput = document.getElementById("wordTimeInput");
    let wordTimeRange = document.getElementById("wordTimeRange");
    wordTimeInput.oninput = (e) => {wordTimeRange.value = e.target.value;}
    wordTimeInput.onchange = (e) => {wordTimeRange.value = e.target.value;}
    wordTimeRange.oninput = (e) => {wordTimeInput.value = e.target.value;}
    wordTimeRange.onchange = (e) => {wordTimeInput.value = e.target.value;}

    //position
    let wordPositionInputSelect = document.getElementById("wordPositionInputSelect");
    let wordPositionInput1 = document.getElementById("wordPositionInput1");
    let wordPositionInput2 = document.getElementById("wordPositionInput2");
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
          wordPositionInput1.value = ((evt.clientX-boundRect.left)*100/boundRect.width).toFixed(2)+"%";
          wordPositionInput2.value = ((evt.clientY-boundRect.top)*100/boundRect.height).toFixed(2)+"%";
          chooseWindow.remove();
        };
      }
    };
    //font
    let wordFontInput1 = document.getElementById("wordFontInput1");
    let wordFontInput2 = document.getElementById("wordFontInput2");
    let fontMin = document.getElementById("fontPreviewMin");
    let fontMax = document.getElementById("fontPreviewMax");
    wordFontInput1.onfocus = (e)=>{
      fontMin.style.display = "";
      fontMax.style.display = "";
    };
    wordFontInput1.onblur = (e)=>{
      fontMin.style.display = "none";
      fontMax.style.display = "none"
    };
    wordFontInput1.oninput = (e)=>{
      fontMin.style.fontSize = wordFontInput1.value+"px";
      fontMax.style.fontSize = wordFontInput2.value+"px";
    }
    wordFontInput1.onchange = wordFontInput1.oninput;
    wordFontInput2.onfocus = wordFontInput1.onfocus;
    wordFontInput2.onblur = wordFontInput1.onblur;
    wordFontInput2.oninput = wordFontInput1.oninput;
    wordFontInput2.onchange = wordFontInput1.onchange;

    return tab;
  }

  function createWordColorTab() {
    let tab = createElement("div","wordColorTab","createTab");
    //all the elements
    //the color
    let wordColorContainer = createElement("div","wordColorContainer","tabWordContainer");
    let wordColorLabel = createElement("div","wordColorLabel","gridLabel","Color for your word:");
    let wordColorInputContainer = createElement("div","wordColorInputContainer");
    let wordColorSelect = createElement("select","wordColorSelect","selectContainer");
    let wordColorInput = createElement("input","wordColorInput","gridTextInput","","# Color Code");
    var wordColorPicker = new jsColor(wordColorInput,{format:'hex',
      previewPosition:'right',
      previewSize:50,
      backgroundColor:'rgba(0,0,0,0.9)',
      borderColor:'#343434',
      borderWidth:2});

    wordColorSelect.options.add(new Option("Random","Random"));
    wordColorSelect.options.add(new Option("Choose","Choose"));
    wordColorSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex];
      if(selected.text == "Random") {
        wordColorInput.style.display = "none";
      } else {
        wordColorInput.style.display = "";
      }
    };

    wordColorInput.style.display = "none";
    wordColorInput.type = "text";
    _colorPickers.push(wordColorPicker);
    
    wordColorContainer.appendChild(wordColorLabel);
    wordColorContainer.appendChild(wordColorInputContainer);
    wordColorInputContainer.appendChild(wordColorSelect);
    wordColorInputContainer.appendChild(wordColorInput);
    tab.appendChild(wordColorContainer);
    //border
    let wordBorderContainer = createElement("div","wordBorderContainer","tabWordContainer");
    let wordBorderLabel = createElement("div","wordBorderLabel","gridLabel","Color for your border:");
    let wordBorderInputContainer = createElement("div","wordBorderInputContainer");
    let wordBorderSelect = createElement("select","wordBorderSelect","selectContainer");
    let wordBorderInput = createElement("input","wordBorderInput","gridTextInput","","# Color Code");
    var wordBorderPicker = new jsColor(wordBorderInput,{format:'hex',
      previewPosition:'right',
      previewSize:50,
      backgroundColor:'rgba(0,0,0,0.9)',
      borderColor:'#343434',
      borderWidth:2});

    wordBorderSelect.options.add(new Option("None","None"));
    wordBorderSelect.options.add(new Option("Choose","Choose"));
    wordBorderSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex];
      if(selected.text == "None") {
        wordBorderInput.style.display = "none";
      } else {
        wordBorderInput.style.display = "";
      }
    };

    wordBorderInput.style.display = "none";
    wordBorderInput.type = "text";
    _colorPickers.push(wordBorderPicker);
    
    wordBorderContainer.appendChild(wordBorderLabel);
    wordBorderContainer.appendChild(wordBorderInputContainer);
    wordBorderInputContainer.appendChild(wordBorderSelect);
    wordBorderInputContainer.appendChild(wordBorderInput);
    tab.appendChild(wordBorderContainer);
    //TODO Gradients!!!
    let wordGradientContainer = createElement("div","wordGradientContainer","tabWordContainer");
    let wordGradientLabel = createElement("div","wordGradientLabel","gridLabel","Gradients! (You may choose to replace the color with a gradient instead. Be warned that your color will be ignored if you choose this)");
    let wordGradientInputContainer = createElement("div","wordGradientInputContainer"); 
    let wordGradientSelect = createElement("select","wordGradientSelect","selectContainer");
    let wordGradientPreviewContainer = createElement("div","wordGradientPreviewContainer","fontPreview");
    let wordGradientCreatorContainer = createElement("div","wordGradientCreatorContainer","fontPreview");
    let wordGradientPreviewBg = createElement("div","wordGradientPreviewBg","gradientPreview");
    let wordGradientPreviewTextContainer = createElement("div","wordGradientPreviewTextContainer","gradientPreview");
    let wordGradientPreviewText = createElement("div","wordGradientPreviewText","","Test");
    
    wordGradientSelect.options.add(new Option("None","None"));
    wordGradientSelect.options.add(new Option("Yes","Yes"));
    //TODO move these to the creator part
    wordGradientSelect.options.add(new Option("Linear","Linear"));
    wordGradientSelect.options.add(new Option("Radial","Radial"));
    wordGradientSelect.options.add(new Option("Conic","Conic"));
    wordGradientSelect.options.add(new Option("Repeating Linear","Repeating Linear"));
    wordGradientSelect.options.add(new Option("Repeating Radial","Repeating Radial"));
    wordGradientSelect.options.add(new Option("Repeating Conic","Repeating Conic"));

    //all the stuff for the creator her
    //select part
    let preloadGradientContainer = createElement("div","preloadGradientContainer","gradientCreatorBox");
    let preloadGradientLabel = createElement("div","preloadGradientLabel","gradientLabel","Preload?");
    let preloadGradientSelect = createElement("select","preloadGradientSelect","selectContainer");

    /* I guess I'll just load them manually :/, no idea what's wrong with these
    for(i in _preloadedGradients) {
      preloadGradientSelect.options.add(new Option(_preloadedGradients[i],"aaa"));
    }
    /* sinner down here
    for(i in _preloadedGradients) {
      console.log("What am I doing here?????? why error at 382???")
      console.log(i);
      preloadGradientSelect.options.add(new Option(i,i));
    }
    /* try again...
    console.log(_preloadedGradients);
    preloadGradientSelect.options.add(new Option("Rainbow1","Rainbow1"));
    preloadGradientSelect.options.add(new Option("ShadowBelow","ShadowBelow"));
    */
    preloadGradientSelect.options.add(new Option("New one","New one"));
    preloadGradientSelect.options.add(new Option("Rainbow1","Rainbow1"));
    preloadGradientSelect.options.add(new Option("ShadowBelow","ShadowBelow"));
    preloadGradientSelect.onchange = (e) => {
      //TODO move this in a func cause I need it later
      let selected = e.target.options[e.target.selectedIndex].text;
        let grad = "";
        for(i in _preloadedGradients[selected]) {
          if(i!="blendMode") {
            grad+=`${_preloadedGradients[selected][i].type}(${_preloadedGradients[selected][i].direction},`;
            for(j in _preloadedGradients[selected][i].colors) {
              grad+=`${_preloadedGradients[selected][i].colors[j]} ${_preloadedGradients[selected][i].positions[j]},`;
            }
            grad = grad.slice(0,-1);
            grad+="),";
          }
        }
        grad = grad.slice(0,-1);
        wordGradientPreviewBg.style.backgroundImage=grad;
        wordGradientPreviewBg.style.backgroundBlendMode=_preloadedGradients[selected].blendMode;
        wordGradientPreviewText.style.backgroundImage=grad;
        wordGradientPreviewText.style.backgroundBlendMode=_preloadedGradients[selected].blendMode;
    };

    preloadGradientContainer.appendChild(preloadGradientLabel);
    preloadGradientContainer.appendChild(preloadGradientSelect);
    wordGradientCreatorContainer.appendChild(preloadGradientContainer);

    //name part
    let nameGradientContainer = createElement("div","nameGradientContainer","gradientCreatorBox");
    let nameGradientLabel = createElement("div","nameGradientLabel","gradientLabel","Name?");
    let nameGradientInput = createElement("input","nameGradientInput","gradientTextInput","","Name here");
    nameGradientInput.type = "text";
    
    nameGradientContainer.appendChild(nameGradientLabel);
    nameGradientContainer.appendChild(nameGradientInput);
    wordGradientCreatorContainer.appendChild(nameGradientContainer);
    //buttons!
    let gradientBtnContainer = createElement("div","gradientBtnContainer","gradientCreatorBox");
    let gradientAddBtn = createElement("div","gradientAddBtn","gradientBtn","+");
    let gradientRemoveBtn = createElement("div","gradientRemoveBtn","gradientBtn","-");

    gradientAddBtn.onclick = (e) => {
      //TODO add a gradient
    };
    gradientRemoveBtn.onclick = (e) => {
      //TODO remove selected grad unless None
    };

    gradientBtnContainer.appendChild(gradientAddBtn);
    gradientBtnContainer.appendChild(gradientRemoveBtn);
    wordGradientCreatorContainer.appendChild(gradientBtnContainer);

    //Choose current gradient
    let gradientSelectedContainer = createElement("div","gradientSelectedContainer","gradientCreatorBox");
    let gradientSelectedLabel = createElement("div","gradientSelectedLabel","gradientLabel","Selected:");
    let gradientSelectedSelect = createElement("select","gradientSelectedSelect","selectContainer");

    gradientSelectedSelect.options.add(new Option("None","None"));
    gradientSelectedSelect.onchange = (e) => {
      //TODO hide everything with none, load the gradient when chosen
    }

    gradientSelectedContainer.appendChild(gradientSelectedLabel);
    gradientSelectedContainer.appendChild(gradientSelectedSelect);
    wordGradientCreatorContainer.appendChild(gradientSelectedContainer);


    //add everything
    wordGradientInputContainer.appendChild(wordGradientSelect);
    wordGradientInputContainer.appendChild(wordGradientCreatorContainer);
    wordGradientPreviewContainer.appendChild(wordGradientPreviewBg);
    wordGradientPreviewTextContainer.appendChild(wordGradientPreviewText);
    wordGradientPreviewContainer.appendChild(wordGradientPreviewTextContainer);
    wordGradientInputContainer.appendChild(wordGradientPreviewContainer);
    wordGradientContainer.appendChild(wordGradientLabel);
    wordGradientContainer.appendChild(wordGradientInputContainer);
    tab.appendChild(wordGradientContainer);

    document.getElementById("tabsContainer").appendChild(tab);
    return tab;
  }

  function createWordEffectsTab() {
    let tab = createElement("div","wordEffectsTab","createTab");

    document.getElementById("tabsContainer").appendChild(tab);
    return tab;
  }

  function createWordPreviewTab() {
    let tab = createElement("div","wordPreviewTab","createTab");

    document.getElementById("tabsContainer").appendChild(tab);
    return tab;
  }

  function createImgBaseTab() {
    let tab = createElement("div","imgBaseTab","createTab");

    document.getElementById("tabsContainer").appendChild(tab);
    return tab;
  }

  function createImgEffectsTab() {
    let tab = createElement("div","imgEffectsTab","createTab");

    document.getElementById("tabsContainer").appendChild(tab);
    return tab;
  }

  function createImgPreviewTab() {
    let tab = createElement("div","imgPreviewTab","createTab");

    document.getElementById("tabsContainer").appendChild(tab);
    return tab;
  }

  function changeTabType(type) {
    //document.getElementById("create-tab-start").innerHTML="";
    //let hideAll = document.querySelectorAll(".createTab, .tabTitle");
    for (let i=0;i<_tabsContainers.length;i++) {
      _tabsContainers[i].style.display = "none"; 
      _tabsContainers[i].classList.remove("activeType");
      _tabsTitles[i].style.display = "none";
      _tabsTitles[i].classList.remove("activeType");
    }
    if(type=="word") {
      for(let i=0;i<4;i++) {
        _tabsTitles[i].style.display = "";
      }
      _tabsContainers[0].style.display = "";
      _tabsTitles[0].classList.add("activeType");
      _tabsTypes[0].classList.add("activeType");
      _tabsTypes[1].classList.remove("activeType");
    } else {
      for(let i=4;i<7;i++) {
        _tabsTitles[i].style.display = "";
      }
      _tabsContainers[4].style.display = "";
      _tabsTitles[4].classList.add("activeType");
      _tabsTypes[0].classList.remove("activeType");
      _tabsTypes[1].classList.add("activeType");
    }
  }

  function changeTab(whichTab) {
    for (let i=0;i<_tabsContainers.length;i++) {
      _tabsTitles[i].classList.remove("activeType");
      _tabsContainers[i].style.display = "none";
    }
    _tabsTitles[whichTab].classList.add("activeType");
    _tabsContainers[whichTab].style.display = "";
  }

  function emptyMainBox() {
    mainBox.innerHTML = "";
    _tabsTypes = [];
    _tabsTitles = [];
    _tabsContainers = [];
    _colorPickers = [];
    _currentlyLoaded = {};
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
  //testing jscolor
  jsColorScript=document.createElement('script');
  jsColorScript.src='https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.5.2/jscolor.min.js';
  jsColorScript.async=true;
  document.body.appendChild(jsColorScript);
  jsColorScript.onload = () => {
    GUI.instance.DisplayMessage("Everything was loaded correctly, hopefully! \\[T]/");
    jsColor = JSColor; 
  }

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