require('dotenv').config({debug:true});
// create a Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


// client.messages
//   .create({
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: process.env.RECIEVER_PHONE_NUMBER,
//     body: 'Hello from Twilio!',
//   })
//   .then((message) => console.log(message.sid, message.status))
//   .catch((error) => console.error(error));


async function sendSMS(obj) {
//     // Define a function to calculate the next occurrence of the scheduled time
function getNextFridayDate() {
  const now = new Date();
  const daysUntilFriday = 5 - now.getDay(); // 5 represents Friday (0 is Sunday, 1 is Monday, etc.)
  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + daysUntilFriday);
  nextFriday.setHours(8, 30, 0, 0); // Set the time to 8:30 AM

  // Check if the calculated time is in the past (e.g., it's currently Friday after 8:30 AM)
  if (nextFriday < now) {
    nextFriday.setDate(nextFriday.getDate() + 7); // Move to the next Friday
  }

  return nextFriday;
}

// Calculate the next scheduled time
const sendWhen = getNextFridayDate();


  let mes = await client.messages.create({
    body: obj.message,
    from: process.env.TWILIO_MESSAGING_SERVICE_SID,
    to: obj.ph,
    scheduleType: 'fixed',
    sendAt: sendWhen.toISOString(),
  });
  console.log(mes.sid);
}

sendSMS({
  message:
    'Jummah Mubarak to my Muslim sisters and brothers! May Allah accept our prayers and guide us to the straight path. May He forgive our sins and bless us with good health, wealth, and happiness. May He unite us all under His banner and help us to spread the message of peace and love.  Note: Have a very nice day Mummy.',
  ph: process.env.RECIEVER_PHONE_NUMBER,
});