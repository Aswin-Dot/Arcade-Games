/**
 * Bumps the build number for a specific game variant in versions.json,
 * then writes it into app.json so both local and cloud EAS builds pick it up.
 *
 * Usage:
 *   node scripts/bump-build.js                  # uses APP_VARIANT env
 *   node scripts/bump-build.js --variant=snake   # explicit variant
 *   node scripts/bump-build.js --set=5           # set to specific number
 */
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const versionsPath = path.join(root, "versions.json");
const appJsonPath = path.join(root, "app.json");

// Resolve variant
const variantArg = process.argv.find((a) => a.startsWith("--variant="));
const variant =
  (variantArg ? variantArg.split("=")[1] : null) ||
  process.env.APP_VARIANT ||
  process.env.EXPO_PUBLIC_APP_VARIANT;

if (!variant) {
  console.error(
    "No variant specified. Use --variant=<game> or set APP_VARIANT env."
  );
  process.exit(1);
}

// Load versions.json
let versions = {};
if (fs.existsSync(versionsPath)) {
  versions = JSON.parse(fs.readFileSync(versionsPath, "utf8"));
}

// Ensure entry exists
if (!versions[variant]) {
  versions[variant] = { version: "1.0.0", buildNumber: 0 };
}

const setArg = process.argv.find((a) => a.startsWith("--set="));
const current = versions[variant].buildNumber;

let newBuild;
if (setArg) {
  newBuild = parseInt(setArg.split("=")[1], 10);
} else {
  newBuild = current + 1;
}

// Update versions.json
versions[variant].buildNumber = newBuild;
fs.writeFileSync(versionsPath, JSON.stringify(versions, null, 2) + "\n");

// Write into app.json so EAS (local or cloud) reads the correct value
const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));
if (!appJson.expo.ios) appJson.expo.ios = {};
appJson.expo.ios.buildNumber = String(newBuild);
if (!appJson.expo.android) appJson.expo.android = {};
appJson.expo.android.versionCode = newBuild;
fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + "\n");

console.log(
  `[${variant}] Build number: ${current} → ${newBuild} (v${versions[variant].version})`
);
