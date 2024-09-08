export default function getBaseURL(service: string) {
  if (service === "api") {
    if (window.location.origin.includes("localhost")) {
      return "http://localhost:4000/api";
    } else {
      return `https://biov-backend-939284203134.northamerica-northeast2.run.app/api`;
    }
  } else {
    return `${window.location.origin}`;
  }
}
