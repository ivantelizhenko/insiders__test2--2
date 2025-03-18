import { useSchedule } from '../store/ScheduleContext';
import Button from './Button';
import Container from './Container';

function List() {
  const { events, removeEvent, setEditedEvent } = useSchedule();

  function handleRemove(id: string) {
    removeEvent(id);
  }

  function handleEdit(id: string) {
    setEditedEvent(id);
  }

  return (
    <Container className="bg-red-300">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ">
        <table className="table text-[2rem]">
          <thead className="text-[2rem]">
            <tr className="bg-amber-100">
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map(({ title, description, date, status, id }) => (
              <tr key={id} className="hover:bg-gray-300">
                <td>{title}</td>
                <td>{description}</td>
                <td>{date}</td>
                <td>{status}</td>
                <td className="flex gap-[2px]">
                  <Button
                    className="bg-gray-100 "
                    onClick={() => handleRemove(id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="bg-gray-100 "
                    onClick={() => handleEdit(id)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default List;
