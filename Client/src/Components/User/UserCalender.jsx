import React from "react";
import useStyles from "./styles";
import { useState, useEffect } from "react";
import {
  ScheduleComponent,
  Week,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

const UserCalender = () => {
  const classes = useStyles();
  const [timeslots, setTimeSlots] = useState([]);
  const [meetingName, setMeetingName] = useState("");
  const [hostName, setHostName] = useState("");
  const [hostMail, setHostMail] = useState("");
  const [meetingFound, setMeetingFound] = useState(true);
  const [selectedSlot, setselectedSlot] = useState(null);
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [schedulerView, setSchedulerView] = useState(null);
  const [slotDuration, setSlotDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getAvailability(id);
  }, []);

  useEffect(() => {
    colorCells(timeslots);
  }, [timeslots]);

  setTimeout(() => {
    var changeViewBtns = document.getElementsByClassName("e-toolbar-item");
    for (var btn of changeViewBtns) {
      btn.addEventListener("click", () => {
        setTimeout(() => {
          colorCells(timeslots);
          var miniCalenderBtns = document.getElementsByClassName("e-calendar");
          for (var btn of miniCalenderBtns) {
            btn.addEventListener("click", () => {
              setTimeout(() => {
                colorCells(timeslots);
              }, 400);
            });
          }
        }, 400);
      });
    }
  }, 400);

  setTimeout(() => {
    var calendarContainer =
      document.getElementsByClassName("e-table-container");
    for (var ele of calendarContainer) {
      ele.addEventListener("touchend", (e) => {
        colorCells(timeslots);
      });
    }
  }, 400);

  const getAvailability = async (mid) => {
    var response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/availability`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meeting_id: mid,
        }),
      }
    );

    try {
      var data = await response.json();
      setMeetingFound(true);
      setMeetingName(data[0]["meeting_name"]);
      setTimeSlots(data[0]["date_time_slots"]);
      setSchedulerView(data[0]["meeting_details"]["scheduler_view"]);
      setSlotDuration(data[0]["meeting_details"]["slot_duration"]);
      setHostName(data[0]["host_name"]);
      setHostMail(data[0]["host_email"]);
      colorCells(data[0]["date_time_slots"]);
    } catch (err) {
      setMeetingFound(false);
      console.log("Error:", err);
    }

    setLoading(false);
  };

  const colorCells = (data) => {
    var week_view_slots = document.getElementsByClassName("e-work-hours");
    var month_view_slots = document.getElementsByClassName("e-work-days");

    const slotCells = [...week_view_slots, ...month_view_slots];

    for (const cell of slotCells) {
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
        cell.style.backgroundColor = "greenyellow";
      } else {
        cell.style.backgroundColor = "grey";
      }
    }
  };

  const handleCellClick = async (args) => {
    var cell = args.element;

    if (cell.style.backgroundColor != "greenyellow") {
      alert("Slot not available!!");
      return;
    }
    cell.style.cursor = "pointer";

    const startTime = new Date(args.startTime);
    const endTime = new Date(args.endTime);
    setselectedSlot({ startTime, endTime });
    var temp = timeslots.filter((slot) => {
      return (
        new Date(slot.startTime).toLocaleString() !=
          startTime.toLocaleString() &&
        new Date(slot.endTime).toLocaleString() != endTime.toLocaleString()
      );
    });
    setTimeSlots(temp);
  };

  const handlePopupOpen = (args) => {
    args.cancel = true;
  };

  const handleNext = async () => {
    try {
      setTimeout(() => {
        window.location.replace("/booked");
      }, 400);

      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/create-event-and-update-timeslots`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name: userName,
            user_phone: userPhone,
            user_email: userMail,
            host_email: hostMail,
            selectedSlot: selectedSlot,
            meeting_name: meetingName,
            meeting_id: id,
            timeslots: timeslots,
          }),
        }
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className={classes.main}>
        <Typography className={classes.title}>Loading...</Typography>
      </div>
    );
  }
  return (
    <>
      {meetingFound ? (
        <>
          {selectedSlot == null ? (
            <div className={classes.main}>
              <Typography className={classes.title}>
                Choose Your Time Slot
              </Typography>
              <Typography className={classes.subtitle}>
                Title: {meetingName}
              </Typography>
              <Typography className={classes.hostdetails}>
                Host: {hostName}({hostMail})
              </Typography>
              <ScheduleComponent
                width="100%"
                height="550px"
                workHours={{ highlight: true, start: "00:00", end: "23:59" }}
                workDays={[0, 1, 2, 3, 4, 5, 6]}
                eventSettings={{
                  dataSource: timeslots,
                }}
                currentView={schedulerView}
                cellClick={handleCellClick}
                showQuickInfo={false}
                popupOpen={handlePopupOpen}
              >
                <ViewsDirective>
                  <ViewDirective
                    option={schedulerView}
                    timeScale={{
                      enable: true,
                      interval: slotDuration,
                      slotCount: 1,
                    }}
                  />
                </ViewsDirective>
                <Inject services={[Week, Month]} />
              </ScheduleComponent>
            </div>
          ) : (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className={classes.form}
              >
                <Typography className={classes.title}>
                  Please enter your details
                </Typography>
                <input
                  placeholder="Your name"
                  className={classes.txtFld}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  value={userName}
                  required
                />
                <input
                  type="number"
                  placeholder="Mobile number"
                  className={classes.txtFld}
                  onChange={(e) => {
                    setUserPhone(e.target.value);
                  }}
                  value={userPhone}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={classes.txtFld}
                  onChange={(e) => {
                    setUserMail(e.target.value);
                  }}
                  value={userMail}
                  required
                />
                <Typography className={classes.msg}>
                  *Double-check your email—it's your ticket to the event!
                </Typography>
                <button type="submit" className={classes.nxtBtn}>
                  Next
                </button>
              </form>
            </div>
          )}
        </>
      ) : (
        <div className={classes.main}>
          <Typography className={classes.title}>Meeting Not Found!!</Typography>
        </div>
      )}
    </>
  );
};

export default UserCalender;
