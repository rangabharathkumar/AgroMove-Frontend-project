const fs = require('fs');
const path = require('path');

console.log('--- Starting Environment Variable Injection ---');

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

// Ensure directories exist
const environmentsDir = path.join(__dirname, 'src', 'environments');
if (!fs.existsSync(environmentsDir)) {
    console.log('Creating directory:', environmentsDir);
    fs.mkdirSync(environmentsDir, { recursive: true });
}

console.log('Generating environment files with API_URL:', apiUrl);

try {
    // Write the files
    fs.writeFileSync(envPath, envConfigFile);
    console.log('Successfully wrote:', envPath);
    fs.writeFileSync(devEnvPath, devEnvConfigFile);
    console.log('Successfully wrote:', devEnvPath);
} catch (error) {
    console.error('Error writing environment files:', error);
    process.exit(1);
}

console.log('--- Environment Injection Completed ---');
