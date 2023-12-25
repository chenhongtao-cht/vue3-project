export const hours = getStrNumList(0, 23);

export const minutes = getStrNumList(0, 59);

export const seconds = getStrNumList(0, 59);

function getStrNumList(min, max) {
  return new Array(max - min + 1).fill(0).map((_, i) => (i + min).toString().padStart(2, '0'));
}
