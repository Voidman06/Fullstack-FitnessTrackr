import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export async function DeleteActivity(id, token) {
  if (!token) {
    console.warn("No token found. User not logged in.");
    return;
  }

  try {
    const response = await fetch(`/api/activities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw Error("Failed to delete activity. Is it deleted already?");
  } catch (error) {
    console.error(error);
  }
}

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

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          {activity.name}
          {token && (
            <button action={DeleteActivity(activity.id, token)}>Delete</button>
          )}
        </li>
      ))}
    </ul>
  );
}
