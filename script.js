/*
 * Six-digit verification input - format validation only.
 * No authentication happens here: nothing is transmitted, logged or stored.
 */
(function () {
  'use strict';

  var MESSAGES = {
    error: 'Enter all 6 digits using numbers only.',
    valid: 'Code format is valid.'
  };
  var DIGIT = /^[0-9]$/; // exactly one ASCII digit

  var form = document.getElementById('verify-form');
  var group = document.getElementById('code-group');
  var inputs = Array.prototype.slice.call(group.querySelectorAll('.code-input'));
  var button = document.getElementById('verify-button');
  var errorEl = document.getElementById('code-error');
  var statusEl = document.getElementById('code-status');

  // Last accepted value of each field (six strings, leading zeros preserved)
  var lastValid = inputs.map(function () { return ''; });
  var interacted = false;

  /** Reusable validator: true only when every field holds one ASCII digit. */
  function isCodeValid() {
    return inputs.every(function (input) { return DIGIT.test(input.value); });
  }

  /** Single place that syncs the real disabled attribute with the field values. */
  function updateButtonState() {
    if (isCodeValid()) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', '');
    }
  }

  function showError() {
    errorEl.textContent = MESSAGES.error;
    statusEl.textContent = '';
    inputs.forEach(function (input) {
      if (DIGIT.test(input.value) && !input.dataset.rejected) {
        input.removeAttribute('aria-invalid');
      } else {
        input.setAttribute('aria-invalid', 'true');
      }
    });
  }

  function clearError() {
    errorEl.textContent = '';
    inputs.forEach(function (input) {
      input.removeAttribute('aria-invalid');
      delete input.dataset.rejected;
    });
  }

  /** Reject an invalid attempt on one field: keep the prior valid digit, flag it. */
  function rejectInput(input, index) {
    input.value = lastValid[index];
    input.dataset.rejected = 'true';
    interacted = true;
    showError();
    updateButtonState();
  }

  /** Accept one digit in a field, then refresh button and message state. */
  function acceptDigit(input, index, digit) {
    input.value = digit;
    lastValid[index] = digit;
    delete input.dataset.rejected;
    statusEl.textContent = '';
    refresh();
  }

  /** Recompute button state and update the error after any valid edit/deletion. */
  function refresh() {
    updateButtonState();
    if (isCodeValid()) {
      clearError();
    } else {
      statusEl.textContent = '';
      if (errorEl.textContent) { showError(); }
    }
  }

  inputs.forEach(function (input, index) {
    // Intercept typing, paste and drop before the browser changes the field
    input.addEventListener('beforeinput', function (event) {
      interacted = true;
      var type = event.inputType || '';
      if (type.indexOf('delete') === 0 || type.indexOf('history') === 0) { return; }
      var data = event.data;
      if (data === null || data === undefined) {
        if (event.dataTransfer) { data = event.dataTransfer.getData('text'); } else { return; }
      }
      event.preventDefault();
      if (DIGIT.test(data)) {
        acceptDigit(input, index, data);
        if (index < inputs.length - 1) { inputs[index + 1].focus(); }
      } else {
        rejectInput(input, index); // letters, whitespace, punctuation, multi-character paste
      }
    });

    // Handle real clipboard paste explicitly. Some browsers expose null in
    // beforeinput.data for paste, so do not rely on beforeinput alone.
    input.addEventListener('paste', function (event) {
      event.preventDefault();
      interacted = true;
      var pasted = event.clipboardData ? event.clipboardData.getData('text') : '';
      if (DIGIT.test(pasted)) {
        acceptDigit(input, index, pasted);
        if (index < inputs.length - 1) { inputs[index + 1].focus(); }
      } else {
        rejectInput(input, index);
      }
    });

    // Do not allow dragged text to bypass the one-digit-per-field rule.
    input.addEventListener('drop', function (event) {
      event.preventDefault();
      interacted = true;
      var dropped = event.dataTransfer ? event.dataTransfer.getData('text') : '';
      if (DIGIT.test(dropped)) {
        acceptDigit(input, index, dropped);
        if (index < inputs.length - 1) { inputs[index + 1].focus(); }
      } else {
        rejectInput(input, index);
      }
    });

    // Fallback for keyboards that do not cancel beforeinput (some mobile IMEs)
    input.addEventListener('input', function () {
      var value = input.value;
      if (value === '') {
        lastValid[index] = '';
        delete input.dataset.rejected;
        refresh();
      } else if (DIGIT.test(value)) {
        acceptDigit(input, index, value);
        if (index < inputs.length - 1) { inputs[index + 1].focus(); }
      } else {
        rejectInput(input, index);
      }
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // never submit/navigate implicitly
        interacted = true;
        if (isCodeValid()) { form.requestSubmit(); } else { showError(); }
      } else if (event.key === 'Backspace' && input.value === '' && index > 0) {
        inputs[index - 1].focus();
      } else if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault();
        inputs[index - 1].focus();
      } else if (event.key === 'ArrowRight' && index < inputs.length - 1) {
        event.preventDefault();
        inputs[index + 1].focus();
      }
    });

    input.addEventListener('focus', function () { input.select(); });
  });

  // Entering the group counts as interaction (T02: focus, then leave while empty)
  group.addEventListener('focusin', function () { interacted = true; });

  // Error after leaving an interacted-with, incomplete code group
  group.addEventListener('focusout', function (event) {
    if (group.contains(event.relatedTarget)) { return; }
    if (interacted && !isCodeValid()) { showError(); }
  });

  // Submit guard: also covers form.requestSubmit() from developer tools
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!isCodeValid()) {
      interacted = true;
      showError();
      return;
    }
    clearError();
    statusEl.textContent = MESSAGES.valid; // format check only, not authentication
  });

  updateButtonState();
})();
