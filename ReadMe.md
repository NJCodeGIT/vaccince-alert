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

# npm packages
- npm install express node-cron
- npm install nodemailer
- npm install dotenv
- npm install --save @sendgrid/mail

# To get district Id for Kerala

Please see districts.json file

# SendGrid Access Key need to change in .env file for getting email 
