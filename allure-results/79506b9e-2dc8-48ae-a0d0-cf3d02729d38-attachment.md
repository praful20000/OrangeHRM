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
  - waiting for getByRole('button', { name: 'Apply Leave', exact: true }) to be visible

```

# Page snapshot

```yaml
- generic [ref=f5e3]:
  - generic:
    - complementary [ref=f5e4]:
      - navigation "Sidepanel" [ref=f5e5]:
        - generic [ref=f5e6]:
          - link [ref=f5e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=f5e9]
          - text: 
        - generic [ref=f5e10]:
          - generic [ref=f5e11]:
            - generic [ref=f5e12]:
              - textbox "Search" [ref=f5e15]
              - button "" [ref=f5e16] [cursor=pointer]
            - separator [ref=f5e18]
          - list [ref=f5e19]:
            - listitem [ref=f5e20]:
              - link "Admin" [ref=f5e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
            - listitem [ref=f5e25]:
              - link "PIM" [ref=f5e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
            - listitem [ref=f5e41]:
              - link "Leave" [ref=f5e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
            - listitem [ref=f5e46]:
              - link "Time" [ref=f5e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
            - listitem [ref=f5e54]:
              - link "Recruitment" [ref=f5e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
            - listitem [ref=f5e62]:
              - link "My Info" [ref=f5e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
            - listitem [ref=f5e70]:
              - link "Performance" [ref=f5e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
            - listitem [ref=f5e80]:
              - link "Dashboard" [ref=f5e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
            - listitem [ref=f5e85]:
              - link "Directory" [ref=f5e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
            - listitem [ref=f5e90]:
              - link "Maintenance" [ref=f5e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
            - listitem [ref=f5e96]:
              - link "Claim" [ref=f5e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
            - listitem [ref=f5e105]:
              - link "Buzz" [ref=f5e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
    - banner [ref=f5e110]:
      - generic [ref=f5e111]:
        - generic [ref=f5e112]:
          - text: 
          - heading "Dashboard" [level=6] [ref=f5e114]
        - link [ref=f5e116]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=f5e117] [cursor=pointer]
        - list [ref=f5e123]:
          - listitem [ref=f5e124]:
            - generic [ref=f5e125] [cursor=pointer]:
              - img "profile picture" [ref=f5e126]
              - paragraph [ref=f5e127]: Raymond Shepherd
              - generic [ref=f5e128]: 
      - navigation "Topbar Menu" [ref=f5e130]:
        - list [ref=f5e131]:
          - button "" [ref=f5e133] [cursor=pointer]
  - generic [ref=f5e135]:
    - generic [ref=f5e137]:
      - generic [ref=f5e139]:
        - generic [ref=f5e141]:
          - generic [ref=f5e142]: 
          - paragraph [ref=f5e143]: Time at Work
        - separator [ref=f5e144]
        - generic [ref=f5e146]:
          - generic [ref=f5e147]:
            - img "profile picture" [ref=f5e149]
            - generic [ref=f5e150]:
              - paragraph [ref=f5e151]: Punched In
              - paragraph [ref=f5e152]: "Punched In: Today at 03:31 PM (GMT 5.5)"
          - generic [ref=f5e153]:
            - generic [ref=f5e154]: 0h 10m Today
            - button "" [ref=f5e155] [cursor=pointer]
          - separator [ref=f5e157]
          - generic [ref=f5e158]:
            - generic [ref=f5e159]:
              - paragraph [ref=f5e160]: This Week
              - paragraph [ref=f5e161]: Sep 14 - Sep 20
            - generic [ref=f5e162]:
              - generic [ref=f5e163]: 
              - paragraph [ref=f5e164]: 0h 0m
      - generic [ref=f5e168]:
        - generic [ref=f5e170]:
          - generic [ref=f5e171]: 
          - paragraph [ref=f5e172]: My Actions
        - separator [ref=f5e173]
        - generic [ref=f5e175]:
          - generic [ref=f5e176]:
            - button [ref=f5e177] [cursor=pointer]
            - paragraph [ref=f5e183] [cursor=pointer]: (1) Leave Request to Approve
          - generic [ref=f5e184]:
            - button [ref=f5e185] [cursor=pointer]
            - paragraph [ref=f5e201] [cursor=pointer]: (1) Timesheet to Approve
          - generic [ref=f5e202]:
            - button [ref=f5e203] [cursor=pointer]
            - paragraph [ref=f5e209] [cursor=pointer]: (1) Pending Self Review
          - generic [ref=f5e210]:
            - button [ref=f5e211] [cursor=pointer]
            - paragraph [ref=f5e220] [cursor=pointer]: (1) Candidate to Interview
      - generic [ref=f5e222]:
        - generic [ref=f5e224]:
          - generic [ref=f5e225]: 
          - paragraph [ref=f5e226]: Quick Launch
        - separator [ref=f5e227]
      - generic [ref=f5e231]:
        - generic [ref=f5e233]:
          - generic [ref=f5e234]: 
          - paragraph [ref=f5e235]: Buzz Latest Posts
        - separator [ref=f5e236]
        - generic [ref=f5e238]:
          - generic [ref=f5e239]:
            - generic [ref=f5e240] [cursor=pointer]:
              - img "profile picture" [ref=f5e242]
              - generic [ref=f5e243]:
                - paragraph [ref=f5e244]: Raymond Matthew Shepherd
                - paragraph [ref=f5e245]: 2020-08-10 09:08 AM
            - separator [ref=f5e246]
            - paragraph [ref=f5e247]: "Hi All; Linda has been blessed with a baby boy! Linda: With love, we welcome your dear new baby to this world. Congratulations!"
          - generic [ref=f5e248]:
            - generic [ref=f5e249] [cursor=pointer]:
              - img "profile picture" [ref=f5e251]
              - generic [ref=f5e252]:
                - paragraph [ref=f5e253]: Sania Shaheen
                - paragraph [ref=f5e254]: 2020-08-10 09:08 AM
            - separator [ref=f5e255]
            - paragraph [ref=f5e256]: "World Championship: What makes the perfect snooker player? Mark Selby: Robertson has one of the best techniques in the game. It is very, very straight and he fully commits to every single shot he plays. John Higgins: Every shot is repetitive. He always keeps the same technique and cues through the ball bang straight. Barry Hawkins: Robertson is textbook with his grip and has a ramrod solid cue action, delivering it in a straight line. Honourable mentions: Shaun Murphy, Ding Junhui, Jack Lisowski."
          - generic [ref=f5e257]:
            - generic [ref=f5e258] [cursor=pointer]:
              - img "profile picture" [ref=f5e260]
              - generic [ref=f5e261]:
                - paragraph [ref=f5e262]: Rebecca Harmony
                - paragraph [ref=f5e263]: 2020-08-10 09:04 AM
            - separator [ref=f5e264]
            - paragraph [ref=f5e265]: Throwback Thursdays!!
          - generic [ref=f5e266]:
            - generic [ref=f5e267] [cursor=pointer]:
              - img "profile picture" [ref=f5e269]
              - generic [ref=f5e270]:
                - paragraph [ref=f5e271]: Russel Hamilton
                - paragraph [ref=f5e272]: 2020-08-10 09:03 AM
            - separator [ref=f5e273]
            - paragraph [ref=f5e274]: Live SIMPLY Dream BIG Be GREATFULL Give LOVE Laugh LOT.......
      - generic [ref=f5e276]:
        - generic [ref=f5e277]:
          - paragraph [ref=f5e282]: Employees on Leave Today
          - generic [ref=f5e283] [cursor=pointer]: 
        - separator [ref=f5e284]
        - generic [ref=f5e286]:
          - img "No Content" [ref=f5e287]
          - paragraph [ref=f5e288]: No Employees are on Leave Today
      - generic [ref=f5e290]:
        - generic [ref=f5e292]:
          - generic [ref=f5e293]: 
          - paragraph [ref=f5e294]: Employee Distribution by Sub Unit
        - separator [ref=f5e295]
        - list [ref=f5e300]:
          - listitem [ref=f5e301] [cursor=pointer]:
            - generic "Engineering" [ref=f5e303]
          - listitem [ref=f5e304] [cursor=pointer]:
            - generic "Human Resources" [ref=f5e306]
          - listitem [ref=f5e307] [cursor=pointer]:
            - generic "Administration" [ref=f5e309]
          - listitem [ref=f5e310] [cursor=pointer]:
            - generic "Client Services" [ref=f5e312]
          - listitem [ref=f5e313] [cursor=pointer]:
            - generic "Unassigned" [ref=f5e315]
      - generic [ref=f5e317]:
        - generic [ref=f5e319]:
          - generic [ref=f5e320]: 
          - paragraph [ref=f5e321]: Employee Distribution by Location
        - separator [ref=f5e322]
        - list [ref=f5e327]:
          - listitem [ref=f5e328] [cursor=pointer]:
            - generic "Texas R&D" [ref=f5e330]
          - listitem [ref=f5e331] [cursor=pointer]:
            - generic "New York Sales Office" [ref=f5e333]
          - listitem [ref=f5e334] [cursor=pointer]:
            - generic "Unassigned" [ref=f5e336]
    - generic [ref=f5e337]:
      - paragraph [ref=f5e338]: OrangeHRM OS 5.9
      - paragraph [ref=f5e339]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=f5e340] [cursor=pointer]:
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
  17 |     this.leftNav = page.getByRole('navigation', { name: 'Sidepanel' });
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
  49 |     const link = this.leftNav.getByRole('link', { name, exact: true });
  50 |     await link.waitFor({ state: 'visible' });
  51 |     await link.click();
  52 |   }
  53 | 
  54 |   async clickQuickLaunch(name: string) {
  55 |     const button = this.page.getByRole('button', { name, exact: true });
> 56 |     await button.waitFor({ state: 'visible' });
     |                  ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  57 |     await button.click();
  58 |   }
  59 | }
  60 | 
```