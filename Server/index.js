var mysql = require("mysql2");
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const { google } = require("googleapis");
require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
  google_client_id,
  google_client_secret,
  "https://meetease.netlify.app"
);

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// const createDB = "CREATE DATABASE IF NOT EXISTS meetingsdb;
// db.query(createDB, (err, results) => {
//   if (err) {
//     console.log("DB not created");
//   }
//   console.log("DB created or already exists");
// });

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/get-meetings-data", (req, res) => {
  const { user_email } = req.body;
  db.query(
    `SELECT * FROM information_schema.tables WHERE table_schema = '${process.env.MYSQL_DB}' AND table_name = 'meetings'`,
    (err, table) => {
      if (err) {
        console.log(err);
        return;
      }
      if (table.length > 0) {
        db.query(
          "SELECT mid,meeting_name,date_created,meeting_details FROM meetings WHERE host_email=? ORDER BY id DESC",
          [user_email],
          (err, data) => {
            if (err) {
              console.log("Error:", err);
              return;
            }
            res.json(data);
          }
        );
      } else {
        return res.json([]);
      }
    }
  );
});

app.post("/create-table", (req, res) => {
  const createTableQ =
    "CREATE TABLE IF NOT EXISTS meetings(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,mid VARCHAR(255),host_name VARCHAR(255),host_email VARCHAR(255),meeting_name VARCHAR(255),date_created VARCHAR(255),date_time_slots JSON,meeting_details JSON)";

  db.query(createTableQ, (err, _) => {
    if (err) {
      console.log("Error:", err);
      return;
    }
    console.log("Meetings Table is created!");
  });

  const { meeting_name, host_name, host_email, timeslots, meetingDetails } =
    req.body;

  var date_created = new Date().toLocaleString();
  var meetingID = uuidv4();
  db.query(
    "INSERT INTO meetings (mid,host_name,host_email,meeting_name,date_created,date_time_slots,meeting_details) VALUES (?,?,?,?,?,?,?)",
    [
      meetingID,
      host_name,
      host_email,
      meeting_name,
      date_created,
      JSON.stringify(timeslots),
      JSON.stringify(meetingDetails),
    ],
    (err, _) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(meetingID);
    }
  );
});

app.post("/availability", (req, res) => {
  const { meeting_id } = req.body;
  db.query(
    "SELECT meeting_name,host_name,host_email,date_time_slots,meeting_details FROM meetings WHERE mid = ?",
    [meeting_id],
    (err, data) => {
      if (err) {
        console.log("No meeting found!");
        return;
      }
      res.json(data);
    }
  );
});

app.post("/create-token", async (req, res) => {
  const { code } = req.body;
  const response = await oauth2Client.getToken(code);
  const { tokens } = response;
  const refreshtoken = tokens.refresh_token;
  oauth2Client.setCredentials(tokens);
  const googleAuth = google.oauth2({
    version: "v2",
    auth: oauth2Client,
  });

  const googleUserInfo = await googleAuth.userinfo.get();

  const host_email = googleUserInfo.data.email;

  res.json(googleUserInfo.data);

  db.query(
    "CREATE TABLE IF NOT EXISTS tokens(host_email VARCHAR(255) PRIMARY KEY,refresh_token VARCHAR(255))",
    (err, _) => {
      if (err) {
        console.log("Error:", err);
        return;
      }
      console.log("Tokens Table is created!");
    }
  );

  db.query(
    "INSERT IGNORE INTO tokens VALUES (?,?)",
    [host_email, refreshtoken],
    (err, _) => {
      if (err) {
        console.log(err);
        res.json("Error");
        return;
      }
    }
  );
});

app.post("/create-event-and-update-timeslots", (req, res) => {
  const {
    user_name,
    user_email,
    user_phone,
    host_email,
    selectedSlot,
    meeting_name,
    meeting_id,
    timeslots,
  } = req.body;

  db.query(
    "SELECT refresh_token from tokens WHERE host_email=?",
    [host_email],
    (err, refreshToken) => {
      if (err) {
        console.log("Error:", err);
        return;
      }
      var REFRESH_TOKEN = refreshToken[0]["refresh_token"];
      oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
      const calender = google.calendar("v3");
      const response = calender.events.insert({
        auth: oauth2Client,
        calendarId: "primary",
        sendNotifications: true,
        requestBody: {
          summary: `Meeting Title: ${meeting_name} with ${user_name}`,
          description: `Attendee Name: ${user_name} \n Attendee Mobile: ${user_phone} \n Attendee Email: ${user_email}`,
          start: {
            dateTime: new Date(selectedSlot.startTime),
          },
          end: {
            dateTime: new Date(selectedSlot.endTime),
          },
          attendees: [
            {
              email: user_email,
            },
          ],
        },
      });
    }
  );

  db.query(
    "UPDATE meetings SET date_time_slots=? WHERE mid=?",
    [JSON.stringify(timeslots), meeting_id],
    (err, _) => {
      if (err) {
        res.json("Error");
        console.log("Error: ", err);
        return;
      }
      console.log("Timeslots updated!!");
    }
  );
});

app.post("/updateTimeslots", (req, res) => {
  const { meeting_id, meeting_name, timeslots } = req.body;

  db.query(
    "UPDATE meetings SET meeting_name=?,date_time_slots=? WHERE mid=?",
    [meeting_name, JSON.stringify(timeslots), meeting_id],
    (err, _) => {
      if (err) {
        res.json("Error");
        console.log("Error: ", err);
        return;
      }
      console.log("Timeslots updated!!");
    }
  );
});

app.post("/delete-meeting", (req, res) => {
  const { meeting_id } = req.body;

  db.query("DELETE FROM meetings WHERE mid=?", [meeting_id], (err, _) => {
    if (err) {
      res.json("Error");
      console.log("Error: ", err);
      return;
    }
    console.log("Meeting Deleted!!");
  });
});

app.listen(2000);
