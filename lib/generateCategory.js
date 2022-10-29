require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const response = openai.createCompletion({
//   model: "text-davinci-002",
//   prompt: `Categorize the following task into Movies/Film, Books, Restaurants/Cafes and Products: ${process.argv[2]}`, // this will be the task
//   temperature: 0,
//   max_tokens: 60,
// });

const getCategory = (task) => {
  return openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Categorize the following task into Film / Series, Books, Restaurants / Cafes / etc. and Products: ${task}`,
    temperature: 0,
    max_tokens: 60,
  });
};

module.exports = getCategory;

// response
//   .then(res => {
//     const categories = ['Movies/Film', 'Books', 'Restaurants/Cafes', 'Products'];
//     categories.forEach(category => {
//       if (res.data.choices[0].text.includes(category)) console.log(category); // this is be added to the task
//     });
//   })
//   .catch(err => console.log(err));
