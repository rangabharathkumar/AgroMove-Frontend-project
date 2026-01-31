const fs = require('fs');
const path = require('path');

// The path to the environment files
const envPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');
const devEnvPath = path.join(__dirname, 'src', 'environments', 'environment.ts');

// Use provide environment variable or a default
const apiUrl = process.env.API_URL || 'https://agromove-farm-produce-logistics-api.onrender.com/api';

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

const devEnvConfigFile = `export const environment = {
  production: false,
  apiUrl: '${apiUrl}'
};
`;

console.log('Generating environment files with API_URL:', apiUrl);

// Write the files
fs.writeFileSync(envPath, envConfigFile);
fs.writeFileSync(devEnvPath, devEnvConfigFile);

console.log('Environment files generated successfully.');
