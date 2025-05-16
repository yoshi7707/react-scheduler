import { useCallback, useMemo, useState } from "react";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import "@bitnoi.se/react-scheduler/dist/style.css";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // ✅ Import the plugin
dayjs.extend(isBetween); // ✅ Extend dayjs with the plugin


export default function Component() {
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Define isLoading state

  // const [range, setRange] = useState({
  //   startDate: new Date(),
  //   endDate: new Date()
  // });

  const [range, setRange] = useState({
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-12-31")
  });
  

  const handleRangeChange = useCallback((range: any) => {
    setRange(range);
  }, []);

  // Filtering events that are included in current date range
  // Example can be also found on video https://youtu.be/9oy4rTVEfBQ?t=118&si=52BGKSIYz6bTZ7fx
  // and in the react-scheduler repo App.tsx file https://github.com/Bitnoise/react-scheduler/blob/master/src/App.tsx
  const filteredMockedSchedulerData = mockedSchedulerData.map((person) => ({
        ...person,
        data: person.data.filter(
          (project) =>
            // we use "dayjs" for date calculations, but feel free to use library of your choice
            dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
            dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
            (dayjs(project.startDate).isBefore(range.startDate, "day") &&
              dayjs(project.endDate).isAfter(range.endDate, "day"))
        )
      }))

      console.log("Filtered data:", filteredMockedSchedulerData);

  return (
    <section>
      <Scheduler
        data={filteredMockedSchedulerData}
        isLoading={isLoading}
        onRangeChange={handleRangeChange}
        onTileClick={(clickedResource) => console.log(clickedResource)}
        onItemClick={(item) => console.log(item)}
        onFilterData={() => {
          // Some filtering logic...
          setFilterButtonState(1);
        }}
        onClearFilterData={() => {
          // Some clearing filters logic...
          setFilterButtonState(0)
        }}
        config={{
          zoom: 0,
          filterButtonState,
        }}
      />
    </section>
  );
}

const mockedSchedulerData: SchedulerData = [
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
    label: {
      icon: "https://picsum.photos/24",
      title: "佐藤由紀子",
      subtitle: "Frontend Developer"
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2025-05-17T15:31:24.272Z"),
        endDate: new Date("2025-05-28T10:28:22.649Z"),
        occupancy: 3600,
        title: "Project A",
        subtitle: "Subtitle A",
        description: "array indexing Salad West Account",
        bgColor: "rgb(33, 161, 173)"
      },
      {
        id: "22fbe237-6344-4c8e-affb-64a1750f33bd",
        startDate: new Date("2025-05-23T08:16:31.123Z"),
        endDate: new Date("2025-06-13T00:00:23.582Z"),
        occupancy: 2852,
        title: "映画「ドラゴン・ハート」",
        subtitle: "シャンバラ",
        description: "地獄界探訪",
        bgColor: "rgb(42, 150, 73)"
      },
      {
        id: "3601c1cd-f4b5-46bc-8564-8c983919e3f5",
        startDate: new Date("2023-03-30T22:25:14.377Z"),
        endDate: new Date("2023-09-01T07:20:50.526Z"),
        occupancy: 1800,
        title: "Project C",
        subtitle: "Subtitle C",
        bgColor: "rgb(254,165,177)"
      },
      {
        id: "b088e4ac-9911-426f-aef3-843d75e714c2",
        startDate: new Date("2023-10-28T10:08:22.986Z"),
        endDate: new Date("2023-10-30T12:30:30.150Z"),
        occupancy: 11111,
        title: "Project D",
        subtitle: "Subtitle D",
        description: "Garden heavy an software Metal",
        bgColor: "rgb(254,165,177)"
      },
      {
        id: "b088e4ac-9911-426f-aef3-843d75e714c2",
        startDate: new Date("2025-05-16T10:08:22.986Z"),
        endDate: new Date("2025-05-18T12:30:30.150Z"),
        occupancy: 33333,
        title: "買い物",
        subtitle: "🍊",
        description: "Garden heavy an software Metal",
        bgColor: "rgb(76, 63, 171)"
      }
    ]
  }
];

