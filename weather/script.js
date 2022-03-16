const topComponent      = document.querySelector("#main");
const secondComponent   = document.querySelector("#second");
const form              = document.querySelector('form');
const lat               = document.querySelector('#lat');
const long              = document.querySelector('#long');
const navigasi          = document.querySelector('#navigasi')
const open              = document.querySelector('#open');
const exit              = document.querySelector('#exit');
const dark              = document.querySelector('#dark');
const latitude          = "0.0263";
const longitude         = "109.3425";

const getDay = () => {
    const current = new Date().getDay();
    switch(current){
        case 1:
            return 'Senin'
        case 2:
            return 'Selasa'
        case 3:
            return 'Rabu'
        case 4:
            return 'Kamis'
        case 5:
           return 'Jumat'
        case 6:
            return 'Sabtu'
        case 7:
            return 'Minggu'
    }
}

const getCurrentDate = () =>{
    const month  = ["Januari","February","Maret","April","Mei","Juni","July","Agustus","September","Oktober","November","Desember"]
    const current = new Date();
    const dateToday = `${current.getDate()} ${month[current.getMonth()]} ${current.getFullYear()}`;

    return dateToday;
}

const getCelcius = (kelvin) => {
    return Math.floor(kelvin - 273.15)
}

const displayData = (data) => {
    const { lat, lon, timezone, current, daily } = data;

    const mainData =  `
                <div class="kiri flex flex-col justify-between w-64 h-64 p-3  bg-gradient-to-r from-cyan-500 to-blue-700 rounded-t-md md:rounded-lg">
                    <div class="text-white">
                        <span class="font-semibold"></span>${getDay()}<br>
                        <span class="text-sm">${getCurrentDate()}</span> <br>
                        <span class="text-2xl">${timezone}</span> 
                    </div>
                    <div class="text-white">
                        <img class="logo text-5xl" src="http://openweathermap.org/img/w/${current.weather[0].icon}.png" alt"">
                        <span class="text-4xl">${getCelcius(current.temp)}&#176;C | ${current.temp}&#176;K</span> <br>
                        <span class="">${current.weather[0].description}</span>
                    </div>
                </div>

                <div class="kanan flex flex-col justify-between w-64 h-60 p-3  bg-gray-900 rounded-b-md md:rounded-r-lg ">
                    <div class="text-sm font-bold">
                        <div class="flex justify-around ">
                            <span class="text-gray-400">HUMIDITY</span>
                            <span class="text-gray-400">${current.humidity}</span>
                        </div>
                        <div class="flex justify-around ">
                        <span class="text-gray-400">PRESSURE</span>
                        <span class="text-gray-400">${current.pressure}</span>
                    </div>
                    <div class="flex justify-around ">
                        <span class="text-gray-400">WIND SPEED</span>
                        <span class="text-gray-400">${current.wind_speed}</span>
                    </div>
                    <div class="flex justify-around ">
                        <span class="text-gray-400">LONGITUDE</span>
                        <span class="text-gray-400">${lon}</span>
                    </div>
                    <div class="flex justify-around ">
                        <span class="text-gray-400">LATITUDE</span>
                        <span class="text-gray-400">${lat}</span>
                    </div>
                    </div>
                    <div class="mx-auto">
                        <span class="text-sky-500">openweathermap.org</span>
                    </div>
                </div>
                
             `
    displyDailyApi(daily);
    topComponent.innerHTML = mainData;
}

const displyDailyApi = (arrData)=> {
    const data =  arrData.map((result)=> {
         return `
             <div class="border-r-2 border-gray-400">
                 <div>
                     <img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="">
                 </div>
                 <div class="flex flex-col justify-center items-center gap-4">
                     <span class="text-lg text-cyan-500 font-bold">${getCelcius(result.temp.min)}&#176;C</span>
                     <span class="text-lg text-gray-400 font-semibold">${getCelcius(result.temp.max)}&#176;C</span>
                 </div>
             </div>
         `
     })
 
     secondComponent.innerHTML = data;
 }

const getApi = async(lat=latitude, long=longitude) => {
    
    try {
        const response = await ( await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=ebdd290488e624510dd716d774523aaa&lang=id`)).json()
        displayData(response);
    } catch (error) {
        throw new Error(error.message)
    }
    
}
getApi();


form.addEventListener('submit', (e)=>{
    e.preventDefault();

    getApi(parseFloat(lat.value), parseFloat(long.value))

    lat.value ="";
    long.value="";
})

open.addEventListener('click', ()=> {
    navigasi.classList.remove('-translate-x-full')
})

exit.addEventListener('click', ()=> {
    navigasi.classList.add('-translate-x-full')
})

// Dark Mode
dark.addEventListener('click', ()=> {
    document.documentElement.classList.toggle('dark');
})
