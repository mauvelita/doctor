(() => {
  const entrance = document.getElementById("entrance");
  const screenEntrance = document.getElementById("screen-entrance");
  const screenNav = document.getElementById("screen-nav");
  if (!entrance || !screenEntrance || !screenNav) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const delay = reduceMotion ? 0 : 720;

  const showNav = () => {
    document.body.classList.add("is-entered");
    screenEntrance.classList.remove("is-active");
    screenEntrance.classList.add("is-leaving");
    screenNav.classList.add("is-active");

    window.setTimeout(() => {
      screenEntrance.classList.remove("is-leaving");
      screenEntrance.setAttribute("aria-hidden", "true");
      screenNav.setAttribute("aria-hidden", "false");
    }, delay);

    try {
      sessionStorage.setItem("theoden-entered", "1");
    } catch (_) {}
  };

  const entered = (() => {
    try {
      return sessionStorage.getItem("theoden-entered") === "1";
    } catch (_) {
      return false;
    }
  })();

  if (entered && location.hash !== "#enter") {
    screenEntrance.classList.remove("is-active");
    screenEntrance.setAttribute("aria-hidden", "true");
    screenNav.classList.add("is-active");
    screenNav.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-entered");
  }

  const enter = (event) => {
    if (event) event.preventDefault();
    if (document.body.classList.contains("is-entering") || document.body.classList.contains("is-entered")) {
      return;
    }
    document.body.classList.add("is-entering");
    window.setTimeout(showNav, reduceMotion ? 0 : 480);
  };

  entrance.addEventListener("click", enter);
  entrance.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      enter(event);
    }
  });

  entrance.addEventListener("pointerenter", () => entrance.classList.add("is-hover"));
  entrance.addEventListener("pointerleave", () => entrance.classList.remove("is-hover"));
})();
