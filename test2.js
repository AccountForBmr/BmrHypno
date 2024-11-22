/*
A script that creates a menu in Bmr that you can use to load or create hypno messages, so have fun with it :P!
*/

var startBmr = function() {
  //add elm to div id=menus in bmr
  var elm=document.createElement("div");
  elm.id="mainBox";
  /*elm.style="position:relative;z-index:100;top:10%;left:25%;width:50%;height:80%;background:rgba(0, 0, 0, 0.9);color:#fff;border:2px solid #343434;"+
  "border-radius:0.5em;padding:0.25em;font-size:calc(var(--scale) * 2);backdrop-filter:blur(0.2em);pointer-events:auto;"+
  "box-shadow:inset 0px 0px 30px 2px rgba(0, 0, 0, 0.5), 0px 0px 3px 0px rgba(0, 0, 0, 0.75)";*/
  //close button, uses css from bmr if elm was added to menus
  var closeBtn=document.createElement("div");
  closeBtn.className="button close";
  closeBtn.onclick=()=>{elm.remove();};
  elm.appendChild(closeBtn);
  //adding the grid
  elm.appendChild(createBmrStartingGrid());

  //stuff to delete later added just to mess around
  ACTION_BAR.TriggerMacro("","/s AHHHHHHHHHHHHHHHHHHHHHH It's working!!!!");
  return elm;
}

var createBmrStartingGrid = function() {
  var grid=document.createElement("div");
  grid.id="grid-start";
  //grid.style="display:grid;position:relative;top:1.5em;width:100%;height:93%;border:2px solid #343434;border-radius:0.5em;gap:0.5em;"
  //add create btn
  grid.appendChild(createBmrCreateScreenBtn());
  //add load btn
  grid.appendChild(createBmrLoadScreenBtn());
  return grid;
}

var createBmrCreateScreenBtn = function() {
  let createBtn = document.createElement("div");
  createBtn.id = "createBtn";
  createBtn.className = "gridButton";
  /*createBtn.style = "display:inline-grid;border-radius:1.0em;grid-row:1 / span 3;background:rgba(20, 20, 20, 0.9);"+
  "text-align:center;align-content:center;border:2px solid rgb(52, 52, 52);margin:0.05em;font-size:4em;";*/
  createBtn.innerHTML = "C R E A T E";
  createBtn.onclick = (e)=>{console.log("I haven't made the create screen yet :c");};
  /*createBtn.onmouseenter = (e)=>{createBtn.style.filter="brightness(1.3)";};
  createBtn.onmouseleave = (e)=>{createBtn.style.filter="";};*/
  return createBtn;
}

var createBmrLoadScreenBtn = function() {
  let loadBtn = document.createElement("div");
  loadBtn.id = "loadBtn";
  loadBtn.className = "gridButton";
  /*loadBtn.style = "display:inline-grid;border-radius:1.0em;grid-row:4 / span 3;background:rgba(20, 20, 20, 0.9);"+
  "text-align:center;align-content:center;border:2px solid rgb(52, 52, 52);margin:0.05em;font-size:4em;";*/
  loadBtn.innerHTML = "L O A D";
  loadBtn.onclick = (e)=>{console.log("I haven't made the load screen yet :c");};
  /*loadBtn.onmouseenter = (e)=>{loadBtn.style.filter="brightness(1.3)";};
  loadBtn.onmouseleave = (e)=>{loadBtn.style.filter="";};*/
  return loadBtn;
}

var createBmrGrid = function() {
  var grid=document.createElement("div");
  grid.id="grid";
  grid.style="display:grid;position:relative;top:1.5em;width:100%;height:93%;border:2px solid #343434;border-radius:0.5em;gap:0.5em;"
  for(let i=0;i<4;i++) {
    //add to the left
    grid.appendChild(createBmrGridItem(0));
    //add to the right
    grid.appendChild(createBmrGridItem(1));
  }
  return grid;
}

var createBmrGridItem = function(position) {
  let gridItem=document.createElement("div");
  if(position==0) {
    //left
    gridItem.style="display:inline-grid;border-radius:1.0em;grid-column:1 / span 3;background:aqua";
  } else {
    //right
    gridItem.style="display:inline-grid;border-radius:1.0em;grid-column:4 / span 3;background:red";
  }
  return gridItem;
}

GUI.instance.DisplayMessage("Everything was loaded correctly, hopefully! \\[T]/");


