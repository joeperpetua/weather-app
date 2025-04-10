export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const timezoneToGMT = (timezone: string) => {
  const date = new Date();
  const formatter = Intl.DateTimeFormat('en', { timeZone: timezone, timeZoneName: 'short' });
  const parts = formatter.formatToParts(date);

  const offset = parts.find(part => part.type === 'timeZoneName')?.value.split('GMT')[1];

  return offset !== undefined ? offset : null;
}

export const getLocalTimeTimezone = (timezone: string, date: Date = new Date()) => {
  // 'en' locale, 'u' extension, 'hc' key for hourCycle, 'h23' value (0-23)
  const formatter = new Intl.DateTimeFormat('en-u-hc-h23', { 
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric'
  });
  const time = formatter.format(date).split(':');
	
  return {'hour': parseInt(time[0]), 'minute': parseInt(time[1])}
};

/**
* Returns the suffix for the day, e.g. "st", "nd", "rd", or "th"  
*/
export const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return "th";

  const lastDigit = day % 10;
  return lastDigit === 1 ? "st" :
         lastDigit === 2 ? "nd" :
         lastDigit === 3 ? "rd" : "th";
};

/** 
* Takes a date string in ISO format and returns a string in the format "Day Month"
*/
export const formatPrettyDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  return `${day}${getDaySuffix(day)} ${month}`;
};