# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leave.spec.ts >> Leave - My Leave Filters >> reset button is available and can be clicked after entering filter values
- Location: tests\leave.spec.ts:157:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Tearing down "context" exceeded the test timeout of 30000ms.
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
              - textbox "Search" [ref=f3e15]: Alice
              - button "" [ref=f3e16] [cursor=pointer]
            - separator [ref=f3e18]
          - list
    - banner [ref=f3e19]:
      - generic [ref=f3e20]:
        - generic [ref=f3e21]:
          - text: 
          - heading "Leave" [level=6] [ref=f3e23]
        - link [ref=f3e25]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=f3e26] [cursor=pointer]
        - list [ref=f3e32]:
          - listitem [ref=f3e33]:
            - generic [ref=f3e34] [cursor=pointer]:
              - img "profile picture" [ref=f3e35]
              - paragraph [ref=f3e36]: ABC GH
              - generic [ref=f3e37]: 
      - navigation "Topbar Menu" [ref=f3e39]:
        - list [ref=f3e40]:
          - listitem [ref=f3e41] [cursor=pointer]:
            - link "Apply" [ref=f3e42]:
              - /url: "#"
          - listitem [ref=f3e43] [cursor=pointer]:
            - link "My Leave" [ref=f3e44]:
              - /url: "#"
          - listitem [ref=f3e45] [cursor=pointer]:
            - generic [ref=f3e46]:
              - text: Entitlements
              - generic [ref=f3e47]: 
          - listitem [ref=f3e48] [cursor=pointer]:
            - generic [ref=f3e49]:
              - text: Reports
              - generic [ref=f3e50]: 
          - listitem [ref=f3e51] [cursor=pointer]:
            - generic [ref=f3e52]:
              - text: Configure
              - generic [ref=f3e53]: 
          - listitem [ref=f3e54] [cursor=pointer]:
            - link "Leave List" [ref=f3e55]:
              - /url: "#"
          - listitem [ref=f3e56] [cursor=pointer]:
            - link "Assign Leave" [ref=f3e57]:
              - /url: "#"
          - button "" [ref=f3e59] [cursor=pointer]
  - generic [ref=f3e61]:
    - generic [ref=f3e63]:
      - generic [ref=f3e64]:
        - generic [ref=f3e65]:
          - heading "My Leave List" [level=5] [ref=f3e67]
          - button "" [ref=f3e70] [cursor=pointer]
        - separator [ref=f3e72]
        - generic [ref=f3e74]:
          - generic [ref=f3e76]:
            - generic [ref=f3e78]:
              - generic [ref=f3e79]: From Date
              - generic [ref=f3e83]:
                - textbox "yyyy-dd-mm" [ref=f3e84]: 2026-01-01
                - generic [ref=f3e85] [cursor=pointer]: 
            - generic [ref=f3e87]:
              - generic [ref=f3e88]: To Date
              - generic [ref=f3e92]:
                - textbox "yyyy-dd-mm" [ref=f3e93]: 2026-31-12
                - generic [ref=f3e94] [cursor=pointer]: 
            - generic [ref=f3e96]:
              - generic [ref=f3e97]: Show Leave with Status*
              - generic [ref=f3e101] [cursor=pointer]:
                - generic [ref=f3e102]: Select
                - generic [ref=f3e103]: 
            - generic [ref=f3e107]:
              - generic [ref=f3e108]: Leave Type
              - generic [ref=f3e112] [cursor=pointer]:
                - generic [ref=f3e113]: "-- Select --"
                - generic [ref=f3e114]: 
          - separator [ref=f3e116]
          - generic [ref=f3e117]:
            - paragraph [ref=f3e118]: "* Required"
            - button "Reset" [active] [ref=f3e119] [cursor=pointer]
            - button "Search" [ref=f3e120] [cursor=pointer]
      - generic [ref=f3e121]:
        - generic [ref=f3e122]: No Records Found
        - table [ref=f3e125]:
          - rowgroup [ref=f3e126]:
            - row [ref=f3e127]:
              - columnheader "" [ref=f3e128]:
                - generic [ref=f3e130] [cursor=pointer]:
                  - checkbox "" [ref=f3e131]
                  - generic [ref=f3e132]: 
              - columnheader "Date" [ref=f3e134]
              - columnheader "Employee Name" [ref=f3e135]
              - columnheader "Leave Type" [ref=f3e136]
              - columnheader "Leave Balance (Days)" [ref=f3e137]
              - columnheader "Number of Days" [ref=f3e138]
              - columnheader "Status" [ref=f3e139]
              - columnheader "Comments" [ref=f3e140]
              - columnheader "Actions" [ref=f3e141]
          - rowgroup
    - generic [ref=f3e143]:
      - paragraph [ref=f3e144]: OrangeHRM OS 5.9
      - paragraph [ref=f3e145]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=f3e146] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```