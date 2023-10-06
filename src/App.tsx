import React from "react";
import { DateTime } from "luxon";

function App() {
  const [timeMessage, setTimeMessage] = React.useState<string>("");
  const [userTimeZone, setUserTimeZone] = React.useState<string | null>("");

  console.log(userTimeZone, "User Time Zone");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetch(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${
            Date.now() / 1000
          }&key=YOUR_GOOGLE_API_KEY`,
        )
          .then((response) => response.json())
          .then((data) => {
            setUserTimeZone(data.timeZoneId);

            const currentTime = DateTime.now().setZone(data.timeZoneId);

            if (currentTime.hour >= 6 && currentTime.hour < 12) {
              setTimeMessage("Good morning Emeka! 🌞");
            } else if (currentTime.hour >= 12 && currentTime.hour < 18) {
              setTimeMessage("Good afternoon Emeka! 🌞");
            } else {
              setTimeMessage("Good evening Emeka! 🌆🌙");
            }
          })
          .catch((error) => {
            console.error("Error fetching timezone data:", error);
          });
      },
      (error) => {
        console.error("Error getting user's location:", error);
      },
    );
  }, []);

  return (
    <div>
      <p>User's Timezone: {userTimeZone}</p>
      <p>{timeMessage}</p>
    </div>
  );
}

export default App;
