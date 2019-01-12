    // Global app controller
    import Forecast from './models/Forecast';
    import * as forecastView from './views/forecastView'
    import {
        elements
    } from './views/base';

    //-FMap object
    import L from 'leaflet';

    const weatherMap = document.createElement("div");
    weatherMap.setAttribute("id", "weather_map");
    document.body.insertBefore(weatherMap, elements.wheatherApp);


    //Get start lat and lon from sttribute in div
    export const initLat = elements.wheatherApp.getAttribute("lat");
    export const initLon = elements.wheatherApp.getAttribute("lon");

    //export const initLon = () => elements.wheatherApp.getAttribute("lon");

    console.log(initLat, initLon);

    const tileLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
    });


    const map = new L.Map('weather_map', {
        'center': [initLat, initLon],
        'zoom': 5,
        'layers': [tileLayer]
    });

    const marker = L.marker([initLat, initLon], {
        draggable: true
    }).addTo(map);

    console.log(marker);


    export const updateLatLng = (lat, lng) => {
        marker.setLatLng([lat, lng]);
        map.panTo([lat, lng]);
    }

    const getDate = () => {
        const d = new Date();
        return d.getDate();
    }



    /** 
     * FORECAST CONTROLLER
     */
    const controlSearch = async (lat, lon) => {

        // 1) Get current date
        const currDate = getDate().toString();
        const t = new Date();
        t.setDate(t.getDate() + 1);
        const tomorrowDate = t.getDate().toString();



        console.log('CURRDATE' + typeof currDate);
        console.log('TOMORROW' + typeof tomorrowDate);



        if (lat && lon) {
            // 2) Create model for forecast
            const forecast = new Forecast(lon, lat);

            console.log('NEW FORECAST' + ' LAT ' + forecast.lat + ' LON ' + forecast.lon);

            // 2) Prepare UI for results
            forecastView.clearResults();


            try {

                // 3) Search for weatherdat by lat and lon
                await forecast.getForecast();

                // 4) Parse forecast
                const todayMorning = forecast.parseForecast(currDate, '06', ['t', 'ws', 'wd', 'Wsymb']);
                const todayLunch = forecast.parseForecast(currDate, '12', ['t', 'ws', 'wd', 'Wsymb']);
                const todayEvening = forecast.parseForecast(currDate, '18', ['t', 'ws', 'wd', 'Wsymb']);
                const tomorrowMorning = forecast.parseForecast(tomorrowDate, '06', ['t', 'ws', 'wd', 'Wsymb']);
                const tomorrowLunch = forecast.parseForecast(tomorrowDate, '12', ['t', 'ws', 'wd', 'Wsymb']);
                const tomorrowEvening = forecast.parseForecast(tomorrowDate, '18', ['t', 'ws', 'wd', 'Wsymb']);

                console.log(tomorrowMorning);

                // 5) Render results on UI
                forecastView.renderResults(todayMorning,
                    todayLunch,
                    todayEvening,
                    tomorrowMorning,
                    tomorrowLunch,
                    tomorrowEvening);

            } catch (error) {
                console.log(error);
                //alert('Something wrong with the search...');

            }
        }
    }

    marker.addEventListener('dragend', (e) => {

        const latDec = marker.getLatLng().lat;
        const lonDec = marker.getLatLng().lng;
        const lat = latDec.toFixed(6);
        const lon = lonDec.toFixed(6);

        updateLatLng(lat, lon);
        console.log('EVENT DRAGEND lat' + lat + 'lon' + lon);
        controlSearch(lat, lon);
        console.log(lat, lon);

    });

    map.addEventListener('click', (e) => {
        marker.setLatLng(e.latlng);
        const latDec = marker.getLatLng().lat;
        const lonDec = marker.getLatLng().lng;
        const lat = latDec.toFixed(6);
        const lon = lonDec.toFixed(6);
        updateLatLng(lat, lon);
        console.log('EVENT CLICK lat' + lat + 'lon' + lon);

        controlSearch(lat, lon);
    });

    //Init forecast 
    controlSearch(initLat, initLon);