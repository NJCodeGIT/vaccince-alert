Now we all check the Cowin portal from time to time to find vaccination slots in our area or district for us or parents.

Cowin provides public APIs, I'm have written a small NodeJS application (many of which are available in online as well). If you run it locally, it will continuously monitor the availability of the given district (based on the intervals within the code) and if found, the code will send details of those hospitals by date.

This is very basic coding, so you can customize it based on your need. To receive mail, you need to create an account in SendGrid and create an API key (to avoid storing passwords locally).

# Install Node JS

https://phoenixnap.com/kb/install-node-js-npm-on-windows

# Clone the code repository to local

# Install below npm packages (run each in command prompt under this code repository)
- npm install express node-cron
- npm install dotenv
- npm install --save @sendgrid/mail

# Create .env file and set below values

- SENDGRID_API_KEY = xxxxxxxxxxxxxxxxxyZ3QFfc
- DISTRICT_ID = 307
- FROM_EMAIL = niju.mn@live.com
- TO_EMAIL = niju.mn@live.com

# Run application

- node index

# For Reference

https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/

# Descriptors with their ranges:

Seconds (optional): 0 – 59
Minute: 0 – 59
Hour: 0 – 23
Day of the Month: 1 – 31
Month: 1 – 12
Day of the week: 0 – 7 (0 and 7 both represent Sunday)
Examples:

(*/10 * * * * *) – Runs on every 10 seconds
(*/10 * * * *) – Runs on every 10 minutes
(* * 21 * *) – Runs 21th of every month
(0 8 * * 1) – Runs 8 AM on every Monday

# To get district Id for Kerala

Please see districts.json file
(for others - Go to https://www.cowin.gov.in/home and from development console we can find it)


