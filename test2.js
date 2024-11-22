/*
A script that creates a menu in Bmr that you can use to load or create hypno messages, so have fun with it :P!
*/

var startBmr = function() {
  //add elm to div id=menus in bmr
  var elm=document.createElement("div");
  elm.id="mainBox";
  elm.style="position:relative;z-index:100;top:10%;left:25%;width:50%;height:80%;background:rgba(0, 0, 0, 0.9);color:#fff;border:2px solid #343434;"+
  "border-radius:0.5em;padding:0.25em;font-size:calc(var(--scale) * 2);backdrop-filter:blur(0.2em);pointer-events:auto;"+
  "box-shadow:inset 0px 0px 30px 2px rgba(0, 0, 0, 0.5), 0px 0px 3px 0px rgba(0, 0, 0, 0.75)";
  //close button, uses css from bmr if elm was added to menus
  var closeBtn=document.createElement("div");
  closeBtn.class="button close";
  closeBtn.onclick=()=>{elm.remove();};
  elm.appendChild(closeBtn);
  //adding the grid
  elm.appendChild(createBmrGrid());

  //stuff to delete later added just to mess around
  ACTION_BAR.TriggerMacro("","/s AHHHHHHHHHHHHHHHHHHHHHH It's working!!!!");
  return elm;
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


