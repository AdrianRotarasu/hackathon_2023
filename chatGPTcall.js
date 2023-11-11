import {config} from "dotenv";
config();

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.BUGMAKERS_KEY,
}); 

const question = "Give me 3 names of dogs."

const getResponse = async () => {

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": question}],
  });
  console.log(chatCompletion.choices[0].message.content);

}

getResponse();