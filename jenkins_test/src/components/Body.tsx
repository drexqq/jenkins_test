import React, {useEffect, useState} from 'react'

function Body() {
  const [data, setData] = useState<Array<any> | null>();
  const [userLocation, setUserLocation] = useState<Array<any> | null>();
  useEffect(() => {
    fetch("http://localhost:3000/data/data.json", {
      method: "GET"
    })
    .then(res => res.json())
    .then(res => {
      setData(res.records)
    })
  }, [])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos:any) => {
      const loc: Array<number> | null = [
        pos.coords.latitude,
        pos.coords.longitude
      ]
      setUserLocation(loc)
    })
  }, [])
  console.log(userLocation);
  if (data && userLocation) {
    for (var i:number = 0; i < 100; i++) {
      if (Math.abs(data[i]['위도'] - userLocation[0]) < 0.2) {
        console.log(data[i]);
      }
    }
  }
  return (
    <div>body</div>
  );
}

export default Body;
