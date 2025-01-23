const log = console.log;

document.addEventListener('DOMContentLoaded', () => {
    log('ok');
    const socket = io(); log(socket);

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                socket.emit('send-location', { latitude, longitude })
            },
            (error) =>{
                log(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 500,
                maximumAge: 0
            }
        )
    }

    let map =L.map('map').setView([0,0], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

    const markers = {};

    socket.on('receive-location', (data)=>{
        const { id, latitude, longitude} = data;
        map.setView([latitude, longitude])
        if(markers[id]){
            markers[id].setLatLng([latitude, longitude])
        }else{
            markers[id] = L.marker([latitude, longitude]).addTo(map);
        }
    })

    socket.on('user-disconnected', (id)=>{
        if(markers[id]){
            map.removeLayer(markers[id]);
            delete markers[id];
        }
    })
})  