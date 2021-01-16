import YatzyFactory from '../src/entities/Yatzy'
import dummyEventsEmitter from './infrastructure/dummyEventsEmitter';
const Yatzy = YatzyFactory(dummyEventsEmitter);

const yatzy = new Yatzy();

yatzy.joinPlayer('Piotrek32');
yatzy.joinPlayer('mixi_999');
yatzy.joinPlayer('maniana420');

//start game

console.log("turn", yatzy.getPlayers()[yatzy.getTurn()].name);
yatzy.throwDice([]);
console.log("dice: ", yatzy.getDice());
yatzy.throwDice([true, true, false, false, false]);
console.log("dice: ", yatzy.getDice());
console.log(yatzy.chooseRow(6));

console.log("turn", yatzy.getPlayers()[yatzy.getTurn()].name);
yatzy.throwDice([]);
console.log("dice: ", yatzy.getDice());
console.log(yatzy.chooseRow(4));

console.log("turn", yatzy.getPlayers()[yatzy.getTurn()].name);
yatzy.throwDice([]);
console.log("dice: ", yatzy.getDice());
console.log(yatzy.chooseRow(3));

console.log("turn", yatzy.getPlayers()[yatzy.getTurn()].name);
yatzy.throwDice([]);
console.log("dice: ", yatzy.getDice());
console.log(yatzy.chooseRow(4));

console.log(yatzy.getPlayers().find(el=> el.name === "Piotrek32"))