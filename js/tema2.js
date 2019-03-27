const latura = 7;
const perimetru = latura * 3;
const aria = Math.pow(latura, 2) * Math.sqrt(3) / 4; //l^2 * radical din 3/4
console.log(perimetru, aria.toFixed(2));

// ======================================

const l1 = 2;
const l2 = 2;
const l3 = 2;
const l4 = 2;

if (l1 === l2 && l2 === l3 && l3 === l4) {
  console.log("patrat"); //instructiune
  var test = 3;
} else if (l1 === l3 && l2 === l4) {
  console.log("dreptunghi");
} else {
  console.log("necunoscut");
}

if (l1 == l2 == l3 == l4) {
  console.log("patrat");
}

//============================================
string1 = "Acesta este Stringul 1    ";
string2 = "   acesta este Stringul  2   ";
string3 = string1.toUpperCase();
let result = string1.toUpperCase() + string2.toLowerCase();
result = result.trim();
console.log(string1);
console.log(string3);

//====================================================
const string4 = "Cursul Dungeon Explorer o sa devina mai FuN dupa ce invatam JS Basics";
// string4.toLowerCase() -> cursul dungeon explorer o sa devina mai fun dupa ce invatam
if (string4.toLowerCase().includes("fun")) {
  console.log("e fun");
} else {
  console.log("nu e fun");
}

if (string4.toLowerCase().includes("boring")) {
  console.log("e boring");
} else {
  console.log("nu e boring");
}

// ==================================================
const fructe = ['banane', 'mere', 'portocale', 'struguri'];
// [ 'portocale - 0', 'mere - 1', 'struguri - 2', 'banane -3']
[fructe[0], fructe[2]] = [fructe[2], fructe[0]];
[fructe[3], fructe[2]] = [fructe[2], fructe[3]];
console.log(fructe);
let a = 2;
let b = 3;
[a, b] = [b, a];

console.log(a, b);