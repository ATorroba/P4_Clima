const { readFile}= require("fs").promises;

exports.load = async (citiesFilename)=>{
    return JSON.parse(await readFile(citiesFilename, "utf8"));
}
exports.maxTemp = (cities)=> {
    const maxTemp = cities.map(city => city.main.temp);
    return Math.max.apply(Math, maxTemp);
}
exports.minTemp = (cities)=> {
    const minTemp = cities.map(c => c.main.temp);
    return Math.min.apply(Math, minTemp);
}
exports.maxTempMin = (cities)=> {
    const maxTempMin = cities.map(c => c.main.temp_min);
    return Math.max.apply(Math, maxTempMin);
}
exports.minTempMax = (cities)=> {
    const minTempMax = cities.map(c => c.main.temp_max);
    return Math.min.apply(Math, minTempMax);
}
exports.averageTemp = (cities)=> {
    const averageTemp = cities.map(c => c.main.temp);
    let a = averageTemp.reduce((previous, current) => current +=previous);
    let med =a/averageTemp.length;
    return med;
}
exports.warmerAverageTemp = (cities)=> {
    const warmerAverageTemp = cities.map(c => c.main.temp);
    const city = cities.map(c => c.name);
    let a = warmerAverageTemp.reduce((previous, current) => current +=previous);
    let med =a/warmerAverageTemp.length;
    let j=0;
    const warmerCity=[];
    for (let i = 1; i <= warmerAverageTemp.length; i++) {
        if (warmerAverageTemp[i] > med) {
            warmerCity[j] = city[i];
            j++;
        }
    }
    return warmerCity;
}

exports.maxNorth = (cities)=> {
    const maxNorth = cities.map(c => c.coord.lat);
    const city = cities.map(c => c.name);
    return city[maxNorth.indexOf(Math.max.apply(Math, maxNorth))];
}
exports.maxSouth = (cities)=> {
    const maxSouth = cities.map(c => c.coord.lat);
    const city = cities.map(c => c.name);
    return city[maxSouth.indexOf(Math.min.apply(Math, maxSouth))];
}

exports.gravityCenter = (cities)=> {
    const lat = cities.map(c => c.coord.lat);
    const lon = cities.map(c => c.coord.lon);
    let sum1=lat.reduce((previous, current) => current +=previous);
    let latm =sum1/lat.length;
    let sum2=lon.reduce((previous, current) => current +=previous);
    let longm =sum2/lon.length;
    const gravity={
        "lon":longm,
        "lat":latm
        ,};
    return gravity;
}

exports.closestGC = (cities)=> {
    const lat = cities.map(c => c.coord.lat);
    const lon = cities.map(c => c.coord.lon);
    const city = cities.map(c => c.name);
    let sum1=lat.reduce((previous, current) => current +=previous);
    let latm =sum1/lat.length;
    let sum2=lon.reduce((previous, current) => current +=previous);
    let longm =sum2/lon.length;
    const dist=[];
    for (let i=0; i<=cities.length-1; i++){
        dist[i]=Math.sqrt(Math.pow((latm-lat[i]),2)+Math.pow((longm-lon[i]),2));
    }
    return city[dist.indexOf(Math.min.apply(Math, dist))];


}