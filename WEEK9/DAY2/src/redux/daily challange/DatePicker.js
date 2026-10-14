// DatePicker.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDay } from "./store";

function DatePicker() {
  const dispatch = useDispatch();
  const selectedDay = useSelector(state => state.selectedDay);

  return (
    <input
      type="date"
      value={selectedDay}
      onChange={(e) => dispatch(setDay(e.target.value))}
    />
  );
}

export default DatePicker;
