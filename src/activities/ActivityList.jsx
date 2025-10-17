import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList() {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteActivity(token, id);
      syncActivities();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          {activity.name}
          {token && (
            <button
              onClick={() => {
                handleDelete(activity.id);
              }}
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
