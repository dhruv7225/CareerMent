// import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";

// import  { useState } from "react";
// import CreateMeetingButtons from "../FormComponents/CreateMeetingButtons";
// import MeetingNameField from "../FormComponents/MeetingNameFIeld";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import dayjs from "dayjs";
// import { generateMeetingID } from "../../utils/generateMeetingId";
// import { useQuery } from "@tanstack/react-query";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "../../lib/axios";
// import toast from "react-hot-toast";
// import { useNavigate
//   ,useLocation } from "react-router-dom";

// export default function OneOnOneMeeting(){
//   const [meetingName,setMeetingName] = useState("");
//   const [selectedDate, setSelectedDate] = useState(dayjs("2024-12-7"));
//   const [selectedTime, setSelectedTime] = useState(dayjs('2022-04-17T15:30'));
//   const [meetingId,setMeetingId] = useState(generateMeetingID())
//   const queryClient = useQueryClient();
 
  
//   const { mutate: createMeetingMutation} = useMutation({
//   mutationFn: async (meetingData) => {
//     const res = await axiosInstance.post(`/meeting/create`,  meetingData, {
//       headers: { "Content-Type": "application/json" },
//     })
//     return res.data;
//   },
//   onSuccess: () => {
//     toast.success("meetings created successfully");
//     queryClient.invalidateQueries({ queryKey: ["meetings"] });
//   },
//   onError: (err) => {
//     toast.error(err.response.data.message || "Failed to create meeting");
//   },
// });
// const { data: authUser } = useQuery({ queryKey: ["authUser"] });

//   const navigate = useNavigate();
//   const location = useLocation();
//   // const {username} = useP
//   const {mentorName} = location.state ;
//     console.log(mentorName);
//     const { data: mentordata } = useQuery({
//       queryKey: ["authUser",mentorName],
//       queryFn: () => axiosInstance.get(`/users/${mentorName}`),
//     });
//     console.log(mentordata);
    
//     const studentName = authUser.username;

//     const handleMeetingCreation = async (e) => {
//       e.preventDefault()
//       try {
//         const date = selectedDate.format("YYYY-MM-DD");
//         const time = selectedTime.format("hh:mm A");
//         const meetingData = { mentorName,studentName,meetingName,date,time,meetingId };
//         console.log(meetingData)
//         createMeetingMutation({ mentorName,studentName,meetingName,date,time,meetingId });
//         navigate(`/profile/${authUser._id}/myMeetings`,{state: {username: authUser.username}});
//   } catch (error) {
//     console.error("Error in handleMeetingCreation:", error);
//   }
// };

// const availableDates = mentordata?.availability
// ?.filter((entry) => entry.timeSlots.some((slot) => !slot.booked))
// .map((entry) => entry.date) || [];
// console.log(availableDates);

// const availableTimes = mentordata?.availability?.reduce((acc, entry) => {
// const date = entry.date.toISOString().split("T")[0];
// acc[date] = entry.timeSlots
//   .filter((slot) => slot.booked)
//   .map((slot) => slot.startTime);
// return acc;
// }, {}) || {};
// console.log(availableTimes);

// const handleDateChange = (newDate) => {
//   try {
//     setSelectedDate(dayjs(newDate));
//   } catch (err) {
//     toast.error("Invalid date selected");
//   }
// };

//   return (
//       <div
//         style={{
//           display: "flex",
//           height: "50vh",
//           flexDirection: "column",
//         }}
//       >
     
//          <EuiFlexGroup justifyContent="center" alignItems="center">
//           <EuiForm>
//             <MeetingNameField
//               label="Meeting name"
//               placeholder="Meeting name"
//               value={meetingName}
//               setMeetingName={setMeetingName}
//             /> 
//             <EuiSpacer />
//             <MeetingNameField
//               label="Meeting code"
//               placeholder="Meeting Code"
//               value={meetingId}
//               onChange={(newValue) => {setMeetingId(newValue) }}
//             /> 
//           <EuiSpacer />
//            <DemoContainer components={['DatePicker']}>
//            <DatePicker
//            label="date pick"
//            defaultValue={selectedDate}
//          onChange={(newValue) => {setSelectedDate(newValue) }} />
//            </DemoContainer>
//            <EuiSpacer />
//            <DemoContainer components={['TimePicker']}>
//         <TimePicker defaultValue={selectedTime} onChange={(e) => {setSelectedTime(e)}} label="Basic time picker" />
//       </DemoContainer>

//             <EuiSpacer />
          
//           <CreateMeetingButtons 
//           createMeeting={handleMeetingCreation} />
//           </EuiForm> 
//         </EuiFlexGroup>
//       </div>
//     );
// }


import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
import { useState } from "react";
import CreateMeetingButtons from "../FormComponents/CreateMeetingButtons";
import MeetingNameField from "../FormComponents/MeetingNameFIeld";
import { generateMeetingID } from "../../utils/generateMeetingId";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

export default function OneOnOneMeeting() {
  const [meetingName, setMeetingName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [meetingId, setMeetingId] = useState(generateMeetingID());
  const queryClient = useQueryClient();

  const { mutate: createMeetingMutation } = useMutation({
    mutationFn: async (meetingData) => {
      const res = await axiosInstance.post(`/meeting/create`, meetingData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Meeting created successfully");
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      queryClient.invalidateQueries({ queryKey: ["mentorData"] }); // Refresh mentor data
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create meeting");
    },
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const navigate = useNavigate();
  const location = useLocation();
  const { mentorName } = location.state;

  const { data: mentordata, isLoading } = useQuery({
    queryKey: ["mentorData", mentorName],
    queryFn: () =>
      axiosInstance.get(`/users/${mentorName}`).then((res) => res.data),
  });

  const studentName = authUser?.username;

  // Extract available dates and times
  const availableDates =
    mentordata?.availability
      ?.filter((entry) =>
        entry.timeSlots.some((slot) => !slot.booked) // Only include dates with available slots
      )
      ?.map((entry) => dayjs(entry.date).format("YYYY-MM-DD")) || [];

  const availableTimes =
    mentordata?.availability?.find(
      (entry) => dayjs(entry.date).format("YYYY-MM-DD") === selectedDate
    )?.timeSlots
      .filter((slot) => !slot.booked) // Only include available slots
      ?.map((slot) => slot.startTime) || [];

  const handleMeetingCreation = async (e) => {
    e.preventDefault();
    try {
      const meetingData = {
        mentorName,
        studentName,
        meetingName,
        date: selectedDate,
        time: selectedTime,
        meetingId,
      };
      
      // Create the meeting
      await createMeetingMutation(meetingData);

      // Mark the selected time slot as booked in the backend
      await axiosInstance.patch(`/mentors/${mentorName}/availability`, {
        date: selectedDate,
        time: selectedTime,
        booked: true, // Mark the time slot as booked
      });

      // Navigate to the meetings page
      navigate(`/home/me`, {
        state: { username: authUser?.username },
      });
    } catch (error) {
      navigate(`/home/me`, {
        state: { username: authUser?.username },
      });
      console.error("Error in handleMeetingCreation:", error);
      // toast.error("Error creating meeting");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "flex",
        height: "50vh",
        flexDirection: "column",
      }}
    >
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          <EuiSpacer />
          <MeetingNameField
            label="Meeting Code"
            placeholder="Meeting Code"
            value={meetingId}
            onChange={(newValue) => setMeetingId(newValue)}
          />
          <EuiSpacer />

          {/* Date Dropdown */}
          <label>Date</label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          >
            <option value="" disabled>
              Select a date
            </option>
            {availableDates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>
          <EuiSpacer />

          {/* Time Dropdown */}
          <label>Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            disabled={!selectedDate}
          >
            <option value="" disabled>
              Select a time
            </option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
          <EuiSpacer />

          <CreateMeetingButtons createMeeting={handleMeetingCreation} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}
