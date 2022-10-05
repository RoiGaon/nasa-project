const API_URL = "http://localhost:8080";

async function httpGetPlanets() {
  return await (await fetch(`${API_URL}/planets`)).json();
}

async function httpGetLaunches() {
  return await (await fetch(`${API_URL}/launches`))
    .json()
    .sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
