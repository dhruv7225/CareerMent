import { EuiComboBox, EuiFormRow } from "@elastic/eui";

function MeetingUserField({
  label,
  isInvalid,
  error,
  options,
  onChange,
  selectedOptions,
  singleSelection = false,
  isClearable,
  placeholder,
}) {
  return (
    <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
      <EuiComboBox
        options={options}
        onChange={onChange}
        selectedOptions={selectedOptions}
        singleSelection={singleSelection}
        isClearable={isClearable}
        placeholder={placeholder}
        isInvalid={isInvalid}
      />
    </EuiFormRow>
  );
}

export default MeetingUserField;
