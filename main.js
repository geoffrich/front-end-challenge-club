function initProgressList() {
  const progressList = document.querySelector('.progress');
  progressList.dataset.js = true; // so we do not remove the list marker if javascript is disabled

  const listItems = document.querySelectorAll('.progress li');

  const numberWords = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen' // could add more if necessary, but we have fallback to the number
  ];

  let hasCurrentBeenReached = false;
  listItems.forEach((item, idx) => {
    if (item.dataset.current) {
      hasCurrentBeenReached = true;
      item.setAttribute('aria-current', 'step'); // TODO: does this apply?
    } else if (!hasCurrentBeenReached) {
      item.dataset.previous = true;
    } else {
      item.dataset.upcoming = true;
    }

    item.innerHTML = `<span class="title">${item.innerHTML}</span>`;
    item.insertAdjacentElement('afterbegin', getEyebrow(idx));
    item.insertAdjacentElement('afterbegin', getCheckmark(item.dataset.previous));
  });

  function getEyebrow(index) {
    const eyebrow = document.createElement('span');
    eyebrow.classList.add('eyebrow');
    eyebrow.dataset.counter = (index + 1).toString().padStart(2, '0');
    if (numberWords[index]) {
      eyebrow.innerText = `Step ${numberWords[index]}`;
    } else {
      eyebrow.innerText = `Step ${index + 1}`;
    }
    return eyebrow;
  }

  function getCheckmark(isPreviousStep) {
    const checkmark = document.createElement('div');
    checkmark.classList.add('checkmark');
    if (isPreviousStep) {
      checkmark.innerHTML = `
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.86783 0.140957C8.04941 0.313123 8.0627 0.605051 7.89751 0.792996L3.24446 6.08691C3.07926 6.27486 2.79815 6.28765 2.61657 6.11548L0.29174 3.91119C0.11016 3.73903 0.0968757 3.4471 0.262069 3.25915C0.427263 3.07121 0.708378 3.05842 0.889959 3.23058L2.88601 5.12314L7.23994 0.169529C7.40514 -0.0184162 7.68625 -0.0312084 7.86783 0.140957Z" fill="white"/>
        </svg>
      `;
    }
    return checkmark;
  }
}

initProgressList();
