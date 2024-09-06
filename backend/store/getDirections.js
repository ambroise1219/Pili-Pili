import axios from 'axios';

const getDirections = async (origin, destination) => {
  try {
    const response = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=polyline`
    );

    const { routes } = response.data;
    if (routes.length > 0) {
      const { geometry } = routes[0];
      const coordinates = decodePolyline(geometry);
      return { coordinates };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting directions:', error);
    return null;
  }
};

// Fonction pour décoder la polyline d'OpenStreetMap
function decodePolyline(encoded) {
  const coordinates = [];
  let index = 0,
    lat = 0,
    lng = 0;

  while (index < encoded.length) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    coordinates.push({
      latitude: lat / 100000,
      longitude: lng / 100000,
    });
  }

  return coordinates;
}

export { getDirections };