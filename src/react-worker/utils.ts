export function genId() {
  return Math.random().toString(35).slice(2);
}

export function getTime(date?: Date) {
  const d = date || new Date();
  return `${d.getFullYear()}-${d.getMonth() +
    1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
}
