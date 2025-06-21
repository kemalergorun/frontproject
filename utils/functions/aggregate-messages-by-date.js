export const aggregateMessagesByDate = (messages) => {
  if (!Array.isArray(messages) || messages.length === 0) return [];

  const aggregation = messages.reduce((acc, message) => {
    if (message && message.date) {
      acc[message.date] = (acc[message.date] || 0) + 1;
    }

    return acc;
  }, {});

  const sortedAggregatedData = Object.entries(aggregation).sort(
    (a, b) => new Date(a[0]) - new Date(b[0])
  );

  return sortedAggregatedData;
};
