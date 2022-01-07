const elementStyleDefinitor = (htmlElement) => (property, value) => {
  htmlElement.style[property] = value;
}

const printClipboardException = (error) => {
  console.error('Unable to copy,', error);
}

const fallbackCopyToClipboard = (content) => {
  let hasSuccess = false;
  const dummyTextArea = document.createElement('textarea');
  dummyTextArea.value = content;

  /* This is to prevent scrolling to bottom */
  const setElementStylePropery = elementStyleDefinitor(dummyTextArea);
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
} 

/**
 * Takes a value to send it to clipboard asynchronously and returns a boolean to indicates success or failure.
 *
 * @param {string} content - Value which will send to clipboard.
 * @returns (boolean) Response of the operation.
 */
const copyToClipboard = (content) => {
  if (!navigator.clipboard) {
    return fallbackCopyToClipboard(content);
  }

  return navigator.clipboard.writeText(content)
    .then(() => {
      return true;
    })
    .catch((error) => {
      printClipboardException(error);
      return false;
    });
}

module.exports = copyToClipboard;