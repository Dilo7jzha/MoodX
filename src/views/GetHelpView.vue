<template>
    <v-container class="mt-5">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <h1 class="text-center">Get Help (Direct to clinic)</h1>
                <p>
                    You can get the direction of the path from your current location to our organization by clicking on
                    "Current Location" and then clicking on "Show Route".
                    You can also find other psychological clinics by using the map:
                </p>
                <v-btn @click="getCurrentLocation" color="primary" class="mr-2">Current Location</v-btn>
                <v-btn @click="showRoute" color="primary">Show Route</v-btn>
                <div class="map-container mt-3">
                    <div id="map" class="map"></div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

document.querySelectorAll('.mapboxgl-popup-close-button').forEach(button => {
    button.removeAttribute('aria-hidden');
});


// References
const map = ref(null);
const geocoder = ref(null);
const currentLocation = ref(null);
const destination = ref([144.9631, -37.8136]); // Mock location for MoodX mental health organization (in Melbourne)

onMounted(() => {
    // Initialize map
    map.value = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [144.9631, -37.8136],
        zoom: 10,
    });

    // Add geocoder control
    geocoder.value = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search clinic',
        marker: false,
    });

    map.value.addControl(geocoder.value);
    map.value.addControl(new mapboxgl.NavigationControl());

    // Add marker to the destination with popup
    const destinationPopup = new mapboxgl.Popup()
        .setHTML('<h3>MoodX Mental Health Organization</h3>')
        .on('open', () => {
            // Remove aria-hidden from the close button when the popup opens, or there will be an error shown in the console
            document.querySelectorAll('.mapboxgl-popup-close-button').forEach(button => {
                button.removeAttribute('aria-hidden');
            });
        });

    new mapboxgl.Marker()
        .setLngLat(destination.value)
        .setPopup(destinationPopup)
        .addTo(map.value);

    // Geocoder search result handling
    geocoder.value.on('result', (event) => {
        const coordinates = event.result.geometry.coordinates;
        destination.value = coordinates;
        showRoute();
    });
});

// Get user's current location
const getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation.value = [position.coords.longitude, position.coords.latitude];
                map.value.flyTo({
                    center: currentLocation.value,
                    zoom: 13,
                });
                // Place marker for current location
                new mapboxgl.Marker({ color: 'green' })
                    .setLngLat(currentLocation.value)
                    .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Current Location</h3>'))
                    .addTo(map.value);
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
};

// Display route between current location and destination
const showRoute = async () => {
    if (!currentLocation.value || !destination.value) {
        alert('Please enable location and search for a destination.');
        return;
    }

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLocation.value.join(',')};${destination.value.join(',')}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
            const route = data.routes[0].geometry.coordinates;

            // Add the route to the map as a layer
            if (map.value.getSource('route')) {
                map.value.getSource('route').setData({
                    type: 'Feature',
                    geometry: { type: 'LineString', coordinates: route },
                });
            } else {
                map.value.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: { type: 'LineString', coordinates: route },
                        },
                    },
                    layout: { 'line-join': 'round', 'line-cap': 'round' },
                    paint: { 'line-color': '#3b9ddd', 'line-width': 5 },
                });
            }
        }
    } catch (error) {
        console.error('Error fetching route:', error);
    }
};
</script>

<style>
.map-container {
    width: 100%;
    height: 500px;
    margin-bottom: 2%;
    /* left a bit of white space, or it will look a bit strange for me */
}

#map {
    width: 100%;
    height: 100%;
}

.row {
    flex: 1;
}

.location-button,
.route-button {
    margin: 10px;
    padding: 10px;
    background-color: #3b9ddd;
    color: #fff;
    border: none;
    border-radius: 5px;
}
</style>