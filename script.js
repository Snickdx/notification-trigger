
//
// const picker = M.Timepicker.init(
//   document.querySelector('#time'),
//   {
//     defaultTime: 'now',
//     fromNow: '10000',
//     twelveHour: true,
//     vibrate: true,
//     onSelect: setClock
//   }
// );


// function setClock(hour, minute){
//   console.log(hour, minute);
// }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js');
  });
}

const createTimer = timer => val => timer.innerHTML = val;

const time = document.querySelector('#time');
const start = document.querySelector('#startBtn');
const test = document.querySelector('#testBtn');
const toggle = document.querySelector('#toggle');
const updateTimer = createTimer(time);

start.addEventListener('click', ()=>{
  let offset = 10;
  let interval = setInterval( () => 
    {
      if (offset > 0)
        updateTimer(offset--)
      else{
        clearInterval(interval);
      }
        
    }, 
    1000
  );
  createScheduledNotification(
    'web-alarm', 
    'Web Alarm', 
    `This was triggered ${offset}s ago`,
    offset
  )
});

toggle.addEventListener('click', async e=>{
 
  if(e.target.checked){
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log('Permission Granted')
    }
  
  }

})

test.addEventListener('click', async e=>{
  const reg = await navigator.serviceWorker.getRegistration();
  console.log(reg);
  reg.showNotification('Test Notification', {body:"This is a test"});
});

if (!("Notification" in window)) {
  alert("This browser does not support desktop notification");
}else{
  toggle.checked = Notification.permission === 'granted';
}


const createScheduledNotification = async (tag, title, body, offset) => {
  const registration = await navigator.serviceWorker.getRegistration();
  registration.showNotification(title, {
    tag,
    body,
    showTrigger: new TimestampTrigger(Date.now() + (offset * 1000))
  });
};