const validateInput = (value: string) => {
  if (!value) {
    return "Please, provide a search value";
  }
  if (!value.match(/^((\d{1,3}\.){3}\d{1,3})|(([A-z\d]+\.)+[A-z\d]+)$/)) {
    return "The value should be a valid IP address or a domain url";
  }
  return null;
};

export default validateInput;
