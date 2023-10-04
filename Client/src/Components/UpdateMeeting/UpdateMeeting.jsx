import React from "react";
import useStyles from "./styles";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ScheduleComponent,
  Week,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";

const UpdateMeeting = () => {
  const classes = useStyles();
  const [meetingID, setMeetingID] = useState(null);
  const [timeslots, setTimeSlots] = useState([]);
  const [meetingName, setMeetingName] = useState("");
  const [meetingFound, setMeetingFound] = useState(false);
  const alert = useAlert();
  const { id, view, slot_duration } = useParams();

  useEffect(() => {
    getAvailability(id);
    setMeetingID(id);
  }, []);

  var changeViewBtns = document.getElementsByClassName("e-tbar-btn-text");

  for (var btn of changeViewBtns) {
    btn.addEventListener("click", () => {
      getAvailability(id);
    });
  }

  const getAvailability = async (mid) => {
    var response = await fetch("http://localhost:2000/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meeting_id: mid,
      }),
    });

    try {
      var data = await response.json();
      setMeetingFound(true);
      setMeetingName(data[0]["meeting_name"]);
      setTimeSlots(data[0]["date_time_slots"]);
      colorCells(data[0]["date_time_slots"]);
    } catch (err) {
      setMeetingFound(false);
      console.log("Error:", err);
    }
  };
  const colorCells = (data) => {
    const week_view = document.getElementsByClassName("e-work-hours");
    const month_view = document.getElementsByClassName("e-work-days");
    const headerCells = [...week_view, ...month_view];

    const backgroundColor = "greenyellow";
    const textColor = "white";

    for (const cell of headerCells) {
      cell.style.cursor = "pointer";
      var data_date = cell.getAttribute("data-date");
      const timestamp = parseInt(data_date, 10);
      var date = new Date(timestamp);
      // console.log(date.toLocaleString());

      if (data == null) {
        return;
      }

      const isAvailable = data.some(
        (slot) =>
          new Date(slot.startTime).toLocaleString() == date.toLocaleString()
      );
      if (isAvailable) {
        cell.style.backgroundColor = backgroundColor;
        cell.style.color = textColor;
      } else {
        cell.style.backgroundColor = "white";
      }
    }
  };

  const handleCellClick = (args) => {
    args.element.style.backgroundColor =
      args.element.style.backgroundColor == "greenyellow"
        ? "white"
        : "greenyellow";

    const startTime = new Date(args.startTime);
    const endTime = new Date(args.endTime);

    const isAlreadySelected = timeslots.some(
      (slot) =>
        new Date(slot.startTime).toLocaleString() ==
          startTime.toLocaleString() &&
        new Date(slot.endTime).toLocaleString() == endTime.toLocaleString()
    );

    if (isAlreadySelected) {
      var temp = timeslots.filter(
        (slot) =>
          new Date(slot.startTime).toLocaleString() !=
            startTime.toLocaleString() &&
          new Date(slot.endTime).toLocaleString() != endTime.toLocaleString()
      );
      setTimeSlots(temp);
    } else {
      setTimeSlots([...timeslots, { startTime, endTime }]);
    }
  };

  const handlePopupOpen = (args) => {
    args.cancel = true;
  };

  const handleSave = async () => {
    try {
      await fetch("http://localhost:2000/updateTimeslots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meeting_id: meetingID,
          meeting_name: meetingName,
          timeslots: timeslots,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!meetingFound) {
    return (
      <div className={classes.main}>
        <Typography className={classes.title}>Meeting Not Found!!</Typography>
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <input
        className={classes.txtFld}
        placeholder="Meeting Title"
        onChange={(e) => {
          setMeetingName(e.target.value);
        }}
        value={meetingName}
      />
      <ScheduleComponent
        width="100%"
        height="550px"
        workHours={{ highlight: true, start: "00:00", end: "23:59" }}
        workDays={[0, 1, 2, 3, 4, 5, 6]}
        eventSettings={{
          dataSource: timeslots,
        }}
        currentView={view}
        cellClick={handleCellClick}
        showQuickInfo={false}
        popupOpen={handlePopupOpen}
      >
        <ViewsDirective>
          <ViewDirective
            option="Week"
            timeScale={{ enable: true, interval: slot_duration, slotCount: 1 }}
          />
          <ViewDirective option="Month" />
        </ViewsDirective>
        <Inject services={[Week, Month]} />
      </ScheduleComponent>
      <Link
        to="/dashboard"
        className={classes.saveBtn}
        onClick={() => {
          handleSave();
          alert.success("Saved!");
        }}
      >
        <Typography>Save</Typography>
      </Link>
    </div>
  );
};

export default UpdateMeeting;
