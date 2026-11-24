# Evidence Guide — Growth Travel Agency India

**Assignment:** Six-Digit Verification Input  
**Job ID:** nx34zS5mJMYfCaQu448W

This guide explains what each evidence item demonstrates and distinguishes automated test evidence from user-captured manual browser screenshots. Do not describe an unperformed test as passed.

## A. Implementation screenshots included in the reviewed project

These eight PNGs were already included in the reviewed project archive. The README identifies them as screenshots of the implemented page:

| File | Evidence purpose | What it should show |
|---|---|---|
| `Evidence/00_empty_disabled_1440.png` | Desktop initial state | Six empty fields; Verify disabled; no initial error |
| `Evidence/01_empty_disabled_375.png` | Mobile initial state | Six empty fields at 375px; Verify disabled |
| `Evidence/02_incomplete_error_375.png` | Incomplete-code error | Red inline message after incomplete Enter attempt |
| `Evidence/03_nonnumeric_error_375.png` | Non-numeric error | Invalid character rejected and red inline message shown |
| `Evidence/04_valid_enabled_375.png` | Valid format state | Six one-digit fields including leading zero; Verify enabled |
| `Evidence/05_valid_status_375.png` | Verify activation | “Code format is valid.” status; not authentication |
| `Evidence/06_disabled_restored_375.png` | Disabled restoration | Button disabled again after deleting a digit |
| `Evidence/07_incomplete_error_1440.png` | Desktop error state | Incomplete-code error at desktop viewport |

These screenshots are implementation evidence, not the assignment's supplied design-reference images.

## B. Additional screenshots supplied by the user on 24 November 2026

The following images were copied unchanged from the conversation into `Evidence/Manual_Browser/`. They show additional real-browser views of the locally running page at `127.0.0.1:5500/index.html`.

| File | Description | What can be visually confirmed |
|---|---|---|
| `Evidence/Manual_Browser/user-supplied-01.png` | Browser screenshot of the form with six populated digits | A six-digit display and enabled Verify control are visible |
| `Evidence/Manual_Browser/user-supplied-02.png` | Browser screenshot of empty fields and red validation state | Empty fields, red field borders/message, disabled Verify |
| `Evidence/Manual_Browser/user-supplied-03.png` | Browser screenshot of populated form | Six populated fields and enabled Verify control |
| `Evidence/Manual_Browser/user-supplied-04.png` | Browser screenshot of populated form with focus | Focus indicator visible on a code field |
| `Evidence/Manual_Browser/user-supplied-05.png` | Browser screenshot of incomplete form | Incomplete fields, red error message, disabled Verify |
| `Evidence/Manual_Browser/user-supplied-06.png` | Browser screenshot of initial/empty form | Six empty fields and disabled Verify |
| `Evidence/Manual_Browser/user-supplied-07.png` | Browser screenshot of populated form | Six populated fields and enabled Verify control |
| `Evidence/Manual_Browser/user-supplied-08.png` | Browser screenshot of populated form | Six populated fields and enabled Verify control |
| `Evidence/Manual_Browser/user-supplied-09.png` | Additional browser screenshot of incomplete form | One field populated, remaining fields empty, red error and disabled Verify |

**Important limitation:** A screenshot proves only the visible state at capture time. It does not by itself prove the exact input action, clipboard behavior, browser version, screen-reader behavior, network/storage inspection, or that a test case passed. Use the test results file for the status of each test.

## C. Required evidence still to capture if not already available

The assignment asks for actual implementation evidence of:

1. Empty / disabled state.
2. Incomplete-code error.
3. Non-numeric-input error.
4. Six-digit valid-format / enabled state.
5. Deleting a digit and seeing the real disabled attribute restored.

The eight implementation screenshots in section A cover these states according to the project README. The additional user screenshots in section B provide extra browser evidence. If the reviewer requires a continuous recording, make a short screen recording that shows the actions and states in sequence.

## D. Evidence naming and capture recommendations

For any new screenshots, use descriptive names such as:

- `firefox-T04-letter-rejected.png`
- `firefox-T05-invalid-paste-rejected.png`
- `firefox-T06-special-character-rejected.png`
- `firefox-T09-disabled-after-delete.png`
- `firefox-T10-multi-digit-paste-rejected.png`
- `firefox-T11-keyboard-focus-order.png`

Record browser name/version, viewport width × height, date, test ID, action, observed result, and screenshot filename. Avoid including private information in screenshots.

## Additional evidence supplied on 24 November 2026

The following four screenshots were added from the user's latest upload. They are preserved as supplied and are not treated as proof of a test passing unless the screenshot itself demonstrates the expected result.

| File | Evidence description | What it supports |
|---|---|---|
| `Evidence/Manual_Browser/Firefox_2026-11-24/Firefox_About_Version_161.0.png` | Firefox About / update page showing version 161.0 (64-bit) and that Firefox is up to date | Browser/version record |
| `Evidence/Manual_Browser/Firefox_2026-11-24/Firefox_Empty_Validation_State.png` | Firefox project page with six empty fields, red validation message and disabled Verify button | Empty/incomplete validation state |
| `Evidence/Manual_Browser/Firefox_2026-11-24/Firefox_Partial_Input_State.png` | Firefox project page with digits visible in non-adjacent input positions and validation error | Partial-input state; investigate/record exact paste behavior before marking T05 or T10 passed |
| `Evidence/Manual_Browser/Firefox_2026-11-24/Browser_Validation_State_Additional.png` | Additional verification form screenshot with digits and validation message | Additional visual validation evidence; browser attribution should be confirmed before using as Firefox-specific proof |

**Important:** These screenshots do not by themselves establish that invalid clipboard paste (T05), multi-digit paste (T10), or keyboard navigation (T11) passed. Record those outcomes only after performing and observing each test.
