/* eslint-disable import/no-anonymous-default-export */
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require("fs");

// const pdfDocument = fs.readFileSync("./pages/api/dummy.pdf");

const pathToAttachment = "./pages/api/dummy.pdf";
const attachment = fs.readFileSync(pathToAttachment).toString("base64");

const msg = {
  to: { email: "henrik.sissener@noaignite.com", name: "henke" },
  from: "hws902@gmail.com", // Use the email address or domain you verified above
  subject: "Sending with Twilio SendGrid is Fun 3",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  attachments: [
    {
      content: attachment,
      filename: "dummy.pdf",
      type: "application/pdf",
      disposition: "attachment",
    },
  ],
};

const message = {
  from: {
    email: "hws902@gmail.com",
    name: "Example Order Confirmation",
  },
  replyTo: {
    email: "hws902@gmail.com",
    name: "Example Customer Service Team",
  },
  subject: "Your Example Order Confirmation",
  content: [
    {
      type: "text/html",
      value:
        "<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>",
    },
  ],
  //   attachments: [
  //     {
  //       content:
  //         "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==",
  //       filename: "index.html",
  //       type: "text/html",
  //       disposition: "attachment",
  //     },
  //   ],
  //   categories: ["cake", "pie", "baking"],
  //   mailSettings: {
  //     bypassListManagement: {
  //       enable: false,
  //     },
  //     footer: {
  //       enable: false,
  //     },
  //     sandboxMode: {
  //       enable: false,
  //     },
  //   },
  //   trackingSettings: {
  //     clickTracking: {
  //       enable: true,
  //       enableText: false,
  //     },
  //     openTracking: {
  //       enable: true,
  //       substitutionTag: "%open-track%",
  //     },
  //     subscriptionTracking: {
  //       enable: false,
  //     },
  //   },
};

export default (req, res) => {
  console.log(req);
  //   const body = JSON.parse(req.body);

  //   const msg = `
  //     Name: ${body.name}\r\n
  //     Email: ${body.email}\r\n
  //     Message: ${body.message}
  //   `;

  //   const data = {
  //     to: "hws902@gmail.com",
  //     from: "henrik.sissener@noaignite.com",
  //     subject: "New message from website",
  //     text: message,
  //     html: message.replace(/\n/g, "<br>"),
  //   };

  sgMail.send(msg).then(
    (e) => {
      console.log("wohoo!");
      console.log(e);
      res.status(200).json({ status: "Ok" });
    },
    (error) => {
      console.log("oh noo :(");
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    },
  );

  //   mail.send(data);
  //   res.status(200).json({ status: "Ok" });
};
