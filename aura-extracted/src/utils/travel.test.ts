import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  filterDestinations,
  validatePlannerForm,
  CURRENCIES,
  FEATURED_DESTINATIONS,
} from './travel';

test('formatCurrency converts USD to other currencies properly', () => {
  assert.equal(formatCurrency(1000, CURRENCIES.USD), '$1,000');
  assert.equal(formatCurrency(1000, CURRENCIES.EUR), '€920');
  assert.equal(formatCurrency(1000, CURRENCIES.GBP), '£780');
  assert.equal(formatCurrency(1000, CURRENCIES.JPY), '¥154,500');
});

test('filterDestinations filters by query keyword', () => {
  const kyotoResults = filterDestinations(FEATURED_DESTINATIONS, 'kyoto');
  assert.equal(kyotoResults.length, 1);
  assert.equal(kyotoResults[0].id, 'kyoto');

  const emptyResults = filterDestinations(FEATURED_DESTINATIONS, 'NonExistentPlaceXYZ');
  assert.equal(emptyResults.length, 0);
});

test('filterDestinations respects region and category filters', () => {
  const asiaExpeditions = filterDestinations(FEATURED_DESTINATIONS, '', 'Asia & Pacific', 'Expedition');
  assert.equal(asiaExpeditions.length, 1);
  assert.equal(asiaExpeditions[0].id, 'raja-ampat');

  const europeanDestinations = filterDestinations(FEATURED_DESTINATIONS, '', 'Europe & Mediterranean');
  assert.equal(europeanDestinations.length, 2);
});

test('validatePlannerForm correctly validates required fields', () => {
  const invalidEmpty = validatePlannerForm({
    name: '',
    email: 'bad-email',
    destinationId: '',
    travelStyle: 'Cultural',
    travelers: 0,
    season: 'Autumn',
  });
  assert.equal(invalidEmpty.isValid, false);
  assert.ok(invalidEmpty.errors.name);
  assert.ok(invalidEmpty.errors.email);
  assert.ok(invalidEmpty.errors.destinationId);
  assert.ok(invalidEmpty.errors.travelers);

  const valid = validatePlannerForm({
    name: 'Elena Rostova',
    email: 'elena@example.com',
    destinationId: 'kyoto',
    travelStyle: 'Cultural',
    travelers: 2,
    season: 'Spring',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});
