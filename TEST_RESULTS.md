# Test Results — Growth Travel Verification

**Job ID:** nx34zS5mJMYfCaQu448W  
**Project scope:** Front-end six-digit numeric-format validation only. No backend authentication is included.

## 1. Results reported by the reviewed project README

The reviewed README records an automated run on **2026-11-24** using **Chromium 157.0.8103.78**, Playwright, Linux. Recorded viewports: 1440×900, 375×812, 768×1024, 320×568 and 360×300.

| ID | README-recorded result | Scenario |
|---|---|---|
| T01 | Pass | Initial empty state; real disabled attribute present; no initial error |
| T02 | Pass | Leaving empty code group shows inline error; button remains disabled |
| T03 | Pass | Incomplete Enter submission shows inline error; no navigation |
| T04 | Pass | Letter input rejected; inline error shown |
| T05 | Pass | Synthetic paste of `1e2` rejected entirely |
| T06 | Pass | Whitespace and decimal point rejected |
| T07 | Pass | `012345` accepted; leading zero preserved; button enabled |
| T08 | Pass | Verify announces “Code format is valid.”; no navigation |
| T09 | Pass | Deleting a digit restores disabled immediately |
| T10 | Pass | Synthetic paste of `12` rejected and not distributed |
| T11 | Pass | Keyboard order, focus outline and labels checked in automated browser run |
| T12 | Pass | Source/network/storage/submit-guard checks recorded as passed in README |

These are results documented in the supplied reviewed README. They are not a new independent test run performed while preparing this package.

## 2. Additional manual testing reported by the user

On 2026-11-24, the user reported that **Firefox letter rejection and special-character rejection passed**. This supports manual pass status for the corresponding behaviors (T04 and T06) in Firefox, but the exact Firefox version and viewport were not provided.

Additional user screenshots show the form in valid and incomplete/error states in browser windows. They support visual inspection of those states, but do not independently establish every interaction or test result.

| Test / area | Current status | Notes |
|---|---|---|
| Firefox T04 — letter rejection | Pass (user-reported) | User reported letters are rejected |
| Firefox T06 — special characters | Pass (user-reported) | User reported special characters are rejected |
| Firefox T05 — invalid clipboard paste `1e2` | Not confirmed | Screenshot shared after paste attempt shows a mixed/incomplete form; result of exact paste test was not confirmed |
| Firefox T10 — multi-digit paste `12` | Not tested / not confirmed | Needs direct manual test |
| Firefox T09 — delete and disabled restoration | Visually shown in supplied evidence, interaction not fully confirmed | Retest and inspect actual disabled attribute if required |
| Firefox T11 — keyboard accessibility | Not confirmed | Tab order and focus need explicit check |
| Firefox version / viewport | Not recorded | Add exact values from Firefox About and browser window size |
| Safari | Not tested | User has no Apple device; disclose as not tested rather than claiming pass |
| Real Android/iOS keyboard | Not tested | No real-device test evidence supplied |
| Screen reader | Not tested | DOM wiring is documented in README; assistive-technology run not supplied |

## 3. Remaining checks before final submission

1. Finish Firefox T05 by pasting exactly `1e2` into one empty field and confirming the entire paste is rejected.
2. Run Firefox T10 by pasting exactly `12` into one field; confirm it is rejected and not distributed.
3. Run Firefox T09 and verify the actual `disabled` attribute returns immediately after deleting a digit.
4. Run Firefox T11 by tabbing through all six inputs and then the Verify button; record focus order and visible focus.
5. Record Firefox version and viewport size in README.
6. If Safari, mobile-device, or screen-reader testing is unavailable, list those as not tested. Do not invent results.
7. Re-check that the latest reviewed source code (including the paste-handling change) is the version in GitHub.

## 4. Scope and interpretation

“Code format is valid” means only that six fields each contain one ASCII digit. It is not OTP verification, user authentication, or permission to access an account. No valid authentication code is hardcoded.
