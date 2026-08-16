# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> Dashboard - Navigation >> quick launch links navigate to correct pages
- Location: tests\dashboard.spec.ts:49:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Admin' }).first() to be visible

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - generic:
    - complementary [ref=f1e4]:
      - navigation "Sidepanel" [ref=f1e5]:
        - generic [ref=f1e6]:
          - link [ref=f1e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=f1e9]
          - text: 
        - generic [ref=f1e10]:
          - generic [ref=f1e11]:
            - generic [ref=f1e12]:
              - textbox "Search" [ref=f1e15]
              - button "" [ref=f1e16] [cursor=pointer]
            - separator [ref=f1e18]
          - list [ref=f1e19]:
            - listitem [ref=f1e20]:
              - link "Admin" [ref=f1e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
            - listitem [ref=f1e25]:
              - link "PIM" [ref=f1e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
            - listitem [ref=f1e41]:
              - link "Leave" [ref=f1e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
            - listitem [ref=f1e46]:
              - link "Time" [ref=f1e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
            - listitem [ref=f1e54]:
              - link "Recruitment" [ref=f1e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
            - listitem [ref=f1e62]:
              - link "My Info" [ref=f1e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
            - listitem [ref=f1e70]:
              - link "Performance" [ref=f1e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
            - listitem [ref=f1e80]:
              - link "Dashboard" [ref=f1e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
            - listitem [ref=f1e85]:
              - link "Directory" [ref=f1e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
            - listitem [ref=f1e90]:
              - link "Maintenance" [ref=f1e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
            - listitem [ref=f1e96]:
              - link "Claim" [ref=f1e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
            - listitem [ref=f1e105]:
              - link "Buzz" [ref=f1e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
    - banner [ref=f1e110]:
      - generic [ref=f1e111]:
        - generic [ref=f1e112]:
          - text: 
          - heading "Dashboard" [level=6] [ref=f1e114]
        - link [ref=f1e116]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=f1e117] [cursor=pointer]
        - list [ref=f1e123]:
          - listitem [ref=f1e124]:
            - generic [ref=f1e125] [cursor=pointer]:
              - img "profile picture" [ref=f1e126]
              - paragraph [ref=f1e127]: Jhon Doe
              - generic [ref=f1e128]: 
      - navigation "Topbar Menu" [ref=f1e130]:
        - list [ref=f1e131]:
          - button "" [ref=f1e133] [cursor=pointer]
  - generic [ref=f1e135]:
    - generic [ref=f1e137]:
      - generic [ref=f1e139]:
        - generic [ref=f1e141]:
          - generic [ref=f1e142]: 
          - paragraph [ref=f1e143]: Time at Work
        - separator [ref=f1e144]
        - generic [ref=f1e146]:
          - generic [ref=f1e147]:
            - img "profile picture" [ref=f1e149]
            - generic [ref=f1e150]:
              - paragraph [ref=f1e151]: Punched Out
              - paragraph [ref=f1e152]: "Punched Out: Mar 29th at 01:19 PM (GMT 7)"
          - generic [ref=f1e153]:
            - generic [ref=f1e154]: 0h 0m Today
            - button "" [ref=f1e155] [cursor=pointer]
          - separator [ref=f1e157]
          - generic [ref=f1e158]:
            - generic [ref=f1e159]:
              - paragraph [ref=f1e160]: This Week
              - paragraph [ref=f1e161]: Aug 10 - Aug 16
            - generic [ref=f1e162]:
              - generic [ref=f1e163]: 
              - paragraph [ref=f1e164]: 0h 0m
      - generic [ref=f1e168]:
        - generic [ref=f1e170]:
          - generic [ref=f1e171]: 
          - paragraph [ref=f1e172]: My Actions
        - separator [ref=f1e173]
        - generic [ref=f1e176]:
          - button [ref=f1e177] [cursor=pointer]
          - paragraph [ref=f1e183] [cursor=pointer]: (1) Pending Self Review
      - generic [ref=f1e185]:
        - generic [ref=f1e187]:
          - generic [ref=f1e188]: 
          - paragraph [ref=f1e189]: Quick Launch
        - separator [ref=f1e190]
        - generic [ref=f1e192]:
          - generic [ref=f1e193]:
            - button "Assign Leave" [ref=f1e194] [cursor=pointer]
            - generic "Assign Leave" [ref=f1e197]:
              - paragraph [ref=f1e198]: Assign Leave
          - generic [ref=f1e199]:
            - button "Leave List" [ref=f1e200] [cursor=pointer]
            - generic "Leave List" [ref=f1e207]:
              - paragraph [ref=f1e208]: Leave List
          - generic [ref=f1e209]:
            - button "Timesheets" [ref=f1e210] [cursor=pointer]
            - generic "Timesheets" [ref=f1e216]:
              - paragraph [ref=f1e217]: Timesheets
          - generic [ref=f1e218]:
            - button "Apply Leave" [ref=f1e219] [cursor=pointer]
            - generic "Apply Leave" [ref=f1e222]:
              - paragraph [ref=f1e223]: Apply Leave
          - generic [ref=f1e224]:
            - button "My Leave" [ref=f1e225] [cursor=pointer]
            - generic "My Leave" [ref=f1e230]:
              - paragraph [ref=f1e231]: My Leave
          - generic [ref=f1e232]:
            - button "My Timesheet" [ref=f1e233] [cursor=pointer]
            - generic "My Timesheet" [ref=f1e236]:
              - paragraph [ref=f1e237]: My Timesheet
      - generic [ref=f1e239]:
        - generic [ref=f1e241]:
          - generic [ref=f1e242]: 
          - paragraph [ref=f1e243]: Buzz Latest Posts
        - separator [ref=f1e244]
        - generic [ref=f1e247]:
          - generic [ref=f1e248] [cursor=pointer]:
            - img "profile picture" [ref=f1e250]
            - generic [ref=f1e251]:
              - paragraph [ref=f1e252]: Jhon Doe
              - paragraph [ref=f1e253]: 2020-08-10 09:08 AM
          - separator [ref=f1e254]
          - paragraph [ref=f1e255]: "Hi All; Linda has been blessed with a baby boy! Linda: With love, we welcome your dear new baby to this world. Congratulations!"
      - generic [ref=f1e257]:
        - generic [ref=f1e258]:
          - paragraph [ref=f1e263]: Employees on Leave Today
          - generic [ref=f1e264] [cursor=pointer]: 
        - separator [ref=f1e265]
        - generic [ref=f1e267]:
          - img "No Content" [ref=f1e268]
          - paragraph [ref=f1e269]: No Employees are on Leave Today
      - generic [ref=f1e271]:
        - generic [ref=f1e273]:
          - generic [ref=f1e274]: 
          - paragraph [ref=f1e275]: Employee Distribution by Sub Unit
        - separator [ref=f1e276]
        - list [ref=f1e281]:
          - listitem [ref=f1e282] [cursor=pointer]:
            - generic "Human Resources" [ref=f1e284]
          - listitem [ref=f1e285] [cursor=pointer]:
            - generic "Unassigned" [ref=f1e287]
      - generic [ref=f1e289]:
        - generic [ref=f1e291]:
          - generic [ref=f1e292]: 
          - paragraph [ref=f1e293]: Employee Distribution by Location
        - separator [ref=f1e294]
        - list [ref=f1e299]:
          - listitem [ref=f1e300] [cursor=pointer]:
            - generic "Texas R&D" [ref=f1e302]
          - listitem [ref=f1e303] [cursor=pointer]:
            - generic "Unassigned" [ref=f1e305]
    - generic [ref=f1e306]:
      - paragraph [ref=f1e307]: OrangeHRM OS 5.9
      - paragraph [ref=f1e308]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=f1e309] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | export class DashboardPage {
  4  |   readonly page: Page;
  5  |   readonly dashboardMenuItem;
  6  |   readonly profileTab;
  7  |   readonly logoutLink;
  8  |   readonly leftNav;
  9  |   readonly widgets;
  10 |   readonly userName;
  11 | 
  12 |   constructor(page: Page) {
  13 |     this.page = page;
  14 |     this.dashboardMenuItem = page.getByText('Dashboard').first();
  15 |     this.profileTab = page.locator('.oxd-userdropdown-tab');
  16 |     this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
  17 |     this.leftNav = page.locator('aside.oxd-sidepanel');
  18 |     this.widgets = page.locator('.orangehrm-dashboard-widget');
  19 |     this.userName = page.locator('.oxd-userdropdown-name');
  20 |   }
  21 | 
  22 |   async isLoaded() {
  23 |     await this.dashboardMenuItem.waitFor({ state: 'visible' });
  24 |     return this.dashboardMenuItem.isVisible();
  25 |   }
  26 | 
  27 |   async openUserMenu() {
  28 |     await this.profileTab.click();
  29 |   }
  30 | 
  31 |   async logout() {
  32 |     await this.logoutLink.click();
  33 |   }
  34 | 
  35 |   async isLeftNavVisible() {
  36 |     return this.leftNav.isVisible();
  37 |   }
  38 | 
  39 |   async widgetsCount() {
  40 |     return this.widgets.count();
  41 |   }
  42 | 
  43 |   async getUserNameText() {
  44 |     return this.userName.textContent();
  45 |   }
  46 | 
  47 |   async clickNavItem(name: string) {
  48 |     await this.leftNav.waitFor({ state: 'visible' });
  49 |     const link = this.page.getByRole('link', { name }).first();
  50 |     await link.waitFor({ state: 'visible' });
  51 |     await link.click();
  52 |   }
  53 | 
  54 |   async clickQuickLaunch(name: string) {
  55 |     // quick launch items may be links or buttons; try both
  56 |     const link = this.page.getByRole('link', { name }).first();
  57 |     try {
  58 |       await link.waitFor({ state: 'visible', timeout: 2000 });
  59 |       await link.click();
  60 |       return;
  61 |     } catch (e) {}
  62 |     const button = this.page.getByRole('button', { name }).first();
> 63 |     await button.waitFor({ state: 'visible' });
     |                  ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  64 |     await button.click();
  65 |   }
  66 | }
  67 | 
```