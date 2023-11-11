import { config } from "dotenv";
config();
import txtToPDF from './pdfToText.cjs';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.BUGMAKERS_KEY,
});

const getResponse = async () => {
  try {
    // Await the async function to get the data
    console.log("try1");
    let dataToSend = await txtToPDF('C:/Users/adria/Downloads/regimul-national-comunist-in-romania.pdf');
    
    // Ensure dataToSend is a string and then get the first 1000 characters
    if (typeof dataToSend === 'string') {
      const dataToSend2 = dataToSend.split(0, 1000);
      console.log(dataToSend2)
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": dataToSend2}],
      });
      console.log(chatCompletion.choices[0].message.content);
    } else {
      console.error('Extracted data is not a string.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

getResponse();