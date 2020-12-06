const datetime = document.querySelector(".js-datetime"),
    clock = document.querySelector(".js-clock");


    

function getTime(){
    const today = new Date(),
    year = today.getFullYear(),
    month = today.getMonth()+1,
    date = today.getDate(),
    day = today.getDay(),
    week = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
    hours = today.getHours(),
    minutes = today.getMinutes(),
    seconds = today.getSeconds();
    datetime.innerHTML = `${year}년 ${month>=10? month:`0${month}`}월 ${date>=10? date:`0${date}`}월 ${week[day]}`;
    clock.innerHTML = `${hours>=10?hours:`0${hours}`}:${minutes>=10?minutes:`0${minutes}`}:${seconds>=10?seconds:`0${seconds}`}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();