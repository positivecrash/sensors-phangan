import { toFixed } from "./tools";

export default {
  label: "Hm",
  name: {
    en: "Humidity",
    ru: "Влажность"
  },
  nameshort: {
    en: "Humidity",
    ru: "Влажность"
  },
  unit: "%",
  chartColor: "#6fd3ff",
  range: [0, 30, 40, 60, 70],
  zones: [
    {
      value: 30,
      color: "#ff4d00",
      label: {
        en: "Very dry",
        ru: "Очень сухо"
      }
    },
    {
      value: 40,
      color: "#ff9d00",
      label: {
        en: "Dry",
        ru: "Сухо"
      }
    },
    {
      value: 60,
      color: "#60bc2a",
      label: {
        en: "Comfortable",
        ru: "Комфортно"
      }
    },
    {
      value: 70,
      color: "#12bfcc",
      label: {
        en: "Humid",
        ru: "Влажно"
      }
    },
    {
      color: "#2a5cbc",
      label: {
        en: "Very humid",
        ru: "Очень влажно"
      }
    }
  ],
  calculate: function (v) {
    return toFixed(v);
  }
};