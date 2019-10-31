const bs = {}

/**
 * Set up
 */
bs.$body = document.querySelector('body');
bs.$container = document.querySelector('.bs');
bs.$start = bs.$container.querySelector('.bs__start');
bs.$score = bs.$container.querySelector('.bs__score-value');
bs.$target = bs.$container.querySelector('.bs__target');
bs.score = 0;
bs.audio = new Audio('shoot.mp3');

bs.start = () => {

  // Create target.
  const $start = bs.$start;

  // Listen to click.
  $start.addEventListener('click', () => {

    // Hide the start button / Show the counter.
    bs.$container.classList.add('bs__is-playing')

    bs.setTarget();
  });


  // Avoid screen draging.
  bs.$body.addEventListener('touchstart', (event) => {
    bs.$container.classList.add('bs__is-dragging')
    event.stopPropagation();
  });

  bs.$body.addEventListener('touchmove', (event) => {
    bs.$container.classList.add('bs__is-dragging')
    event.stopPropagation();
  });

  bs.$body.addEventListener('touchend', (event) => {
    bs.$container.classList.add('bs__is-dragging')
    event.stopPropagation();
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
  bs.$target.addEventListener('touchstart', bs.shootTarget);
  bs.$target.addEventListener('mousedown', bs.shootTarget);

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
