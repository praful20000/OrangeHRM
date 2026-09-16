const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/\/dashboard\/index/, { timeout: 20000 });
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
  await page.waitForURL(/\/pim\/addEmployee/, { timeout: 20000 });

  const pdf = Buffer.from('JVBERi0xLjQKJcTl8uXrp/Og0MTGCjEgMCBvYmoKPDwKL0xlbmd0aCAyIDAgUgo+PgpzdHJlYW0KJSBQREYgZGF0YQoKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAxMTkgMDAwMDAgbiAKMDAwMDAwMDA5NCAwMDAwMCBuIAowMDAwMDAwMjQ4IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMyAvUm9vdCAxIDAgUiAvSW5mbyAyIDAgUiA+PgpzdGFydHhyZWYKMTg0CiUlRU9G', 'base64');
  const first = page.getByPlaceholder('First Name');
  const middle = page.getByPlaceholder('Middle Name');
  const last = page.getByPlaceholder('Last Name');
  const id = page.locator('input:not([type="file"]):not([type="checkbox"])').last();

  await first.fill('Bad');
  await middle.fill('F');
  await last.fill('User');
  await id.fill('BAD' + Date.now().toString().slice(-6));
  await page.locator('input[type="file"]').first().setInputFiles([{ name: 'profile.pdf', mimeType: 'application/pdf', buffer: pdf }]);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(4000);
  console.log('URL=' + page.url());
  console.log('TEXT=' + (await page.locator('body').innerText()).slice(0, 1200));
  console.log('TOAST=' + await page.getByText(/Successfully Saved|not allowed|invalid|file type|error/i).count());
  await browser.close();
})();
