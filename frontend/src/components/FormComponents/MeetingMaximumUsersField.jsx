import { EuiFieldNumber, EuiFormRow } from "@elastic/eui";

function MeetingMaximumUsersField({
  value,
  setSize,
}) {
  return (
    <EuiFormRow label="Maximum People">
      <EuiFieldNumber
        min={1}
        max={50}
        placeholder="Maximum People"
        value={value}
        onChange={(e) => {
          if (!e.target.value.length || parseInt(e.target.value) === 0)
            setSize(1);
          else if (parseInt(e.target.value) > 50) setSize(50);
          else setSize(parseInt(e.target.value));
        }}
      />
    </EuiFormRow>
  );
}

export default MeetingMaximumUsersField;
