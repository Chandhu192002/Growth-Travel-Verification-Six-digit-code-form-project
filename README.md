# Six-Digit Verification Screen - Growth Travel Agency India

Responsive vanilla HTML/CSS/JS verification-code input. It performs **format validation only**: it never claims authentication succeeded, and no code is transmitted, logged or stored.

## Run locally
No install or build. Open `index.html` in a browser (or `python3 -m http.server` in this folder and visit `http://localhost:8000`).

Files: `index.html`, `style.css` (external only), `script.js` (external only), `assets/growth-travel.svg`, `Evidence/`.

## State logic
- One validator, `isCodeValid()`: true only when all six inputs each hold exactly one ASCII digit `0-9`. Values are six strings, so leading zeros survive (`012345`).
- `updateButtonState()` is the only place the **real `disabled` attribute** is set/removed. It runs after every accepted, rejected or deleted edit, so disabled is restored immediately when a digit is deleted.
- Typing/paste is intercepted in `beforeinput` (with an `input` fallback for mobile keyboards). Letters, spaces, `.`, `e`, and multi-character pastes (`1e2`, `12`) are rejected whole; the field keeps its previous valid digit, is marked `aria-invalid`, and the error shows. Nothing is distributed across fields.
- Error message: persistent `<p id="code-error" role="alert">` filled via `textContent`; valid message in `<p id="code-status" role="status">`. Both are referenced by the code group's `aria-describedby`.
- `form` has `novalidate`; the submit handler re-checks validity (guard) and calls `preventDefault()` always. No `alert/confirm/prompt`.

## Reproduce the error paths while Verify is disabled
Verify never gets enabled to show an error. Use:
1. **Incomplete, Enter:** click field 1, type `12`, press Enter -> red error, button stays disabled.
2. **Incomplete, blur:** click any field, then click outside the group (or Tab out) -> same error.
3. **Non-numeric:** type `a`, space or `.` into a field, or paste `1e2` / `12` -> field rejected, red error.
4. **Submit guard:** in DevTools run `document.getElementById('verify-form').requestSubmit()` with an incomplete code -> blocked, same error.
5. **Restoration:** type `012345` (button enabled, error cleared), press Verify (status "Code format is valid."), then Backspace in any field -> disabled attribute returns immediately.

## Actual test results
Tested **2026-11-24**, **Chromium 157.0.8103.78** (headless, Playwright, Linux), automated script. Viewports: 1440x900, 375x812, 768x1024, 320x568, 360x300 (short height).

| ID | Result | Observed |
|----|--------|----------|
| T01 | Pass | Six empty fields, `disabled` present, no error at load |
| T02 | Pass | Focus then leave empty group -> error, button disabled |
| T03 | Pass | `1`,`2` + Enter -> error, no navigation, disabled |
| T04 | Pass | `a` rejected, field 3 stays empty and `aria-invalid=true`, error shown |
| T05 | Pass | Paste `1e2` rejected entirely, nothing entered |
| T06 | Pass | Space and `.` rejected, error shown |
| T07 | Pass | `012345` accepted, leading zero kept, `disabled` removed, error cleared |
| T08 | Pass | Verify -> "Code format is valid.", no navigation |
| T09 | Pass | Deleting one digit restored `disabled` immediately; error after blur |
| T10 | Pass | Paste `12` rejected, not distributed, not submitted |
| T11 | Pass | Tab order digit-1..6 then Verify; 3px solid focus outline; labels "Digit 1".."Digit 6"; `aria-describedby="code-hint code-error code-status"` |
| T12 | Pass | No dialogs, no non-file network requests, localStorage/sessionStorage/cookies empty, no inline styles/handlers/libraries in source; `requestSubmit()` guard blocked invalid submit and showed the error |

Layout: no horizontal overflow at any tested width; all six fields on one row. Fields 50x56 (desktop/768), 42x56 (375, card 343px), ~33-40px wide at 320/360.

### Not tested (be aware)
- Only Chromium was used; Firefox, Safari and real iOS/Android keyboards were **not** tested. The `input` fallback exists for mobile IMEs but is unverified on devices.
- Paste tests dispatch synthetic paste/`beforeinput` events rather than real clipboard use.
- No screen-reader run; live-region/label wiring was checked in the DOM only.

## Evidence (`Evidence/`, screenshots of this implementation)
- `00_empty_disabled_1440.png` - initial state, desktop
- `01_empty_disabled_375.png` - initial state, mobile
- `02_incomplete_error_375.png` - error after incomplete Enter
- `03_nonnumeric_error_375.png` - error after non-numeric attempt
- `04_valid_enabled_375.png` - valid, Verify enabled
- `05_valid_status_375.png` - after activating Verify
- `06_disabled_restored_375.png` - disabled restored after deleting a digit
- `07_incomplete_error_1440.png` - error, desktop

## Additional evidence and manual test tracking
See [`EVIDENCE_GUIDE.md`](EVIDENCE_GUIDE.md) for the evidence inventory and [`TEST_RESULTS.md`](TEST_RESULTS.md) for a clear separation between the Chromium automated results recorded above and additional manual Firefox checks reported by the user. User-supplied browser screenshots are stored in `Evidence/Manual_Browser/`.

Manual Firefox update (2026-11-24): the user reported that letter rejection and special-character rejection passed. Invalid clipboard paste (`1e2`), multi-digit paste (`12`), keyboard navigation, exact Firefox version and viewport still need confirmation. Safari, real-device mobile keyboard and screen-reader testing remain not tested.
