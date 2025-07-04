import { EuiFieldText, EuiFormRow } from "@elastic/eui";

function MeetingNameField({
  label,
  isInvalid,
  error,
  placeholder,
  value,
  setMeetingName,
}) {
  return (
  
      <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
        <EuiFieldText
          placeholder={placeholder}
          value={value}
          onChange={(e) => setMeetingName(e.target.value)}
          isInvalid={isInvalid}
        />
      </EuiFormRow>
  );
}

export default MeetingNameField;
