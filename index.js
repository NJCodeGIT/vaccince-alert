const cron = require("node-cron");
const express = require("express");
const https = require('https')
const sgMail = require('@sendgrid/mail');

require('dotenv').config()

app = express(); // Initializing app

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
var today = dd + '-' + mm + '-' + yyyy;

const options = {
  hostname: 'cdn-api.co-vin.in',
  port: 443,
  // path: '/api/v2/appointment/sessions/public/calendarByPin?pincode=695023&date=04-05-2021',
  path: `/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${process.env.DISTRICT_ID}&date=${today}`,
  method: 'GET'
}

// Creating a cron job which runs on every 10 second
cron.schedule("*/5 * * * * *", function () {
  console.log("running a task every 1 minute");

  const req = https.request(options, res => {

    try {
      console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
          var emailBody = "";

          try {
            var slotResult = JSON.parse(d);
          }
          catch(err) {
            console.log(err);
          }          

          if (slotResult != undefined && slotResult.centers != undefined)
          {
              slotResult.centers.forEach(center => {
                  if (center.sessions != undefined)
                  {
                    center.sessions.forEach(session => {
                        if (session.available_capacity > 0)
                        {
                          emailBody += `<p><strong>${session.vaccine}</strong> is available for <strong>${center.fee_type}</strong></p>`;
                          emailBody += `<p><strong>Location&nbsp; </strong>: ${center.pincode} || ${center.name} ||  ${center.address} || ${center.block_name}</p>`;
                          emailBody += `<p><strong>Date&nbsp; &nbsp; &nbsp; &nbsp; </strong>: ${session.date}.</p>`;
                          emailBody += `<p><strong>Slot&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong>: ${session.available_capacity}.</p>`;
                          emailBody += `<p>-----------------------------------------------------------------------------------------------</p>`;
                          emailBody += `<p>&nbsp;</p>`;

                          console.log(emailBody);
                        }
                    });
                  }
              });
          }

          if (emailBody != "")
          {
            const msg = {
              to: `${process.env.TO_EMAIL}`, // Change to your recipient
              from: `${process.env.FROM_EMAIL}`, // Change to your verified sender
              subject: 'Co-WIN Slot Availability Alert',
              text: 'Co-WIN Slot Availability Alert',
              html: emailBody,
            }
  
            sgMail.send(msg).then(() => {
              console.log('Email sent!!!!!!!!!!!!!!!!!!!!');
            }).catch((error) => {
              console.error(error);
            });
          }
          else
          {
            console.log(`Email not sent`);
          }

        })
    }
    catch (err) {
      console.log(err);
    }


  })

  req.on('error', error => {
    console.error(error)
  })

  req.end()

});

app.listen();
