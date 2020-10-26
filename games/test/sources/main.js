import "../data";
import "./extensions";

const jsonVersion = require('../version.json');
const version     = jsonVersion.version;

if (version) game.version = version;

console.log('build' + " " + version);

game.start();