export const formatTime = (fullTimeString: string): string => {
  const [hours, minutes] = fullTimeString.split(':');
  const paddedHours = hours.padStart(2, '0');
  const paddedMinutes = minutes.padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
};

export const getDateAndTime = (data?: any) => {
  if (data) {
    const formattedData = data.replace(' ', 'T');

    const d = new Date(formattedData);
    const day = d.toLocaleDateString([], { weekday: 'long' })
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const date = d.toLocaleDateString([], { month: 'long', day: 'numeric', year: "numeric" })
    return { dayOfWeek: day, date, time };
  }
  const d = new Date();
  const currentDay = d.toLocaleDateString([], { weekday: 'long' })
  const currentTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const currentDate = d.toLocaleDateString([], { month: 'long', day: 'numeric' })

  return { dayOfWeek: currentDay, date: currentDate, time: currentTime };
}

// export const getDateAndTime = (data?: string) => {
//   let d;

//   if (data) {
//     // Convert the provided format to a standard ISO format
//     const formattedData = data.replace(' ', 'T');
//     d = new Date(formattedData);
//   } else {
//     d = new Date();
//   }

//   // Ensure date is valid
//   if (isNaN(d.getTime())) {
//     throw new Error('Invalid date');
//   }

//   const day = d.toLocaleDateString([], { weekday: 'long' });
//   const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
//   const date = d.toLocaleDateString([], { month: 'long', day: 'numeric' });

//   return { dayOfWeek: day, date, time };
// }

export const extractTextFromHtml = (htmlString: any) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

