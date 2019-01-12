import {
    elements
} from './base';
import Forecast from '../models/Forecast';

export const clearResults = () => {
    elements.wheatherApp.innerHTML = ' ';
};


export const renderResults = (todayMorning,
    todayLunch,
    todayEvening,
    tomorrowMorning,
    tomorrowLunch,
    tomorrowEvening) => {

    console.log('TYPEOF ROTATE' + typeof tomorrowLunch.params[2]);


    const markup = `

    <div id="forecast">
        <h1>Väder</h1>
        <h2>Idag</h2>
        <table>
            <tr>
                <th>Tid</th>
                <th>Temp</th>
                <th>Vind</th>
                <th>Himmel</th>
            </tr>
            <tr>
            <td>${todayMorning.time}</td>
            <td>${todayMorning.params[0] + ' ' + todayMorning.unit[0]}</td>
            <td>${todayMorning.params[1] + ' ' + todayMorning.unit[1]+ ' '}<i class="fas fa-location-arrow fa-xs fa-rotate-${todayMorning.params[2]}"></i></td>
            <td>${todayMorning.params[3]}</td>

        </tr>
            <tr>
            <td>${todayLunch.time}</td>
            <td>${todayLunch.params[0] + ' ' + todayLunch.unit[0]}</td>
            <td>${todayLunch.params[1] + ' ' + todayLunch.unit[1]+ ' '}<i class="fas fa-location-arrow fa-xs fa-rotate-${todayLunch.params[2].toString()}"></i></td>  
            <td>${todayLunch.params[3]}</td>
            </tr>
            <tr>
            <td>${todayEvening.time}</td>
            <td>${todayEvening.params[0] + ' ' + todayEvening.unit[0]}</td>
            <td>${todayEvening.params[1] + ' ' + todayEvening.unit[1]+ ' '}<i class="fas fa-location-arrow fa-xs fa-rotate-${todayEvening.params[2]}"></i></td>
            <td>${todayEvening.params[3]}</td>
            </tr>
        </table>
        <h2>Imorgon</h2>
        <table>
        <tr>
            <th>Tid</th>
            <th>Temp</th>
            <th>Vind</th>
            <th>Himmel</th>
        </tr>
        <tr>
        <td>${tomorrowMorning.time}</td>
        <td>${tomorrowMorning.params[0] + ' ' + tomorrowMorning.unit[0]}</td>
        <td>${tomorrowMorning.params[1] + ' ' + tomorrowMorning.unit[1] + ' '}<i class="fas fa-location-arrow fa-xs fa-rotate-${tomorrowMorning.params[2]}"></i></td>
        <td>${tomorrowMorning.params[3]}</td>

    </tr>
        <tr>
        <td>${tomorrowLunch.time}</td>
        <td>${tomorrowLunch.params[0] + ' ' + tomorrowLunch.unit[0]}</td>
        <td>${tomorrowLunch.params[1] + ' ' + tomorrowLunch.unit[1] + ' '}<i class="fas fa-location-arrow fa-xs fa-rotate-${tomorrowLunch.params[2].toString()}"></i></td>
        <td>${tomorrowLunch.params[3]}</td>
        </tr>
        <tr>
        <td>${tomorrowEvening.time}</td>
        <td>${tomorrowEvening.params[0] + ' ' + tomorrowEvening.unit[0]}</td>
        <td>${tomorrowEvening.params[1] + ' ' + tomorrowEvening.unit[1] + ' '}<i class="fas fa-location-arrow fa-xs fa-rotate-${tomorrowEvening.params[2]}"></i></td>
        <td>${tomorrowEvening.params[3]} </td>
        </tr>
    </table>
    </div>
    `;

    elements.wheatherApp.insertAdjacentHTML('afterbegin', markup);
}