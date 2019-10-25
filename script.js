const bs = {}

/**
 * Set up
 */
bs.$container = document.querySelector('.bs');
bs.$start = bs.$container.querySelector('.bs__start');
bs.$score = bs.$container.querySelector('.bs__score-value');
bs.$targets = bs.$container.querySelector('.bs__targets');
bs.$target = bs.$container.querySelector('.bs__target');
bs.score = 0;
bs.audio = new Audio('shoot.mp3');

bs.start = () => {

  // Create target.
  const $start = document.querySelector('.bs__start');

  // Listen to click.
  $start.addEventListener('click', () => {

    // Hide the start button / Show the counter.
    bs.$container.classList.add('bs__is-playing')

    bs.setTarget();
  });

}


bs.setTarget = () => {

  // Randomize target scale.
  // const scale = Math.random() + 1;
  // $target_item.style.transform = `scale(${scale})`;

  // Randomize target position.
  const left = Math.random() * 90;
  const top  = Math.random() * 90;
  bs.$target.style.transform = `translate(${left}vw, ${top}vh)`;

  // Listen to click.
  bs.$target.addEventListener('click', () => {
    bs.shootTarget();
  });

}


bs.refreshTarget = () => {

  bs.$target.classList.remove('boom');

  const $target_item =bs.$target.querySelector('span');

  // Randomize target position.
  const left = Math.random() * 90;
  const top  = Math.random() * 90;
  bs.$target.style.transform = `translate(${left}vw, ${top}vh)`;

}

bs.shootTarget = () => {

  bs.$target.classList.add('boom');

  // Increment score.
  bs.score++;
  bs.$score.textContent = bs.score;

  bs.audio.play();

  // Reinit position.
  setTimeout(function() {
    bs.refreshTarget();
  }, 500);

}


bs.start();
