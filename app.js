import { drawLevel01 } from "./levels/Level01.js";
import { drawLevel02 } from "./levels/Level02.js";

let level = 1;

export function setNewLevel() {
  level += 1;
  initiateNewLevel();
}

function initiateNewLevel() {
  if (level === 1) {
    drawLevel01();
  } else if (level === 2) {
    drawLevel02();
  }
}

drawLevel01();
