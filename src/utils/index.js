export function print(item) {
  console.log(item);
  document.getElementById("app").innerHTML += `\n<b>${item}</b></br>`;
}

export default {
  print
};
