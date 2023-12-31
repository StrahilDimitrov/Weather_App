const WEATER_API_KEY = "c3f621ae2604c426bca72d3b57bfac84";

export const setLocationObject = (locationObj, coordsObj) => {
    const {lat, lon, name, unit} = coordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if(unit) {
        locationObj.setUnit(unit);
    }
};

export const getHomeLocation = () => {
    return localStorage.getItem("defaultWeatherLocation");
};

export const getWeatherFromCoords = async (locationObj) => {
    const lat = locationObj.getLat();
    const lon = locationObj.getLon();
    const units = locationObj.getUnit();
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATER_API_KEY}&lang=bg`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    }
    catch(err) {
        console.error(err);
    }
};

export const getCoordsFromApi = async (entryText, units) => {
    const regex = /^\d+$/g;
    const flag = regex.test(entryText) ? "zip" : "q";
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATER_API_KEY}&lang=bg`;
    const encodeUrl = encodeURI(url);
    try{
        const dataStream = await fetch(encodeUrl);
        const jsonData = await dataStream.json();
        return jsonData;
    }
    catch(err) {
        console.error(err.stack);
    }
};

export const cleanText = (text) => {
    const regex = / {2,} /g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
};