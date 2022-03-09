const fetcher=(city)=>{
	return fetch(`http://api.weatherapi.com/v1/current.json?key=3848e099ffbb49eca76180609222401&q=${city}&aqi=no`)
}
export default fetcher;