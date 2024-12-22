/*
A script that creates a menu in Bmr that you can use to load or create hypno messages, so have fun with it :P!
*/

var BMRHYPNO = {};

var bmrHypno = function() {
  var mainBox = createElement("div", "mainBox");
  var spawnArea = createElement("div","hypnoSpawnArea");
  var jsColor = {};
  var _menuModified = false;
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
      "name": "New one",
      "spawnTime": 500,
      "values": [
        {
          "type": "word",
          "value": "Word",
          "leaveTime": 5000,
          "position": "Random",
          "font": ["64","128"],
          "color": "Random",
          "border": "#000000",
          "gradient": "None",
          "opacity": "0.5",
          "rotation": ["0","0"],
          "animation": "None"
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
          "border": "#def456",
          "gradient": {
            "gradients": [
              {
              "type": "radial-gradient",
              "direction": "circle",
              "colors": ["#008000FF","#0000FFFF","#D2FF1FFF","#C0FBFFFF","#1A2323FF"],
              "positions": ["0","15","25","75",""],
              "positions2": ["15","25","50","","80"]
            },
            {
              "type": "linear-gradient",
              "direction": 180,
              "colors": ["#FFFFFF00","#000000FF"],
              "positions": ["","75"],
              "positions2": ["",""]
            }
          ],
          "name": "ShadowBelow",
          "blendMode": "overlay"
          },
          "opacity": "0.5",
          "rotation": ["-45","45"],
          "animation": {
            "keyframes": [
              {
                "offset": 1,
                "names": ["transform"],
                "values": ["rotate(720deg)"]
              }
            ],
            "name": "Spin",
            "timings": {
              "easing": "linear",
              "duration": 1000,
              "iterations": "1"
            }
          }
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
      "gradients": [
        {
        "type": "linear-gradient",
        "direction": 0,
        "colors": ["#000000FF","#848484FF"],
        "positions": ["",""],
        "positions2": ["",""]
      }
    ],
    "name": "New one",
    "blendMode": "normal"
    },
    "Rainbow1": {
      "gradients":  [
      {
        "type": "linear-gradient",
        "direction": 90,
        "colors": ["#FF0000FF","#FFA500FF","#FFFF00FF","#008000FF","#0000FFFF","#4B0082FF","#8F00FFFF"],
        "positions": ["","","","","","",""],
        "positions2": ["","","","","","",""]
      }
    ],
    "name": "Rainbow1",
    "blendMode": "overlay"
    },
    "ShadowBelow": {
      "gradients": [
        {
        "type": "linear-gradient",
        "direction": 180,
        "colors": ["#848484FF","#848484FF"],
        "positions": ["",""],
        "positions2": ["",""]
      },
      {
        "type": "linear-gradient",
        "direction": 180,
        "colors": ["#FFFFFF00","#000000FF"],
        "positions": ["","75"],
        "positions2": ["",""]
      }
    ],
    "name": "ShadowBelow",
    "blendMode": "overlay"
    },
    "RandomPositions": {
      "gradients": [
        {
        "type": "radial-gradient",
        "direction": "circle",
        "colors": ["#008000FF","#0000FFFF","#D2FF1FFF","#C0FBFFFF","#1A2323FF"],
        "positions": ["0","15","25","75",""],
        "positions2": ["15","25","50","","80"]
      },
      {
        "type": "linear-gradient",
        "direction": 180,
        "colors": ["#FFFFFF00","#000000FF"],
        "positions": ["","75"],
        "positions2": ["",""]
      }
    ],
    "name": "ShadowBelow",
    "blendMode": "overlay"
    }
  };
  var _preloadedAnimations = {
    "New one": {
      "keyframes": [
        {
          "offset": 0,
          "names": ["name"],
          "values": ["value"]
        }
      ],
      "name": "New one",
      "timings": {
        "easing": "linear",
        "duration": 5000,
        "iterations": 1
      }
    },
    "Spin": {
      "keyframes": [
        {
          "offset": 1,
          "names": ["transform"],
          "values": ["rotate(720deg)"]
        }
      ],
      "name": "Spin",
      "timings": {
        "easing": "linear",
        "duration": 1000,
        "iterations": "1"
      }
    },
    "Gelatine": {
      "keyframes": [
        {
          "offset": 0,
          "names": ["transform"],
          "values": ["scale(1,1)"]
        },
        {
          "offset": 0.25,
          "names": ["transform"],
          "values": ["scale(0.9,1.1)"]
        },
        {
          "offset": 0.5,
          "names": ["transform"],
          "values": ["scale(1.1,0.9)"]
        },
        {
          "offset": 0.75,
          "names": ["transform"],
          "values": ["scale(0.95,1.05)"]
        }
      ],
      "name": "Gelatine",
      "timings": {
        "easing": "linear",
        "duration": 1000,
        "iterations": "1"
      }
    },
    "Fade out": {
      "keyframes": [
        {
          "offset": 1,
          "names": ["opacity"],
          "values": ["0"]
        }
      ],
      "name": "Fade out",
      "timings": {
        "easing": "linear",
        "duration": 1000,
        "iterations": "1"
      }
    },
    "Wobble": {
      "keyframes": [
        {
          "offset": 0,
          "names": ["transform"],
          "values": ["translateX(0%)"]
        },
        {
          "offset": 0.15,
          "names": ["transform"],
          "values": ["translateX(-25%) rotate(-5deg)"]
        },
        {
          "offset": 0.30,
          "names": ["transform"],
          "values": ["translateX(20%) rotate(3deg)"]
        },
        {
          "offset": 0.45,
          "names": ["transform"],
          "values": ["translateX(-15%) rotate(-3deg)"]
        },
        {
          "offset": 0.60,
          "names": ["transform"],
          "values": ["translateX(10%) rotate(2deg)"]
        },
        {
          "offset": 0.75,
          "names": ["transform"],
          "values": ["translateX(-5%) rotate(-1deg)"]
        },
        {
          "offset": 1,
          "names": ["transform"],
          "values": ["translateX(0%)"]
        },
      ],
      "name": "Wobble",
      "timings": {
        "easing": "ease",
        "duration": 1000,
        "iterations": "1"
      }
    },
    "Bounce in": {
      "keyframes": [
        {
          "offset": 0,
          "names": ["transform"],
          "values": ["scale(0.3)"]
        },
        {
          "offset": 0.5,
          "names": ["transform"],
          "values": ["scale(1.05)"]
        },
        {
          "offset": 0.7,
          "names": ["transform"],
          "values": ["scale(0.9)"]
        },
        {
          "offset": 1,
          "names": ["transform"],
          "values": ["scale(1)"]
        }
      ],
      "name": "Bounce in",
      "timings": {
        "easing": "linear",
        "duration": 1000,
        "iterations": "1"
      }
    },
  };
  const _templateHypno = {
    "name": "New one",
    "spawnTime": "500",
    "values": [
      {
        "type": "word",
        "value": "Word",
        "leaveTime": "5000",
        "position": "Random",
        "font": ["64","128"],
        "color": "Random",
        "border": "#000000",
        "gradient": "None",
        "opacity": "0.5",
        "rotation": ["0","0"],
        "animation": "None"
      }
    ],
    "selectedValue": 0,
    "selectedGradient": 0,
    "selectedGradientColor": 0,
    "selectedKeyframe": 0,
    "selectedKeyframeValue": 0
  };
  const _templateGradient = {
    "gradients": [
      {
        "type": "linear-gradient",
        "direction": "0",
        "colors": ["#000000FF","#848484FF"],
        "positions": ["",""],
        "positions2": ["",""]
      },
    ],
    "name": "New one",
    "blendMode": "normal"
  };
  const _templateAnimation = {
    "keyframes": [
      {
        "offset": 0,
        "names": ["filter"],
        "values": ["brightness(1.5)"]
      },
      {
        "offset": 0.5,
        "names": ["transform","background"],
        "values": ["scale(3)","blue"]
      }
    ],
    "name": "New one",
    "timings": {
      "easing": "linear",
      "duration": 5000,
      "iterations": 1
    }
  }

  function startBmr() {
    //add mainBox to div id=menus in bmr
    //adds the close button and resets everything, uses css from bmr if mainBox was added to menus
    emptyMainBox();
    let topCont = createElement("div","topContainer","topStart");
    let closeButton = createElement("div","closeButton","button close");
    closeButton.onclick = () => { mainBox.remove(); };
    topCont.appendChild(closeButton);
    mainBox.appendChild(topCont);
    //adding the grid
    mainBox.appendChild(createBmrStartingGrid());

    if(!_menuModified) {
      document.getElementById("menu").getElementsByClassName("button")[0].onclick = rewrittenDropdownFunction();
      document.getElementById("scaler").appendChild(spawnArea);
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
    loadSelectionInGrid(_preloadedHypnos["New one"]);
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
        loadSelectionInGrid(_preloadedHypnos[selected.text]);
        displayBtn.style.display = "none";
      }
    };
  }

  function loadSelectionInGrid(selection) {
    //name
    _currentlyLoaded = selection;
    _currentlyLoaded.selectedValue=0;
    _currentlyLoaded.selectedGradient=0;
    _currentlyLoaded.selectedGradientColor=0;
    _currentlyLoaded.selectedKeyframe=0;
    _currentlyLoaded.selectedKeyframeValue=0;
    document.getElementById("formNameInput").value = _currentlyLoaded.name;
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
      //gradient
      let wordGradientSelect = document.getElementById("wordGradientSelect");
      let wordGradientCreatorContainer = document.getElementById("wordGradientCreatorContainer");
      let wordGradientPreviewContainer = document.getElementById("wordGradientPreviewContainer");
      if(cur.gradient == "None") {
        wordGradientSelect.selectedIndex = 0;
        wordGradientCreatorContainer.style.display = "none";
        wordGradientPreviewContainer.style.display = "none";
      } else {
        wordGradientSelect.selectedIndex = 1;
        wordGradientCreatorContainer.style.display = "";
        wordGradientPreviewContainer.style.display = "";
        updateGradientPreviewLeft(cur.gradient,0,0);
        updateGradientPreviewRight(cur.gradient);
      }
      //opacity
      document.getElementById("wordOpacityInput").value = cur.opacity;
      document.getElementById("wordOpacityRange").value = cur.opacity;
      //rotation
      document.getElementById("wordRotationInput1").value = cur.rotation[0];
      document.getElementById("wordRotationInput2").value = cur.rotation[1];
      //animation/additional effects
      let wordAnimationSelect = document.getElementById("wordAnimationSelect");
      let wordAnimationCreatorContainer = document.getElementById("wordAnimationCreatorContainer");
      let wordAnimationPreviewContainer = document.getElementById("wordAnimationPreviewContainer");
      if(cur.animation == "None") {
        wordAnimationSelect.selectedIndex = 0;
        wordAnimationCreatorContainer.style.display = "none";
        wordAnimationPreviewContainer.style.display = "none";
      } else {
        wordAnimationSelect.selectedIndex = 1;
        wordAnimationCreatorContainer.style.display = "";
        wordAnimationPreviewContainer.style.display = "";
        updateAnimationLeft(cur.animation,0,0);
      }
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
    mainBox.insertAdjacentHTML("beforeend",createMenuHTML);
    //name of the set
    let formNameInput = document.getElementById("formNameInput");
    formNameInput.oninput = (e) => {
      _currentlyLoaded.name = e.target.value;
      console.log(_currentlyLoaded);
    }
    formNameInput.onchange = formNameInput.oninput;

    //making the two inputs update each other //TODO LATER CHECK CORRECT VALUE
    let spawnInput = document.getElementById("formSpawnInput");
    let spawnInputRange = document.getElementById("formSpawnRange");
    spawnInput.oninput = (e) => {
      spawnInputRange.value = e.target.value;
      _currentlyLoaded.spawnTime = e.target.value;
    }
    spawnInput.onchange = spawnInput.oninput;
    spawnInputRange.oninput = (e) => {
      spawnInput.value = e.target.value;
      _currentlyLoaded.spawnTime = e.target.value;
    }
    spawnInputRange.onchange = spawnInputRange.oninput;
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
    //value
    let wordValueInput = document.getElementById("wordValueInput");
    wordValueInput.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].value = e.target.value;
    }
    //time
    let wordTimeInput = document.getElementById("wordTimeInput");
    let wordTimeRange = document.getElementById("wordTimeRange");
    wordTimeInput.oninput = (e) => {
      wordTimeRange.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].leaveTime = e.target.value;
    }
    wordTimeInput.onchange = (e) => wordTimeInput.oninput;
    wordTimeRange.oninput = (e) => {
      wordTimeInput.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].leaveTime = e.target.value;
    }
    wordTimeRange.onchange = (e) => wordTimeRange.oninput;

    //position
    let wordPositionInputSelect = document.getElementById("wordPositionInputSelect");
    let wordPositionInput1 = document.getElementById("wordPositionInput1");
    let wordPositionInput2 = document.getElementById("wordPositionInput2");
    wordPositionInputSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex];
      if(selected.text == "Random") {
        wordPositionInput1.style.display = "none";
        wordPositionInput2.style.display = "none";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].position = "Random";
      } else {
        wordPositionInput1.style.display = "";
        wordPositionInput2.style.display = "";
        let chooseWindow = createElement("div","chooseWindow","","Click where you would like your word top-left corner to be.");
        document.getElementById("scaler").appendChild(chooseWindow);
        chooseWindow.onclick = (evt) => {
          let boundRect=evt.target.getBoundingClientRect();
          wordPositionInput1.value = ((evt.clientX-boundRect.left)*100/boundRect.width).toFixed(2)+"%";
          wordPositionInput2.value = ((evt.clientY-boundRect.top)*100/boundRect.height).toFixed(2)+"%";
          _currentlyLoaded.values[_currentlyLoaded.selectedValue].position = [wordPositionInput1.value,wordPositionInput2.value];
          chooseWindow.remove();
        };
      }
    };
    wordPositionInput1.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].position[0] = e.target.value;
    }
    wordPositionInput1.onchange = wordPositionInput1.oninput;
    wordPositionInput2.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].position[1] = e.target.value;
    }
    wordPositionInput2.onchange = wordPositionInput2.oninput;

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
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].font = [wordFontInput1.value, wordFontInput2.value];
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
    let createWordColorTabHTML = `
    <div id="wordColorContainer" class="tabWordContainer">
      <div id="wordColorLabel" class="gridLabel">Color for your word:</div>
      <div id="wordColorInputContainer" class="">
        <select id="wordColorSelect" class="selectContainer">
          <option value="Random">Random</option>
          <option value="Choose">Choose</option>
        </select>
        <input id="wordColorInput" class="gridTextInput" placeholder="# Color Code" style="display: none;" type="text">
      </div>
    </div>
    <div id="wordBorderContainer" class="tabWordContainer">
      <div id="wordBorderLabel" class="gridLabel">Color for your border:</div>
      <div id="wordBorderInputContainer">
        <select id="wordBorderSelect" class="selectContainer">
          <option value="None">None</option>
          <option value="Choose">Choose</option>
        </select>
        <input id="wordBorderInput" class="gridTextInput" placeholder="# Color Code" style="display: none;" type="text">
      </div>
    </div>
    <div id="wordGradientContainer" class="tabWordContainer">
      <div id="wordGradientLabel" class="gridLabel">Gradients! (You may choose to replace the color with a gradient instead. Be warned that your color will be ignored if you choose this)</div>
      <div id="wordGradientInputContainer">
        <select id="wordGradientSelect" class="selectContainer">
          <option value="None">None</option>
          <option value="Yes">Yes</option>
        </select>
        <div id="wordGradientCreatorContainer" class="fontPreview" style="display: none;">
          <div id="preloadGradientContainer" class="sideCreatorBox">
            <div id="preloadGradientLabel" class="gradientLabel">Preload?</div>
              <select id="preloadGradientSelect" class="selectContainer">
              </select>
             </div>
            <div id="nameGradientContainer" class="sideCreatorBox">
              <div id="nameGradientLabel" class="gradientLabel">Name?</div>
              <input id="nameGradientInput" class="gradientTextInput" placeholder="Name here" type="text">
            </div>
            <div id="blendGradientContainer" class="sideCreatorBox">
              <div id="blendGradientLabel" class="gradientLabel">Blend Type</div>
              <select id="blendSelect" class="selectContainer">
                <option value="normal">normal</option>
                <option value="multiply">multiply</option>
                <option value="screen">screen</option>
                <option value="overlay">overlay</option>
                <option value="darken">darken</option>
                <option value="lighten">lighten</option>
                <option value="color-dodge">color-dodge</option>
                <option value="color-burn">color-burn</option>
                <option value="hard-light">hard-light</option>
                <option value="soft-light">soft-light</option>
                <option value="difference">difference</option>
                <option value="exclusion">exclusion</option>
                <option value="hue">hue</option>
                <option value="saturation">saturation</option>
                <option value="color">color</option>
                <option value="luminosity">luminosity</option>
              </select>
            </div>                    
            <div id="gradientSelectedContainer" class="sideCreatorBox">
              <div id="gradientSelectedLabel" class="gradientLabel">Selected Gradient</div>
              <select id="gradientSelectedSelect" class="selectContainer">
                <option value="0">0</option>
              </select>
              <div id="gradientBtnContainer" class="sideCreatorBox">
                <div id="gradientAddBtn" class="gradientBtn">+</div>
                <div id="gradientRemoveBtn" class="gradientBtn">-</div>
              </div>
            </div>
            <div id="typeGradientContainer" class="sideCreatorBox">
              <div id="typeGradientLabel" class="gradientLabel">Type</div>
              <select id="typeGradientSelect" class="selectContainer">
                <option value="linear-gradient">linear</option>
                <option value="radial-gradient">radial</option>
                <option value="conic-gradient">conic</option>
                <option value="repeating-linear-gradient">repeating linear</option>
                <option value="repeating-radial-gradient">repeating radial</option>
                <option value="repeating-conic-gradient">repeating conic</option>
              </select>
            </div>
            <div id="angleGradientContainer" class="sideCreatorBox">
              <div id="angleGradientLabel" class="gradientLabel">Angle</div>
              <input id="angleGradientInput" class="gradientTextInput" placeholder="Use deg" type="text">
              <input id="angleGradientInputRange" class="gradientTextInput" placeholder="0" type="range" min="0" max="360">
            </div>
            <div id="shapeGradientContainer" class="sideCreatorBox" style="display: none;">
              <div id="shapeGradientLabel" class="gradientLabel">Shape</div>
              <select id="shapeSelect" class="selectContainer">
                <option value="ellipse">ellipse</option>
                <option value="circle">circle</option>
              </select>
            </div>
            <div id="colorGradientSelectedContainer" class="sideCreatorBox">
              <div id="colorGradientSelectedLabel" class="gradientLabel">Selected color:</div>
              <select id="colorGradientSelectedSelect" class="selectContainer">
                <option value="0">0</option>
                <option value="1">1</option>
              </select>
              <div id="colorGradientBtnContainer" class="sideCreatorBox">
                <div id="colorGradientAddBtn" class="gradientBtn">+</div>
                <div id="colorGradientRemoveBtn" class="gradientBtn">-</div>
              </div>
            </div>
            <div id="changeColorGradientContainer" class="sideCreatorBox">
              <div id="changeColorGradientLabel" class="gradientLabel">Change Color</div>
              <input id="changeColorGradientInput" class="gradientTextInput" placeholder="# Color Code" type="text">
            </div>
            <div id="positionGradientContainer" class="sideCreatorBox">
              <select id="positionGradientSelect" class="gradientLabel">
                <option>Start at</option>
                <option>End at</option>
              </select>
              <input id="positionGradientInput" class="gradientTextInput" type="text" placeholder="Auto">
              <input id="positionGradientInputRange" class="gradientTextInput" placeholder="50" type="range" min="0" max="100">
            </div>
            <div id="previewGradientContainer" class="sideCreatorBox">                                
            </div>
          </div>
        <div id="wordGradientPreviewContainer" class="fontPreview" style="display: none;">
          <div id="wordGradientPreviewBg" class="gradientPreview"></div>
          <div id="wordGradientPreviewTextContainer" class="gradientPreview">
            <div id="wordGradientPreviewText" class="">Test</div>
          </div>
        </div>
      </div>
    </div>
    `;
    tab.insertAdjacentHTML("beforeend",createWordColorTabHTML);
    document.getElementById("tabsContainer").appendChild(tab);
    //color
    let wordColorInput = document.getElementById("wordColorInput");
    var wordColorPicker = new jsColor(wordColorInput,{format:'hex',
      previewPosition:'right',
      previewSize:50,
      backgroundColor:'rgba(0,0,0,0.9)',
      borderColor:'#343434',
      borderWidth:2});
    let wordColorSelect = document.getElementById("wordColorSelect");
    wordColorSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex];
      if(selected.text == "Random") {
        wordColorInput.style.display = "none";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].color = "Random";
      } else {
        wordColorInput.style.display = "";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].color = wordColorPicker.toHEXString();
      }
    };
    wordColorInput.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].color = wordColorPicker.toHEXString();
    }
    _colorPickers.push(wordColorPicker);
    //border
    let wordBorderInput = document.getElementById("wordBorderInput");
    var wordBorderPicker = new jsColor(wordBorderInput,{format:'hex',
      previewPosition:'right',
      previewSize:50,
      backgroundColor:'rgba(0,0,0,0.9)',
      borderColor:'#343434',
      borderWidth:2});
    let wordBorderSelect = document.getElementById("wordBorderSelect");
    wordBorderSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex];
      if(selected.text == "None") {
        wordBorderInput.style.display = "none";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].border = "None";
      } else {
        wordBorderInput.style.display = "";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].border = wordBorderPicker.toHEXString();
      }
    };
    wordBorderInput.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].border = wordBorderPicker.toHEXString();
    }
    _colorPickers.push(wordBorderPicker);
    //gradient
    let wordGradientSelect = document.getElementById("wordGradientSelect");
    wordGradientSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex];
      let wordGradientCreatorContainer = document.getElementById("wordGradientCreatorContainer");
      let wordGradientPreviewContainer = document.getElementById("wordGradientPreviewContainer");
      if(selected.text == "None") {
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient = "None";
        wordGradientCreatorContainer.style.display = "none";
        wordGradientPreviewContainer.style.display = "none";
      } else {
        if(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient == "None") {
          _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient = JSON.parse(JSON.stringify(_templateGradient));
          _currentlyLoaded.selectedGradient = 0;
          _currentlyLoaded.selectedGradientColor = 0;
          updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,0,0);
          updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
        }
        wordGradientCreatorContainer.style.display = "";
        wordGradientPreviewContainer.style.display = "";
      }
    }

    //gradientPreviews
    let preloadGradientSelect = document.getElementById("preloadGradientSelect");
    let wordGradientPreviewBg = document.getElementById("wordGradientPreviewBg");
    let wordGradientPreviewText = document.getElementById("wordGradientPreviewText");
    preloadGradientSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex].text;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient = _preloadedGradients[selected];
      _currentlyLoaded.selectedGradient = 0;
      _currentlyLoaded.selectedGradientColor = 0;
      updateGradientPreviewRight(_preloadedGradients[selected]);
      updateGradientPreviewLeft(_preloadedGradients[selected],0,0); 
    };
    for(gradName in _preloadedGradients) {
      console.log(gradName);
      preloadGradientSelect.options.add(new Option(gradName,gradName));
    }

    //gradient +/- buttons
    let gradientAddBtn = document.getElementById("gradientAddBtn");
    let gradientRemoveBtn = document.getElementById("gradientRemoveBtn");
    gradientAddBtn.onclick = (e) => {
      let gr = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient;
      gr.gradients.push(JSON.parse(JSON.stringify(_templateGradient.gradients[0])));
      _currentlyLoaded.selectedGradient = gr.gradients.length-1;
      _currentlyLoaded.selectedGradientColor = 0;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    };
    gradientRemoveBtn.onclick = (e) => {
      let gr = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient;
      if(gr.gradients.length == 1) {
        GUI.instance.DisplayMessage("You can't have less than 1 gradient in this gradient group");
        return;
      }
      gr.gradients.splice(_currentlyLoaded.selectedGradient,1);
      _currentlyLoaded.selectedGradient = _currentlyLoaded.selectedGradient==0?0:_currentlyLoaded.selectedGradient-1;
      _currentlyLoaded.selectedGradientColor = 0;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);  
    };

    //choose which gradient to load
    let gradientSelectedSelect = document.getElementById("gradientSelectedSelect");
    gradientSelectedSelect.onchange = (e) => {
      console.log(_currentlyLoaded);
      let selected = e.target.selectedIndex;
      _currentlyLoaded.selectedGradient = selected;
      _currentlyLoaded.selectedGradientColor = 0;
      let selectedGradient = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient;
      updateGradientPreviewLeft(selectedGradient,selected,0);
    }
    //name gradient, also, kinda useless
    let nameGradientInput = document.getElementById("nameGradientInput");
    nameGradientInput.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.name = e.target.value;
    };
    //blend gradient 
    let blendSelect = document.getElementById("blendSelect");
    blendSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex].value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.blendMode = selected;
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }
    //type gradient
    let typeGradientSelect = document.getElementById("typeGradientSelect");
    typeGradientSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex];
      if(selected.text.includes("radial")) {
        document.getElementById("shapeGradientContainer").style.display = "";
        document.getElementById("angleGradientContainer").style.display = "none";
        shapeSelect.selectedIndex = 0;
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].direction ="ellipse";
      } else {
        document.getElementById("shapeGradientContainer").style.display = "none";
        document.getElementById("angleGradientContainer").style.display = "";
        angleGradientInput.value = 0;
        angleGradientInputRange.value = 0;
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].direction = 0;
      }
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].type = selected.value;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }

    //angle gradient
    let angleGradientInput = document.getElementById("angleGradientInput");
    let angleGradientInputRange = document.getElementById("angleGradientInputRange");
    angleGradientInput.oninput = (e) => { 
      angleGradientInputRange.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].direction = e.target.value;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }
    angleGradientInputRange.oninput = (e) => { 
      angleGradientInput.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].direction = e.target.value;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }
    angleGradientInput.onchange = angleGradientInput.oninput;
    angleGradientInputRange.onchange = angleGradientInputRange.oninput;

    //shape gradient (radial)
    let shapeSelect = document.getElementById("shapeSelect");
    shapeSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex].value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].direction = selected;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    };

    //color in gradient
    let gradientColorInput = document.getElementById("changeColorGradientInput");
    var gradientColorPicker = new jsColor(gradientColorInput,{format:'hexa',
      previewPosition:'right',
      previewSize:30,
      backgroundColor:'rgba(0,0,0,0.9)',
      borderColor:'#343434',
      borderWidth:2});
    _colorPickers.push(gradientColorPicker);
    let colorGradientSelectedSelect = document.getElementById("colorGradientSelectedSelect");
    colorGradientSelectedSelect.onchange = (e) => {
      console.log(_currentlyLoaded);
      let selected = e.target.selectedIndex;
      let selectedGradient = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient];
      gradientColorPicker.fromString(selectedGradient.colors[selected]);
      if (positionGradientSelect.value == "Start at") {
        positionGradientInput.value = selectedGradient.positions[selected];
        positionGradientInputRange.value = selectedGradient.positions[selected];
      } else {
        positionGradientInput.value = selectedGradient.positions2[selected];
        positionGradientInputRange.value = selectedGradient.positions2[selected];        
      }
      _currentlyLoaded.selectedGradientColor = selected;
    };

    gradientColorInput.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].colors[_currentlyLoaded.selectedGradientColor] = gradientColorPicker.toHEXAString();
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }

    //color +/- button
    let colorGradientAddBtn = document.getElementById("colorGradientAddBtn");
    let colorGradientRemoveBtn = document.getElementById("colorGradientRemoveBtn");
    colorGradientAddBtn.onclick = (e) => {
      let gr = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient];
      gr.colors.push("#000000FF");
      gr.positions.push("");
      gr.positions2.push("");
      _currentlyLoaded.selectedGradientColor = gr.colors.length-1;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }
    colorGradientRemoveBtn.onclick = (e) => {
      let gr = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient];
      if(gr.colors.length == 2) {
        GUI.instance.DisplayMessage("You can't have less than 2 colors");
        return;
      }
      gr.colors.splice(_currentlyLoaded.selectedGradientColor,1);
      gr.positions.splice(_currentlyLoaded.selectedGradientColor,1);
      gr.positions2.splice(_currentlyLoaded.selectedGradientColor,1);
      _currentlyLoaded.selectedGradientColor = _currentlyLoaded.selectedGradientColor==0?0:_currentlyLoaded.selectedGradientColor-1;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);      
    }

    //position color
    let positionGradientSelect = document.getElementById("positionGradientSelect");
    let positionGradientInput = document.getElementById("positionGradientInput");
    let positionGradientInputRange = document.getElementById("positionGradientInputRange");
    positionGradientSelect.onchange = (e) => {
      console.log(e.target.value);
      if(e.target.value == "Start at") {
        positionGradientInput.value = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions[_currentlyLoaded.selectedGradientColor];
        positionGradientInputRange.value = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions[_currentlyLoaded.selectedGradientColor];
      } else {
        positionGradientInput.value = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions2[_currentlyLoaded.selectedGradientColor];
        positionGradientInputRange.value = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions2[_currentlyLoaded.selectedGradientColor];        
      }
    };
    positionGradientInput.oninput = (e) => {
      positionGradientInputRange.value = e.target.value;
      if(positionGradientSelect.value == "Start at") {
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions[_currentlyLoaded.selectedGradientColor] = e.target.value;
      } else {
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions2[_currentlyLoaded.selectedGradientColor] = e.target.value;
      }
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }
    positionGradientInputRange.oninput = (e) => {
      positionGradientInput.value = e.target.value;
      if(positionGradientSelect.value == "Start at") {
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions[_currentlyLoaded.selectedGradientColor] = e.target.value;
      } else {
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions2[_currentlyLoaded.selectedGradientColor] = e.target.value;
      }
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }
    positionGradientInput.onchange = positionGradientInput.oninput;
    positionGradientInputRange.onchange = positionGradientInputRange.oninput;

    return tab;
  }

  function updateGradientPreviewLeft(selectedGradient,displayedGradient,displayedColor) {
    document.getElementById("nameGradientInput").value = selectedGradient.name;
    document.getElementById("blendSelect").value = selectedGradient.blendMode;
    let gradientSelectedSelect = document.getElementById("gradientSelectedSelect");
    gradientSelectedSelect.options.length = 0;
    for (let i=0; i < selectedGradient.gradients.length; i++) {
      gradientSelectedSelect.options.add(new Option(i,i));
    }
    gradientSelectedSelect.selectedIndex = displayedGradient;
    document.getElementById("typeGradientSelect").value = selectedGradient.gradients[displayedGradient].type;
    if(selectedGradient.gradients[displayedGradient].type.includes("radial")) {
      document.getElementById("shapeSelect").value = selectedGradient.gradients[displayedGradient].direction;
      document.getElementById("shapeGradientContainer").style.display = "";
      document.getElementById("angleGradientContainer").style.display = "none";
    } else {
      document.getElementById("angleGradientInput").value = selectedGradient.gradients[displayedGradient].direction;
      document.getElementById("angleGradientInputRange").value = selectedGradient.gradients[displayedGradient].direction;
      document.getElementById("shapeGradientContainer").style.display = "none";
      document.getElementById("angleGradientContainer").style.display = "";      
    }
    let colorGradientSelectedSelect = document.getElementById("colorGradientSelectedSelect");
    colorGradientSelectedSelect.options.length = 0;
    for (let i=0; i < selectedGradient.gradients[displayedGradient].colors.length; i++) {
      colorGradientSelectedSelect.options.add(new Option(i,i));
    }    
    colorGradientSelectedSelect.selectedIndex = displayedColor;
    _colorPickers[2].fromString(selectedGradient.gradients[displayedGradient].colors[displayedColor]);
    if(document.getElementById("positionGradientSelect").value == "Start at") {
      document.getElementById("positionGradientInput").value = selectedGradient.gradients[displayedGradient].positions[displayedColor];
      document.getElementById("positionGradientInputRange").value = selectedGradient.gradients[displayedGradient].positions[displayedColor];
    } else {
      document.getElementById("positionGradientInput").value = selectedGradient.gradients[displayedGradient].positions2[displayedColor];
      document.getElementById("positionGradientInputRange").value = selectedGradient.gradients[displayedGradient].positions2[displayedColor];
    }

    //the preview
    let grad = selectedGradient.gradients[displayedGradient];
    let gradImg = `${grad.type}(`;
    gradImg += grad.type.includes("conic")?`from ${grad.direction}`:`${grad.direction}`;
    gradImg += grad.type.includes("radial")?",":"deg,";
    for (i in grad.colors) {
      gradImg+=`${grad.colors[i]} ${grad.positions[i]!=""?grad.positions[i]+"%":""} ${grad.positions2[i]!=""?grad.positions2[i]+"%":""},`;
    }
    gradImg = gradImg.slice(0,-1);
    gradImg += ")";
    document.getElementById("previewGradientContainer").style.backgroundImage = gradImg;
  }

  function updateGradientPreviewRight(selectedGradient) {
    let wordGradientPreviewBg = document.getElementById("wordGradientPreviewBg");
    let wordGradientPreviewText = document.getElementById("wordGradientPreviewText");
    let grad = "";
    for(i in selectedGradient.gradients) {
      grad += `${selectedGradient.gradients[i].type}(`;
      grad += selectedGradient.gradients[i].type.includes("conic")?`from ${selectedGradient.gradients[i].direction}`:`${selectedGradient.gradients[i].direction}`;
      grad += selectedGradient.gradients[i].type.includes("radial")?",":"deg,";
      for(j in selectedGradient.gradients[i].colors) {
        grad+=`${selectedGradient.gradients[i].colors[j]} ${selectedGradient.gradients[i].positions[j]!=""?selectedGradient.gradients[i].positions[j]+"%":""} ${selectedGradient.gradients[i].positions2[j]!=""?selectedGradient.gradients[i].positions2[j]+"%":""},`;
      }
      grad = grad.slice(0,-1);
      grad+="),";
    }
    grad = grad.slice(0,-1);
    wordGradientPreviewBg.style.backgroundImage=grad;
    wordGradientPreviewBg.style.backgroundBlendMode=selectedGradient.blendMode;
    wordGradientPreviewText.style.backgroundImage=grad;
    wordGradientPreviewText.style.backgroundBlendMode=selectedGradient.blendMode;
  }

  function createWordEffectsTab() {
    let tab = createElement("div","wordEffectsTab","createTab");
    let createWordEffectTabHTML = `
    <div id="wordOpacityContainer" class="tabWordContainer">
      <div id="wordOpacityLabel" class="gridLabel">Opacity (between 0 and 1):</div>
      <div id="wordOpacityInputContainer">
        <input id="wordOpacityInput" class="gridTextInput" placeholder="Opacity here, between 0 and 1" type="text">
        <input id="wordOpacityRange" placeholder="" type="range" min="0.01" max="1" step="0.01"></div>
    </div>
    <div id="wordRotationContainer" class="tabWordContainer">
      <div id="wordRotationLabel" class="gridLabel">Rotation between(in degrees):</div>
      <div id="wordRotationInputContainer">
        <input id="wordRotationInput1" class="gridTextInput" type="text" placeholder="Min here(Use deg)">
        <input id="wordRotationInput2" class="gridTextInput" type="text" placeholder="Max here(Use deg)">
      </div>
    </div>
    <div id="wordAnimationInputContainer" class="tabWordContainer">
      <div id="wordAnimationLabel" class="gridLabel">Animation/Additional properties (Anything in the 0 keyframe can be treated as an additional property):</div>
      <div id="wordAnimationContainer">
        <select id="wordAnimationSelect" class="selectContainer">
          <option>None</option>
          <option>Yes</option>
        </select>
        <div id="wordAnimationCreatorContainer" class="animationPreview" style="display: none;">
          <div id="preloadAnimationContainer" class="sideCreatorBox">
            <div id="preloadAnimationLabel" class="gradientLabel">Preload?</div>
            <select id="preloadAnimationSelect" class="selectContainer">
            </select>
          </div>
          <div id="nameAnimationContainer" class="sideCreatorBox">
            <div id="nameAnimationLabel" class="gradientLabel">Name?</div>
            <input id="nameAnimationInput" class="gradientTextInput" placeholder="Name here" type="text">
            <div id="easeAnimationLabel" class="gradientLabel">Ease?</div>
            <select id="easeAnimationSelect" class="selectContainer">
              <option value="linear">linear</option>
              <option value="ease">ease</option>
              <option value="ease-in">ease-in</option>
              <option value="ease-out">ease-out</option>
              <option value="ease-in-out">ease-in-out</option>
            </select>
          </div>
          <div id="durationAnimationContainer" class="sideCreatorBox">
            <div id="durationAnimationLabel" class="gradientLabel">Duration?</div>
            <input id="durationAnimationInput" class="gradientTextInput" type="text" placeholder="(in milliseconds)">
          </div>
          <div id="iterationsAnimationContainer" class="sideCreatorBox">
            <div id="iterationsAnimationLabel" class="gradientLabel">Iterations?</div>
            <input id="iterationsAnimationInput" class="gradientTextInput" type="text" placeholder="Number">
            <input id="iterationsAnimationInputRange" class="gradientTextInput" placeholder="0" type="range" min="1" max="10">
          </div>
          <div id="keyframeSelectedContainer" class="sideCreatorBox">
            <div id="keyframeSelectedLabel" class="gradientLabel">Selected Keyframe</div>
            <select id="keyframeSelectedSelect" class="selectContainer">                
              <option value="0">0</option>
            </select>
            <div id="animationBtnContainer" class="sideCreatorBox">
              <div id="keyframeAddBtn" class="gradientBtn">+</div>
              <div id="keyframeRemoveBtn" class="gradientBtn">-</div>
            </div>
          </div>
          <div id="offsetAnimationContainer" class="sideCreatorBox">
            <div id="offsetAnimationLabel" class="gradientLabel">Offset:</div>
            <input id="offsetAnimationInput" class="gradientTextInput" type="text" placeholder="between 0 and 1">
            <input id="offsetInputRange" class="gradientTextInput" placeholder="0" type="range" min="0" max="1" step="0.01">
          </div>
          <div id="propertySelectedContainer" class="sideCreatorBox">
            <div id="propertySelectedLabel" class="gradientLabel">Selected property</div>
            <select id="propertySelectedSelect" class="selectContainer">                
              <option value="0">0</option>
            </select>
            <div id="propertyBtnContainer" class="sideCreatorBox">
              <div id="propertyAddBtn" class="gradientBtn">+</div>
              <div id="propertyRemoveBtn" class="gradientBtn">-</div>
            </div>
          </div>
          <div id="propertyNameContainer" class="sideCreatorBox">
            <div id="propertyNameLabel" class="gradientLabel">Property name?</div>
            <input id="propertyNameInput" class="gradientTextInput" type="text" placeholder="Name">
          </div>
          <div id="propertyValueContainer" class="sideCreatorBox">
            <div id="propertyValueLabel" class="gradientLabel">Property value?</div>
            <input id="propertyValueInput" class="gradientTextInput" type="text" placeholder="Value">
          </div>
          <div id="playAnimationBtn" class="sideCreatorBox">Play!</div>
        </div>
        <div id="wordAnimationPreviewContainer" class="animationPreview" style="display: none;">
          <div id="animationPreviewText">Test</div>
        </div>
      </div>
    </div>
    `;
    tab.insertAdjacentHTML("beforeend",createWordEffectTabHTML);
    document.getElementById("tabsContainer").appendChild(tab);

    //opacity
    let wordOpacityInput = document.getElementById("wordOpacityInput");
    let wordOpacityRange = document.getElementById("wordOpacityRange");
    wordOpacityInput.oninput = (e) => {
      wordOpacityRange.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].opacity = e.target.value;
      wordOpacityInput.style.opacity = e.target.value;
    }
    wordOpacityRange.oninput = (e) => {
      wordOpacityInput.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].opacity = e.target.value;
      wordOpacityInput.style.opacity = e.target.value;
    }
    wordOpacityInput.onchange = wordOpacityInput.oninput;
    wordOpacityRange.onchange = wordOpacityRange.oninput;
    wordOpacityInput.onblur = (e) => {wordOpacityInput.style.opacity = "1";}
    wordOpacityRange.onblur = (e) => {wordOpacityInput.style.opacity = "1";}
    //rotation
    let wordRotationInput1 = document.getElementById("wordRotationInput1");
    let wordRotationInput2 = document.getElementById("wordRotationInput2");

    wordRotationInput1.oninput = (e) => {
      wordRotationInput1.style.transform = `rotate(${e.target.value}deg)`;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].rotation[0] = e.target.value;
    }
    wordRotationInput1.onchange = wordRotationInput1.oninput;
    wordRotationInput1.onblur = (e) => {
      wordRotationInput1.style.transform = "";
    }
    wordRotationInput2.oninput = (e) => {
      wordRotationInput2.style.transform = `rotate(${e.target.value}deg)`;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].rotation[1] = e.target.value;
    }
    wordRotationInput2.onchange = wordRotationInput2.oninput;
    wordRotationInput2.onblur = (e) => {
      wordRotationInput2.style.transform = "";
    }
    //animation
    let wordAnimationSelect = document.getElementById("wordAnimationSelect");
    wordAnimationSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex];
      let wordAnimationCreatorContainer = document.getElementById("wordAnimationCreatorContainer");
      let wordAnimationPreviewContainer = document.getElementById("wordAnimationPreviewContainer");
      if(selected.text == "None") {
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation = "None";
        wordAnimationCreatorContainer.style.display = "none";
        wordAnimationPreviewContainer.style.display = "none";
      } else {
        if(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation == "None") {
          _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation = JSON.parse(JSON.stringify(_templateAnimation));
          _currentlyLoaded.selectedKeyframe = 0;
          _currentlyLoaded.selectedKeyframeValue = 0;
          updateAnimationLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation,0,0);
        }
        wordAnimationCreatorContainer.style.display = "";
        wordAnimationPreviewContainer.style.display = "";
      }
    }
    //preloaded animations
    let preloadAnimationSelect = document.getElementById("preloadAnimationSelect");
    preloadAnimationSelect.onchange = (e) => {
      let selected = e.target.value;//e.target.options[e.target.selectedIndex].text;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation = _preloadedAnimations[selected];
      _currentlyLoaded.selectedKeyframe = 0;
      _currentlyLoaded.selectedKeyframeValue = 0;
      updateAnimationLeft(_preloadedAnimations[selected],0,0);
    };
    for(animName in _preloadedAnimations) {
      preloadAnimationSelect.options.add(new Option(animName,animName));
    }

    //name
    let nameAnimationInput = document.getElementById("nameAnimationInput");
    nameAnimationInput.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.name = e.target.value;
    }
    //easing
    let easeAnimationSelect = document.getElementById("easeAnimationSelect");
    easeAnimationSelect.onchange = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.timings.easing = e.target.value;
    }
    //duration
    let durationAnimationInput = document.getElementById("durationAnimationInput");
    durationAnimationInput.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.timings.duration = Number(e.target.value);
    }
    //iterations
    let iterationsAnimationInput = document.getElementById("iterationsAnimationInput");
    let iterationsAnimationInputRange = document.getElementById("iterationsAnimationInputRange");
    iterationsAnimationInput.oninput = (e) => {
      let selected = e.target.value//>=10?"Infinity":e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.timings.iterations = selected;
      iterationsAnimationInputRange.value = e.target.value;
    }
    iterationsAnimationInputRange.oninput = (e) => {
      let selected = e.target.value//>=10?"Infinity":e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.timings.iterations = selected;
      iterationsAnimationInput.value = e.target.value;
    }
    //selectedKeyframe
    let keyframeSelectedSelect = document.getElementById("keyframeSelectedSelect");
    let keyframeAddBtn = document.getElementById("keyframeAddBtn");
    let keyframeRemoveBtn = document.getElementById("keyframeRemoveBtn");
    keyframeSelectedSelect.onchange = (e) => {
      console.log(_currentlyLoaded);
      let selected = e.target.selectedIndex;
      _currentlyLoaded.selectedKeyframe = selected;
      _currentlyLoaded.selectedKeyframeValue = 0;
      let selectedAnimation = _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation;
      updateAnimationLeft(selectedAnimation,selected,0);
    }
    //keyframe +/- button
    keyframeAddBtn.onclick = (e) => {
      let anim = _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation;
      anim.keyframes.push(JSON.parse(JSON.stringify(_templateAnimation.keyframes[0])));
      _currentlyLoaded.selectedKeyframe = anim.keyframes.length-1;
      _currentlyLoaded.selectedKeyframeValue = 0;
      updateAnimationLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation,_currentlyLoaded.selectedKeyframe,_currentlyLoaded.selectedKeyframeValue);
    };
    keyframeRemoveBtn.onclick = (e) => {
      let anim = _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation;
      if(anim.keyframes.length == 1) {
        GUI.instance.DisplayMessage("You can't have less than 1 keyframe, silly!");
        return;
      }
      anim.keyframes.splice(_currentlyLoaded.selectedKeyframe,1);
      _currentlyLoaded.selectedKeyframe = _currentlyLoaded.selectedKeyframe==0?0:_currentlyLoaded.selectedKeyframe-1;
      _currentlyLoaded.selectedKeyframeValue = 0;
      updateAnimationLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation,_currentlyLoaded.selectedKeyframe,_currentlyLoaded.selectedKeyframeValue); 
    };
    //offset
    let offsetAnimationInput = document.getElementById("offsetAnimationInput");
    let offsetInputRange = document.getElementById("offsetInputRange");
    offsetAnimationInput.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.keyframes[_currentlyLoaded.selectedKeyframe].offset = e.target.value;
      offsetInputRange.value = e.target.value;
    }
    offsetInputRange.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.keyframes[_currentlyLoaded.selectedKeyframe].offset = e.target.value;
      offsetAnimationInput.value = e.target.value;
    }
    //selectedProperty
    let propertySelectedSelect = document.getElementById("propertySelectedSelect");
    let propertyAddBtn = document.getElementById("propertyAddBtn");
    let propertyRemoveBtn = document.getElementById("propertyRemoveBtn");
    propertySelectedSelect.onchange = (e) => {
      console.log(_currentlyLoaded);
      let selected = e.target.selectedIndex;
      _currentlyLoaded.selectedKeyframeValue = selected;
      let selectedAnimation = _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation;
      updateAnimationLeft(selectedAnimation,_currentlyLoaded.selectedKeyframe,selected);
    }
    //property +/- button
    propertyAddBtn.onclick = (e) => {
      let anim = _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation;
      anim.keyframes[_currentlyLoaded.selectedKeyframe].names.push("name");
      anim.keyframes[_currentlyLoaded.selectedKeyframe].values.push("value");
      _currentlyLoaded.selectedKeyframeValue = anim.keyframes[_currentlyLoaded.selectedKeyframe].values.length-1;
      updateAnimationLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation,_currentlyLoaded.selectedKeyframe,_currentlyLoaded.selectedKeyframeValue);
    };
    propertyRemoveBtn.onclick = (e) => {
      let anim = _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation;
      if(anim.keyframes[_currentlyLoaded.selectedKeyframe].names.length == 1) {
        GUI.instance.DisplayMessage("You can't have less than 1 property, silly!");
        return;
      }
      anim.keyframes[_currentlyLoaded.selectedKeyframe].names.splice(_currentlyLoaded.selectedKeyframeValue,1);
      anim.keyframes[_currentlyLoaded.selectedKeyframe].values.splice(_currentlyLoaded.selectedKeyframeValue,1);
      _currentlyLoaded.selectedKeyframeValue = _currentlyLoaded.selectedKeyframeValue==0?0:_currentlyLoaded.selectedKeyframeValue-1;
      updateAnimationLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation,_currentlyLoaded.selectedKeyframe,_currentlyLoaded.selectedKeyframeValue); 
    };
    //property name
    let propertyNameInput = document.getElementById("propertyNameInput");
    propertyNameInput.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.keyframes[_currentlyLoaded.selectedKeyframe].names[_currentlyLoaded.selectedKeyframeValue] = e.target.value;
    }    
    //property value
    let propertyValueInput = document.getElementById("propertyValueInput");
    propertyValueInput.oninput = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.keyframes[_currentlyLoaded.selectedKeyframe].values[_currentlyLoaded.selectedKeyframeValue] = e.target.value;
    }    
    //play animation
    let playAnimationBtn = document.getElementById("playAnimationBtn");
    playAnimationBtn.onclick = (e) => {playAnimationRight();}

    return tab;
  }

  function updateAnimationLeft(selectedAnimation,displayedKeyframe,displayedKeyframeValue) {
    document.getElementById("nameAnimationInput").value = selectedAnimation.name;
    //timings
    document.getElementById("easeAnimationSelect").value = selectedAnimation.timings.easing;
    document.getElementById("durationAnimationInput").value = selectedAnimation.timings.duration;
    let iterationsParse = selectedAnimation.timings.iterations=="Infinity"?10:selectedAnimation.timings.iterations;
    document.getElementById("iterationsAnimationInput").value = iterationsParse;
    document.getElementById("iterationsAnimationInputRange").value = iterationsParse;

    //keyframes
    let keyframeSelectedSelect = document.getElementById("keyframeSelectedSelect");
    keyframeSelectedSelect.options.length = 0;
    for (let i=0; i < selectedAnimation.keyframes.length; i++) {
      keyframeSelectedSelect.options.add(new Option(i,i));
    }
    keyframeSelectedSelect.selectedIndex = displayedKeyframe;
    document.getElementById("offsetAnimationInput").value = selectedAnimation.keyframes[displayedKeyframe].offset;
    document.getElementById("offsetInputRange").value = selectedAnimation.keyframes[displayedKeyframe].offset;

    //properties
    let propertySelectedSelect = document.getElementById("propertySelectedSelect");
    propertySelectedSelect.options.length = 0;
    for (let i=0; i < selectedAnimation.keyframes[displayedKeyframe].names.length; i++) {
      propertySelectedSelect.options.add(new Option(i,selectedAnimation.keyframes[displayedKeyframe].names[i]));
    }    
    propertySelectedSelect.selectedIndex = displayedKeyframeValue;
    document.getElementById("propertyNameInput").value = selectedAnimation.keyframes[displayedKeyframe].names[displayedKeyframeValue];
    document.getElementById("propertyValueInput").value = selectedAnimation.keyframes[displayedKeyframe].values[displayedKeyframeValue];
  }

  function playAnimationRight() {
    let anim = _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation;
    let animText = document.getElementById("animationPreviewText");
    let keyframesList = [];
    let timings = anim.timings;
    for(let selKf=0;selKf<anim.keyframes.length;selKf++) {
      let curKeyframe = {};
      for(let selVal=0;selVal<anim.keyframes[selKf].names.length;selVal++) {
        curKeyframe[anim.keyframes[selKf].names[selVal]] = anim.keyframes[selKf].values[selVal];
      }
      curKeyframe.offset = anim.keyframes[selKf].offset;
      //keyframesList.push(JSON.parse(JSON.stringify(curKeyframe)));
      keyframesList.push(curKeyframe);
    }
    animText.animate(keyframesList,timings);
  }

  function createWordPreviewTab() {
    let tab = createElement("div","wordPreviewTab","createTab");
    let createWordPreviewTabHTML = `
    <div id="wordPreviewContainer" class="tabWordContainer">
      <div id="spawn1Btn">Spawn 1!</div>
    </div>
    `;
    tab.insertAdjacentHTML("beforeend",createWordPreviewTabHTML);
    document.getElementById("tabsContainer").appendChild(tab);

    //spawn1
    let spawn1Btn = document.getElementById("spawn1Btn");
    spawn1Btn.onclick = (e) => {
      spawnWord(_currentlyLoaded.values[_currentlyLoaded.selectedValue]);
    };
    return tab;
  }

  function spawnWord(word) {
    let wordElm = createElement("div","","wordHypno",word.value);
    if(word.position=="Random") {
      let boundingRect = spawnArea.getBoundingClientRect();
      wordElm.style.top = randRange(0,boundingRect.height)+"px";
      wordElm.style.left = randRange(0,boundingRect.width)+"px";
    } else {
      wordElm.style.left = word.position[0];
      wordElm.style.top = word.position[1];
    }
    wordElm.style.fontSize = randRange(Number(word.font[0]),Number(word.font[1]))+"px";

    wordElm.style.color = word.color == "Random"?"#"+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6, 0):word.color;
    
    wordElm.style.webkitTextStroke = word.border != "None"?"1px "+word.border:"";
    
    if(word.gradient != "None") {
      let selectedGradient = word.gradient;
      let grad = "";
      for(i in selectedGradient.gradients) {
        grad += `${selectedGradient.gradients[i].type}(`;
        grad += selectedGradient.gradients[i].type.includes("conic")?`from ${selectedGradient.gradients[i].direction}`:`${selectedGradient.gradients[i].direction}`;
        grad += selectedGradient.gradients[i].type.includes("radial")?",":"deg,";
        for(j in selectedGradient.gradients[i].colors) {
          grad+=`${selectedGradient.gradients[i].colors[j]} ${selectedGradient.gradients[i].positions[j]!=""?selectedGradient.gradients[i].positions[j]+"%":""} ${selectedGradient.gradients[i].positions2[j]!=""?selectedGradient.gradients[i].positions2[j]+"%":""},`;
        }
        grad = grad.slice(0,-1);
        grad+="),";
      }
      grad = grad.slice(0,-1);
      wordElm.style.color = "transparent";
      wordElm.style.backgroundClip = "text";
      wordElm.style.backgroundImage=grad;
      wordElm.style.backgroundBlendMode=selectedGradient.blendMode;
    }

    wordElm.style.opacity = word.opacity;

    wordElm.style.transform = `rotate(${randRange(Number(word.rotation[0]),Number(word.rotation[1]))}deg)`;

    if(word.animation != "None") {
      let anim = word.animation;
      let keyframesList = [];
      let timings = anim.timings;
      for(let selKf=0;selKf<anim.keyframes.length;selKf++) {
        let curKeyframe = {};
        for(let selVal=0;selVal<anim.keyframes[selKf].names.length;selVal++) {
          curKeyframe[anim.keyframes[selKf].names[selVal]] = anim.keyframes[selKf].values[selVal];
        }
        curKeyframe.offset = anim.keyframes[selKf].offset;
        keyframesList.push(curKeyframe);
      }
      wordElm.animate(keyframesList,timings);
    }

    spawnArea.appendChild(wordElm);
    setTimeout(()=>{wordElm.remove();},word.leaveTime);
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
    _currentlyLoaded = JSON.parse(JSON.stringify(_templateHypno));
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

  function randRange(min,max) {
    return Math.floor(Math.random()*(max-min+1))+min;
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