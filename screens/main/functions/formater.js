export default (obj)=>{
	const {current,location}=obj;
	let name=location.name;
	if (name=="Ivano-Alekseyevka") name="Ivano-Frankivsk";
	else if (name=="Simferopol'") name="Simferopol";
	else if (name=="Malyy Lutsk") name="Lutsk";
	return {
		city:name,
		weather:current.condition.text,
		image:current.condition.icon,
		time:current.last_updated.split(" ")[1],
		region:location.region || location.name + " Oblast",
		cloudiness:current.cloud,
		humidity:current.humidity,
		temperature:current.temp_c,
		windSpeed:current.wind_kph,
		windTemperature:current.wind_degree
	}
}