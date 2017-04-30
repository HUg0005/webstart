
var currenttimeloop = setInterval(currenttime, 100);
toggleclass();
var once = 0;

function beep(reset) {
  if (reset === 1) {
    once = 0;
    return;
  } else {
    once += 10;
    if (once === 90) {
      var snd = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"+Array(1e3).join(123));
      snd.play();
      once = 0;
    }
  }
}

function startslist() {
  var getstarts = document.getElementById("startlist").getElementsByTagName("li");
  var startcount = getstarts.length;
  var times = document.getElementById("startlist");
  var classlist = document.getElementById("classlist").getElementsByTagName("li")[Number(startcount)].innerHTML;
  var entry = document.createElement("li");
  entry.appendChild(document.createTextNode(classlist + ": " + document.getElementById("time").innerHTML));
  times.appendChild(entry);

}


function currenttime() {
  var ctime = new Date();
  var ch = ctime.getHours();
  if (ch < 10) {
  ch = "0" + ch
  }
  var cm = ctime.getMinutes();
  if (cm < 10) {
  cm = "0" + cm
  }
  var cs = ctime.getSeconds();
  if (cs < 10) {
  cs = "0" + cs
  }
  document.getElementById("time").innerHTML = ch + ":" + cm + ":" + cs;
  if (cs === 55) {
    beep(1);
  }
}

function timer() {
  var ctime = new Date();
  var stimeinput = document.getElementById("starttime").value;
  var sh = stimeinput.split(":")[0];
  var sm = stimeinput.split(":")[1];
  var stime = new Date(ctime.getFullYear(), ctime.getMonth(), ctime.getDate(), sh, sm, 0);
  var startamount = document.getElementById("startlist").getElementsByTagName("li");
  if (document.getElementById("onemin").checked === true) {
    var addtime = Number(startamount.length) * 360000;
  } else {
    var addtime = Number(startamount.length) * 300000;
  }
  var difftime = stime.getTime() - ctime.getTime() + addtime;
  var dm = parseInt(difftime/1000/60);
  var ds = parseInt(difftime/1000 % 60 + 1);
  if (ds === 60) {
    ds = "00";
  }
  else if (ds < 10) {
    ds = "0" + ds
  }
  if (dm < 10) {
    dm = "0" + dm
  }
  document.getElementById("difftime").innerHTML = dm + ":" + ds;


  if (dm >= 6 && document.getElementById("sixmin").checked === true) {
    var apdown = new Date(difftime - 359000);
    var apdownm = apdown.getMinutes();
    var apdowns = apdown.getSeconds();
    if (apdowns < 10) {
      apdowns = "0" + apdowns
    }
    if (apdownm < 10) {
      apdownm = "0" + apdownm
    }
    document.getElementById("flagtext").innerHTML = apdownm + ":" + apdowns + " to AP or General Recall Down";

    if (apdownm >= 1 && apdowns === 0 || apdownm === 0 && (apdowns === 30 || apdowns === 20 || apdowns <= 10)) {
      beep();
      document.getElementById("flagtext").style.color = "red";
    } else {
      document.getElementById("flagtext").style.color = "black";
    }
  }
  else if (dm >= 5) {
    var classup = new Date(difftime - 299000);
    var classupm = classup.getMinutes();
    var classups = classup.getSeconds();
    if (classups < 10) {
      classups = "0" + classups
    }
    if (classupm < 10) {
      classupm = "0" + classupm
    }
    document.getElementById("flagtext").innerHTML = classupm + ":" + classups + " to Class Up";
    if (classupm >= 1 && classups === 0 || classupm === 0 && (classups === 30 || classups === 20 || classups <= 10)) {
      beep();
      document.getElementById("flagtext").style.color = "red";
    } else {
      document.getElementById("flagtext").style.color = "black";
    }
  }
  else if (dm < 5 && dm >= 4) {
    var warningup = new Date(difftime - 239000);
    var warningupm = warningup.getMinutes();
    var warningups = warningup.getSeconds();
    if (warningups < 10) {
      warningups = "0" + warningups
    }
    if (warningupm < 10) {
      warningupm = "0" + warningupm
    }
    document.getElementById("flagtext").innerHTML = warningupm + ":" + warningups + " to Warning Up";
    if (warningups == 30 || warningups === 20 || warningups <= 10) {
      beep();
      document.getElementById("flagtext").style.color = "red";
    } else {
      document.getElementById("flagtext").style.color = "black";
    }
  }

  else if (dm < 4 && dm >= 1) {
    var warningdown = new Date(difftime - 59000);
    var warningdownm = warningdown.getMinutes();
    var warningdowns = warningdown.getSeconds();
    if (warningdowns < 10) {
      warningdowns = "0" + warningdowns
    }
    if (warningdownm < 10) {
      warningdownm = "0" + warningdownm
    }
    document.getElementById("flagtext").innerHTML = warningdownm + ":" + warningdowns + " to Warning Down";
    if (warningdowns === "00" || warningdownm === "00" &&(warningdowns == 30 || warningdowns === 20 || warningdowns <= 10)) {
      beep();
      document.getElementById("flagtext").style.color = "red";
    } else {
      document.getElementById("flagtext").style.color = "black";
    }
  }

  else if (dm < 1 && ds >= 0) {
    var start = new Date(difftime - 59000);
    var starts = start.getSeconds();
    if (starts < 10) {
      starts = "0" + starts
    }
    document.getElementById("flagtext").innerHTML = "00" + ":" + starts + " to Start";

    if (starts == 30 || starts === 20 || starts <= 10) {
      beep();
      document.getElementById("flagtext").style.color = "red";
    } else {
      document.getElementById("flagtext").style.color = "black";
    }
  }
  else if (ds < "00"){
    startslist();
  }
}

function addstart() {
  var classname = prompt("Please enter a name for the class.");
  var list = document.getElementById("classlist");
  var entry = document.createElement("li");
  entry.className = "center";
  entry.appendChild(document.createTextNode(classname));
  list.appendChild(entry);
}

function delstart() {
  var classes = document.getElementsByTagName("li");
  var removeclass = classes[classes.length - 1];
  var list = document.getElementById("classlist");
  list.removeChild(removeclass);
}

function toggleclass() {
  var timer = document.getElementById("timer");
  var classlistdiv = document.getElementById("classlistdiv");
  var classlist = document.getElementById("classlist");
  var timerbuttons = document.getElementById("timerbuttons");
  var buttons = document.getElementById("classbuttons");
  if (buttons.style.display === "none") {
    document.getElementById("centertoggle").innerHTML = "Timer";
      timerbuttons.style.display = "none";
      timer.style.display = "none";
      classlist.style.display = "block";
      classlistdiv.style.display = "block";
      buttons.style.display = "block";
  } else {
    document.getElementById("centertoggle").innerHTML = "Classes";
      buttons.style.display = "none";
      classlistdiv.style.display = "none";
      timerbuttons.style.display = "block";
      timer.style.display = "block";
      classlist.style.diplay = "none";
  }
}
