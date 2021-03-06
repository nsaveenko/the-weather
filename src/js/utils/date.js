export const convertTime = (timeValue) => {
  if (!timeValue) {
    return '';
  }
  return timeValue.substring(11, 16);
};

export const convertToWeekDay = (incorrectDate) => {
  if (!incorrectDate) {
    return '';
  }

  const date = new Date(incorrectDate);
  const options = {
    weekday: 'long',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
