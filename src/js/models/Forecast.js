import axios from 'axios';


export default class Forecast {

    constructor(lon, lat) {
        this.lon = lon;
        this.lat = lat;
    }
    async getForecast() {
        try {
            const res = await axios(`http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/${this.lon}/lat/${this.lat}/data.json`);
            this.result = res.data.timeSeries;
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }



    parseForecast(day, time, parameter) {



        // const objWeather;
        const objWeather = {
            day: day,
            time: time,
            params: [],
            unit: [],

        };

        let currDate = getDate();
        console.log(currDate);
        let currHour = getHour();
        console.log(currHour);


        if (!(currDate > day || (currDate == day && currHour > time))) {

            for (let i = 0; i < parameter.length; i++) {
                //Parse by day and time for specified parameter
                this.result.forEach(element => {

                    const obj = element.validTime;
                    const strDay = obj.slice(8, 10).toString();;
                    const index = obj.indexOf('T');
                    const strTime = obj.slice(index + 1, index + 3).toString();
                    const params = []
                    params.length = 3;
                    const unit = []
                    unit.length = 3;


                    if (strDay == day && strTime == time) {

                        if (day && time) {

                            element.parameters.forEach(param => {

                                if (param.name == parameter[i]) {


                                    if (param.name == 'Wsymb') {
                                        objWeather.params[i] = parseWsymb(param.values[0]);
                                        objWeather.unit[i] = param.unit;

                                    } else {
                                        objWeather.params[i] = param.values[0];
                                        objWeather.unit[i] = param.unit;

                                    }


                                }


                            });

                        } else {
                            objWeather.params[i] = '-';
                            objWeather.unit[i] = '-';
                        }


                    }

                });


            }
        } else {

            for (let i = 0; i < parameter.length; i++) {
                objWeather.params[i] = '-';
                objWeather.unit[i] = '-';
                console.log('undefined');
            }
        }

        return objWeather;
    }

}


const parseWsymb = value => {


    let sky = ' ';


    switch (value) {
        case 1:
            sky = 'Molnfritt';
            break;
        case 2:
            sky = 'Små lätta moln';
            break;
        case 3:
            sky = 'Varierande monlighet';
            break;
        case 4:
            sky = 'Halvmolnigt';
            break;
        case 5:
            sky = 'Molnigt';
            break;
        case 6:
            sky = 'Mulnigt';
            break;
        case 7:
            sky = 'Dimma';
            break;
        case 8:
            sky = 'Regnskurar';
            break;
        case 9:
            sky = 'Åskväder';
            break;
        case 10:
            sky = 'Snöblandat regn';
            break;
        case 11:
            sky = 'Lätt snöigt';
            break;
        case 12:
            sky = 'Regn';
            break;
        case 13:
            sky = 'Åska';
            break;
        case 14:
            sky = 'Snöblandat regn';
            break;
        case 15:
            sky = 'Snöfall';
            break;
        default:
            sky = '-';
            console.log("Wheather symbol not found...");
    }
    return sky;
}

const getDate = () => {
    const d = new Date();
    return d.getDate();
}

const getHour = () => {
    const d = new Date();
    return d.getHours();
}