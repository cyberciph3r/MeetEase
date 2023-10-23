import React, { useEffect } from "react";
import useStyles from "./styles";
import { useState } from "react";
import {
  ScheduleComponent,
  Week,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { Typography } from "@material-ui/core";
import ShareLink from "../ShareLink/ShareLink";
import useStore from "../Zustand/zustand";
import BackHome from "../BackHome/BackHome";
import AppBarComponent from "../AppBar/AppBarComponent";

const Create = () => {
  const classes = useStyles();
  const [meetingID, setMeetingID] = useState(null);
  const [timeslots, setTimeSlots] = useState([]);
  const [meetingName, setMeetingName] = useState("Untitled");
  const [slotDuration, setSlotDuration] = useState(60);
  const [key, setKey] = useState(0);
  const [view, setView] = useState("Week");
  const { user } = useStore();

  useEffect(() => {
    var btns = document.getElementsByClassName("e-tbar-btn-text");
    for (var btn of btns) {
      if (btn.textContent == "Week") {
        btn.addEventListener("click", async () => {
          setView("Week");
        });
      }
      if (btn.textContent == "Month") {
        btn.addEventListener("click", async () => {
          setView("Month");
        });
      }
    }
  }, []);

  const handleNext = () => {
    var createMeeting = async () => {
      try {
        var response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/create-table`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              meeting_name: meetingName,
              host_name: user.name,
              host_email: user.email,
              timeslots: timeslots,
              meetingDetails: {
                scheduler_view: view,
                slot_duration: slotDuration,
              },
            }),
          }
        );

        try {
          var meeting_id = await response.json();
          setMeetingID(meeting_id);
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.log(error);
      }
    };

    createMeeting();
  };

  const handleCellClick = (args) => {
    const startTime = new Date(args.startTime);
    const endTime = new Date(args.endTime);

    const isAlreadySelected = timeslots.some(
      (slot) =>
        slot.startTime.toString() == startTime.toString() &&
        slot.endTime.toString() == endTime.toString()
    );

    if (isAlreadySelected) {
      setTimeSlots(
        timeslots.filter(
          (slot) =>
            slot.startTime.toString() != startTime.toString() &&
            slot.endTime.toString() != endTime.toString()
        )
      );
    } else {
      setTimeSlots([...timeslots, { startTime, endTime }]);
    }
    // console.log(timeslots);
  };

  useEffect(() => {
    colorCells(timeslots);
  }, [timeslots]);

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

  setTimeout(() => {
    var calendarContainer =
      document.getElementsByClassName("e-table-container");
    for (var ele of calendarContainer) {
      ele.addEventListener("touchend", (e) => {
        colorCells(timeslots);
      });
    }
  }, 400);

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
        cell.style.backgroundColor = "white";
      }
    }
  };

  const handlePopupOpen = (args) => {
    args.cancel = true;
  };

  if (user == null) {
    return <BackHome />;
  }
  return (
    <>
      {meetingID == null ? (
        <>
          <AppBarComponent />
          <div className={classes.main}>
            <div>
              <Typography className={classes.title}>
                Set your Availability
              </Typography>
              <div className={classes.setDiv}>
                <Typography className={classes.txt}>
                  Slot Duration in mins:{" "}
                </Typography>
                <input
                  type="number"
                  placeholder="mm"
                  className={classes.durationTextFld}
                  onChange={(e) => {
                    setSlotDuration(e.target.value);
                  }}
                  value={slotDuration}
                />
                <button
                  className={classes.durationBtn}
                  onClick={() => {
                    setKey(key + 1);
                    setView("Week");
                    setTimeSlots([]);
                  }}
                >
                  OK
                </button>
              </div>
            </div>

            <ScheduleComponent
              key={key}
              width="100%"
              height="550px"
              workHours={{ highlight: true, start: "00:00", end: "23:59" }}
              workDays={[0, 1, 2, 3, 4, 5, 6]}
              eventSettings={{
                dataSource: timeslots,
              }}
              cellClick={handleCellClick}
              showQuickInfo={false}
              popupOpen={handlePopupOpen}
            >
              <ViewsDirective>
                <ViewDirective
                  option="Week"
                  timeScale={{
                    enable: true,
                    interval: slotDuration,
                    slotCount: 1,
                  }}
                />
                <ViewDirective option="Month" />
              </ViewsDirective>
              <Inject services={[Week, Month]} />
            </ScheduleComponent>

            <form
              className={classes.form}
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              <input
                placeholder="Meeting Title"
                className={classes.txtFld}
                onChange={(e) => {
                  setMeetingName(e.target.value);
                }}
              />
              <input className={classes.txtFld} value={user.email} readOnly />
              <button type="submit" className={classes.nxtBtn}>
                Next
              </button>
            </form>
          </div>
        </>
      ) : (
        <ShareLink meetingid={meetingID} />
      )}
    </>
  );
};

export default Create;
