export const CalendarEvent = ({ event }: { event: any }) => {
    const { title, user } = event;

    return (
        <>
            <h6>{user.name}</h6>
            <span>{title}</span>
        </>
    );
};
