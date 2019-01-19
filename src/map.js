const loadGoogleMapsApi = require('load-google-maps-api');
const googleKey = `${process.env.GOOGLEMAPS_API}`;

export class Map {
  constructor() {
    this.markers = [];
    console.log(this.markers);
  }
  static loadMap() {
    // return loadGoogleMapsApi({ key: `${googleKey}` });
    return loadGoogleMapsApi({ key: "AIzaSyAESIRnGpgJP86uS2bnxB6drPFJCSNO4Js" });
  }

  static createMap(googleMaps, mapElement) {
    return new googleMaps.Map(mapElement, {
      center: {
        lat: 45.5122,
        lng: -122.6587
      },
      zoom: 8
    });
  }
}
