let cityname="delhi";
async function fetchWeatherData(){
    let mydata;
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=e18edac3aed8425de723025d0fb03bc9`;
    await fetch(url).then(response => response.json()).then(data=> mydata=data);
    console.log(mydata);

}
fetchWeatherData()