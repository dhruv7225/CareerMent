import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

const Availability = ({ userData, isOwnProfile, onSave }) => {
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    setCurrentTime({ hours, minutes });
  }, []);

  
  const normalizeDate = (date) => {
    const offset = date.getTimezoneOffset();
    const normalizedDate = new Date(date.getTime() - offset * 60 * 1000);
    return normalizedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const generateTimeSlotsForToday = () => {
    const slots = [];
    let startHour = currentTime.hours;
    let startMinute = currentTime.minutes;

    if (startMinute % 30 !== 0) {
      startMinute = Math.ceil(startMinute / 30) * 30;
      if (startMinute === 60) {
        startMinute = 0;
        startHour += 1;
      }
    }

    for (let hour = startHour; hour < 24; hour++) {
      const minutesOptions = [0, 30];
      for (let minute of minutesOptions) {
        if (hour === startHour && minute < startMinute) {
          continue; 
        }
        const timeString =` ${hour}:${minute < 10 ? "0" + minute : minute}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  
  const generateTimeSlotsForFutureDays = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      const minutesOptions = [0, 30];
      for (let minute of minutesOptions) {
        const timeString = `${hour}:${minute < 10 ? "0" + minute : minute}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const generateTimeSlots = () => {
    if (!date) return [];
    const selectedDate = new Date(date);
    const today = new Date();

    if (normalizeDate(selectedDate) === normalizeDate(today)) {
      return generateTimeSlotsForToday();
    } else {
      return generateTimeSlotsForFutureDays();
    }
  };

  const availableTimeSlots = generateTimeSlots();

  const addTimeSlot = () => {
    if (timeSlot) {
      setTimeSlots([...timeSlots, timeSlot]);
      setTimeSlot("");
    }
  };

  const addAvailability = () => {
    if (date && timeSlots.length > 0) {
      setAvailability([
        ...availability,
        {
          date: normalizeDate(date), // Format date as YYYY-MM-DD
          timeSlots: timeSlots.map((time) => ({ startTime: time })),
        },
      ]);
      setDate(null);
      setTimeSlots([]);
    }
  };

  const handleSave = () => {
    onSave({ availability });
  };

  
  const today = new Date();

  const highlightDates = availability.map((entry) => entry.date);

  return (
    isOwnProfile && (
      <div className="max-w-md mx-auto p-4 mt-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Manage Availability</h2>

        {/* Calendar Component */}
        <div className="mb-4">
          <label className="block mb-2">Select a Date:</label>
          <Calendar
            value={date}
            onChange={setDate}
            minDate={today} // Disable past dates
            tileClassName={({ date, view }) => {
              if (highlightDates.includes(normalizeDate(date))) {
                return "bg-green-200"; 
              }
            }}
          />
        </div>

        {/* Time Slot Input */}
        <div className="mb-4">
          <label className="block mb-2">Start Time:</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <option value="">Select a Time Slot</option>
            {availableTimeSlots.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
          <button
            onClick={addTimeSlot}
            className="mt-2 py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            Add Time Slot
          </button>
        </div>

        <div className="mb-4">
          <h4 className="text-medium font-bold mb-2">Time Slots:</h4>
          <ul>
            {timeSlots.map((time, index) => (
              <li key={index} className="text-sm text-gray-700 mb-2">
                {time}
              </li>
            ))}
          </ul>
        </div>

        {/* Add Availability */}
        <button
          onClick={addAvailability}
          className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          Add Availability
        </button>

        {/* Save Changes */}
        <button
          onClick={handleSave}
          className="py-2 px-4 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
        >
          Save Changes
        </button>

        {/* Display Availability */}
        <div className="mt-4">
          <h3 className="text-medium font-bold mb-4">Availability:</h3>
          {availability.map((entry, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <strong className="text-sm font-bold mb-2">Date:</strong> {entry.date}
              <ul>
                {entry.timeSlots.map((slot, i) => (
                  <li key={i} className="text-sm text-gray-700 mb-2">
                    {slot.startTime}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Availability;
