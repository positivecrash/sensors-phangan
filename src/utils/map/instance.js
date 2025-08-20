import L from "leaflet";
import "leaflet-active-area";
// import "leaflet.locatecontrol";
// import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet.tilelayer.colorfilter";
import "leaflet/dist/leaflet.css";

let map;
let usermarker;

const attrs = {
  attribution:
    '&copy; <a rel="nofollow" href="https://osm.org/copyright">OpenStreetMap</a> contributors',
};

const layerMapLight = L.tileLayer.colorFilter(
  // "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&apistyle=s.t:33|p.v:off",
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    ...attrs,
    filter: ["grayscale:50%", "saturate:70%"],
    // subdomains: ["mt0", "mt1", "mt2", "mt3"],
    // filter: ["grayscale:63%", "bright:74%", "contrast:200%", "saturate:94%"],
  }
);
const layerMapDark = L.tileLayer.colorFilter(
  // "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&apistyle=s.t:33|p.v:off",
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    ...attrs,
    filter: [
      "invert:100%",
      "grayscale:100%",
      "bright:100%",
      "saturate:0%",
      "sepia:10%",
    ],
    // subdomains: ["mt0", "mt1", "mt2", "mt3"],
    // filter: ["grayscale:63%", "bright:74%", "contrast:200%", "saturate:94%"],
  }
);

export function instanceMap() {
  if (map) {
    return map;
  }
  throw new Error("Must be initialized before using the mapd.");
}
export function removeMap() {
  map.remove();
  map = undefined;
}

export function init(position, zoom, theme = "light") {
  map = L.map("map", {minZoom: 3});
  setTheme(theme);
  // moved attribution to the info
  map.attributionControl.remove();
  map.setView(position, zoom);
  // L.control
  //   .locate({
  //     position: "bottomright",
  //     strings: {
  //       title: "Show my location",
  //     },
  //   })
  //   .addTo(map);
  map.zoomControl.remove();
  return map;
}

export function setTheme(theme) {
  const map = instanceMap();
  if (theme === "light") {
    map.removeLayer(layerMapDark);
    map.addLayer(layerMapLight);
  } else {
    map.removeLayer(layerMapLight);
    map.addLayer(layerMapDark);
  }
}

export function setview(position, zoom) {
  const map = instanceMap();
  if(map){
    map.setView(position, zoom);
  }
}

export function drawuser(position, zoom) {

  const map = instanceMap();
  let radiusmarker = 100;

  if(map){

    if (usermarker) {
      map.removeLayer(usermarker);
    }

    if(zoom > 0) {
      radiusmarker = 10*zoom;
    }

    if(zoom > 4) {
      radiusmarker = 5*zoom;
    }

    if(zoom > 7) {
      radiusmarker = 2*zoom;
    }

    usermarker = new L.circleMarker(position, {radius: radiusmarker, opacity: 0.2});
    usermarker.addTo(map);
  }
    
}
