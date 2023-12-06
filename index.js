const clockContainer = document.querySelector('.clockContainer')
const updateWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherReport)
    }
}
const fetchWeatherReport = async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e96b8fa3b6db6a63809c18a511d3a994`
    const res = await fetch(url);
    const data = await res.json();
    const container = document.querySelector('.weather');
    const tempElem = document.createElement('ul');
    tempElem.className='tempList';
    tempElem.innerHTML= `<li>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</li><li> Min Temp.  : ${(data.main.temp_min - 273.15).toFixed(2)}°C</li><li>  Max Temp. : ${(data.main.temp_max - 273.15).toFixed(2)}°C</li> `
    container.appendChild(tempElem)

}
updateWeather();

let clk;
const getClock = ()=>{
    stopInterval();
    const clkbody = document.querySelector('.clockContainer');
    clkbody.innerHTML="";
    const elem = document.createElement('h2');
    elem.className="digiclock"
    clkbody.appendChild(elem)
    clk = setInterval(()=>{
        elem.textContent = ""
        const time= new Date();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const seconds = time.getSeconds();
        elem.textContent = `${(hour<10)?"0"+hour:hour}:${(minute<10)?"0"+minute:minute}:${(seconds<10)?"0"+seconds:seconds}`
    },1000)
}
const getTimer = ()=>{
    stopInterval();
    const clkbody = document.querySelector('.clockContainer');
    clkbody.innerHTML="";
    const elem = document.createElement('div');
    elem.className="digiclock"
    clkbody.appendChild(elem)
    elem.innerHTML =`<div class="timerContainer">   
    <div class="timer">
        <div class='col1'>
        <button onclick="increment('hourI')" class="modifier">+</button>
        <input type="text" id="hourI" class='countDis' readonly="readonly" value='00'>
        <button onclick="decrement('hourI')" class="modifier">-</button>
        </div>
        <div class='col1'>
        <button onclick="increment('minI')" class="modifier">+</button>
        <input type="text" id="minI" class='countDis' readonly="readonly"  value='00'>
        <button onclick="decrement('minI')" class="modifier">-</button>
        </div>
        <div class='col1'>
        <button onclick="increment('secI')" class="modifier">+</button>
        <input type="text" id="secI" class='countDis' readonly="readonly"  value='00'>
        <button onclick="decrement('secI')" class="modifier">-</button>
        </div>
    </div>
    <div class='buttons'>
        <button onclick="startTimer()" id='start'>Start</button>
        <button onclick="resetTimer()" id='reset'>Reset</button>
    </div>
</div>
`
}
const getStopWatch = ()=>{
    stopInterval();
    const clkbody = document.querySelector('.clockContainer');
    clkbody.innerHTML="";
    const elem = document.createElement('div');
    elem.className="digiclock"
    clkbody.appendChild(elem)
    elem.innerHTML =`<div class="timerContainer">   
    <div class="timer">
        <div class='col1'>
        <input type="text" id="hourI" class='countDis' readonly="readonly" value='00'>
        </div>
        <div class='col1'>
        <input type="text" id="minI" class='countDis' readonly="readonly"  value='00'>
        </div>
        <div class='col1'>
        <input type="text" id="secI" class='countDis' readonly="readonly"  value='00'>
        </div>
    </div>
    <div class='buttons'>
        <button onclick="startStopWatch()" id='start'>Start</button>
        <button onclick="stopInterval()" id='stop'>Stop</button>
        <button onclick="resetTimer()" id='reset'>Reset</button>
    </div>
</div>
`
}
const increment = (id)=>{
    let count = 59;
    if(id==='hourI')count=23;
    const elem = document.getElementById(id);
    if(elem.value){
        const val = parseInt(elem.value);
        if(val===count)elem.value='00';
        else elem.value = (val<9)?('0'+ (val+1)):val+1;
    }
    else elem.value = '00';   
}
const decrement = (id)=>{
    let count=59
    if(id==='hourI')count=23;
    const elem = document.getElementById(id);
    if(elem.value){
        const val = parseInt(elem.value);
        if(val===0)elem.value=count;
        else elem.value = (val<9)?('0'+ (val-1)):val-1;
    } 
    else elem.value='00'
}
const startTimer = ()=>{
    const buttons = document.querySelectorAll('.modifier')
    buttons.forEach((button)=>{
        button.disabled=true;
    }) 
    const hour = document.getElementById('hourI');
    const min = document.getElementById('minI');
    const sec = document.getElementById('secI');
    clk= setInterval(()=>{
        if(sec.value=='00'){
            if(min.value=='00'){
                if(hour.value=='00'){
                    stopInterval();
                    buttons.forEach((button)=>{
                        button.disabled=false;
                    }) 
                    return;
                }
                else{
                    decrement('hourI');
                    decrement('minI');
                }
            }
            else decrement('minI');
        }
        decrement('secI')
    },1000)
}
const resetTimer = ()=>{
    stopInterval();
    document.getElementById('hourI').value='00';
    document.getElementById('minI').value='00';
    document.getElementById('secI').value='00';
    const buttons = document.querySelectorAll('.modifier')
    buttons.forEach((button)=>{
        button.disabled=false;
    }) 
}
const stopInterval = ()=>{
    clearInterval(clk);
}

const startStopWatch = ()=>{
    const hour = document.getElementById('hourI');
    const min = document.getElementById('minI');
    const sec = document.getElementById('secI');
    clk= setInterval(()=>{
        if(sec.value==59){
            if(min.value==59){
                if(hour.value==23){
                    resetTimer();
                    return;
                }
                else increment('hourI')
                increment('minI');
            }
            else{
                increment('minI')
            }
        }
        increment('secI')
    },1000)
}
let switchList = true;
document.getElementById('expand').addEventListener('click',()=>{
    if(switchList){
        const elem = document.getElementsByClassName('tempList')[0];
        elem.classList.remove('tempList');
        elem.classList.add('newList');
        switchList=false;
    }
    else{
        const elem = document.getElementsByClassName('newList')[0];
        elem.classList.remove('newList');
        elem.classList.add('tempList');
        switchList = true;
    }
})
window.addEventListener('resize',()=>{
    const elem = document.getElementsByClassName('newList')[0];
    if(window.innerWidth>=800 && elem!==undefined){
        elem.classList.remove('newList')
        elem.classList.add('tempList')
        switchList=true;
    }
})
window.onload=getClock();