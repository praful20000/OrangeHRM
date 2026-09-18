import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { MyInfoPage } from '../pages/MyInfoPage';
import { ContactDetailsPage } from '../pages/ContactDetailsPage';
import { EmergencyContactsPage } from '../pages/EmergencyContactsPage';
import { DependantsPage } from '../pages/DependantsPage';
import testData from '../test-data/test-data.json';

async function loginAsEss(page: import('@playwright/test').Page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  await expect(page).toHaveURL(/\/dashboard\/index/);
  return new DashboardPage(page);
}

async function openMyInfoTab(page: import('@playwright/test').Page, dashboard: DashboardPage, tab: string) {
  await dashboard.clickNavItem('MyInfo');
  await page.getByRole('link', { name: tab, exact: true }).click();
}

test.describe('My Info - Personal Details', { tag: '@regression' }, () => {
  test('ESS user can view personal details and personal information fields', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const myInfo = new MyInfoPage(page);

    await dashboard.clickNavItem('MyInfo');
    await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\//);

    await expect(myInfo.personalDetailsHeading).toBeVisible();
    await expect(myInfo.firstNameInput).toBeVisible();
    await expect(myInfo.middleNameInput).toBeVisible();
    await expect(myInfo.lastNameInput).toBeVisible();
    await expect(myInfo.employeeIdInput).toBeVisible();
    await expect(myInfo.otherIdInput).toBeVisible();
    await expect(myInfo.driversLicenseInput).toBeVisible();
  });

  test.skip('ESS user can edit personal details and retain the updates after refresh', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const myInfo = new MyInfoPage(page);

    await dashboard.clickNavItem('MyInfo');
    await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\//);
    await myInfo.enterEditMode();

    const updatedFirstName = `Ess${Date.now().toString().slice(-6)}`;
    const updatedMiddleName = 'Updated';
    const updatedLastName = 'User';
    const updatedLicenseExpiry = '2030-12-31';

    await myInfo.firstNameInput.fill(updatedFirstName);
    await myInfo.middleNameInput.fill(updatedMiddleName);
    await myInfo.lastNameInput.fill(updatedLastName);
    await myInfo.licenseExpiryInput.fill(updatedLicenseExpiry);
    await myInfo.selectFemaleGender();
    await myInfo.selectDropdown(myInfo.maritalStatusSelect, 'Married');
    await myInfo.selectDropdown(myInfo.nationalitySelect, 'Canadian');
    await myInfo.savePersonalDetails();

    await expect(page.getByText('Successfully Saved')).toBeVisible();
    await expect(myInfo.firstNameInput).toHaveValue(updatedFirstName);
    await expect(myInfo.middleNameInput).toHaveValue(updatedMiddleName);
    await expect(myInfo.lastNameInput).toHaveValue(updatedLastName);
    await expect(myInfo.licenseExpiryInput).toHaveValue(updatedLicenseExpiry);
    await expect(myInfo.femaleRadio).toBeChecked();

    await myInfo.refresh();

    await expect(myInfo.firstNameInput).toHaveValue(updatedFirstName);
    await expect(myInfo.middleNameInput).toHaveValue(updatedMiddleName);
    await expect(myInfo.lastNameInput).toHaveValue(updatedLastName);
    await expect(myInfo.licenseExpiryInput).toHaveValue(updatedLicenseExpiry);
    await expect(myInfo.femaleRadio).toBeChecked();
    await expect(myInfo.maritalStatusSelect).toContainText('Married');
    await expect(myInfo.nationalitySelect).toContainText('Canadian');
  });

  test('ESS user cannot edit restricted personal details', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const myInfo = new MyInfoPage(page);

    await dashboard.clickNavItem('MyInfo');
    await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\//);
    await myInfo.enterEditMode();

    for (const label of ['Employee Id', 'SSN No', 'SIN No', "Driver's License Number", 'Date of Birth']) {
      const field = myInfo.restrictedField(label);
      if (await field.count() > 0) await expect(field).not.toBeEditable();
    }
  });
});

test.describe('My Info - Contact Details', { tag: '@regression' }, () => {
  test('ESS user can view contact details and contact information fields', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const contactDetails = new ContactDetailsPage(page);

    await openMyInfoTab(page, dashboard, 'Contact Details');
    await expect(page).toHaveURL(/\/pim\/contactDetails\//);
    await expect(contactDetails.heading).toBeVisible();

    for (const field of [
      contactDetails.street1Input,
      contactDetails.street2Input,
      contactDetails.cityInput,
      contactDetails.stateInput,
      contactDetails.zipInput,
      contactDetails.countrySelect,
      contactDetails.homeTelephoneInput,
      contactDetails.mobileInput,
      contactDetails.workTelephoneInput,
      contactDetails.workEmailInput,
      contactDetails.otherEmailInput,
    ]) {
      await expect(field).toBeVisible();
    }
  });

  test('ESS user can edit contact details and retain updates after refresh', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const contactDetails = new ContactDetailsPage(page);

    await openMyInfoTab(page, dashboard, 'Contact Details');
    await expect(page).toHaveURL(/\/pim\/contactDetails\//);
    await contactDetails.enterEditMode();

    const suffix = Date.now().toString().slice(-6);
    const values = {
      street1: `${suffix} Main Street`,
      street2: 'Suite 20',
      city: 'Toronto',
      state: 'Ontario',
      zip: 'M5V 2T6',
      home: '416-555-0101',
      mobile: '416-555-0102',
      work: '416-555-0103',
      workEmail: `ess.work.${suffix}@example.com`,
      otherEmail: `ess.other.${suffix}@example.com`,
    };

    await contactDetails.selectCountry('Canada');
    await contactDetails.street1Input.fill(values.street1);
    await contactDetails.street2Input.fill(values.street2);
    await contactDetails.cityInput.fill(values.city);
    await contactDetails.stateInput.fill(values.state);
    await contactDetails.zipInput.fill(values.zip);
    await contactDetails.homeTelephoneInput.fill(values.home);
    await contactDetails.mobileInput.fill(values.mobile);
    await contactDetails.workTelephoneInput.fill(values.work);
    await contactDetails.workEmailInput.fill(values.workEmail);
    await contactDetails.otherEmailInput.fill(values.otherEmail);
    await contactDetails.save();

    await expect(contactDetails.street1Input).toHaveValue(values.street1);
    await expect(contactDetails.cityInput).toHaveValue(values.city);
    await expect(contactDetails.countrySelect).toContainText('Canada');

    await contactDetails.refresh();

    await expect(contactDetails.street1Input).toHaveValue(values.street1);
    await expect(contactDetails.street2Input).toHaveValue(values.street2);
    await expect(contactDetails.cityInput).toHaveValue(values.city);
    await expect(contactDetails.stateInput).toHaveValue(values.state);
    await expect(contactDetails.zipInput).toHaveValue(values.zip);
    await expect(contactDetails.countrySelect).toContainText('Canada');
    await expect(contactDetails.homeTelephoneInput).toHaveValue(values.home);
    await expect(contactDetails.mobileInput).toHaveValue(values.mobile);
    await expect(contactDetails.workTelephoneInput).toHaveValue(values.work);
    await expect(contactDetails.workEmailInput).toHaveValue(values.workEmail);
    await expect(contactDetails.otherEmailInput).toHaveValue(values.otherEmail);
  });
});

test.describe('My Info - Emergency Contacts', { tag: '@regression' }, () => {
  test('ESS user can add an emergency contact', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const emergencyContacts = new EmergencyContactsPage(page);
    const name = `Emergency ${Date.now()}`;

    await openMyInfoTab(page, dashboard, 'Emergency Contacts');
    await expect(emergencyContacts.heading).toBeVisible();
    await emergencyContacts.addContact(name, 'Sibling', '416-555-0201', '416-555-0202', '416-555-0203');

    await expect(page.getByText('Successfully Saved')).toBeVisible();
    await expect(emergencyContacts.row(name)).toBeVisible();
  });

  test('ESS user can add multiple emergency contacts', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const emergencyContacts = new EmergencyContactsPage(page);
    const firstName = `Emergency One ${Date.now()}`;
    const secondName = `Emergency Two ${Date.now()}`;

    await openMyInfoTab(page, dashboard, 'Emergency Contacts');
    await emergencyContacts.addContact(firstName, 'Sibling', '416-555-0211', '416-555-0212', '416-555-0213');
    await expect(emergencyContacts.row(firstName)).toBeVisible();
    await emergencyContacts.addContact(secondName, 'Parent', '416-555-0221', '416-555-0222', '416-555-0223');

    await expect(emergencyContacts.row(firstName)).toBeVisible();
    await expect(emergencyContacts.row(secondName)).toBeVisible();
  });

  test('ESS user can delete an emergency contact', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const emergencyContacts = new EmergencyContactsPage(page);
    const name = `Emergency Delete ${Date.now()}`;

    await openMyInfoTab(page, dashboard, 'Emergency Contacts');
    await emergencyContacts.addContact(name, 'Sibling', '416-555-0231', '416-555-0232', '416-555-0233');
    await expect(emergencyContacts.row(name)).toBeVisible();

    await emergencyContacts.deleteContact(name);
    await expect(emergencyContacts.row(name)).toHaveCount(0);
  });
});

test.describe('My Info - Dependants', { tag: '@regression' }, () => {
  test('ESS user can add a dependant', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const dependants = new DependantsPage(page);
    const name = `Dependant ${Date.now()}`;

    await openMyInfoTab(page, dashboard, 'Dependents');
    await expect(dependants.heading).toBeVisible();
    await dependants.addDependant(name, 'Child', '2015-06-15');

    await expect(page.getByText('Successfully Saved')).toBeVisible();
    await expect(dependants.row(name)).toBeVisible();
  });

  test('ESS user can add multiple dependants without overwriting the first', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const dependants = new DependantsPage(page);
    const firstName = `Dependant One ${Date.now()}`;
    const secondName = `Dependant Two ${Date.now()}`;

    await openMyInfoTab(page, dashboard, 'Dependents');
    await dependants.addDependant(firstName, 'Child', '2014-05-14');
    await expect(dependants.row(firstName)).toBeVisible();
    await dependants.addDependant(secondName, 'Child', '1980-04-13');

    await expect(dependants.row(firstName)).toBeVisible();
    await expect(dependants.row(secondName)).toBeVisible();
  });

  test('ESS user can delete a dependant', async ({ page }) => {
    const dashboard = await loginAsEss(page);
    const dependants = new DependantsPage(page);
    const name = `Dependant Delete ${Date.now()}`;

    await openMyInfoTab(page, dashboard, 'Dependents');
    await dependants.addDependant(name, 'Child', '2013-03-12');
    await expect(dependants.row(name)).toBeVisible();

    await dependants.deleteDependant(name);
    await expect(dependants.row(name)).toHaveCount(0);
  });
});

// This is new