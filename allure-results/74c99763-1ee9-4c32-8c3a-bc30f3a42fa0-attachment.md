# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pim.spec.ts >> PIM - Add Employee >> Password mismatch validation on Create Login Details
- Location: tests\pim.spec.ts:194:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.count: Target page, context or browser has been closed
```

# Test source

```ts
  119 |     const profileImg = page.getByRole('img', { name: 'profile picture' }).first();
  120 |     await expect(profileImg).toBeVisible();
  121 |   });
  122 | 
  123 |   test('Invalid profile image upload (reject PDF)',{ tag: '@regression' }, async ({ page }) => {
  124 |     const login = new LoginPage(page);
  125 |     const dashboard = new DashboardPage(page);
  126 |     const pim = new PimPage(page);
  127 | 
  128 |     await login.goto();
  129 |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  130 | 
  131 |     await dashboard.clickNavItem('PIM');
  132 |     await expect(page).toHaveURL(/\/pim\//);
  133 | 
  134 |     await pim.openAddEmployee();
  135 | 
  136 |     // create dummy PDF payload (content stored in test-data)
  137 |     const pdfPayload = [{ name: 'profile.pdf', mimeType: 'application/pdf', buffer: Buffer.from(testData.files.pdfBase64, 'base64') }];
  138 | 
  139 |     // attempt upload and save
  140 |     await pim.addEmployee(testData.invalidEmployee.firstName, testData.invalidEmployee.middleName, testData.invalidEmployee.lastName, testData.invalidEmployee.employeeId, pdfPayload);
  141 | 
  142 |     // expect stayed on add page (validation prevented save)
  143 |     const stayedOnAdd = await page.waitForURL(/\/pim\/addEmployee/, { timeout: 3000 }).then(() => true).catch(() => false);
  144 |     await expect(stayedOnAdd).toBeTruthy();
  145 | 
  146 |     // expect validation message present (role=alert or generic field error)
  147 |     const validation = page.locator('[role="alert"], .oxd-input-field-error-message').first();
  148 |     await expect(validation).toBeVisible();
  149 |   });
  150 | 
  151 |   test('Create Login Details fields and options',{ tag: '@regression' }, async ({ page }) => {
  152 |     const login = new LoginPage(page);
  153 |     const dashboard = new DashboardPage(page);
  154 |     const pim = new PimPage(page);
  155 | 
  156 |     await login.goto();
  157 |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  158 | 
  159 |     await dashboard.clickNavItem('PIM');
  160 |     await expect(page).toHaveURL(/\/pim\//);
  161 | 
  162 |     await pim.openAddEmployee();
  163 | 
  164 |     // wait for any form loader/overlay to disappear before interacting
  165 |     await page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  166 |     const form = page.locator('form').first();
  167 |     // count inputs before toggling, then pick newly added inputs for username/password/confirm
  168 |     const formInputs = form.locator('input:not([type="file"])');
  169 |     const beforeCount = await formInputs.count();
  170 |     const checkbox = form.locator('input[type="checkbox"]').first();
  171 |     const isChecked = await checkbox.isChecked().catch(() => false);
  172 |     if (!isChecked) {
  173 |       await form.locator('.oxd-switch-input').first().click({ force: true });
  174 |       await page.waitForTimeout(200);
  175 |     }
  176 |     const afterInputs = form.locator('input:not([type="file"])');
  177 |     const username = afterInputs.nth(beforeCount);
  178 |     const password = afterInputs.nth(beforeCount + 1);
  179 |     const confirm = afterInputs.nth(beforeCount + 2);
  180 | 
  181 |     await expect(username).toBeVisible({ timeout: 5000 });
  182 |     await expect(password).toBeVisible({ timeout: 5000 });
  183 |     await expect(confirm).toBeVisible({ timeout: 5000 });
  184 | 
  185 |     await username.fill(testData.loginDetails.username);
  186 |     await password.fill(testData.loginDetails.password);
  187 |     await confirm.fill(testData.loginDetails.password);
  188 | 
  189 |     // verify that login inputs were added (at least 3 new inputs)
  190 |     const afterCount = await form.locator('input:not([type="file"])').count();
  191 |     await expect(afterCount).toBeGreaterThanOrEqual(beforeCount + 3);
  192 |   });
  193 | 
  194 |   test('Password mismatch validation on Create Login Details',{ tag: '@regression' }, async ({ page }) => {
  195 |     const login = new LoginPage(page);
  196 |     const dashboard = new DashboardPage(page);
  197 |     const pim = new PimPage(page);
  198 | 
  199 |     await login.goto();
  200 |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  201 | 
  202 |     await dashboard.clickNavItem('PIM');
  203 |     await expect(page).toHaveURL(/\/pim\//);
  204 | 
  205 |     await pim.openAddEmployee();
  206 | 
  207 |     // ensure form ready
  208 |     await page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  209 |     const form = page.locator('form').first();
  210 | 
  211 |     // count inputs before toggling, click visible styled switch, wait for new inputs
  212 |     const inputsBefore = form.locator('input:not([type="file"])');
  213 |     const beforeCount = await inputsBefore.count();
  214 |     const checkbox = form.locator('input[type="checkbox"]').first();
  215 |     const isChecked = await checkbox.isChecked().catch(() => false);
  216 |     if (!isChecked) {
  217 |       // attempt robust toggles: label click, underlying checkbox click, styled switch fallback
  218 |       const label = form.locator('label', { hasText: 'Create Login Details' }).first();
> 219 |       if ((await label.count()) > 0) {
      |                        ^ Error: locator.count: Target page, context or browser has been closed
  220 |         await label.scrollIntoViewIfNeeded();
  221 |         await label.click({ force: true });
  222 |       } else {
  223 |         const checkboxEl = form.locator('input[type="checkbox"]').first();
  224 |         if ((await checkboxEl.count()) > 0) {
  225 |           await checkboxEl.evaluate((el: HTMLElement) => (el as HTMLInputElement).click());
  226 |         } else {
  227 |           const switchEl = form.locator('.oxd-switch-input').first();
  228 |           if ((await switchEl.count()) > 0) await switchEl.click({ force: true });
  229 |         }
  230 |       }
  231 |     }
  232 | 
  233 |     // wait until password inputs appear inside form (scoped, robust)
  234 |     await expect.poll(async () => await form.locator('input[type="password"]').count(), { timeout: 10000 }).toBeGreaterThanOrEqual(2);
  235 | 
  236 |     // prefer password inputs by type for reliability
  237 |     const pwInputs = form.locator('input[type="password"]');
  238 |     const pwCount = await pwInputs.count();
  239 |     await expect(pwCount).toBeGreaterThanOrEqual(2);
  240 |     // attempt to find username input via common attributes, fallback to indexed input
  241 |     const usernameCandidates = [
  242 |       form.locator('input[placeholder*=Username]'),
  243 |       form.locator('input[aria-label*=Username]'),
  244 |       form.locator('input[name*=user]'),
  245 |       form.locator('input[id*=user]'),
  246 |     ];
  247 |     let username = null;
  248 |     for (const cand of usernameCandidates) {
  249 |       if ((await cand.count()) > 0) { username = cand.first(); break; }
  250 |     }
  251 |     if (!username) {
  252 |       const afterInputs = form.locator('input:not([type="file"])');
  253 |       username = afterInputs.nth(beforeCount);
  254 |     }
  255 | 
  256 |     await expect(username).toBeVisible({ timeout: 2000 });
  257 |     await expect(pwInputs.nth(0)).toBeVisible({ timeout: 2000 });
  258 |     await expect(pwInputs.nth(1)).toBeVisible({ timeout: 2000 });
  259 | 
  260 |     await username.fill(testData.loginDetails.username);
  261 |     await pwInputs.nth(0).fill(testData.loginDetails.password);
  262 |     await pwInputs.nth(1).fill(testData.loginDetails.mismatchPassword); // deliberate mismatch
  263 | 
  264 |     await form.getByRole('button', { name: 'Save' }).click();
  265 | 
  266 |     // expect validation message shown and remain on add page
  267 |     const validation = page.locator('[role="alert"], .oxd-input-field-error-message').first();
  268 |     await expect(validation).toBeVisible({ timeout: 5000 });
  269 |     const stayedOnAdd = await page.waitForURL(/\/pim\/addEmployee/, { timeout: 3000 }).then(() => true).catch(() => false);
  270 |     await expect(stayedOnAdd).toBeTruthy();
  271 |   });
  272 | 
  273 |   test('Search Employee by Name', { tag: '@regression' },async ({ page }) => {
  274 |     const login = new LoginPage(page);
  275 |     const dashboard = new DashboardPage(page);
  276 |     const pim = new PimPage(page);
  277 | 
  278 |     const employeeName = testData.names.fullName;
  279 | 
  280 |     await login.goto();
  281 |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  282 | 
  283 |     await dashboard.clickNavItem('PIM');
  284 |     await expect(page).toHaveURL(/\/pim\//);
  285 | 
  286 |     // open Employee List directly for stability
  287 |     await pim.openEmployeeList();
  288 |     await page.locator('.oxd-table').first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  289 | 
  290 |     // find employee name input using multiple fallbacks
  291 |     const nameCandidates = [
  292 |       page.getByPlaceholder('Type for hints...'),
  293 |       page.getByLabel('Employee Name'),
  294 |       page.locator('input[placeholder*="Employee"]'),
  295 |       page.locator('input[aria-label*="Employee"]'),
  296 |     ];
  297 |     let nameInput = null;
  298 |     for (const cand of nameCandidates) {
  299 |       if (await cand.count() > 0) { nameInput = cand.first(); break; }
  300 |     }
  301 |     if (!nameInput) throw new Error('Employee name input not found');
  302 | 
  303 |     await nameInput.fill(employeeName);
  304 |     await page.getByRole('button', { name: 'Search' }).first().click();
  305 | 
  306 |     // ensure row exists where both first and last name present in same row
  307 |     await expect.poll(async () => {
  308 |       return await page.getByRole('row').filter({ hasText: testData.employees[0].lastName }).filter({ hasText: testData.employees[0].firstName }).count();
  309 |     }, { timeout: 5000 }).toBeGreaterThan(0);
  310 |   });
  311 | 
  312 |   test('Search Employee by Employee ID',{ tag: '@regression' }, async ({ page }) => {
  313 |     const login = new LoginPage(page);
  314 |     const dashboard = new DashboardPage(page);
  315 |     const pim = new PimPage(page);
  316 | 
  317 |     const employeeId = testData.employees[0].employeeId;
  318 | 
  319 |     await login.goto();
```