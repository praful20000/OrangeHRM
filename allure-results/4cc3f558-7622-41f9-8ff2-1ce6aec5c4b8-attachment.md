# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: my-info.spec.ts >> My Info - Emergency Contacts >> ESS user can add multiple emergency contacts
- Location: tests\my-info.spec.ts:208:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('Name', { exact: true }).last().locator('..').locator('..').getByRole('textbox')

```

# Page snapshot

```yaml
- generic [ref=f3e3]:
  - generic:
    - complementary [ref=f3e4]:
      - navigation "Sidepanel" [ref=f3e5]:
        - generic [ref=f3e6]:
          - link [ref=f3e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=f3e9]
          - text: 
        - generic [ref=f3e10]:
          - generic [ref=f3e11]:
            - generic [ref=f3e12]:
              - textbox "Search" [ref=f3e15]
              - button "" [ref=f3e16] [cursor=pointer]
            - separator [ref=f3e18]
          - list [ref=f3e19]:
            - listitem [ref=f3e20]:
              - link "Leave" [ref=f3e21] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
            - listitem [ref=f3e25]:
              - link "Time" [ref=f3e26] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
            - listitem [ref=f3e33]:
              - link "My Info" [ref=f3e34] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
            - listitem [ref=f3e41]:
              - link "Performance" [ref=f3e42] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
            - listitem [ref=f3e51]:
              - link "Dashboard" [ref=f3e52] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
            - listitem [ref=f3e56]:
              - link "Directory" [ref=f3e57] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
            - listitem [ref=f3e61]:
              - link "Claim" [ref=f3e62] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
            - listitem [ref=f3e70]:
              - link "Buzz" [ref=f3e71] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
    - banner [ref=f3e75]:
      - generic [ref=f3e76]:
        - generic [ref=f3e77]:
          - text: 
          - heading "PIM" [level=6] [ref=f3e79]
        - list [ref=f3e81]:
          - listitem [ref=f3e82]:
            - generic [ref=f3e83] [cursor=pointer]:
              - img "profile picture" [ref=f3e84]
              - paragraph [ref=f3e85]: Ranga Akunuri
              - generic [ref=f3e86]: 
      - navigation "Topbar Menu" [ref=f3e88]:
        - list [ref=f3e89]:
          - button "" [ref=f3e91] [cursor=pointer]
  - generic [ref=f3e93]:
    - generic [ref=f3e97]:
      - generic [ref=f3e98]:
        - generic [ref=f3e99]:
          - heading "Ranga Akunuri" [level=6] [ref=f3e101]
          - img "profile picture" [ref=f3e104] [cursor=pointer]
        - tablist [ref=f3e105]:
          - tab [ref=f3e106]:
            - link "Personal Details" [ref=f3e107] [cursor=pointer]:
              - /url: /web/index.php/pim/viewPersonalDetails/empNumber/69
          - tab [ref=f3e108]:
            - link "Contact Details" [ref=f3e109] [cursor=pointer]:
              - /url: /web/index.php/pim/contactDetails/empNumber/69
          - tab [ref=f3e110]:
            - link "Emergency Contacts" [ref=f3e111] [cursor=pointer]:
              - /url: /web/index.php/pim/viewEmergencyContacts/empNumber/69
          - tab [ref=f3e112]:
            - link "Dependents" [ref=f3e113] [cursor=pointer]:
              - /url: /web/index.php/pim/viewDependents/empNumber/69
          - tab [ref=f3e114]:
            - link "Immigration" [ref=f3e115] [cursor=pointer]:
              - /url: /web/index.php/pim/viewImmigration/empNumber/69
          - tab [ref=f3e116]:
            - link "Job" [ref=f3e117] [cursor=pointer]:
              - /url: /web/index.php/pim/viewJobDetails/empNumber/69
          - tab [ref=f3e118]:
            - link "Salary" [ref=f3e119] [cursor=pointer]:
              - /url: /web/index.php/pim/viewSalaryList/empNumber/69
          - tab [ref=f3e120]:
            - link "Report-to" [ref=f3e121] [cursor=pointer]:
              - /url: /web/index.php/pim/viewReportToDetails/empNumber/69
          - tab [ref=f3e122]:
            - link "Qualifications" [ref=f3e123] [cursor=pointer]:
              - /url: /web/index.php/pim/viewQualifications/empNumber/69
          - tab [ref=f3e124]:
            - link "Memberships" [ref=f3e125] [cursor=pointer]:
              - /url: /web/index.php/pim/viewMemberships/empNumber/69
      - generic [ref=f3e126]:
        - generic [ref=f3e127]:
          - heading "Save Emergency Contact" [level=6] [ref=f3e128]
          - separator [ref=f3e129]
          - generic [ref=f3e130]:
            - generic [ref=f3e132]:
              - generic [ref=f3e134]:
                - generic [ref=f3e135]: Name*
                - textbox [ref=f3e138]
              - generic [ref=f3e140]:
                - generic [ref=f3e141]: Relationship*
                - textbox [ref=f3e144]
            - generic [ref=f3e146]:
              - generic [ref=f3e148]:
                - generic [ref=f3e149]: Home Telephone
                - textbox [ref=f3e152]
              - generic [ref=f3e154]:
                - generic [ref=f3e155]: Mobile
                - textbox [ref=f3e158]
              - generic [ref=f3e160]:
                - generic [ref=f3e161]: Work Telephone
                - textbox [ref=f3e164]
            - generic [ref=f3e165]:
              - paragraph [ref=f3e166]: "* Required"
              - button "Cancel" [ref=f3e167] [cursor=pointer]
              - button "Save" [ref=f3e168] [cursor=pointer]
        - separator [ref=f3e169]
        - generic [ref=f3e171]:
          - heading "Assigned Emergency Contacts" [level=6] [ref=f3e172]
          - button " Add" [active] [ref=f3e173] [cursor=pointer]:
            - generic [ref=f3e174]: 
            - text: Add
        - generic [ref=f3e175]:
          - separator [ref=f3e176]
          - generic [ref=f3e177]: (1) Record Found
        - table [ref=f3e180]:
          - rowgroup [ref=f3e181]:
            - row [ref=f3e182]:
              - columnheader "" [ref=f3e183]:
                - generic [ref=f3e185] [cursor=pointer]:
                  - checkbox "" [ref=f3e186]
                  - generic [ref=f3e187]: 
              - columnheader "Name" [ref=f3e189]
              - columnheader "Relationship" [ref=f3e190]
              - columnheader "Home Telephone" [ref=f3e191]
              - columnheader "Mobile" [ref=f3e192]
              - columnheader "Work Telephone" [ref=f3e193]
              - columnheader "Actions" [ref=f3e194]
          - rowgroup [ref=f3e195]:
            - row [ref=f3e197]:
              - cell "" [ref=f3e198]:
                - generic [ref=f3e201]:
                  - checkbox "" [disabled] [ref=f3e202]
                  - generic [ref=f3e203]: 
              - cell "Emergency One 1789739204471" [ref=f3e205]
              - cell "Sibling" [ref=f3e207]
              - cell "416-555-0211" [ref=f3e209]
              - cell "416-555-0212" [ref=f3e211]
              - cell "416-555-0213" [ref=f3e213]
              - cell [ref=f3e215]:
                - generic [ref=f3e216]:
                  - button "" [disabled] [ref=f3e217]
                  - button "" [disabled] [ref=f3e219]
        - generic [ref=f3e222]:
          - separator [ref=f3e223]
          - generic [ref=f3e225]:
            - heading "Attachments" [level=6] [ref=f3e226]
            - button " Add" [ref=f3e227] [cursor=pointer]:
              - generic [ref=f3e228]: 
              - text: Add
          - generic [ref=f3e229]:
            - separator [ref=f3e230]
            - generic [ref=f3e231]: No Records Found
          - table [ref=f3e234]:
            - rowgroup [ref=f3e235]:
              - row [ref=f3e236]:
                - columnheader "" [ref=f3e237]:
                  - generic [ref=f3e239] [cursor=pointer]:
                    - checkbox "" [ref=f3e240]
                    - generic [ref=f3e241]: 
                - columnheader "File Name" [ref=f3e243]
                - columnheader "Description" [ref=f3e244]
                - columnheader "Size" [ref=f3e245]
                - columnheader "Type" [ref=f3e246]
                - columnheader "Date Added" [ref=f3e247]
                - columnheader "Added By" [ref=f3e248]
                - columnheader "Actions" [ref=f3e249]
            - rowgroup
    - generic [ref=f3e250]:
      - paragraph [ref=f3e251]: OrangeHRM OS 5.9
      - paragraph [ref=f3e252]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=f3e253] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | export class EmergencyContactsPage {
  4  |   readonly page: Page;
  5  |   readonly heading;
  6  |   readonly addButton;
  7  |   readonly nameInput;
  8  |   readonly relationshipInput;
  9  |   readonly homeTelephoneInput;
  10 |   readonly mobileInput;
  11 |   readonly workTelephoneInput;
  12 |   readonly saveButton;
  13 | 
  14 |   constructor(page: Page) {
  15 |     this.page = page;
  16 |     this.heading = page.getByRole('heading', { name: 'Assigned Emergency Contacts' });
  17 |     this.addButton = page.getByRole('button', { name: /Add$/ }).first();
  18 |     this.nameInput = this.formField('Name');
  19 |     this.relationshipInput = this.formField('Relationship');
  20 |     this.homeTelephoneInput = this.formField('Home Telephone');
  21 |     this.mobileInput = this.formField('Mobile');
  22 |     this.workTelephoneInput = this.formField('Work Telephone');
  23 |     this.saveButton = page.getByRole('button', { name: 'Save' }).last();
  24 |   }
  25 | 
  26 |   private formField(label: string) {
  27 |     return this.page.getByText(label, { exact: true }).last().locator('..').locator('..').getByRole('textbox');
  28 |   }
  29 | 
  30 |   async open() {
  31 |     await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmergencyContacts/empNumber/7');
  32 |     await this.page.waitForURL(/\/pim\/viewEmergencyContacts\//);
  33 |   }
  34 | 
  35 |   async addContact(name: string, relationship: string, homeTelephone: string, mobile: string, workTelephone: string) {
  36 |     await this.addButton.click();
> 37 |     await this.nameInput.fill(name);
     |                          ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  38 |     await this.relationshipInput.fill(relationship);
  39 |     await this.homeTelephoneInput.fill(homeTelephone);
  40 |     await this.mobileInput.fill(mobile);
  41 |     await this.workTelephoneInput.fill(workTelephone);
  42 |     await this.saveButton.click();
  43 |   }
  44 | 
  45 |   row(name: string) {
  46 |     return this.page.locator('.oxd-table-body .oxd-table-row').filter({ hasText: name });
  47 |   }
  48 | 
  49 |   async deleteContact(name: string) {
  50 |     const row = this.row(name);
  51 |     await row.getByRole('checkbox').check({ force: true });
  52 |     const deleteButton = this.page.getByRole('button', { name: /Delete/i }).first();
  53 |     await deleteButton.click();
  54 |     const confirmButton = this.page.getByRole('button', { name: /Yes, Delete|Confirm/i });
  55 |     if (await confirmButton.count() > 0) await confirmButton.click();
  56 |   }
  57 | }
```