// Complete the below questions using this array:
const array = [
  {
    username: "john",
    team: "red",
    score: 5,
    items: ["ball", "book", "pen"]
  },
  {
    username: "becky",
    team: "blue",
    score: 10,
    items: ["tape", "backpack", "pen"]
  },
  {
    username: "susy",
    team: "red",
    score: 55,
    items: ["ball", "eraser", "pen"]
  },
  {
    username: "tyson",
    team: "green",
    score: 1,
    items: ["book", "pen"]
  },

];

//Create an array using forEach that has all the usernames with a "!" to each of the usernames
let result = [];
array.forEach((user)=>{
  result.push(`${user.username}!`);
});

//Create an array using map that has all the usernames with a "? to each of the usernames
let result2 = array.map((user)=>{
  return `${user.username}?`;
}); 

//Filter the array to only include users who are on team: red
let result3 = array.filter((user)=>{
  return user.team === "red";
});

//Find out the total score of all users using reduce
let result4 = array.reduce((acc, user)=>{
  return acc + user.score;
}, 0);

// (1), what is the value of i? index of element
// (2), Make this map function pure:
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
	// console.log(num, i);
	// alert(num);
	return num * 2;
})

//BONUS: create a new list with all user information, but add "!" to the end of each items they own.
let result5 = array.map((user)=>{
  user.items = user.items.map((item)=>{
    return `${item}!`;
  });
  return user;
});
