const timerElement = document.getElementById('timer');

let timer = true;
let minutes = 0;
let seconds = 0;

const stopWatch = (element = timerElement) => { 
    if (timer) {
        seconds++;

        if (seconds == 60) { 
            minutes++; 
            seconds = 0;
        }

        let minString = minutes; 
        let secString = seconds; 
  
        if (minutes < 10) { 
            minString = '0' + minString; 
        }
  
        if (seconds < 10) { 
            secString = '0' + secString; 
        }
        
        element.innerHTML = `${minString}:${secString}`;
        setTimeout(stopWatch, 1000, element);
    }
};
