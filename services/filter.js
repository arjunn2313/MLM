const getDateRange = (interval) => {
  const now = new Date();
  let startDate, dateFormat, fullRange = [];

  if (interval === "week") {
    startDate = new Date(now.setDate(now.getDate() - now.getDay())); // Start of the week (Sunday)
    dateFormat = "%w"; // Group by day of the week (0 = Sunday, 6 = Saturday)

    // Full week from Monday (1) to Sunday (0)
    fullRange = [
      { label: "Mon", salesAmount: 0 },
      { label: "Tue", salesAmount: 0 },
      { label: "Wed", salesAmount: 0 },
      { label: "Thu", salesAmount: 0 },
      { label: "Fri", salesAmount: 0 },
      { label: "Sat", salesAmount: 0 },
      { label: "Sun", salesAmount: 0 }
    ];

  } else if (interval === "month") {
    startDate = new Date(now.setDate(now.getDate() - 30)); // Last 30 days
    dateFormat = "%U"; // Group by week number of the year

    // Full month with weeks labeled as "Week 1", "Week 2", etc.
    fullRange = Array.from({ length: 5 }, (_, i) => ({ label: `Week ${i + 1}`, salesAmount: 0 }));

  } else if (interval === "yearly") {
    startDate = new Date(now.getFullYear(), 0, 1); // Start of the year
    dateFormat = "%m"; // Group by month number (01-12)

    // Full year with months labeled by name
    fullRange = [
      { label: "Jan", salesAmount: 0 },
      { label: "Feb", salesAmount: 0 },
      { label: "Mar", salesAmount: 0 },
      { label: "Apr", salesAmount: 0 },
      { label: "May", salesAmount: 0 },
      { label: "Jun", salesAmount: 0 },
      { label: "Jul", salesAmount: 0 },
      { label: "Aug", salesAmount: 0 },
      { label: "Sep", salesAmount: 0 },
      { label: "Oct", salesAmount: 0 },
      { label: "Nov", salesAmount: 0 },
      { label: "Dec", salesAmount: 0 }
    ];

  } else {
    throw new Error("Invalid interval");
  }

  return { startDate, dateFormat, fullRange };
};

// Modified formatSalesData to handle missing weeks or months for month and yearly intervals
const formatSalesData = (salesData, interval, fullRange) => {
  if (interval === "week") {
    // Map day number (0-6) to day name (Mon-Sun)
    const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Map sales data to corresponding days
    const salesByDay = salesData.reduce((acc, data) => {
      const dayName = dayMap[parseInt(data._id, 10)];
      acc[dayName] = data.totalAmount;
      return acc;
    }, {});

    // Ensure all days (Mon-Sun) are represented with 0 sales for missing days
    return fullRange.map(day => ({
      day: day.label,
      amount: salesByDay[day.label] || 0
    }));

  } else if (interval === "month") {
    // Map week number (0-4) to "Week 1", "Week 2", etc.
    const salesByWeek = salesData.reduce((acc, data) => {
      const weekNumber = `Week ${parseInt(data._id, 10) + 1}`;
      acc[weekNumber] = data.totalAmount;
      return acc;
    }, {});

    // Ensure all weeks are represented with 0 sales for missing weeks
    return fullRange.map(week => ({
      week: week.label,
      amount: salesByWeek[week.label] || 0
    }));

  } else if (interval === "yearly") {
    // Map month number (01-12) to month names
    const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const salesByMonth = salesData.reduce((acc, data) => {
      const monthName = monthMap[parseInt(data._id, 10) - 1]; // Convert month number to name
      acc[monthName] = data.totalAmount;
      return acc;
    }, {});

    // Ensure all months are represented with 0 sales for missing months
    return fullRange.map(month => ({
      month: month.label,
      amount: salesByMonth[month.label] || 0
    }));
  }
};

  module.exports = {getDateRange,formatSalesData};
