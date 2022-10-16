const launchesDataBase = require("./launches.mongo");
const planetsDataBase = require("./planets.mongo");
const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function saveLaunch(launch) {
  const planet = await planetsDataBase.findOne({
    keplerName: launch.target,
  });

  if (!planet) throw new Error("No matching planet found");

  return await launchesDataBase.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDataBase.findOne().sort("-flightNumber");

  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDataBase.find({}, { _id: 0, _v: 0 });
}

async function scheduleNewLaunch(launch) {
  const latestFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
    flightNumber: latestFlightNumber,
  });

  return await saveLaunch(newLaunch);
}

async function existsLaunchWithId(launchId) {
  return await launchesDataBase.findOne({ flightNumber: launchId });
}

async function abortLaunchById(launchId) {
  const abortedLaunch = await launchesDataBase.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false }
  );

  return abortedLaunch.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
