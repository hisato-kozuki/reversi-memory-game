//import swURL from './service-worker.js';

// Register the service worker
if ('serviceWorker' in navigator) {
  // Wait for the 'load' event to not block other work
  window.addEventListener('load', async () => {
    // Try to register the service worker.
    try {
      const reg = await navigator.serviceWorker.register('./service-worker.js');
      console.log('Service worker registered! 😎', reg);
    } catch (err) {
      console.log('😥 Service worker registration failed: ', err);
    }
  });
}
let NUMBER = 64;
    var x = new Array(NUMBER);
    var y = new Array(NUMBER);
    var bit = new Array(NUMBER);
    let state = "waiting";

    document.write('<div style="background-color: rgb(224, 224, 224); position: relative;">'
        +'<div style="display: flex; justify-content: center; position: relative; height: 60px;">'
        +'<h1 class="button" id="b0" style="position: absolute; text-align: center; background-color: rgb(255, 128, 64); visibility: visible;" onclick="start()">START</h1>'
        +'<h1 class="button" id="b4" style="position: absolute; text-align: center; background-color: silver;"></h1>'
        +'</div><div style="display:flex;justify-content: center; align-items: center; width: 400px; height: 400px">'
        +'<select name="namee" id="time_watch" style="height: 20px;">'
        +'<option value=300>300秒</option><option value=60>60秒</option><option value=120>120秒</option>'
        +'<option value=180>180秒</option><option value=240>240秒</option><option value=360>360秒</option>'
        +'</select>');
    for(let j=0; j<64; j++){
        document.write( '<div id="id'+ j +'" class="a" style="position: absolute;"></div>' );
        document.write( '<div id="idk'+ j +'" class="koma" style="position: absolute;" onclick="switch_koma(this)"></div>' );
        document.write( '<div id="idc'+ j +'" class="c" style="position: absolute; left: '+(45+40*(j%8))+'px; top: '+(57+40*Math.floor(j/8))+'px;"></div>' );
    }
    document.write('</div></div>');
    document.write('<div style="display: flex; justify-content: center;"><h1 class="button" id="b1" style="background-color: rgb(255, 224, 128); " onclick="respond()">Respond</h1>'
    +'<h1 class="button" id="b2" style="background-color: rgb(128, 224, 128); " onclick="marking()">Check your answer</h1>'
    +'<h1 class="button" id="b3" style="background-color: red; " onclick="start()"></h1></div>');
    function switch_koma(id){
        var style = id.style;
        style.backgroundColor = (style.backgroundColor === "black")?"white":"black";
        console.log(id);
    }
    function Kakudai_masu(i, id, x, y, a){
        var idx = document.getElementById('id'+id);
        idx.style.width = a+"px";
        idx.style.height = a+"px";
        idx.style.left = x+"px";
        idx.style.top = y+"px";
        i++;
        if(i<11)setTimeout(() => Kakudai_masu(i, id, x-2, y-2, a+4), 20);
    }
    function Arrange_masu(i){
        x[i] = 40*(i%8);
        y[i] = 40*Math.floor(i/8);
        var idx = document.getElementById('id'+i);
        idx.style.visibility = "visible";
        Kakudai_masu(0, i, 60+x[i], 60+y[i], 0);
        i++;
        if(i<NUMBER)setTimeout(() => Arrange_masu(i), 10);
        else Arrange_koma(0);
    }
    function Drop_koma(i, idx, y){
        idx.style.top = (y+10)+"px";
        i++;
        if(i<7)setTimeout(() => Drop_koma(i, idx, y+10), 20);
    }
    function Arrange_koma(i){
        console.log("koma arrange");
        x[i] = 40*(i%8);
        y[i] = 40*Math.floor(i/8);
        var idx = document.getElementById('idk'+i);
        idx.style.visibility = "visible";
        idx.style.backgroundColor = bit[i]?"white":"black";
        idx.style.left = (45+x[i])+"px";
        idx.style.top = (y[i]-25)+"px";
        Drop_koma(0, idx, y[i]-25);
        i++;
        if(i<NUMBER)setTimeout(() => Arrange_koma(i), 10);
        else {
            document.getElementById('b1').style.visibility = "visible";
            timer(0, document.getElementById('time_watch').value, state);
        }
    }
    function Erase_koma(i){
        var idx = document.getElementById('idk'+i);
        idx.style.visibility = "hidden";
        i++;
        if(i<NUMBER)setTimeout(() => Erase_koma(i), 10);
        else White_koma(0);
    }
    function White_koma(i){
        var idx = document.getElementById('idk'+i);
        idx.style.visibility = "visible";
        idx.style.backgroundColor = "white";
        idx.style.left = (45+x[i])+"px";
        idx.style.top = (45+y[i])+"px";
        i++;
        if(i<NUMBER)setTimeout(() => White_koma(i), 10);
        else {
            document.getElementById('b1').style.visibility = "hidden";
            document.getElementById('b2').style.visibility = "visible";
            timer(1, 150, state);
        }
    }
    function respond(){
        state = "answering";
        Erase_koma(0);
    }
    function marking(){
        let point = 0;
        for(i = 0; i<NUMBER; i++){
            var idx = document.getElementById('idk'+i);
            if((!bit[i] && idx.style.backgroundColor === "black")||(bit[i] && idx.style.backgroundColor === "white"))point++;
            else document.getElementById('idc'+i).style.visibility = "visible";
        }
        state = "checking";
        document.getElementById('b2').style.visibility = "hidden";
        document.getElementById('b4').style.visibility = "hidden";
        document.getElementById('b3').style.visibility = "visible";
        document.getElementById('b3').textContent = point +'point';
        document.getElementById('b0').style.visibility = "visible";
        timer(2, 0, state);
    }
    function timer(i, time, former_state){
        console.log("timer");
        document.getElementById('b4').textContent = 'time'+time;
        console.log(time);
        console.log(state);
        console.log(former_state);
        if(state==former_state && time>0)setTimeout(() => timer(i?1:0, time-1, former_state), 1000);
        else if(i==0)respond();
        else if(i==1)marking();
        
    }
    function start(){
    for(i = 0; i < NUMBER; i++){      
        bit[i] = Math.floor(Math.random()*2);
        var idx = document.getElementById('idk'+i);
        idx.style.visibility = "hidden";
        var idx = document.getElementById('id'+i);
        idx.style.visibility = "hidden";
        var idx = document.getElementById('idc'+i);
        idx.style.visibility = "hidden";
    }
        state = "watching";console.log("watching");
        document.getElementById('b0').style.visibility = "hidden";
        document.getElementById('b3').style.visibility = "hidden";
        document.getElementById('b4').style.visibility = "visible";
        document.getElementById('time_watch').style.visibility = 'hidden';
        document.getElementById('b4').textContent = 'time';
        Arrange_masu(0);
    }
