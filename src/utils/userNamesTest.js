// const faker = require('faker');
const words = ['hello', 'kitten', 'wow', 'bacon', 'sally', 'jimmy'];

const userNameGenerator = () => {
  let userName = words[Math.floor(Math.random()*words.length)];
  return userName;
}

export default userNameGenerator;
