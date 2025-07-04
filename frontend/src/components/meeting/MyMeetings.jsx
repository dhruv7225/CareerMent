import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useState } from "react";

export default function MyMeetings() {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const id = authUser._id;
  const { data: connectionRequests, isLoading, isError, refetch } = useQuery({
    queryKey: ["Meetings"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/meeting/${id}/all`);
        return response.data;
      } catch (error) {
        console.error("Error fetching meetings:", error);
        return [];
      }
    },
    enabled: !!authUser,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  if (isLoading) {
    return <Box>Loading meetings...</Box>;
  }

  if (isError) {
    return <Box>Error loading meetings. Please try again later.</Box>;
  }

  const meetings = connectionRequests || [];
  console.log(meetings);

  const handleDelete = async (meetingId) => {
    try {
      await axiosInstance.delete(`/meeting/${meetingId}`);
      alert("Meeting deleted successfully!");
      refetch(); // refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete meeting.");
    }
  };

  const handleUpdateDialogOpen = (meeting) => {
    setSelectedMeeting(meeting);
    setNewDate(meeting.date);
    setNewTime(meeting.time);
    setOpenDialog(true);
  };

  const handleUpdate = async () => {
    if (!newDate || !newTime) return;

    try {
      await axiosInstance.put(`/meeting/${selectedMeeting.meetingId}`, {
        date: newDate,
        time: newTime,
      });
      alert("Meeting updated successfully!");
      setOpenDialog(false);
      refetch(); // refresh the list
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update meeting.");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Meeting ID</TableCell>
              <TableCell>Meeting Name</TableCell>
              {authUser.mentor ? (
                <TableCell>Student Name</TableCell>
              ) : (
                <TableCell>Mentor Name</TableCell>
              )}
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.length > 0 ? (
              meetings.map((meeting) => (
                <TableRow key={meeting.meetingId}>
                  <TableCell>{meeting.meetingId}</TableCell>
                  <TableCell>{meeting.meetingName}</TableCell>
                  {authUser.mentor ? (
                    <TableCell>{meeting.studentName}</TableCell>
                  ) : (
                    <TableCell>{meeting.mentorName}</TableCell>
                  )}
                  <TableCell>{meeting.date}</TableCell>
                  <TableCell>{meeting.time}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleUpdateDialogOpen(meeting)}
                      style={{ marginRight: "8px" }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(meeting.meetingId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No meetings available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Meeting Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Meeting</DialogTitle>
        <DialogContent>
          <TextField
            label="New Date"
            type="date"
            fullWidth
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: "16px" }}
          />
          <TextField
            label="New Time"
            type="time"
            fullWidth
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
