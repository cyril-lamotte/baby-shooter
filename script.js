const bs = {}

/**
 * Set up
 */
bs.$container = document.querySelector('.bs');
bs.$start = bs.$container.querySelector('.bs__start');
bs.$score = bs.$container.querySelector('.bs__score-value');
bs.$targets = bs.$container.querySelector('.bs__targets');
bs.score = 0;


bs.start = () => {

  // Create target.
  const $start = document.querySelector('.bs__start');

  // Listen to click.
  $start.addEventListener('click', () => {

    // Hide the start button.
    $start.remove();
    bs.addTarget();
  });

}


/**
 * Methods
 */
bs.addTarget = () => {

  // Create target.
  const $target = document.createElement('button');
  $target.classList.add('bs__target');
  $target.classList.add('bs__anim-1');

  const $target_item = document.createElement('span');
  $target_item.innerHTML = 'Touche-moi !';

  // Randomize target scale.
  const scale = Math.random() + 1;
  $target_item.style.transform = `scale(${scale})`;

  // Randomize target position.
  const left = Math.random() * 90;
  const top  = Math.random() * 90;
  $target.style.transform = `translate(${left}vw, ${top}vh)`;

  bs.$targets.appendChild($target);
  $target.appendChild($target_item);

  // Listen to click.
  $target.addEventListener('click', () => {
    bs.shootTarget($target);
  });

}

bs.shootTarget = (_$target) => {

  // Delete target.
  _$target.remove();

  // Add new target.
  bs.addTarget();

  // Increment score.
  bs.score++;
  bs.$score.textContent = bs.score;

}


bs.start();
