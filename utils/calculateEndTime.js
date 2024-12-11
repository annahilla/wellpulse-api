export const calculateEndTime = (start, duration) => {
    const [hours, minutes] = start.split(':').map(Number);

    let totalMinutes = hours * 60 + minutes + duration;

    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    const formattedHours = String(newHours).padStart(2, '0');
    const formattedMinutes = String(newMinutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
};