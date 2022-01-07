"use strict";

var elementStyleDefinitor = function elementStyleDefinitor(htmlElement) {
  return function (property, value) {
    htmlElement.style[property] = value;
  };
};

var printClipboardException = function printClipboardException(error) {
  console.error('Unable to copy,', error);
};

var fallbackCopyToClipboard = function fallbackCopyToClipboard(content) {
  var hasSuccess = false;
  var dummyTextArea = document.createElement('textarea');
  dummyTextArea.value = content;
  /* This is to prevent scrolling to bottom */

  var setElementStylePropery = elementStyleDefinitor(dummyTextArea);
  setElementStylePropery('top', '0');
  setElementStylePropery('left', '0');
  setElementStylePropery('position', 'fixed');
  document.body.appendChild(dummyTextArea);
  dummyTextArea.focus();
  dummyTextArea.select();

  try {
    hasSuccess = document.execCommand('copy');
  } catch (error) {
    hasSuccess = false;
    printClipboardException(error);
  }

  document.removeChild(dummyTextArea);
  return hasSuccess;
};
/**
 * Takes a value to send it to clipboard asynchronously and returns a boolean to indicates success or failure.
 *
 * @param {string} content - Value which will send to clipboard.
 * @returns (boolean) Response of the operation.
 */


var copyToClipboard = function copyToClipboard(content) {
  if (!navigator.clipboard) {
    return fallbackCopyToClipboard(content);
  }

  return navigator.clipboard.writeText(content).then(function () {
    return true;
  })["catch"](function (error) {
    printClipboardException(error);
    return false;
  });
};

module.exports = copyToClipboard;