const bs = {};

/**
 * Set up
 */
bs.$body = document.querySelector('body');
bs.$container = document.querySelector('.bs');
bs.$start = bs.$container.querySelector('.bs__start');
bs.$score = bs.$container.querySelector('.bs__score-value');
bs.$target = bs.$container.querySelector('.bs__target');
bs.$ladybug = bs.$container.querySelector('.ladybug');
bs.score = 0;
bs.audio = new Audio('assets/img/shoot.mp3');

bs.start = () => {

  // Listen to click.
  bs.$start.addEventListener('click', () => {

    // Hide the start button / Show the counter.
    bs.$container.classList.add('bs__is-playing');
    bs.setTarget();

  });


  // Avoid screen draging.
  bs.$body.addEventListener('touchstart', (event) => {
    event.stopPropagation();
  });

  bs.$body.addEventListener('touchmove', (event) => {
    event.stopPropagation();
  });

};


bs.setTarget = () => {

  // Move target to the center.
  bs.updateTargerPosition(50, 50);

  // Listen to click or tap.
  bs.$ladybug.addEventListener('touchstart', bs.shootTarget);
  bs.$ladybug.addEventListener('mousedown', bs.shootTarget);

};


bs.updateTargerPosition = (left, top) => {

  if (left === undefined) {

    // Values are limited to 80% of the viewport.
    left = Math.random() * 80;
    top  = Math.random() * 80;
  }

  // Minimum coords.
  left = Math.max(left, 20);
  top  = Math.max(top, 20);

  // Maximum coords.
  left = Math.min(left, 80);
  top  = Math.min(top, 80);

  bs.$target.style.transform = `translate(${left}vw, ${top}vh)`;

};


bs.refreshTarget = () => {

  bs.$target.classList.remove('boom');

  // Randomize target position.
  bs.updateTargerPosition();

};


bs.shootTarget = (event) => {

  event.preventDefault();

  bs.$target.classList.add('boom');

  // Increment score.
  bs.score++;
  bs.$score.textContent = bs.score;

  bs.audio.play();

  // Reinit position.
  setTimeout(function() {
    bs.refreshTarget();
  }, 500);

};


bs.start();
