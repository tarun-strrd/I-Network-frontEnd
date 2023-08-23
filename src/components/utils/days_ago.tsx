const getTimeAgo = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = Math.abs(
    currentDate.getTime() - createdDate.getTime()
  ); // in milliseconds

  const seconds = Math.floor(timeDifference / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = Math.floor(timeDifference / (1000 * 60));
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

export default getTimeAgo;
