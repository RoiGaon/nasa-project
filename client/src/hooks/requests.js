const API_URL = "http://localhost:8080";

async function httpGetPlanets() {
  return await (await fetch(`${API_URL}/v1/planets`)).json();
}

async function httpGetLaunches() {
  const launches = await (await fetch(`${API_URL}/v1/launches`)).json();
  return launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/v1/launches`, {
      method: "POST",
      body: JSON.stringify(launch),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/v1/launches/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
