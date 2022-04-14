const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');



//defalut city when page load
let cityInput = "Budaun";

//Add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        //change form defalt city to clicked one
        cityInput = e.target.innerHTML;
        /* Fuction that fetches and displays all the data from the weather API */
        fetchWeatherData();
        //fade out the app (simple animation)
        app.style.opacity = "1";
    });
})
// Add  submit event to the form 
form.addEventListener('submit', (e) => {
    /* If the input feild (search bar) is empty, throw an alert*/
    if (search.value.length == 0) {
        alert('Please type searching location');

    }
    else {
        /* change from default city to the one written in the input field */
        cityInput = search.value;
        /*Funtion that fetches and displays all data from the waether API
        */
        fetchWeatherData();
        //Remove all text from the input feild 
        search.value = "";
        //  Fade out the app (simple animation)
        app.style.opacity = "1";

    }
    e.preventDefault();
});
// (Monday,Tuesday,Friday,......... from a date (12 03 2021)
function dayOfTheWeek(day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let da = weekday[d.getDay()];
    return da;

    // return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};
function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=1f1a21f16cdf442189581553222203&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;";

            conditionOutput.innerHTML = data.current.condition.text;
            // let con=data.current.condition.text;
            // console.log(con);


            /* Get the date and time from the city and extract the day, month, year and time into individual variables"!*/
            const date = data.location.localtime;

            const y = parseInt(date.substr(0, 4));


            const m = parseInt(date.substr(5, 2));

            const d = parseInt(date.substr(8, 2));

            const time = date.substr(11);
            /*Reformat the date into somenting more 
            appealing and add it to the page" Original formd 2011-10-29 17:53
            Format: 17: 53 - Frild10 2021 */

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
            timeOutput.innerHTML = time;
            /*"Add the name of the city into the page*/

            nameOutput.innerHTML = data.location.name;
            let nameOutput1 = data.location.name;
            console.log(nameOutput1);
            /*"Get the corresponding icon url for the weather and extract a part of it'*/
            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            console.log(iconId);

            /*Reformat the icon url to your own
            Local folder path and add it to the page"*/

            icon.src = "https://cdn.weatherapi.com/weather/64x64/" + iconId;

            //Add the weather details to the page 
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

            //Set default time of day

            let timeOfDay = "day"; //Get the unique id for each weather condition
            const code = data.current.condition.code;
            //Change to night if its night time in the city
            if (!data.current.is_day) {

                timeOfDay = "night";

            }
            console.log(code);
            console.log(timeOfDay);
            // let x = new Date();
            // let time1 = x.getHours();
            // console.log(time1)
            // if(time1>4 && time1<12){
            //     app.style.backgroundImage = "./public/day/clear.jpg";    
            // }
            // else if(time1>=12 && time1 <16){
            //     app.style.backgroundImage= "./public/day/evening.jpg";
            // }
            // else{
            //     app.style.backgroundImage= "./images/day/night.jpg";
            // }
            if (code == 1000) {
                // if(nameOutput1=="new delhi" && code==1000){
                //     app.style.backgroundImage=`url(./public/${timeOfDay}/delhi.jpg)`;
                // }

                /*"Set the background image to
                
                clear if the weather is clear */
                app.style.backgroundImage = `url(./public/${timeOfDay}/clear.jpg)`;
                btn.style.background = "#e5ba92";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }
            else if (code == 1030) {
                app.style.backgroundImage = `url(./public/${timeOfDay}/delhi.jpg)`;
                btn.style.background = "#e5ba92";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }
            else if (code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282) {
                app.style.backgroundImage = `url(./public/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";

                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }
            else if (
                code == 1063 ||

                code == 1069 ||

                code == 1072 ||

                code == 1150 ||

                code == 1153 ||

                code == 1180 ||

                code == 1183 ||

                code == 1186 ||

                code == 1189 ||

                code == 1192 ||

                code == 1195 ||

                code == 1204 ||

                code == 1207 ||

                code == 1240 ||

                code == 1243 ||
                code == 1246 ||

                code == 1249 ||

                code == 1252) {
                app.style.backgroundImage = `url(./public/${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = "#325c80";
                }
            }
            else {
                app.style.backgroundImage = `url(./public/${timeOfDay}/snowy.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }
            //Fade in the page once all is done
            app.style.opacity = "1";
        }).catch(() => {
            alert('No matching location found');
            app.style.opacity = "1";
        });
}
fetchWeatherData();
app.style.opacity = "1";