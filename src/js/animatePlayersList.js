export default function animatePlayersList(currentPosition, nextPosition, move, duration, width) {
  if (
    !(
      Number.isInteger(currentPosition) &&
      currentPosition > 0 &&
      Number.isInteger(nextPosition) &&
      nextPosition > 0
    )
  ) {
    return;
  }

  animate({
    duration,
    timing: makeEaseInOut(timing),
    draw(progress) {
      move(width * (currentPosition - 1 + progress * (nextPosition - currentPosition)));
    },
  });
}

function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

function timing(timeFraction) {
  return Math.pow(timeFraction, 3);
}

function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
