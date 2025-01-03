/*
A script that creates a menu in Bmr that you can use to load or create hypno messages, so have fun with it :P!
*/

var BMRHYPNO = {};

var bmrHypno = function() {
  var mainBox = createElement("div", "mainBox");
  var spawnArea = createElement("div","hypnoSpawnArea");
  var jsColor = {};
  var _tippys = [];
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
  var _activeHypnos = {};
  var _preloadedHypnos = {
    "New one": {
      "name": "New",
      "spawnTime": 500,
      "values": [
        {
          "type": "word",
          "imgUrl": "https://battlemageroyal.com/assets/img/logo_battlemageroyal.png",
          "width": "auto",
          "height": "auto",
          "value": "Word",
          "leaveTime": 5000,
          "position": "Random",
          "font": ["64","128"],
          "color": "Random",
          "border": "#000000",
          "gradient": "None",
          "opacity": "0.5",
          "rotation": ["-45","45"],
          "smart": "Yes",
          "animation": "None"
        }
      ]
    },
    "Slime": {"name":"Slime","spawnTime":1000,"values":[{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Slimy!","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":{"gradients":[{"type":"linear-gradient","direction":"217","colors":["#FF0000CC","#FF000000"],"positions":["","70.71"],"positions2":["",""]},{"type":"linear-gradient","direction":"127","colors":["#00FF00CC","#00FF0000"],"positions":["","70.71"],"positions2":["",""]},{"type":"linear-gradient","direction":"336","colors":["#0000FFCC","#0000FF00"],"positions":["","70.71"],"positions2":["",""]}],"name":"Cooler Rainbow","blendMode":"normal"},"opacity":"0.75","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(1,1) rotate(var(--rotation))"]},{"offset":0.25,"names":["transform"],"values":["scale(0.9,1.1) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.1,0.9) rotate(var(--rotation))"]},{"offset":0.75,"names":["transform"],"values":["scale(0.95,1.05) rotate(var(--rotation))"]}],"name":"Gelatine","timings":{"easing":"linear","duration":300,"iterations":"50"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/11/bd/__ceres_fauna_and_sapling_hololive_and_1_more_drawn_by_curss__sample-11bd53b2bbf9f2aac1a9ef1d80cc069d.jpg","width":"auto","height":["40%","65%"],"value":"Word","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(1,1) rotate(var(--rotation))"]},{"offset":0.25,"names":["transform"],"values":["scale(0.9,1.1) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.1,0.9) rotate(var(--rotation))"]},{"offset":0.75,"names":["transform"],"values":["scale(0.95,1.05) rotate(var(--rotation))"]}],"name":"Gelatine","timings":{"easing":"linear","duration":500,"iterations":"20"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/original/94/ed/__original_drawn_by_mike_inel__94edf44fcea0bfc2b91ff50e81e80689.gif","width":"auto","height":["45%","60%"],"value":"Word","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/original/56/e3/__original_drawn_by_chelodoy__56e389fa0336829b9284e83ac0d9887b.gif","width":"auto","height":["40%","60%"],"value":"Word","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Wobble~","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":{"gradients":[{"type":"linear-gradient","direction":"217","colors":["#FF0000CC","#FF000000"],"positions":["","70.71"],"positions2":["",""]},{"type":"linear-gradient","direction":"127","colors":["#00FF00CC","#00FF0000"],"positions":["","70.71"],"positions2":["",""]},{"type":"linear-gradient","direction":"336","colors":["#0000FFCC","#0000FF00"],"positions":["","70.71"],"positions2":["",""]}],"name":"Cooler Rainbow","blendMode":"normal"},"opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(1,1) rotate(var(--rotation))"]},{"offset":0.25,"names":["transform"],"values":["scale(0.9,1.1) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.1,0.9) rotate(var(--rotation))"]},{"offset":0.75,"names":["transform"],"values":["scale(0.95,1.05) rotate(var(--rotation))"]}],"name":"Gelatine","timings":{"easing":"linear","duration":300,"iterations":"20"}}},{"type":"image","imgUrl":"https://i.ibb.co/x2X6bS0/slime-Grow.gif","width":"auto","height":["40%","60%"],"value":"Word","leaveTime":"4000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/f2/74/f27471162a6739f80ae8808404119ed5.gif","width":"auto","height":["40%","55%"],"value":"Word","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/37/22/37226ed4ffc3d810475f0aa418bc0789.gif","width":"auto","height":["35%","55%"],"value":"Word","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/18/21/__original_drawn_by_iwbitu__sample-18211f5266bb7b6a51f51a752536130e.jpg","width":"auto","height":["45%","65%"],"value":"Word","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(1,1) rotate(var(--rotation))"]},{"offset":0.25,"names":["transform"],"values":["scale(0.9,1.1) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.1,0.9) rotate(var(--rotation))"]},{"offset":0.75,"names":["transform"],"values":["scale(0.95,1.05) rotate(var(--rotation))"]}],"name":"Gelatine","timings":{"easing":"linear","duration":500,"iterations":"20"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/6f/59/__original_drawn_by_dunceneygak__sample-6f59ca491b36ee4cf8b1d52779412943.jpg","width":"auto","height":["45%","60%"],"value":"Word","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.65","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(1,1) rotate(var(--rotation))"]},{"offset":0.25,"names":["transform"],"values":["scale(0.9,1.1) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.1,0.9) rotate(var(--rotation))"]},{"offset":0.75,"names":["transform"],"values":["scale(0.95,1.05) rotate(var(--rotation))"]}],"name":"Gelatine","timings":{"easing":"linear","duration":500,"iterations":"20"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/d7/b1/__original_drawn_by_sakoku_oyatsu3ji__sample-d7b1e50e68b4b4e94cf5dbad6a7cad22.jpg","width":"auto","height":["45%","60%"],"value":"Word","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(1,1) rotate(var(--rotation))"]},{"offset":0.25,"names":["transform"],"values":["scale(0.9,1.1) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.1,0.9) rotate(var(--rotation))"]},{"offset":0.75,"names":["transform"],"values":["scale(0.95,1.05) rotate(var(--rotation))"]}],"name":"Gelatine","timings":{"easing":"linear","duration":500,"iterations":"20"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/05/ce/__original_drawn_by_hikyou_takarasou__sample-05ceb556d250fe168b32fc5f71cff36f.jpg","width":"auto","height":["35%","60%"],"value":"Word","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(1,1) rotate(var(--rotation))"]},{"offset":0.25,"names":["transform"],"values":["scale(0.9,1.1) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.1,0.9) rotate(var(--rotation))"]},{"offset":0.75,"names":["transform"],"values":["scale(0.95,1.05) rotate(var(--rotation))"]}],"name":"Gelatine","timings":{"easing":"linear","duration":500,"iterations":"20"}}}],"selectedValue":0,"selectedGradient":0,"selectedGradientColor":0,"selectedKeyframe":0,"selectedKeyframeValue":0},
   "Buttslut": {"name":"Buttslut","spawnTime":"1000","values":[{"type":"image","imgUrl":"https://static1.e621.net/data/a6/09/a60917806d7ad4149881c5d784764ed9.gif","width":"auto","height":["45%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.55","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Ass~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Buttslut~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/original/94/ad/__makoto_nanaya_blazblue_drawn_by_diives__94ad7ee9c45cb4237fb643be0fe922f8.gif","width":"auto","height":["35%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/d3/5f/__2b_nier_and_1_more_drawn_by_volyz__sample-d35fb2e3cd3864de1b994f69aad1e093.jpg","width":"auto","height":["25%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/7c/91/__karin_blue_archive_drawn_by_tyrzul__sample-7c917a2e9bf24aee9be700da42ed0b49.jpg","width":"auto","height":["25%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/ff/8f/__original_drawn_by_sochikushou__sample-ff8f2a8d73c1212a5f480d6c14a395d0.jpg","width":"auto","height":["25%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/e7/54/__reisalin_stout_atelier_and_1_more_drawn_by_suujiniku__sample-e754a87a5bcba5cee02e1ea93aeb7213.jpg","width":"auto","height":["25%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/7c/a4/__karin_blue_archive_drawn_by_tyrzul__sample-7ca4ccf1b1a4dc626138661a57dcd932.jpg","width":"auto","height":["25%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/original/b7/c3/__tohno_akiha_tsukihime_and_1_more_drawn_by_blendy__b7c3a83b82cf72b083a6aa2bf8b15326.gif","width":"auto","height":["40%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}}],"selectedValue":0,"selectedGradient":0,"selectedGradientColor":0,"selectedKeyframe":0,"selectedKeyframeValue":0},
   "Breastslut": {"name":"Breastslut","spawnTime":"1000","values":[{"type":"image","imgUrl":"https://cdn.donmai.us/sample/8a/d4/__ako_blue_archive_drawn_by_shiroi_shiroyama__sample-8ad49585b049da06292db86a943e8921.jpg","width":"auto","height":["35%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Boobs~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Breastslut~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/sample/00/a0/00a0dda6226f7b243095c190eae3b238.jpg","width":"auto","height":["25%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/63/14/6314e70d40d210509a377b87c867cbd2.gif","width":"auto","height":["25%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/b8/e3/b8e34e30cb3d4df747e3736ba6165542.gif","width":"auto","height":["45%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/ce/e9/__hakase_fuyuki_nijisanji_drawn_by_circussion__sample-cee956375752ee4650965db7d83d3c12.jpg","width":"auto","height":["35%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/sample/03/9e/039ef7569ae1115ae99a1022c5624819.jpg","width":"auto","height":["35%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/original/e2/c2/__original_drawn_by_yue_show_ei__e2c2324179de26c5e8378788327a73a7.jpg","width":"auto","height":["25%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/original/01/63/__brown_haired_glasses_elf_original_drawn_by_houtengeki__0163b508a2ca39d03fb5a45264da68d7.gif","width":"auto","height":["45%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}}],"selectedValue":2,"selectedGradient":0,"selectedGradientColor":0,"selectedKeyframe":0,"selectedKeyframeValue":0},
   "Cockslut": {"name":"Cockslut","spawnTime":"1000","values":[{"type":"image","imgUrl":"https://static1.e621.net/data/sample/c4/8e/c48e12715f86d3b8de2ac2488eabba39.jpg","width":"auto","height":["45%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Cocks~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Cockslut~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/sample/07/4c/074cf11f827839af3e887d0c621f34e6.jpg","width":"auto","height":["35%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/66/0e/660e61214849692053bd26fe407e2144.gif","width":"auto","height":["35%","60%"],"value":"Word","leaveTime":"5000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/db/31/db3136fa9eb1e8e67e85d4bcf8d6063b.gif","width":"auto","height":["45%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/sample/0c/9b/0c9bca2c5f06207d9e529c1a7af309cb.jpg","width":"auto","height":["35%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/sample/f2/76/f2764391357c87bfbb20d20633cd1091.jpg","width":"auto","height":["35%","55%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/sample/28/e0/28e0ef62628229e7f95f608f2fad663e.jpg","width":"auto","height":["35%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://i.ibb.co/9ZZTM5h/cocksuck.gif","width":"auto","height":["40%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Fuck me~","leaveTime":"1000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":{"gradients":[{"type":"repeating-radial-gradient","direction":"circle","colors":["#D722C3FF","#710D97FF"],"positions":["0","5"],"positions2":["5","10"]}],"name":"Simple Repeating Circles","blendMode":"normal"},"opacity":"0.75","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation))"]},{"offset":0.15,"names":["transform"],"values":["translateX(-25%) rotate(calc(var(--rotation) - 5deg))"]},{"offset":0.3,"names":["transform"],"values":["translateX(20%) rotate(calc(var(--rotation) + 3deg))"]},{"offset":0.45,"names":["transform"],"values":["translateX(-15%) rotate(calc(var(--rotation) - 3deg))"]},{"offset":0.6,"names":["transform"],"values":["translateX(10%) rotate(calc(var(--rotation) + 2deg))"]},{"offset":0.75,"names":["transform"],"values":["translateX(-5%) rotate(calc(var(--rotation) - 1deg))"]},{"offset":1,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation))"]}],"name":"Wobble","timings":{"easing":"ease","duration":1000,"iterations":"1"}}}],"selectedValue":10,"selectedGradient":0,"selectedGradientColor":0,"selectedKeyframe":0,"selectedKeyframeValue":0},
   "Footslut": {"name":"Footslut","spawnTime":"1000","values":[{"type":"image","imgUrl":"https://cdn.donmai.us/sample/5d/0e/__sarashina_ruka_kanojo_okarishimasu_drawn_by_numaguro_tomokun0808__sample-5d0ef1483270e76bc9617fa109538331.jpg","width":"auto","height":["45%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Feet~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Footslut~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/eb/ef/__ononoki_yotsugi_monogatari_drawn_by_tsa__sample-ebef62e750b2e94c93a3c97a04da4bb0.jpg","width":"auto","height":["45%","66%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/original/57/00/__taokaka_blazblue_drawn_by_velveteksotica__5700a357469f0731f8e2f50772e34b50.gif","width":"auto","height":["35%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://i.ibb.co/nwzKFGX/maid-Stomp.gif","width":"auto","height":["45%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/original/0c/b3/__gwen_league_of_legends_drawn_by_boaranon__0cb3b3275c3072fbeb48a1f423be970d.png","width":"auto","height":["40%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/57/cd/__yunli_honkai_and_1_more_drawn_by_sydus__sample-57cdeb44b6b1e651429437b6eaf52d06.jpg","width":"auto","height":["35%","55%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/6e/2e/__silver_wolf_genshin_impact_and_3_more_drawn_by_nekoda_maoda__sample-6e2edb6a781738b55759cc41201f77fd.jpg","width":"auto","height":["45%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/6c/99/6c99e470c99a6c190e9e5a640f11be45.gif","width":"auto","height":["45%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}}],"selectedValue":0,"selectedGradient":0,"selectedGradientColor":0,"selectedKeyframe":0,"selectedKeyframeValue":0},
   "Itemslut(clothing)": {"name":"Itemslut(clothing)","spawnTime":"1000","values":[{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Itemslut~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Just clothing~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Good item~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://i.ibb.co/WGxZrpB/pulling-panties-up-compressed.gif","width":"auto","height":["45%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.65","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/14/a5/__original_drawn_by_puriketsu_corgy__sample-14a5c77fbb1f1d8826423c783af23f6d.jpg","width":"auto","height":["25%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.65","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://i.ibb.co/qCxDBmR/panties-snug.gif","width":"auto","height":["35%","50%"],"value":"Word","leaveTime":"7500","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.65","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/45/e3/__original_drawn_by_kotoyoshi_yumisuke__sample-45e3b740ef4c6fef2b20751196d7b1d1.jpg","width":"auto","height":["25%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/1e/7b/__shirogane_noel_hololive_drawn_by_kuse_0201__sample-1e7b07d6fb7f82fdc9b973f11986b8e6.jpg","width":"auto","height":["35%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/1f/c3/__original_drawn_by_asamura_hiori__sample-1fc3c35eb7a10b7e0296fc4e899f3448.jpg","width":"auto","height":["25%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/original/b0/54/__naruse_shiroha_summer_pockets_drawn_by_zen_kamuro__b05480008814fbed0aeda0f233c2aaa8.jpg","width":"auto","height":["45%","70%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.65","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://media1.tenor.com/m/ZHjcebbLKjAAAAAd/anime-socks.gif","width":"auto","height":["35%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://i.ibb.co/5vhNfZ7/random-Sportswear.jpg","width":"auto","height":["45%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://media1.tenor.com/m/CuRrqe598TMAAAAd/miru-tights-feet.gif","width":"auto","height":["30%","40%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/39/44/__original_drawn_by_a_x__sample-394490fe3dd50d7e6ce6fa3266f10fc8.jpg","width":"auto","height":["45%","75%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.55","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Worship your owner~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Perma clothing~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":{"gradients":[{"type":"repeating-radial-gradient","direction":"circle","colors":["#F82EFFFF","#5C1884FF"],"positions":["0","4"],"positions2":["4","8"]},{"type":"linear-gradient","direction":"0","colors":["#ED4CFFFF","#9305FFFF"],"positions":["",""],"positions2":["",""]}],"name":"New one","blendMode":"luminosity"},"opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Forever~","leaveTime":"1000","position":"Random","font":["64","128"],"color":"Random","border":"#B437FF","gradient":{"gradients":[{"type":"repeating-radial-gradient","direction":"circle","colors":["#000000FF","#8A8A8AFF"],"positions":["0","5"],"positions2":["5","10"]}],"name":"New one","blendMode":"normal"},"opacity":"0.75","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation))"]},{"offset":0.15,"names":["transform"],"values":["translateX(-25%) rotate(calc(var(--rotation) - 5deg))"]},{"offset":0.3,"names":["transform"],"values":["translateX(20%) rotate(calc(var(--rotation) + 3deg))"]},{"offset":0.45,"names":["transform"],"values":["translateX(-15%) rotate(calc(var(--rotation) - 3deg))"]},{"offset":0.6,"names":["transform"],"values":["translateX(10%) rotate(calc(var(--rotation) + 2deg))"]},{"offset":0.75,"names":["transform"],"values":["translateX(-5%) rotate(calc(var(--rotation) - 1deg))"]},{"offset":1,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation))"]}],"name":"Wobble","timings":{"easing":"ease","duration":1000,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/original/74/16/__raora_panthera_hololive_and_1_more_drawn_by_miyuchiq__74166d4f3e9a3a400ca7b94a66195435.jpg","width":"auto","height":["35%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}}],"selectedValue":17,"selectedGradient":0,"selectedGradientColor":0,"selectedKeyframe":0,"selectedKeyframeValue":0},
   "Itemslut(sex toy)": {"name":"Itemslut(sex toy)","spawnTime":"1000","values":[{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Itemslut~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Just a toy~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Good toy~","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.5","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://i.ibb.co/TBdRsNm/onaUse.gif","width":"auto","height":["35%","65%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://i.ibb.co/Svpg8cd/tracer-Fleshlight.gif","width":"auto","height":["35%","55%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/e7/96/e79630d08f719f2ee8be13d309cf658e.gif","width":"auto","height":["35%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/51/fb/51fb1d8bdd88b678affb84e6576edaf3.gif","width":"auto","height":["35%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/8d/d7/8dd723ccd1b295d41d951147fbfed66c.gif","width":"auto","height":["25%","50%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.65","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/sample/7b/c6/7bc62638726ddbda30f10d004a0230cc.jpg","width":"auto","height":["35%","55%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(1,1) rotate(var(--rotation))"]},{"offset":0.25,"names":["transform"],"values":["scale(0.9,1.1) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.1,0.9) rotate(var(--rotation))"]},{"offset":0.75,"names":["transform"],"values":["scale(0.95,1.05) rotate(var(--rotation))"]}],"name":"Gelatine","timings":{"easing":"linear","duration":500,"iterations":"20"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/19/9e/199ea5c27490cf9c497a183a01389904.png","width":"auto","height":["40%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.65","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(1,1) rotate(var(--rotation))"]},{"offset":0.25,"names":["transform"],"values":["scale(0.9,1.1) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.1,0.9) rotate(var(--rotation))"]},{"offset":0.75,"names":["transform"],"values":["scale(0.95,1.05) rotate(var(--rotation))"]}],"name":"Gelatine","timings":{"easing":"linear","duration":500,"iterations":"20"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/36/6c/366c8bc126a70e7364110a46f88391d9.png","width":"auto","height":["35%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(1,1) rotate(var(--rotation))"]},{"offset":0.25,"names":["transform"],"values":["scale(0.9,1.1) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.1,0.9) rotate(var(--rotation))"]},{"offset":0.75,"names":["transform"],"values":["scale(0.95,1.05) rotate(var(--rotation))"]}],"name":"Gelatine","timings":{"easing":"linear","duration":500,"iterations":"20"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/sample/15/5b/155b64ff3a1a984c6994a527ec60bb3f.jpg","width":"auto","height":["40%","60%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/sample/9c/f2/9cf2c217e91c142dd1afcab60522e05c.jpg","width":"auto","height":["35%","55%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/sample/84/d8/84d8a5935d3d6fbc6452a0c64aca8493.jpg","width":"auto","height":["40%","55%"],"value":"Word","leaveTime":"10000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Use me~","leaveTime":"1000","position":"Random","font":["64","128"],"color":"Random","border":"#000000","gradient":{"gradients":[{"type":"repeating-radial-gradient","direction":"circle","colors":["#D722C3FF","#710D97FF"],"positions":["0","5"],"positions2":["5","10"]}],"name":"Simple Repeating Circles","blendMode":"normal"},"opacity":"0.6","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation))"]},{"offset":0.15,"names":["transform"],"values":["translateX(-25%) rotate(calc(var(--rotation) - 5deg))"]},{"offset":0.3,"names":["transform"],"values":["translateX(20%) rotate(calc(var(--rotation) + 3deg))"]},{"offset":0.45,"names":["transform"],"values":["translateX(-15%) rotate(calc(var(--rotation) - 3deg))"]},{"offset":0.6,"names":["transform"],"values":["translateX(10%) rotate(calc(var(--rotation) + 2deg))"]},{"offset":0.75,"names":["transform"],"values":["translateX(-5%) rotate(calc(var(--rotation) - 1deg))"]},{"offset":1,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation))"]}],"name":"Wobble","timings":{"easing":"ease","duration":1000,"iterations":"1"}}},{"type":"word","imgUrl":"https://battlemageroyal.com/assets/img/logo_battlemageroyal.png","width":"auto","height":"auto","value":"Forever~","leaveTime":"1000","position":"Random","font":["64","128"],"color":"Random","border":"#B437FF","gradient":{"gradients":[{"type":"repeating-radial-gradient","direction":"circle","colors":["#000000FF","#8A8A8AFF"],"positions":["0","5"],"positions2":["5","10"]}],"name":"New one","blendMode":"normal"},"opacity":"0.75","rotation":["-45","45"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation))"]},{"offset":0.15,"names":["transform"],"values":["translateX(-25%) rotate(calc(var(--rotation) - 5deg))"]},{"offset":0.3,"names":["transform"],"values":["translateX(20%) rotate(calc(var(--rotation) + 3deg))"]},{"offset":0.45,"names":["transform"],"values":["translateX(-15%) rotate(calc(var(--rotation) - 3deg))"]},{"offset":0.6,"names":["transform"],"values":["translateX(10%) rotate(calc(var(--rotation) + 2deg))"]},{"offset":0.75,"names":["transform"],"values":["translateX(-5%) rotate(calc(var(--rotation) - 1deg))"]},{"offset":1,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation))"]}],"name":"Wobble","timings":{"easing":"ease","duration":1000,"iterations":"1"}}}],"selectedValue":0,"selectedGradient":0,"selectedGradientColor":0,"selectedKeyframe":0,"selectedKeyframeValue":0},
   "Facesitting Jumpscare": {"name":"Facesitting Jumpscare","spawnTime":"15000","values":[{"type":"image","imgUrl":"https://i.ibb.co/TPBZM8y/facesit2.gif","width":["100%","100%"],"height":["100%","100%"],"value":"Word","leaveTime":"6000","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.9","rotation":["0","0"],"smart":"No","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"ease-in","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://static1.e621.net/data/39/98/399873ac73fe8415b4ad5ae723d7e425.gif","width":["100%","100%"],"height":["100%","100%"],"value":"Word","leaveTime":"4000","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.9","rotation":["0","0"],"smart":"No","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/92f6d49e-550f-4ba9-a150-8901c34fd612/dfcfop5-ec1097ec-a09e-4fd0-a801-23165555b81a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzkyZjZkNDllLTU1MGYtNGJhOS1hMTUwLTg5MDFjMzRmZDYxMlwvZGZjZm9wNS1lYzEwOTdlYy1hMDllLTRmZDAtYTgwMS0yMzE2NTU1NWI4MWEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.V56s9UeKWadt_GqVHSQJ6h4Q25K5GITLBZhzBNFWT00","width":["100%","100%"],"height":["100%","100%"],"value":"Word","leaveTime":"9000","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.8","rotation":["0","0"],"smart":"No","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b4f16b82-580b-4adc-8003-ccd0bb7a0e9e/deg69zd-cb290dc9-3df1-4123-9850-48ebfacb707f.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I0ZjE2YjgyLTU4MGItNGFkYy04MDAzLWNjZDBiYjdhMGU5ZVwvZGVnNjl6ZC1jYjI5MGRjOS0zZGYxLTQxMjMtOTg1MC00OGViZmFjYjcwN2YuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.4GYGZnYWneb7Vfb6Cw549vV09mUWwd4APGl8wlzTDxI","width":["100%","100%"],"height":["100%","100%"],"value":"Word","leaveTime":"4000","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.90","rotation":["0","0"],"smart":"No","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://i.ibb.co/k4M63ML/bunButt.gif","width":["100%","100%"],"height":["100%","100%"],"value":"d","leaveTime":"3000","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.9","rotation":["0","0"],"smart":"Yes","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://i.ibb.co/YXCGLj5/37aac1.gif","width":["100%","100%"],"height":["100%","100%"],"value":"Word","leaveTime":"2000","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.9","rotation":["0","0"],"smart":"No","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://i.ibb.co/8s0PpqG/facesit1.gif","width":["100%","100%"],"height":["100%","100%"],"value":"Word","leaveTime":"3500","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.9","rotation":["0","0"],"smart":"No","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/22/f0/__yelan_genshin_impact_drawn_by_lil_noot__sample-22f0e8595995b2275ee2e3ce6975356c.jpg","width":["100%","100%"],"height":["100%","100%"],"value":"Word","leaveTime":"1000","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.9","rotation":["0","0"],"smart":"No","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["scale(0.3) rotate(var(--rotation))"]},{"offset":0.5,"names":["transform"],"values":["scale(1.05) rotate(var(--rotation))"]},{"offset":0.7,"names":["transform"],"values":["scale(0.9) rotate(var(--rotation))"]},{"offset":1,"names":["transform"],"values":["scale(1) rotate(var(--rotation))"]}],"name":"Bounce in","timings":{"easing":"linear","duration":300,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/d5/d5/__warrior_of_light_and_tabi_final_fantasy_and_1_more_drawn_by_alva_artofalva__sample-d5d56a64e791164fbff027e76f6adc63.jpg","width":["100%","100%"],"height":["100%","100%"],"value":"Word","leaveTime":"1000","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.9","rotation":["0","0"],"smart":"No","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation))"]},{"offset":0.15,"names":["transform"],"values":["translateX(-25%) rotate(calc(var(--rotation) - 5deg))"]},{"offset":0.3,"names":["transform"],"values":["translateX(20%) rotate(calc(var(--rotation) + 3deg))"]},{"offset":0.45,"names":["transform"],"values":["translateX(-15%) rotate(calc(var(--rotation) - 3deg))"]},{"offset":0.6,"names":["transform"],"values":["translateX(10%) rotate(calc(var(--rotation) + 2deg))"]},{"offset":0.75,"names":["transform"],"values":["translateX(-5%) rotate(calc(var(--rotation) - 1deg))"]},{"offset":1,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation)) scale(3) translateY(-10%)"]}],"name":"Wobble","timings":{"easing":"ease","duration":1000,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/e0/49/__ellen_joe_zenless_zone_zero_drawn_by_kein_hasegawa__sample-e049f0f4904288460d4e00005a21b2cb.jpg","width":["100%","100%"],"height":["100%","100%"],"value":"Word","leaveTime":"1000","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.9","rotation":["0","0"],"smart":"No","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["translateX(0%)"]},{"offset":0.15,"names":["transform"],"values":["translateX(-25%) rotate(calc(var(--rotation) - 5deg))"]},{"offset":0.3,"names":["transform"],"values":["translateX(20%) rotate(calc(var(--rotation) + 3deg))"]},{"offset":0.45,"names":["transform"],"values":["translateX(-15%) rotate(calc(var(--rotation) - 3deg))"]},{"offset":0.6,"names":["transform"],"values":["translateX(10%) rotate(calc(var(--rotation) + 2deg))"]},{"offset":0.75,"names":["transform"],"values":["translateX(-5%) rotate(calc(var(--rotation) - 1deg))"]},{"offset":1,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation)) scale(3) translate(10%, -5%)"]}],"name":"Wobble","timings":{"easing":"ease","duration":1000,"iterations":"1"}}},{"type":"image","imgUrl":"https://cdn.donmai.us/sample/77/e3/__ellen_joe_zenless_zone_zero_drawn_by_oniilus__sample-77e315dcc0f38a2f6dfd70c4ca5628d8.jpg","width":["100%","100%"],"height":["100%","100%"],"value":"Word","leaveTime":"1000","position":["0%","0%"],"font":["64","128"],"color":"Random","border":"#000000","gradient":"None","opacity":"0.9","rotation":["0","0"],"smart":"No","animation":{"keyframes":[{"offset":0,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation))"]},{"offset":0.15,"names":["transform"],"values":["translateX(-25%) rotate(calc(var(--rotation) - 5deg))"]},{"offset":0.3,"names":["transform"],"values":["translateX(20%) rotate(calc(var(--rotation) + 3deg))"]},{"offset":0.45,"names":["transform"],"values":["translateX(-15%) rotate(calc(var(--rotation) - 3deg))"]},{"offset":0.6,"names":["transform"],"values":["translateX(10%) rotate(calc(var(--rotation) + 2deg))"]},{"offset":0.75,"names":["transform"],"values":["translateX(-5%) rotate(calc(var(--rotation) - 1deg))"]},{"offset":1,"names":["transform"],"values":["translateX(0%) rotate(var(--rotation)) scale(4) translateX(-20%)"]}],"name":"Wobble","timings":{"easing":"ease","duration":1000,"iterations":"1"}}}],"selectedValue":9,"selectedGradient":0,"selectedGradientColor":0,"selectedKeyframe":6,"selectedKeyframeValue":0}
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
    "Cooler Rainbow": {
      "gradients": [
        {
          "type":"linear-gradient",
          "direction":"217",
          "colors":["#FF0000CC","#FF000000"],
          "positions":["","70.71"],
          "positions2":["",""]
        },
        {
          "type":"linear-gradient",
          "direction":"127",
          "colors":["#00FF00CC","#00FF0000"],
          "positions":["","70.71"],
          "positions2":["",""]
        },
        {"type":"linear-gradient",
          "direction":"336",
          "colors":["#0000FFCC","#0000FF00"],
          "positions":["","70.71"],
          "positions2":["",""]
        }
      ],
      "name":"Cooler Rainbow",
      "blendMode":"normal"
    },
    "Simple Repeating Circles": {
      "gradients": [
        {
          "type":"repeating-radial-gradient",
          "direction":"circle",
          "colors":["#D722C3FF","#710D97FF"],
          "positions":["0","5"],
          "positions2":["5","10"]
        }
      ],
      "name":"Simple Repeating Circles",
      "blendMode":"normal"
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
          "values": ["rotate(calc(var(--rotation) + 720deg))"]
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
          "values": ["scale(1,1) rotate(var(--rotation))"]
        },
        {
          "offset": 0.25,
          "names": ["transform"],
          "values": ["scale(0.9,1.1) rotate(var(--rotation))"]
        },
        {
          "offset": 0.5,
          "names": ["transform"],
          "values": ["scale(1.1,0.9) rotate(var(--rotation))"]
        },
        {
          "offset": 0.75,
          "names": ["transform"],
          "values": ["scale(0.95,1.05) rotate(var(--rotation))"]
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
          "values": ["translateX(0%) rotate(var(--rotation))"]
        },
        {
          "offset": 0.15,
          "names": ["transform"],
          "values": ["translateX(-25%) rotate(calc(var(--rotation) - 5deg))"]
        },
        {
          "offset": 0.30,
          "names": ["transform"],
          "values": ["translateX(20%) rotate(calc(var(--rotation) + 3deg))"]
        },
        {
          "offset": 0.45,
          "names": ["transform"],
          "values": ["translateX(-15%) rotate(calc(var(--rotation) - 3deg))"]
        },
        {
          "offset": 0.60,
          "names": ["transform"],
          "values": ["translateX(10%) rotate(calc(var(--rotation) + 2deg))"]
        },
        {
          "offset": 0.75,
          "names": ["transform"],
          "values": ["translateX(-5%) rotate(calc(var(--rotation) - 1deg))"]
        },
        {
          "offset": 1,
          "names": ["transform"],
          "values": ["translateX(0%) rotate(var(--rotation))"]
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
          "values": ["scale(0.3) rotate(var(--rotation))"]
        },
        {
          "offset": 0.5,
          "names": ["transform"],
          "values": ["scale(1.05) rotate(var(--rotation))"]
        },
        {
          "offset": 0.7,
          "names": ["transform"],
          "values": ["scale(0.9) rotate(var(--rotation))"]
        },
        {
          "offset": 1,
          "names": ["transform"],
          "values": ["scale(1) rotate(var(--rotation))"]
        }
      ],
      "name": "Bounce in",
      "timings": {
        "easing": "linear",
        "duration": 1000,
        "iterations": "1"
      }
    },
    "Image as background": {
      "keyframes": [
         {
            "offset":"0",
            "names": [
              "backgroundImage",
              "backgroundSize",
              "backgroundClip",
              "color"
            ],
            "values": [
              "url(https://cdn.donmai.us/original/ba/a4/__drawn_by_tamamoice__baa4ccd12a8838f34802510a84574d13.png)",
              "100% 100%",
              "text",
              "transparent"
            ]
        },
        {
            "offset":"1",
            "names":[
              "backgroundImage",
              "backgroundSize",
              "backgroundClip",
              "color"
            ],
            "values":[
              "url(https://cdn.donmai.us/original/ba/a4/__drawn_by_tamamoice__baa4ccd12a8838f34802510a84574d13.png)",
              "100% 100%",
              "text",
              "transparent"
            ]
        }
      ],
      "name": "Image as background",
      "timings":{
         "easing":"linear",
         "duration":10000,
         "iterations":"10"
      }
    },
  };
  const _templateHypno = {
    "name": "New",
    "spawnTime": "500",
    "values": [
      {
        "type": "word",
        "imgUrl": "https://battlemageroyal.com/assets/img/logo_battlemageroyal.png",
        "width": "auto",
        "height": "auto",
        "value": "Word",
        "leaveTime": "5000",
        "position": "Random",
        "font": ["64","128"],
        "color": "Random",
        "border": "#000000",
        "gradient": "None",
        "opacity": "0.5",
        "rotation": ["-45","45"],
        "smart": "Yes",
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
        "names": ["transform","backgroundColor"],
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
      let imgPrev = createElement("img","imgSizePreview");
      imgPrev.style.display = "none";
      imgPrev.src = "https://battlemageroyal.com/assets/img/logo_battlemageroyal.png";
      spawnArea.appendChild(imgPrev);
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
    castBtn.onclick = loadCastScreen;
    return castBtn;
  }

  function createBmrRemoveScreenBtn() {
    let removeBtn = createElement("div","removeBtn","gridButton","R E M O V E");
    removeBtn.onclick = loadRemoveScreen;
    return removeBtn;
  }

  function loadCreateScreen() {
    emptyMainBox();
    let topContainerHTML = `
    <div id="topContainer" class="gridContainer">
      <div id="" class="gridLabel">Load from:</div>
      <select id="selectHypno" class="selectContainer">
      </select>
      <label id="loadFileLabel" class="topLabel">
        <input id="loadFileBtn" placeholder="" type="file" accept="application/json" multiple>Load from file
      </label>
      <label id="saveLabel" class="topLabel">
        Save
        <a id="downloadAnchor" style="display: none;"></a>
      </label>
      <input id="backButton" class="" placeholder="" type="button" value="<">
      <div id="closeButton" class="button close"></div>
    </div>
    `;
    mainBox.insertAdjacentHTML("beforeend",topContainerHTML);
    let fileBtn = document.getElementById("loadFileBtn");
    fileBtn.type = "file";
    //what happens after the file is loaded
    let loaded = (e) => {
      let tmpFr = e.target;
      let result = tmpFr.result;
      let resultJSON = JSON.parse(result);
      _preloadedHypnos[resultJSON.name] = resultJSON;
      preloadedHypnosSelectUpdate(resultJSON.name);
      loadSelectionInGrid(JSON.parse(JSON.stringify(_preloadedHypnos[resultJSON.name])),0);
    };
    //How are the files processed when you load them
    let process = (file) => {
      let fr = new FileReader();
      fr.readAsText(file);
      fr.addEventListener('loadend', loaded);
    };
    //Making it so you process the file when you choose it
    fileBtn.addEventListener('change', (e) => {
      let files = fileBtn.files;
      for(let i=0;i<files.length;i++) {
        process(files[i]);
      }
    });
    let backButton = document.getElementById("backButton");
    backButton.onclick = startBmr;
    let closeButton = document.getElementById("closeButton");
    closeButton.onclick = () => { mainBox.remove(); };
    let selectHypno = document.getElementById("selectHypno");

    //save Btn
    let saveLabel = document.getElementById("saveLabel");
    let downloadAnchor = document.getElementById("downloadAnchor");
    saveLabel.onclick = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
      dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(_currentlyLoaded));
      downloadAnchor.setAttribute("href",dataStr);
      downloadAnchor.setAttribute("download", `${_currentlyLoaded.name}.json`);
      downloadAnchor.click();
      _preloadedHypnos[_currentlyLoaded.name] = JSON.parse(JSON.stringify(_currentlyLoaded));
      preloadedHypnosSelectUpdate(_currentlyLoaded.name);
    }

    loadSelections(selectHypno);
    createCreateScreenGrid();
    loadSelectionInGrid(JSON.parse(JSON.stringify(_templateHypno)),0);
  }

  function loadSelections(selections) {
    for(i in _preloadedHypnos) {
      selections.options.add(new Option(i,_preloadedHypnos[i].name||"Load from file"));
    }
    selections.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex].text;
      loadSelectionInGrid(JSON.parse(JSON.stringify(_preloadedHypnos[selected])),0);
    };
  }

  function loadSelectionInGrid(selection,selectedValue) {
    cleanInvalidValues("mainBox");
    //name
    _currentlyLoaded = selection;
    _currentlyLoaded.selectedValue=selectedValue;
    _currentlyLoaded.selectedGradient=0;
    _currentlyLoaded.selectedGradientColor=0;
    _currentlyLoaded.selectedKeyframe=0;
    _currentlyLoaded.selectedKeyframeValue=0;
    if(selection.values.length > 1) {
      document.getElementById("leftTypeContainer").style.display = "";
      document.getElementById("rightTypeContainer").style.display = "";
    } else {
      document.getElementById("leftTypeContainer").style.display = "none";
      document.getElementById("rightTypeContainer").style.display = "none";      
    }
    document.getElementById("formNameInput").value = _currentlyLoaded.name;
    //spawnTime
    document.getElementById("formSpawnInput").value = _currentlyLoaded.spawnTime;
    document.getElementById("formSpawnRange").value = _currentlyLoaded.spawnTime;
    //values[]
    let cur = _currentlyLoaded.values[selectedValue];
    changeTabType(cur.type);
    /*
    Loading the word part
    */
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
    //smart positioning
    document.getElementById("wordSmartPositionSelect").value = cur.smart;
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
    /*
    Loading the img part here
    */
    //imgUrl
    document.getElementById("imgValueInput").value = cur.imgUrl;
    //leaveTime
    document.getElementById("imgTimeInput").value = cur.leaveTime;
    document.getElementById("imgTimeRange").value = cur.leaveTime;
    //position
    selectPos = document.getElementById("imgPositionInputSelect");
    pos1 = document.getElementById("imgPositionInput1");
    pos2 = document.getElementById("imgPositionInput2");
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
    //size
    //width
    selectWid = document.getElementById("imgWidthInputSelect");
    wid1 = document.getElementById("imgWidthInput1");
    wid2 = document.getElementById("imgWidthInput2");
    if(cur.width == "auto") {
      selectWid.selectedIndex = 0;
      wid1.style.display = "none";
      wid2.style.display = "none";
    } else {
      selectWid.selectedIndex = 1;
      wid1.style.display = "";
      wid2.style.display = "";
      wid1.value = cur.width[0];
      wid2.value = cur.width[1];
    }
    //height
    selectHei = document.getElementById("imgHeightInputSelect");
    hei1 = document.getElementById("imgHeightInput1");
    hei2 = document.getElementById("imgHeightInput2");
    if(cur.height == "auto") {
      selectHei.selectedIndex = 0;
      hei1.style.display = "none";
      hei2.style.display = "none";
    } else {
      selectHei.selectedIndex = 1;
      hei1.style.display = "";
      hei2.style.display = "";
      hei1.value = cur.height[0];
      hei2.value = cur.height[1];
    }
    //img size preview
    document.getElementById("imgSizePreview").src = cur.imgUrl;
    //font size preview
    document.getElementById("fontPreviewMin").style.fontSize = cur.font[0]+"px";
    document.getElementById("fontPreviewMax").style.fontSize = cur.font[1]+"px";
    //setting the preloads in animation and gradient to new one
    document.getElementById("preloadGradientSelect").selectedIndex = 0;
    document.getElementById("preloadAnimationSelect").selectedIndex = 0;
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
        <div id="leftTypeContainer" class="typeContainer" style="display: none;">◀</div>
        <div id="wordTypeContainer" class="typeContainer activeType">Word/Text</div>
        <div id="imgTypeContainer" class="typeContainer">Image/Gif</div>
        <div id="addTypeContainer" class="typeContainer">+</div>
        <div id="removeTypeContainer" class="typeContainer">-</div>
        <div id="rightTypeContainer" class="typeContainer" style="display: none;">▶</div>
      </div>
      <div id="create-tab-start">
      </div>
    </div>
    `;
    mainBox.insertAdjacentHTML("beforeend",createMenuHTML);
    //name of the set
    let formNameInput = document.getElementById("formNameInput");
    let tippyFormNameInput = createTippy(formNameInput,"Name can't be empty or 'New one'","top");
    _tippys.push(tippyFormNameInput);
    formNameInput.oninput = (e) => {
      if(e.target.value == "" || e.target.value == "New one") {
        formNameInput.classList.add("invalidValue");
        tippyFormNameInput.show();
        return;
      }
      formNameInput.classList.remove("invalidValue");
      _currentlyLoaded.name = e.target.value;
      console.log(_currentlyLoaded);
    }

    //making the two inputs update each other 
    let spawnInput = document.getElementById("formSpawnInput");
    let spawnInputRange = document.getElementById("formSpawnRange");
    let tippySpawnInput = createTippy(spawnInput,"Use a number >:c","right");
    _tippys.push(tippySpawnInput);
    spawnInput.oninput = (e) => {
      if(isNaN(Number(e.target.value))||e.target.value=="") {
        spawnInput.classList.add("invalidValue");
        tippySpawnInput.show();
        return;
      }
      spawnInput.classList.remove("invalidValue");
      spawnInputRange.value = e.target.value;
      _currentlyLoaded.spawnTime = e.target.value;
    }
    spawnInputRange.oninput = (e) => {
      spawnInput.classList.remove("invalidValue");
      spawnInput.value = e.target.value;
      _currentlyLoaded.spawnTime = e.target.value;
    }
    //select word/img
    //word
    let wordTypeContainer = document.getElementById("wordTypeContainer");
    let imgTypeContainer = document.getElementById("imgTypeContainer");
    wordTypeContainer.onclick = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].type = "word";
      loadSelectionInGrid(_currentlyLoaded,_currentlyLoaded.selectedValue);
      changeTabType("word");
    };
    //img
    imgTypeContainer.onclick = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].type = "image";
      loadSelectionInGrid(_currentlyLoaded,_currentlyLoaded.selectedValue);
      changeTabType("image");
    };
    _tabsTypes.push(wordTypeContainer);
    _tabsTypes.push(imgTypeContainer);
    //add/remove new word/img
    let addTypeContainer = document.getElementById("addTypeContainer");
    let removeTypeContainer = document.getElementById("removeTypeContainer");
    addTypeContainer.onclick = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
      //ADD
      leftTypeContainer.style.display = "";
      rightTypeContainer.style.display = "";
      _currentlyLoaded.values.push(JSON.parse(JSON.stringify(_templateHypno.values[0])));
      _currentlyLoaded.selectedValue = _currentlyLoaded.values.length-1;
      loadSelectionInGrid(_currentlyLoaded,_currentlyLoaded.selectedValue);
    }
    removeTypeContainer.onclick = (e) => {
      //REMOVE
      if(_currentlyLoaded.values.length == 2) {
        leftTypeContainer.style.display = "none";
        rightTypeContainer.style.display = "none";        
      }
      if(_currentlyLoaded.values.length == 1) {
        GUI.instance.DisplayMessage("You can't have less than 1 word/img!");
        return;
      }
      cleanInvalidValues("tabsContainer");
      _currentlyLoaded.values.splice(_currentlyLoaded.selectedValue,1);
      _currentlyLoaded.selectedValue = _currentlyLoaded.selectedValue==0?0:_currentlyLoaded.selectedValue-1;
      loadSelectionInGrid(_currentlyLoaded,_currentlyLoaded.selectedValue);  
    }

    //move to the previous/next one
    let leftTypeContainer = document.getElementById("leftTypeContainer");
    let rightTypeContainer = document.getElementById("rightTypeContainer");
    leftTypeContainer.onclick = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
      //MOVE LEFT
      document.getElementById("create-tab-start").animate({opacity:[1,0,1]},{duration:500,ease:"ease-in-out"});
      _currentlyLoaded.selectedValue = _currentlyLoaded.selectedValue==0?_currentlyLoaded.values.length-1:_currentlyLoaded.selectedValue-1;
      loadSelectionInGrid(_currentlyLoaded,_currentlyLoaded.selectedValue);  
    }
    rightTypeContainer.onclick = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
      //MOVE RIGHT
      document.getElementById("create-tab-start").animate({opacity:[1,0,1]},{duration:500,ease:"ease-in-out"});
      _currentlyLoaded.selectedValue = (_currentlyLoaded.selectedValue+1)%_currentlyLoaded.values.length;
      loadSelectionInGrid(_currentlyLoaded,_currentlyLoaded.selectedValue);     
    }

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
          if(curTabInfo==5){
            changeTab(2);
            return;
          } 
          changeTab(curTabInfo);
        };
        _tabsTitles.push(tabTitle);
        tabsTitleContainer.appendChild(tabTitle);
        //creating the actual tab
        let tabContainer = _tabs[i][j]();
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
        <input id="wordPositionInput1" class="gridTextInput" placeholder="% from left" type="text" style="display: none;">
        <input id="wordPositionInput2" class="gridTextInput" placeholder="% from top" type="text" style="display: none;">
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
    let tippywordValueInput = createTippy(wordValueInput,"word can't be empty","right");
    _tippys.push(tippywordValueInput);
    wordValueInput.oninput = (e) => {
      if(e.target.value == "") {
        wordValueInput.classList.add("invalidValue");
        tippywordValueInput.show();
        return;
      }
      wordValueInput.classList.remove("invalidValue");
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].value = e.target.value;
    }
    //time
    let wordTimeInput = document.getElementById("wordTimeInput");
    let wordTimeRange = document.getElementById("wordTimeRange");
    let tippyWordTimeInput = createTippy(wordTimeInput,"Use a number >:c","right");
    _tippys.push(tippyWordTimeInput);
    wordTimeInput.oninput = (e) => {
      if(isNaN(Number(e.target.value))||e.target.value == "") {
        wordTimeInput.classList.add("invalidValue");
        tippyWordTimeInput.show();
        return;
      }
      wordTimeInput.classList.remove("invalidValue");
      wordTimeRange.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].leaveTime = e.target.value;
    }
    wordTimeRange.oninput = (e) => {
      wordTimeInput.classList.remove("invalidValue");
      wordTimeInput.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].leaveTime = e.target.value;
    }

    //position
    let wordPositionInputSelect = document.getElementById("wordPositionInputSelect");
    let wordPositionInput1 = document.getElementById("wordPositionInput1");
    let wordPositionInput2 = document.getElementById("wordPositionInput2");
    let tippyWordPos1 = createTippy(wordPositionInput1,"Value must be in format: 11.11%","top");
    let tippyWordPos2 = createTippy(wordPositionInput2,"Value must be in format: 11.11%","bottom");
    _tippys.push(tippyWordPos1);
    _tippys.push(tippyWordPos2);
    wordPositionInputSelect.onchange = (e) => {
      let selected = e.target.value;
      if(selected == "Random") {
        wordPositionInput1.style.display = "none";
        wordPositionInput2.style.display = "none";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].position = "Random";

        wordPositionInput1.classList.remove("invalidValue");
        wordPositionInput1.value="";
        wordPositionInput2.classList.remove("invalidValue");
        wordPositionInput2.value="";
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
      if(e.target.value.match(/^(\d+|-\d+)(\.?\d+)*%$/)==null) {
        wordPositionInput1.classList.add("invalidValue");
        tippyWordPos1.show();
        return;
      }
      wordPositionInput1.classList.remove("invalidValue");
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].position[0] = e.target.value;
    }
    wordPositionInput2.oninput = (e) => {
      if(e.target.value.match(/^(\d+|-\d+)(\.?\d+)*%$/)==null) {
        wordPositionInput2.classList.add("invalidValue");
        tippyWordPos2.show();
        return;
      }
      wordPositionInput2.classList.remove("invalidValue");
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].position[1] = e.target.value;
    }

    //font
    let wordFontInput1 = document.getElementById("wordFontInput1");
    let wordFontInput2 = document.getElementById("wordFontInput2");
    let fontMin = document.getElementById("fontPreviewMin");
    let fontMax = document.getElementById("fontPreviewMax");
    let tippyWordFont1 = createTippy(wordFontInput1,"Use a number >:c","bottom");
    let tippyWordFont2 = createTippy(wordFontInput2,"Use a number >:c","right");
    _tippys.push(tippyWordFont1);
    _tippys.push(tippyWordFont2);
    wordFontInput1.onfocus = (e)=>{
      fontMin.style.display = "";
      fontMax.style.display = "";
    };
    wordFontInput1.onblur = (e)=>{
      fontMin.style.display = "none";
      fontMax.style.display = "none"
    };
    wordFontInput1.oninput = (e)=>{
      if(isNaN(Number(e.target.value))||e.target.value == "") {
        wordFontInput1.classList.add("invalidValue");
        tippyWordFont1.show();
        return;
      }
      wordFontInput1.classList.remove("invalidValue");
      fontMin.style.fontSize = wordFontInput1.value+"px";
      fontMax.style.fontSize = wordFontInput2.value+"px";
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].font = [wordFontInput1.value, wordFontInput2.value];
    }
    wordFontInput2.onfocus = wordFontInput1.onfocus;
    wordFontInput2.onblur = wordFontInput1.onblur;
    wordFontInput2.oninput = (e) => {
      if(isNaN(Number(e.target.value))||e.target.value == "") {
        wordFontInput2.classList.add("invalidValue");
        tippyWordFont2.show();
        return;
      }
      wordFontInput2.classList.remove("invalidValue");
      fontMin.style.fontSize = wordFontInput1.value+"px";
      fontMax.style.fontSize = wordFontInput2.value+"px";
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].font = [wordFontInput1.value, wordFontInput2.value];    
    }

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
        cleanInvalidValues("wordGradientCreatorContainer");
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
    preloadGradientSelect.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex].text;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient = JSON.parse(JSON.stringify(_preloadedGradients[selected]));
      _currentlyLoaded.selectedGradient = 0;
      _currentlyLoaded.selectedGradientColor = 0;
      updateGradientPreviewRight(_preloadedGradients[selected]);
      updateGradientPreviewLeft(_preloadedGradients[selected],0,0);
      cleanInvalidValues("wordGradientCreatorContainer"); 
    };
    for(gradName in _preloadedGradients) {
      preloadGradientSelect.options.add(new Option(gradName,gradName));
    }

    //gradient +/- buttons
    let gradientAddBtn = document.getElementById("gradientAddBtn");
    let gradientRemoveBtn = document.getElementById("gradientRemoveBtn");
    gradientAddBtn.onclick = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
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
      cleanInvalidValues("wordGradientCreatorContainer");
      gr.gradients.splice(_currentlyLoaded.selectedGradient,1);
      _currentlyLoaded.selectedGradient = _currentlyLoaded.selectedGradient==0?0:_currentlyLoaded.selectedGradient-1;
      _currentlyLoaded.selectedGradientColor = 0;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);  
    };

    //choose which gradient to load
    let gradientSelectedSelect = document.getElementById("gradientSelectedSelect");
    gradientSelectedSelect.onchange = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
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
      angleGradientInput.classList.remove("invalidValue");
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].type = selected.value;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }

    //angle gradient
    let angleGradientInput = document.getElementById("angleGradientInput");
    let angleGradientInputRange = document.getElementById("angleGradientInputRange");
    let wordAngleTippy = createTippy(angleGradientInput,"Use a number >:c","bottom");
    _tippys.push(wordAngleTippy);
    angleGradientInput.oninput = (e) => {
      if(isNaN(Number(e.target.value))||e.target.value == "") {
        angleGradientInput.classList.add("invalidValue");
        wordAngleTippy.show();
        return;
      }
      angleGradientInput.classList.remove("invalidValue"); 
      angleGradientInputRange.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].direction = e.target.value;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }
    angleGradientInputRange.oninput = (e) => {
      angleGradientInput.classList.remove("invalidValue");
      angleGradientInput.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].direction = e.target.value;
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }

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
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
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
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
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
      cleanInvalidValues("wordGradientCreatorContainer");
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
    let wordPositionGradientTippy = createTippy(positionGradientInput,"Use a number >:c","bottom");
    _tippys.push(wordPositionGradientTippy);
    positionGradientSelect.onchange = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        positionGradientSelect.selectedIndex = (positionGradientSelect.selectedIndex+1)%2;
        return;
      }
      if(e.target.value == "Start at") {
        positionGradientInput.value = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions[_currentlyLoaded.selectedGradientColor];
        positionGradientInputRange.value = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions[_currentlyLoaded.selectedGradientColor];
      } else {
        positionGradientInput.value = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions2[_currentlyLoaded.selectedGradientColor];
        positionGradientInputRange.value = _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions2[_currentlyLoaded.selectedGradientColor];        
      }
    };
    positionGradientInput.oninput = (e) => {
      if(isNaN(Number(e.target.value))) {
        positionGradientInput.classList.add("invalidValue");
        wordPositionGradientTippy.show();
        return;
      }
      positionGradientInput.classList.remove("invalidValue");
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
      positionGradientInput.classList.remove("invalidValue");
      positionGradientInput.value = e.target.value;
      if(positionGradientSelect.value == "Start at") {
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions[_currentlyLoaded.selectedGradientColor] = e.target.value;
      } else {
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient.gradients[_currentlyLoaded.selectedGradient].positions2[_currentlyLoaded.selectedGradientColor] = e.target.value;
      }
      updateGradientPreviewLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient,_currentlyLoaded.selectedGradient,_currentlyLoaded.selectedGradientColor);
      updateGradientPreviewRight(_currentlyLoaded.values[_currentlyLoaded.selectedValue].gradient);
    }

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
    <div class="tabWordContainer" id="smartPositionContainer">
      <div id="wordSmartPositionLabel" class="gridLabel">Smart Positioning?</div>   
      <select id="wordSmartPositionSelect" class="selectContainer">
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
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
    let tippyWordOpacityInput = createTippy(wordOpacityInput,"Use a number >:c","top");
    _tippys.push(tippyWordOpacityInput);
    wordOpacityInput.oninput = (e) => {
      if(isNaN(Number(e.target.value))) {
        //can be empty, no need to check for that
        wordOpacityInput.classList.add("invalidValue");
        tippyWordOpacityInput.show();
        return;
      }
      wordOpacityInput.classList.remove("invalidValue");
      wordOpacityRange.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].opacity = e.target.value;
      wordOpacityInput.style.opacity = e.target.value;
    }
    wordOpacityRange.oninput = (e) => {
      wordOpacityInput.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].opacity = e.target.value;
      wordOpacityInput.style.opacity = e.target.value;
    }
    wordOpacityInput.onblur = (e) => {wordOpacityInput.style.opacity = "1";}
    wordOpacityRange.onblur = (e) => {wordOpacityInput.style.opacity = "1";}
    //rotation
    let wordRotationInput1 = document.getElementById("wordRotationInput1");
    let wordRotationInput2 = document.getElementById("wordRotationInput2");
    let tippyWordRotationInput1 = createTippy(wordRotationInput1,"Use a number >:c","left");
    let tippyWordRotationInput2 = createTippy(wordRotationInput2,"Use a number >:c","bottom");
    _tippys.push(tippyWordRotationInput1);
    _tippys.push(tippyWordRotationInput2);

    wordRotationInput1.oninput = (e) => {
      if(isNaN(Number(e.target.value))) {
        wordRotationInput1.classList.add("invalidValue");
        tippyWordRotationInput1.show();
        return;
      }
      wordRotationInput1.classList.remove("invalidValue");
      wordRotationInput1.style.transform = `rotate(${e.target.value}deg)`;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].rotation[0] = e.target.value;
    }
    wordRotationInput1.onblur = (e) => {
      wordRotationInput1.style.transform = "";
    }
    wordRotationInput2.oninput = (e) => {
      if(isNaN(Number(e.target.value))) {
        wordRotationInput2.classList.add("invalidValue");
        tippyWordRotationInput2.show();
        return;
      }
      wordRotationInput2.classList.remove("invalidValue");
      wordRotationInput2.style.transform = `rotate(${e.target.value}deg)`;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].rotation[1] = e.target.value;
    }
    wordRotationInput2.onblur = (e) => {
      wordRotationInput2.style.transform = "";
    }
    //smart positioning
    let wordSmartPositionSelect = document.getElementById("wordSmartPositionSelect");
    wordSmartPositionSelect.onchange = (e) => {
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].smart = e.target.value;
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
        cleanInvalidValues("wordAnimationCreatorContainer");
      } else {
        if(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation == "None") {
          _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation = JSON.parse(JSON.stringify(_templateAnimation));
          _currentlyLoaded.selectedKeyframe = 0;
          _currentlyLoaded.selectedKeyframeValue = 0;
          preloadAnimationSelect.selectedIndex = 0;
          updateAnimationLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation,0,0);
        }
        wordAnimationCreatorContainer.style.display = "";
        wordAnimationPreviewContainer.style.display = "";
      }
    }
    //preloaded animations
    let preloadAnimationSelect = document.getElementById("preloadAnimationSelect");
    preloadAnimationSelect.onchange = (e) => {
      let selected = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation = JSON.parse(JSON.stringify(_preloadedAnimations[selected]));
      _currentlyLoaded.selectedKeyframe = 0;
      _currentlyLoaded.selectedKeyframeValue = 0;
      updateAnimationLeft(_preloadedAnimations[selected],0,0);
      cleanInvalidValues("wordAnimationCreatorContainer");
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
    let tippyDurationAnimationInput = createTippy(durationAnimationInput,"Use a positive number >:c","right");
    _tippys.push(tippyDurationAnimationInput);
    durationAnimationInput.oninput = (e) => {
      if(isNaN(Number(e.target.value))||Number(e.target.value)<0) {
        durationAnimationInput.classList.add("invalidValue");
        tippyDurationAnimationInput.show();
        return;
      }
      durationAnimationInput.classList.remove("invalidValue");
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.timings.duration = Number(e.target.value);
    }
    //iterations
    let iterationsAnimationInput = document.getElementById("iterationsAnimationInput");
    let iterationsAnimationInputRange = document.getElementById("iterationsAnimationInputRange");
    let tippyIterationsAnimationInput = createTippy(iterationsAnimationInput,"Use a positive number >:c","top");
    _tippys.push(tippyIterationsAnimationInput);
    iterationsAnimationInput.oninput = (e) => {
      if(isNaN(Number(e.target.value))||Number(e.target.value)<0) {
        iterationsAnimationInput.classList.add("invalidValue");
        tippyIterationsAnimationInput.show();
        return;
      }
      iterationsAnimationInput.classList.remove("invalidValue");
      let selected = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.timings.iterations = selected;
      iterationsAnimationInputRange.value = e.target.value;
    }
    iterationsAnimationInputRange.oninput = (e) => {
      iterationsAnimationInput.classList.remove("invalidValue");
      let selected = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.timings.iterations = selected;
      iterationsAnimationInput.value = e.target.value;
    }
    //selectedKeyframe
    let keyframeSelectedSelect = document.getElementById("keyframeSelectedSelect");
    let keyframeAddBtn = document.getElementById("keyframeAddBtn");
    let keyframeRemoveBtn = document.getElementById("keyframeRemoveBtn");
    keyframeSelectedSelect.onchange = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        keyframeSelectedSelect.selectedIndex = _currentlyLoaded.selectedKeyframe;
        return;
      }
      let selected = e.target.selectedIndex;
      _currentlyLoaded.selectedKeyframe = selected;
      _currentlyLoaded.selectedKeyframeValue = 0;
      let selectedAnimation = _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation;
      updateAnimationLeft(selectedAnimation,selected,0);
    }
    //keyframe +/- button
    keyframeAddBtn.onclick = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
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
      cleanInvalidValues("wordAnimationCreatorContainer");
      anim.keyframes.splice(_currentlyLoaded.selectedKeyframe,1);
      _currentlyLoaded.selectedKeyframe = _currentlyLoaded.selectedKeyframe==0?0:_currentlyLoaded.selectedKeyframe-1;
      _currentlyLoaded.selectedKeyframeValue = 0;
      updateAnimationLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation,_currentlyLoaded.selectedKeyframe,_currentlyLoaded.selectedKeyframeValue); 
    };
    //offset
    let offsetAnimationInput = document.getElementById("offsetAnimationInput");
    let offsetInputRange = document.getElementById("offsetInputRange");
    let tippyOffsetAnimationInput = createTippy(offsetAnimationInput,"use a number between 0 and 1 >:c","top");
    _tippys.push(tippyOffsetAnimationInput);
    offsetAnimationInput.oninput = (e) => {
      if(isNaN(Number(e.target.value))||!(Number(e.target.value)>=0&&Number(e.target.value)<=1)) {
        offsetAnimationInput.classList.add("invalidValue");
        tippyOffsetAnimationInput.show();
        return;
      }
      offsetAnimationInput.classList.remove("invalidValue");
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.keyframes[_currentlyLoaded.selectedKeyframe].offset = e.target.value;
      offsetInputRange.value = e.target.value;
    }
    offsetInputRange.oninput = (e) => {
      offsetAnimationInput.classList.remove("invalidValue");
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation.keyframes[_currentlyLoaded.selectedKeyframe].offset = e.target.value;
      offsetAnimationInput.value = e.target.value;
    }
    //selectedProperty
    let propertySelectedSelect = document.getElementById("propertySelectedSelect");
    let propertyAddBtn = document.getElementById("propertyAddBtn");
    let propertyRemoveBtn = document.getElementById("propertyRemoveBtn");
    propertySelectedSelect.onchange = (e) => {
      let selected = e.target.selectedIndex;
      _currentlyLoaded.selectedKeyframeValue = selected;
      let selectedAnimation = _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation;
      updateAnimationLeft(selectedAnimation,_currentlyLoaded.selectedKeyframe,selected);
    }
    //property +/- button
    propertyAddBtn.onclick = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
      let anim = _currentlyLoaded.values[_currentlyLoaded.selectedValue].animation;
      anim.keyframes[_currentlyLoaded.selectedKeyframe].names.push("name");
      anim.keyframes[_currentlyLoaded.selectedKeyframe].values.push("value");
      _currentlyLoaded.selectedKeyframeValue = anim.keyframes[_currentlyLoaded.selectedKeyframe].values.length-1;
      updateAnimationLeft(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation,_currentlyLoaded.selectedKeyframe,_currentlyLoaded.selectedKeyframeValue);
    };
    propertyRemoveBtn.onclick = (e) => {
      if(document.getElementsByClassName("invalidValue").length != 0) {
        GUI.instance.DisplayMessage("Fix the errors first :D");
        return;
      }
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
    let anim = JSON.parse(JSON.stringify(_currentlyLoaded.values[_currentlyLoaded.selectedValue].animation));
    let animText = document.getElementById("animationPreviewText");
    let keyframesList = [];
    let timings = anim.timings;
    anim.keyframes.sort((a,b)=>{return Number(a.offset)-Number(b.offset)}); //offsets need to be in order
    for(let selKf=0;selKf<anim.keyframes.length;selKf++) {
      let curKeyframe = {};
      for(let selVal=0;selVal<anim.keyframes[selKf].names.length;selVal++) {
        curKeyframe[anim.keyframes[selKf].names[selVal]] = anim.keyframes[selKf].values[selVal];
      }
      curKeyframe.offset = anim.keyframes[selKf].offset;
      keyframesList.push(curKeyframe);
    }
    animText.animate(keyframesList,timings);
  }

  function createWordPreviewTab() {
    let tab = createElement("div","wordPreviewTab","createTab");
    let createWordPreviewTabHTML = `
    <div id="wordPreviewContainer" class="tabWordContainer">
      <div id="spawn1Btn" class="spawn1Btn">Spawn 1!</div>
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
    let bounds = spawnArea.getBoundingClientRect();

    wordElm.style.fontSize = randRange(Number(word.font[0]),Number(word.font[1]))+"px";
    wordElm.style.setProperty("--fontSize",wordElm.style.fontSize);

    wordElm.style.color = word.color == "Random"?"#"+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6, 0):word.color;
    wordElm.style.setProperty("--color",wordElm.style.color);
    
    wordElm.style.webkitTextStroke = word.border != "None"?"1px "+word.border:"";
    
    if(word.gradient != "None") {
      let selectedGradient = word.gradient;
      let grad = "";
      for(i in selectedGradient.gradients) {
        grad += selectedGradient.gradients[i].type+"(";
        grad += selectedGradient.gradients[i].type.includes("conic")?"from "+selectedGradient.gradients[i].direction:selectedGradient.gradients[i].direction;
        grad += selectedGradient.gradients[i].type.includes("radial")?",":"deg,";
        for(j in selectedGradient.gradients[i].colors) {
          grad += selectedGradient.gradients[i].colors[j]+" ";
          grad += selectedGradient.gradients[i].positions[j]!=""?selectedGradient.gradients[i].positions[j]+"%":"";
          grad += " ";
          grad += selectedGradient.gradients[i].positions2[j]!=""?selectedGradient.gradients[i].positions2[j]+"%":"";
          grad += ",";
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

    let rotateValue = randRange(Number(word.rotation[0]),Number(word.rotation[1]))+"deg";
    wordElm.style.setProperty("--rotation",rotateValue);
    wordElm.style.transform = "rotate(var(--rotation))";

    if(word.position=="Random") {
      let tempWordSpan = createElement("span","","tempWord",word.value);
      tempWordSpan.style.fontSize = wordElm.style.fontSize;
      spawnArea.appendChild(tempWordSpan);
      let spanRect = tempWordSpan.getBoundingClientRect();
      wordElm.style.top = randRange(spanRect.height*-1+(bounds.height+spanRect.height)*15/100,bounds.height*85/100)+"px";
      wordElm.style.left = randRange(spanRect.width*-1+(bounds.width+spanRect.width)*15/100,bounds.width*85/100)+"px";
      tempWordSpan.remove();
    } else {
      wordElm.style.top = Number(word.position[1].slice(0,-1))*bounds.height/100+"px";
      wordElm.style.left = Number(word.position[0].slice(0,-1))*bounds.width/100+"px";
    }

    spawnArea.appendChild(wordElm);
    let smart = word.smart;
    let wordRect = wordElm.getBoundingClientRect();
    if(smart == "Yes") {
      if(wordRect.bottom > bounds.bottom) {
        wordElm.style.top = Number(wordElm.style.top.slice(0,-2)) - (wordRect.bottom - bounds.bottom) +"px";
      }
      if(wordRect.right > bounds.right) {
        wordRect = wordElm.getBoundingClientRect();
        wordElm.style.left = Number(wordElm.style.left.slice(0,-2)) - (wordRect.right - bounds.right) +"px";
      }
      if(wordRect.left < bounds.left) {
        wordRect = wordElm.getBoundingClientRect();
        wordElm.style.left = Number(wordElm.style.left.slice(0,-2)) + Math.abs(bounds.left - wordRect.left)+"px";
      }
      if(wordRect.top < bounds.top) {
        wordRect = wordElm.getBoundingClientRect();
        wordElm.style.top = Number(wordElm.style.top.slice(0,-2)) + Math.abs(bounds.top - wordRect.top)+"px";
      }
      if(wordRect.width >= bounds.width || wordRect.height >= bounds.height) {
        wordRect = wordElm.getBoundingClientRect();
        let tempWordSpan = createElement("span","","tempWord",word.value);
        tempWordSpan.style.fontSize = wordElm.style.fontSize;
        spawnArea.appendChild(tempWordSpan);
        let spanRect = tempWordSpan.getBoundingClientRect();
        wordElm.style.left = (spanRect.width-bounds.width)/(-2)+"px";
        wordElm.style.top = (spanRect.height-bounds.height)/(-2)+"px";
        tempWordSpan.remove();
      }
    }

    wordElm.style.setProperty("--top",wordElm.style.top);
    wordElm.style.setProperty("--left",wordElm.style.left);

    wordElm.style.setProperty("--duration",word.leaveTime);

    setTimeout(()=>{wordElm.remove();},word.leaveTime);
    if(word.animation != "None") {
      let anim = JSON.parse(JSON.stringify(word.animation));
      let keyframesList = [];
      let timings = anim.timings;
      anim.keyframes.sort((a,b)=>{return Number(a.offset)-Number(b.offset)}); 
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

  }

  function createImgBaseTab() {
    let tab = createElement("div","imgBaseTab","createTab");
    let createImgBaseTabHTML = `
    <div id="imgValueContainer" class="tabImgContainer">
      <div id="imgValueLabel" class="gridLabel">Type the url of the image you wish to use:</div>
      <div id="imgValueInputContainer">
        <input id="imgValueInput" class="gridTextInput" placeholder="Url here." type="text">
      </div>
    </div>
    <div id="imgTimeContainer" class="tabImgContainer">
      <div id="imgTimeLabel" class="gridLabel">How long before the image leaves? (in milliseconds)</div>
      <div id="imgTimeInputContainer">
        <input id="imgTimeInput" class="gridTextInput" placeholder="ms here, can go past max." type="text">
        <input id="imgTimeRange" placeholder="" type="range" min="10" max="10000">
      </div>
    </div>
    <div id="imgPositionContainer" class="tabImgContainer">
      <div id="imgPositionLabel" class="gridLabel">Where should your image be?</div>
      <div id="imgPositionInputContainer">
        <select id="imgPositionInputSelect" class="selectContainer">
          <option value="Random">Random</option>
          <option value="Precise Position">Precise Position</option>
        </select>
        <input id="imgPositionInput1" class="gridTextInput" placeholder="% from left" type="text" style="display: none;">
        <input id="imgPositionInput2" class="gridTextInput" placeholder="% from top" type="text" style="display: none;">
      </div>
    </div>
    <div id="imgWidthContainer" class="tabImgContainer">
      <div id="imgWidthLabel" class="gridLabel">Width:</div>
      <div id="imgWidthInputContainer"> 
        <select id="imgWidthInputSelect" class="selectContainer">
          <option value="Auto">Auto</option>
          <option value="Random Between">Random Between</option>
        </select>
        <input id="imgWidthInput1" class="gridTextInput" type="text" placeholder="Min value." style="display: none;">
        <input id="imgWidthInput2" class="gridTextInput" placeholder="Max value." type="text" style="display: none;">
      </div>
    </div>
    <div id="imgHeightContainer" class="tabImgContainer">
      <div id="imgHeightLabel" class="gridLabel">Height:</div>
      <div id="imgHeightInputContainer"> 
        <select id="imgHeightInputSelect" class="selectContainer">
          <option value="Auto">Auto</option>
          <option value="Random Between">Random Between</option>
        </select>
        <input id="imgHeightInput1" class="gridTextInput" type="text" placeholder="Min value." style="display: none;">
        <input id="imgHeightInput2" class="gridTextInput" placeholder="Max value." type="text" style="display: none;">
      </div>
    </div>
    `;
    tab.insertAdjacentHTML("beforeend",createImgBaseTabHTML);
    document.getElementById("tabsContainer").appendChild(tab);
    //image url
    let imgValueInput = document.getElementById("imgValueInput");
    let tippyImgValueInput = createTippy(imgValueInput,"url can't be empty :c","right");
    let imgSizePreview = document.getElementById("imgSizePreview");
    _tippys.push(tippyImgValueInput);
    imgValueInput.oninput = (e) => {
      if(e.target.value == "") {
        imgValueInput.classList.add("invalidValue");
        tippyImgValueInput.show();
        return;
      }
      imgValueInput.classList.remove("invalidValue");
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].imgUrl = e.target.value;
      imgSizePreview.src =  _currentlyLoaded.values[_currentlyLoaded.selectedValue].imgUrl;
    }
    //time
    let imgTimeInput = document.getElementById("imgTimeInput");
    let imgTimeRange = document.getElementById("imgTimeRange");
    let tippyImgTimeInput = createTippy(imgTimeInput,"Use a number >:c","right");
    _tippys.push(tippyImgTimeInput);
    imgTimeInput.oninput = (e) => {
      if(isNaN(Number(e.target.value))||e.target.value == "") {
        imgTimeInput.classList.add("invalidValue");
        tippyImgTimeInput.show();
        return;
      }
      imgTimeInput.classList.remove("invalidValue");
      imgTimeRange.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].leaveTime = e.target.value;
    }
    imgTimeRange.oninput = (e) => {
      imgTimeInput.classList.remove("invalidValue");
      imgTimeInput.value = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].leaveTime = e.target.value;
    }

    //position
    let imgPositionInputSelect = document.getElementById("imgPositionInputSelect");
    let imgPositionInput1 = document.getElementById("imgPositionInput1");
    let imgPositionInput2 = document.getElementById("imgPositionInput2");
    let tippyImgPos1 = createTippy(imgPositionInput1,"Value must be in format: 11.11%","top");
    let tippyImgPos2 = createTippy(imgPositionInput2,"Value must be in format: 11.11%","bottom");
    _tippys.push(tippyImgPos1);
    _tippys.push(tippyImgPos2);
    imgPositionInputSelect.onchange = (e) => {
      let selected = e.target.value;
      if(selected == "Random") {
        imgPositionInput1.style.display = "none";
        imgPositionInput2.style.display = "none";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].position = "Random";

        imgPositionInput1.classList.remove("invalidValue");
        imgPositionInput1.value="";
        imgPositionInput2.classList.remove("invalidValue");
        imgPositionInput2.value="";
      } else {
        imgPositionInput1.style.display = "";
        imgPositionInput2.style.display = "";
        let chooseWindow = createElement("div","chooseWindow","","Click where you would like your image top-left corner to be.");
        document.getElementById("scaler").appendChild(chooseWindow);
        chooseWindow.onclick = (evt) => {
          let boundRect=evt.target.getBoundingClientRect();
          imgPositionInput1.value = ((evt.clientX-boundRect.left)*100/boundRect.width).toFixed(2)+"%";
          imgPositionInput2.value = ((evt.clientY-boundRect.top)*100/boundRect.height).toFixed(2)+"%";
          _currentlyLoaded.values[_currentlyLoaded.selectedValue].position = [imgPositionInput1.value,imgPositionInput2.value];
          chooseWindow.remove();
        };
      }
    };
    imgPositionInput1.oninput = (e) => {
      if(e.target.value.match(/^(\d+|-\d+)(\.?\d+)*%$/)==null) {
        imgPositionInput1.classList.add("invalidValue");
        tippyImgPos1.show();
        return;
      }
      imgPositionInput1.classList.remove("invalidValue");
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].position[0] = e.target.value;
    }
    imgPositionInput2.oninput = (e) => {
      if(e.target.value.match(/^(\d+|-\d+)(\.?\d+)*%$/)==null) {
        imgPositionInput2.classList.add("invalidValue");
        tippyImgPos2.show();
        return;
      }
      imgPositionInput2.classList.remove("invalidValue");
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].position[1] = e.target.value;
    }

    //size
    //width
    let imgWidthInputSelect = document.getElementById("imgWidthInputSelect");
    let imgWidthInput1 = document.getElementById("imgWidthInput1");
    let imgWidthInput2 = document.getElementById("imgWidthInput2");
    let tippyImgWidth1 = createTippy(imgWidthInput1,"Value must be in format: 11.11%","top");
    let tippyImgWidth2 = createTippy(imgWidthInput2,"Value must be in format: 11.11%","right");
    _tippys.push(tippyImgWidth1);
    _tippys.push(tippyImgWidth2);
    imgWidthInputSelect.onchange = (e) => {
      let selected = e.target.value;
      if(selected == "Auto") {
        imgWidthInput1.style.display = "none";
        imgWidthInput2.style.display = "none";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].width = "auto";

        imgWidthInput1.classList.remove("invalidValue");
        imgWidthInput1.value="";
        imgWidthInput2.classList.remove("invalidValue");
        imgWidthInput2.value="";
      } else {
        imgWidthInput1.style.display = "";
        imgWidthInput2.style.display = "";
        imgWidthInput1.value="25%";
        imgWidthInput2.value="50%";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].width = ["25%","50%"];
      }
    };
    imgWidthInput1.oninput = (e) => {
      if(e.target.value.match(/^(\d+|-\d+)(\.?\d+)*%$/)==null) {
        imgWidthInput1.classList.add("invalidValue");
        tippyImgWidth1.show();
        return;
      }
      imgWidthInput1.classList.remove("invalidValue");
      imgSizePreview.style.width = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].width[0] = e.target.value;
    }
    imgWidthInput2.oninput = (e) => {
      if(e.target.value.match(/^(\d+|-\d+)(\.?\d+)*%$/)==null) {
        imgWidthInput2.classList.add("invalidValue");
        tippyImgWidth2.show();
        return;
      }
      imgWidthInput2.classList.remove("invalidValue");
      imgSizePreview.style.width = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].width[1] = e.target.value;
    }
    imgWidthInput1.onfocus = (e) => {
      imgSizePreview.style.display = "";
      imgSizePreview.style.width = e.target.value;
      imgSizePreview.style.height = "auto";
    }
    imgWidthInput1.onblur = (e) => {
      imgSizePreview.style.display = "none";
    }
    imgWidthInput2.onfocus = imgWidthInput1.onfocus;
    imgWidthInput2.onblur = imgWidthInput1.onblur;
    //height
    let imgHeightInputSelect = document.getElementById("imgHeightInputSelect");
    let imgHeightInput1 = document.getElementById("imgHeightInput1");
    let imgHeightInput2 = document.getElementById("imgHeightInput2");
    let tippyImgHeight1 = createTippy(imgHeightInput1,"Value must be in format: 11.11%","top");
    let tippyImgHeight2 = createTippy(imgHeightInput2,"Value must be in format: 11.11%","right");
    _tippys.push(tippyImgHeight1);
    _tippys.push(tippyImgHeight2);
    imgHeightInputSelect.onchange = (e) => {
      let selected = e.target.value;
      if(selected == "Auto") {
        imgHeightInput1.style.display = "none";
        imgHeightInput2.style.display = "none";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].height = "auto";

        imgHeightInput1.classList.remove("invalidValue");
        imgHeightInput1.value="";
        imgHeightInput2.classList.remove("invalidValue");
        imgHeightInput2.value="";
      } else {
        imgHeightInput1.style.display = "";
        imgHeightInput2.style.display = "";
        imgHeightInput1.value="25%";
        imgHeightInput2.value="50%";
        _currentlyLoaded.values[_currentlyLoaded.selectedValue].height = ["25%","50%"];
      }
    };
    imgHeightInput1.oninput = (e) => {
      if(e.target.value.match(/^(\d+|-\d+)(\.?\d+)*%$/)==null) {
        imgHeightInput1.classList.add("invalidValue");
        tippyImgHeight1.show();
        return;
      }
      imgHeightInput1.classList.remove("invalidValue");
      imgSizePreview.style.height = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].height[0] = e.target.value;
    }
    imgHeightInput2.oninput = (e) => {
      if(e.target.value.match(/^(\d+|-\d+)(\.?\d+)*%$/)==null) {
        imgHeightInput2.classList.add("invalidValue");
        tippyImgHeight2.show();
        return;
      }
      imgHeightInput2.classList.remove("invalidValue");
      imgSizePreview.style.height = e.target.value;
      _currentlyLoaded.values[_currentlyLoaded.selectedValue].height[1] = e.target.value;
    }
    imgHeightInput1.onfocus = (e) => {
      imgSizePreview.style.display = "";
      imgSizePreview.style.height = e.target.value;
      imgSizePreview.style.width = "auto";
    }
    imgHeightInput1.onblur = (e) => {
      imgSizePreview.style.display = "none";
    }
    imgHeightInput2.onfocus = imgHeightInput1.onfocus;
    imgHeightInput2.onblur = imgHeightInput1.onblur;    

    return tab;
  }

  function createImgEffectsTab() {
    let tab = createElement("div","imgEffectsTab","createTab");

    return tab;
  }

  function createImgPreviewTab() {
    let tab = createElement("div","imgPreviewTab","createTab");
    let createImgPreviewTabHTML = `
    <div id="imgPreviewContainer" class="tabWordContainer">
      <div id="imgSpawn1Btn" class="spawn1Btn">Spawn 1!</div>
    </div>
    `;
    tab.insertAdjacentHTML("beforeend",createImgPreviewTabHTML);
    document.getElementById("tabsContainer").appendChild(tab);

    //spawn1
    let imgSpawn1Btn = document.getElementById("imgSpawn1Btn");
    imgSpawn1Btn.onclick = (e) => {
      spawnImg(_currentlyLoaded.values[_currentlyLoaded.selectedValue]);
    };
    return tab;
  }

  function spawnImg(img) {
    let imgElm = createElement("img","","imgHypno");
    let bounds = spawnArea.getBoundingClientRect();
    
    imgElm.crossOrigin = "anonymous";

    imgElm.src = img.imgUrl;
    imgElm.onload = (e) => {

      if(img.width=="auto") {
        imgElm.style.width = "auto";
      } else {
        imgElm.style.width = randRange(Number(img.width[0].slice(0,-1)),Number(img.width[1].slice(0,-1)))+"%";
      }
      imgElm.style.setProperty("--width",imgElm.style.width);

      if(img.height=="auto") {
        imgElm.style.height = "auto";
      } else {
        imgElm.style.height = randRange(Number(img.height[0].slice(0,-1)),Number(img.height[1].slice(0,-1)))+"%";
      }
      imgElm.style.setProperty("--height",imgElm.style.height);

      imgElm.style.opacity = img.opacity;

      let rotateValue = randRange(Number(img.rotation[0]),Number(img.rotation[1]))+"deg";
      imgElm.style.setProperty("--rotation",rotateValue);
      imgElm.style.transform = "rotate(var(--rotation))";

      if(img.position=="Random") {
        let tempImgSpan = createElement("img","","tempImg");
        tempImgSpan.src = imgElm.src;
        tempImgSpan.style.width = imgElm.style.width;
        tempImgSpan.style.height = imgElm.style.height;
        spawnArea.appendChild(tempImgSpan);
        let spanRect = tempImgSpan.getBoundingClientRect();
        imgElm.style.top = randRange(spanRect.height*-1+(bounds.height+spanRect.height)*15/100,bounds.height*85/100)+"px";
        imgElm.style.left = randRange(spanRect.width*-1+(bounds.width+spanRect.width)*15/100,bounds.width*85/100)+"px";
        tempImgSpan.remove();
      } else {
        imgElm.style.top = Number(img.position[1].slice(0,-1))*bounds.height/100+"px";
        imgElm.style.left = Number(img.position[0].slice(0,-1))*bounds.width/100+"px";
      }

      spawnArea.appendChild(imgElm);
      let smart = img.smart;
      let imgRect = imgElm.getBoundingClientRect();
      if(smart == "Yes") {
        if(imgRect.bottom > bounds.bottom) {
          imgElm.style.top = Number(imgElm.style.top.slice(0,-2)) - (imgRect.bottom - bounds.bottom) +"px";
        }
        if(imgRect.right > bounds.right) {
          imgRect = imgElm.getBoundingClientRect();
          imgElm.style.left = Number(imgElm.style.left.slice(0,-2)) - (imgRect.right - bounds.right) +"px";
        }
        if(imgRect.left < bounds.left) {
          imgRect = imgElm.getBoundingClientRect();
          imgElm.style.left = Number(imgElm.style.left.slice(0,-2)) + Math.abs(bounds.left - imgRect.left)+"px";
        }
        if(imgRect.top < bounds.top) {
          imgRect = imgElm.getBoundingClientRect();
          imgElm.style.top = Number(imgElm.style.top.slice(0,-2)) + Math.abs(bounds.top - imgRect.top)+"px";
        }
        if(imgRect.width >= bounds.width || imgRect.height >= bounds.height) {
          imgRect = imgElm.getBoundingClientRect();
          let tempImgSpan = createElement("img","","tempImg");
          tempImgSpan.src = imgElm.src;
          tempImgSpan.style.width = imgElm.style.width;
          tempImgSpan.style.height = imgElm.style.height;
          spawnArea.appendChild(tempImgSpan);
          let spanRect = tempImgSpan.getBoundingClientRect();
          imgElm.style.left = (spanRect.width-bounds.width)/(-2)+"px";
          imgElm.style.top = (spanRect.height-bounds.height)/(-2)+"px";
          tempImgSpan.remove();
        }
      }

      imgElm.style.setProperty("--top",imgElm.style.top);
      imgElm.style.setProperty("--left",imgElm.style.left);

      imgElm.style.setProperty("--duration",img.leaveTime);

      setTimeout(()=>{imgElm.remove();},img.leaveTime);
      if(img.animation != "None") {
        let anim = JSON.parse(JSON.stringify(img.animation));
        let keyframesList = [];
        let timings = anim.timings;
        anim.keyframes.sort((a,b)=>{return Number(a.offset)-Number(b.offset)});
        for(let selKf=0;selKf<anim.keyframes.length;selKf++) {
          let curKeyframe = {};
          for(let selVal=0;selVal<anim.keyframes[selKf].names.length;selVal++) {
            curKeyframe[anim.keyframes[selKf].names[selVal]] = anim.keyframes[selKf].values[selVal];
          }
          curKeyframe.offset = anim.keyframes[selKf].offset;
          keyframesList.push(curKeyframe);
        }
        imgElm.animate(keyframesList,timings);
      }
    }
  }

  function changeTabType(type) {
    if(document.getElementsByClassName("invalidValue").length != 0) {
      GUI.instance.DisplayMessage("Fix the errors first :D");
      return;
    }
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
    if(document.getElementsByClassName("invalidValue").length != 0) {
      GUI.instance.DisplayMessage("Fix the errors first :D");
      return;
    }
    for (let i=0;i<_tabsContainers.length;i++) {
      _tabsTitles[i].classList.remove("activeType");
      _tabsContainers[i].style.display = "none";
    }
    _tabsTitles[whichTab].classList.add("activeType");
    _tabsContainers[whichTab].style.display = "";
    if(whichTab==2) {
      _tabsTitles[5].classList.add("activeType");
    }
  }

  function cleanInvalidValues(fromId) {
    let allInv = document.getElementById(fromId).querySelectorAll(".invalidValue");
    allInv.forEach((invalid)=>{invalid.classList.remove("invalidValue")}); 
  }

  function emptyMainBox() {
    mainBox.innerHTML = "";
    _tabsTypes = [];
    _tabsTitles = [];
    _tabsContainers = [];
    _colorPickers = [];
    _currentlyLoaded = JSON.parse(JSON.stringify(_templateHypno));
    _tippys.forEach((tippy)=>{tippy.destroy()});
    _tippys = [];
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
   newFunc = newFunc.replace(/this\.ExitAlert\(\)/gm,"GUI.instance.ExitAlert()");

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

  function createTippy(elm, content, placement) {
    var tippySettings = {
      "content": content,
      "trigger": "focus",
      "hideOnClick": "true",
      "placement": placement,
      "theme": "error",
      onShow(instance) {
        return elm.classList.contains("invalidValue");
      }
    };
    return tippy(elm,tippySettings);
  }

  function preloadedHypnosSelectUpdate(value) {
    let needUpdate = document.getElementById("selectHypno").options;
    for(let i = 0; i<needUpdate.length; i++) {
      if(needUpdate[i].value==value) {
        document.getElementById("selectHypno").selectedIndex = i;
        return;
      }
    }
    needUpdate.add(new Option(value,value));
    document.getElementById("selectHypno").selectedIndex = needUpdate.length-1;
  }

  //CAST

  function loadCastScreen() {
    emptyMainBox();
    let topContainerHTML = `
    <div id="topContainer" class="gridContainer">
      <input id="backButton" class="" placeholder="" type="button" value="<">
      <div id="closeButton" class="button close"></div>
    </div>
    `;
    mainBox.insertAdjacentHTML("beforeend",topContainerHTML);
    
    let backButton = document.getElementById("backButton");
    backButton.onclick = startBmr;
    let closeButton = document.getElementById("closeButton");
    closeButton.onclick = () => { mainBox.remove(); };

    createCastMenu();
  }

  function createCastMenu() {
    let createMenuHTML = `
    <div id="castMenu" class="menu-start">
      <div id="cast-tab-start">
        <div id="selectHypnoContainer" class="tabWordContainer">
          <div id="selectHypnoLabel" class="gridLabel">Casting:</div>
          <div id="selectHypnoInputContainer">
            <select id="selectHypnoInputSelect" class="selectContainer">
              <option value="None">None</option>
            </select>
          </div>
        </div>
        <div id="castTargetContainer" class="tabWordContainer">
          <div id="castTargetLabel" class="gridLabel">Who is the target?</div>
          <div id="castTargetInputContainer">
            <select id="castTargetInputSelect" class="selectContainer">
              <option value="Yourself">Yourself</option>
              <option value="Your Opponent">Your Opponent</option>
              <option value="Username">Username</option>
            </select>
            <input id="castTargetInput" class="gridTextInput" type="text" placeholder="Username here" style="display: none"> 
          </div>
        </div>
        <div id="castBtnContainer" class="tabWordContainer">
          <div id="castButton">Cast!</div>
        </div>
      </div>
    </div>
    `;
    mainBox.insertAdjacentHTML("beforeend",createMenuHTML);

    //select hypno
    let selectHypno = document.getElementById("selectHypnoInputSelect");
    for(i in _preloadedHypnos) {
      if(i != "New one"&&i != "Load from file") {
        selectHypno.options.add(new Option(i,_preloadedHypnos[i].name));
      }
    }
    selectHypno.onchange = (e) => {
      let selected = e.target.options[e.target.selectedIndex].text;
      _currentlyLoaded = _preloadedHypnos[selected];
    };

    //select target
    let castTargetInputSelect = document.getElementById("castTargetInputSelect");
    castTargetInputSelect.onchange = (e) => {
      let selected = e.target.value;
      if(selected == "Username") {
        document.getElementById("castTargetInput").style.display = "";
      } else {
        document.getElementById("castTargetInput").style.display = "none";
      }
    };

    //cast!
    let castButton = document.getElementById("castButton");
    castButton.onclick = (e) => {
      let option = document.getElementById("castTargetInputSelect").value;
      if(document.getElementById("selectHypnoInputSelect").value == "None") {
        GUI.instance.DisplayMessage("Choose something first!");
        return;
      }
      switch (option) {
        case "Yourself":
          castHypno(_currentlyLoaded,0);
          break;
        case "Your Opponent":
          if(LOCATION.instance.opponent == null) {
            GUI.instance.DisplayMessage("You're alone :c");
            return;
          }
          castHypno(_currentlyLoaded,1,LOCATION.instance.opponent.username);
          break;
        case "Username":
          let target = document.getElementById("castTargetInput").value;
          if(target == "") {
            GUI.instance.DisplayMessage(`You didn't insert an username!`);
            return;
          }
          castHypno(_currentlyLoaded,1,target);
          break;
      }
    };
  }

  function castHypno(hypno,target,targetUsername) {
    if(target==0) {
      if(_activeHypnos[hypno.name]) {
        GUI.instance.DisplayMessage("It's already active!");
        return;
      }
      let intId = setInterval(()=>{
        let chosen = Math.floor(Math.random()*hypno.values.length);
        hypno.values[chosen].type == "word"?spawnWord(hypno.values[chosen]):spawnImg(hypno.values[chosen]);
      },hypno.spawnTime);
      _activeHypnos[hypno.name] = intId;
      GUI.instance.DisplayMessage(`You are now under the effects of: ${hypno.name}`);
    } else {
      let theMessage = "${theHypno=";
      theMessage += JSON.stringify(hypno)+";}";
      sendMessageUsername(theMessage,targetUsername);
      //adding the css
      theMessage = "${scriptCss=document.createElement('link');scriptCss.href='https://cdn.jsdelivr.net/gh/AccountForBmr/TestingJsdelivrCauseIWantToUseIt@v0.8.44/test2.css';scriptCss.rel='stylesheet';document.body.appendChild(scriptCss);";
      //adding the spawningInterval
      theMessage += '$intervalId = setInterval(()=>{let chosen = Math.floor(Math.random()*theHypno.values.length);theHypno.values[chosen].type == "word"?spawnWord(theHypno.values[chosen]):spawnImg(theHypno.values[chosen]);},theHypno.spawnTime);';
      //adding createElement,spawnArea and randRange
      theMessage += `${createElement.toString()};`;
      theMessage += 'var spawnArea = createElement("div","hypnoSpawnArea");document.getElementById("scaler").appendChild(spawnArea);';
      theMessage += `${randRange.toString()};`;
      //adding spawnWord function
      theMessage += `${spawnWord.toString()};`;
      //adding spawnImg function
      theMessage += `${spawnImg.toString()};`;
      theMessage += "}";
      //removing \n (to make the message cast macro work)
      theMessage = theMessage.replace(/[\r\n]+/gm, "");
      sendMessageUsername(theMessage,targetUsername);
      //the message with the instructions
      let message2 = `Hello! If you're seeing this message, than it means that I've decide to cast a spell on you!
      Please, copy/paste the long message that was sent along with this one into your chat for the spell to work (if the message was split into multiple ones cause the max length is 16382, copy them all in the order received).
      If you wish to remove the effets of the spell afterwards, all you need to do is type this in chat (the stuff already on screen will be removed when its duration expires):
      `;
      message2 += "${clearInterval($intervalId)}";
      GAME_MANAGER.instance.WaitFor("Message", { "receiver":targetUsername, "message": message2, load: true});
      GUI.instance.DisplayMessage(`A message with some instructions has been sent to ${targetUsername}`);
    }
  }

  function sendMessageUsername(mes, username) {
    if(mes.length>16382) {
      GAME_MANAGER.instance.WaitFor("Message", { "receiver":username, "message": mes.substring(0,16382), load: true});
      mes = mes.substring(16382);
      sendMessageUsername(mes,username);
    } else {
      GAME_MANAGER.instance.WaitFor("Message", { "receiver":username, "message": mes, load: true});
    }
  }

  //REMOVE
  function loadRemoveScreen() {
    emptyMainBox();
    let topContainerHTML = `
    <div id="topContainer" class="gridContainer">
      <input id="backButton" class="" placeholder="" type="button" value="<">
      <div id="closeButton" class="button close"></div>
    </div>
    `;
    mainBox.insertAdjacentHTML("beforeend",topContainerHTML);
    
    let backButton = document.getElementById("backButton");
    backButton.onclick = startBmr;
    let closeButton = document.getElementById("closeButton");
    closeButton.onclick = () => { mainBox.remove(); };

    createRemoveMenu();
  }

  function createRemoveMenu() {
    let createMenuHTML = `
    <div id="removeMenu" class="menu-start">
      <div id="remove-tab-start">
        <div id="removeTargetContainer" class="tabWordContainer">
          <div id="removeTargetLabel" class="gridLabel">Which one do you wish to remove?</div>
          <div id="removeTargetInputContainer">
            <select id="removeTargetInputSelect" class="selectContainer">                             
            </select>             
          </div>
        </div>
        <div id="removeBtnContainer" class="tabWordContainer">
          <div id="removeButton">Remove!</div>
        </div>
      </div>
    </div>
    `;
    mainBox.insertAdjacentHTML("beforeend",createMenuHTML);

    //fill select target
    fillRemoveSelection();

    //remove!
    let removeButton = document.getElementById("removeButton");
    removeButton.onclick = (e) => {
      let option = document.getElementById("removeTargetInputSelect").value;
      if(option == "New one") {
        GUI.instance.DisplayMessage("Nothing to remove :c");
        return;
      }
      clearInterval(_activeHypnos[option]);
      delete _activeHypnos[option];
      GUI.instance.DisplayMessage(`You are no long under the effects of: ${option}`);
      fillRemoveSelection();
    };
  }

  function fillRemoveSelection() {
    removeTargetInputSelect = document.getElementById("removeTargetInputSelect");
    removeTargetInputSelect.options.length = 0;
    console.log(_activeHypnos);
    if(Object.keys(_activeHypnos).length == 0) {
      removeTargetInputSelect.options.add(new Option("Empty :c","New one"));
    } else {
      for(i in _activeHypnos) {
        if(i != "New one"&&i != "Load from file") {
          removeTargetInputSelect.options.add(new Option(i,_preloadedHypnos[i].name));
        }
      }
    }
  }

  BMRHYPNO.start = startBmr;
  let jsColorScript=document.createElement('script');
  jsColorScript.src='https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.5.2/jscolor.min.js';
  document.body.appendChild(jsColorScript);
  jsColorScript.onload = () => {
    GUI.instance.DisplayMessage("JsColor Loaded");
    jsColor = JSColor; 
  }
  let popperScript=document.createElement('script');
  popperScript.src='https://unpkg.com/@popperjs/core@2';
  document.body.appendChild(popperScript);
  popperScript.onload = () => {
    GUI.instance.DisplayMessage("Popper Loaded");
    let tippyScript=document.createElement('script');
    tippyScript.src='https://unpkg.com/tippy.js@6';
    document.body.appendChild(tippyScript);
    tippyScript.onload = () => {
      GUI.instance.DisplayMessage("Tippy Loaded");
    }    
  }
  let scriptCss=document.createElement('link');
  scriptCss.href='https://cdn.jsdelivr.net/gh/AccountForBmr/BmrHypno@v0.8.78/hypno.css';
  scriptCss.rel="stylesheet";
  document.body.appendChild(scriptCss);
  scriptCss.onload = () => {
    GUI.instance.DisplayMessage("Css Loaded");
  }

};

BMRHYPNO.load = bmrHypno;
