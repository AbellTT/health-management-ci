'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

/** Reads and parses the backend package.json once. */
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

/**
 * Pure function extracted from Auth.Route.js for unit testing.
 * Maps a raw role string (from the DB) to the userType sent to the frontend.
 */
function normalizeRole(role) {
  if (!role || typeof role !== 'string') throw new Error('Role must be a non-empty string');
  let userType = role.toLowerCase();
  if (userType === 'lab_tech') userType = 'lab_technologist';
  return userType;
}

/**
 * Pure function: validates that a login request body has the required fields.
 * Mirrors the guard logic in Auth.Route.js.
 */
function validateLoginPayload(body) {
  if (!body || typeof body !== 'object') return { valid: false, reason: 'Body is missing' };
  if (!body.id || typeof body.id !== 'string' || body.id.trim() === '') {
    return { valid: false, reason: 'Missing id' };
  }
  if (!body.password || typeof body.password !== 'string' || body.password.trim() === '') {
    return { valid: false, reason: 'Missing password' };
  }
  return { valid: true };
}

// ---------------------------------------------------------------------------
// Test 1: Package manifest name and version
// ---------------------------------------------------------------------------
test('1. package.json has the correct name', () => {
  assert.equal(pkg.name, 'hms-backend', 'Package name should be hms-backend');
});

// ---------------------------------------------------------------------------
// Test 2: All required npm scripts are defined
// ---------------------------------------------------------------------------
test('2. package.json defines all required npm scripts', () => {
  const required = ['start', 'dev', 'test', 'lint'];
  for (const script of required) {
    assert.ok(
      Object.prototype.hasOwnProperty.call(pkg.scripts, script),
      `Missing npm script: "${script}"`
    );
  }
});

// ---------------------------------------------------------------------------
// Test 3: All core route files exist on disk
// ---------------------------------------------------------------------------
test('3. all core route files exist', () => {
  const routes = [
    'Auth.Route.js',
    'Admin.Route.js',
    'Doctors.Route.js',
    'Patients.Route.js',
    'Nurses.Route.js',
    'Lab.Route.js',
    'Appointments.Route.js',
  ];
  for (const route of routes) {
    const filePath = path.join(__dirname, '..', 'routes', route);
    assert.ok(fs.existsSync(filePath), `Route file not found: ${route}`);
  }
});

// ---------------------------------------------------------------------------
// Test 4: All core model files exist on disk
// ---------------------------------------------------------------------------
test('4. all core model files exist', () => {
  const models = [
    'Staff.model.js',
    'Doctor.model.js',
    'Patient.model.js',
    'Nurses.model.js',
    'Lab.model.js',
    'Report.model.js',
    'Appointment.model.js',
  ];
  for (const model of models) {
    const filePath = path.join(__dirname, '..', 'models', model);
    assert.ok(fs.existsSync(filePath), `Model file not found: ${model}`);
  }
});

// ---------------------------------------------------------------------------
// Test 5: example.env documents all required environment variables
// ---------------------------------------------------------------------------
test('5. example.env documents all required environment keys', () => {
  const envPath = path.join(__dirname, '..', 'example.env');
  const content = fs.readFileSync(envPath, 'utf8');
  const required = ['PG_HOST', 'PG_USER', 'PG_DATABASE', 'PG_PASSWORD', 'KEY'];
  for (const key of required) {
    assert.ok(content.includes(key), `example.env is missing required key: ${key}`);
  }
});

// ---------------------------------------------------------------------------
// Test 6: Dockerfile exists and references a node base image
// ---------------------------------------------------------------------------
test('6. Dockerfile exists and uses a node base image', () => {
  const dockerfilePath = path.join(__dirname, '..', 'Dockerfile');
  assert.ok(fs.existsSync(dockerfilePath), 'Dockerfile not found in backend/');
  const content = fs.readFileSync(dockerfilePath, 'utf8');
  assert.ok(
    content.toLowerCase().includes('from node'),
    'Dockerfile should start with a FROM node... instruction'
  );
});

// ---------------------------------------------------------------------------
// Test 7: Role normalizer converts LAB_TECH to lab_technologist
// ---------------------------------------------------------------------------
test('7. normalizeRole converts LAB_TECH to lab_technologist', () => {
  assert.equal(normalizeRole('LAB_TECH'), 'lab_technologist');
});

// ---------------------------------------------------------------------------
// Test 8: Role normalizer lowercases ADMIN
// ---------------------------------------------------------------------------
test('8. normalizeRole lowercases ADMIN to admin', () => {
  assert.equal(normalizeRole('ADMIN'), 'admin');
});

// ---------------------------------------------------------------------------
// Test 9: Role normalizer lowercases DOCTOR
// ---------------------------------------------------------------------------
test('9. normalizeRole lowercases DOCTOR to doctor', () => {
  assert.equal(normalizeRole('DOCTOR'), 'doctor');
});

// ---------------------------------------------------------------------------
// Test 10: Login payload validator catches missing fields
// ---------------------------------------------------------------------------
test('10. validateLoginPayload rejects a body with missing password', () => {
  const result = validateLoginPayload({ id: 'ADM-001', password: '' });
  assert.equal(result.valid, false, 'Should be invalid when password is empty');
  assert.equal(result.reason, 'Missing password');
});

test('10b. validateLoginPayload rejects a body with missing id', () => {
  const result = validateLoginPayload({ id: '', password: 'secret' });
  assert.equal(result.valid, false, 'Should be invalid when id is empty');
  assert.equal(result.reason, 'Missing id');
});

test('10c. validateLoginPayload accepts a complete valid body', () => {
  const result = validateLoginPayload({ id: 'ADM-001', password: 'mypassword' });
  assert.equal(result.valid, true, 'Should be valid when both fields are present');
});
