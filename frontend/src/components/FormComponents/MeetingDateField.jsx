import { EuiDatePicker } from "@elastic/eui";

function MeetingDateField({ selected, setStartDate }) {
  return (
    <EuiDatePicker
      selected={selected}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
}
export default MeetingDateField;
