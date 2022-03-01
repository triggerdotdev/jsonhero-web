import { useMemo } from "react";
import { Title } from "../Primitives/Title";

export type CalendarMonthProps = {
  date: Date;
};

type Day = {
  date: string;
  isCurrentMonth: boolean;
  isHighlighted: boolean;
};

function dateString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function isSameDay(date: Date, otherDate: Date): boolean {
  return (
    date.getFullYear() === otherDate.getFullYear() &&
    date.getMonth() === otherDate.getMonth() &&
    date.getDate() === otherDate.getDate()
  );
}

export function CalendarMonth({ date }: CalendarMonthProps) {
  const days = useMemo<Array<Day>>(() => {
    let days: Array<Day> = [];

    //create first day of the month
    const firstDayOfMonth = new Date(date);
    firstDayOfMonth.setDate(1);

    //if the first day isn't a monday, we need to add days from the previous month in
    const firstDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (firstDayOfWeek != 0) {
      const previousMonthDate = new Date(firstDayOfMonth);
      for (let index = 0; index < firstDayOfWeek; index++) {
        previousMonthDate.setDate(previousMonthDate.getDate() - 1);
        days.push({
          date: dateString(previousMonthDate),
          isCurrentMonth: false,
          isHighlighted: isSameDay(date, previousMonthDate),
        });
      }
    }

    //current month
    let currentMonthDate = new Date(firstDayOfMonth);
    const monthNumber = firstDayOfMonth.getMonth();
    while (true) {
      days.push({
        date: dateString(currentMonthDate),
        isCurrentMonth: true,
        isHighlighted: isSameDay(date, currentMonthDate),
      });

      currentMonthDate.setDate(currentMonthDate.getDate() + 1);

      if (currentMonthDate.getMonth() !== monthNumber) {
        break;
      }
    }

    //next month
    const lastDayOfMonthDayOfWeek = currentMonthDate.getDay() - 1;
    const nextMonthDayCount = 7 - lastDayOfMonthDayOfWeek;
    for (let index = 0; index < nextMonthDayCount; index++) {
      days.push({
        date: dateString(currentMonthDate),
        isCurrentMonth: false,
        isHighlighted: isSameDay(date, currentMonthDate),
      });
      currentMonthDate.setDate(currentMonthDate.getDate() + 1);
    }

    return days;
  }, [date]);

  return (
    <section className="">
      <Title className="text-left text-slate-800 dark:text-slate-400">
        {new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          hour12: true,
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }).format(date)}
      </Title>
      <div className="uppercase mt-2 grid text-center tracking-wider grid-cols-7 text-sm leading-6 text-gray-500 dark:text-slate-500">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm ring-1 cursor-default ring-slate-200 dark:ring-slate-600 dark:bg-slate-600">
        {days.map((day, dayIdx) => (
          <button
            key={day.date}
            type="button"
            className={`"cursor-default" ${classNames(
              day.isCurrentMonth
                ? "bg-white text-slate-900 dark:text-slate-300 dark:bg-slate-800"
                : "bg-slate-100 text-slate-400 dark:text-slate-500 dark:bg-slate-800 dark:bg-opacity-90",
              dayIdx === 0 && "rounded-tl-lg",
              dayIdx === 6 && "rounded-tr-lg",
              dayIdx === days.length - 7 && "rounded-bl-lg",
              dayIdx === days.length - 1 && "rounded-br-lg",
              "relative py-1.5 focus:z-10"
            )}`}
          >
            <time
              dateTime={day.date}
              className={classNames(
                day.isHighlighted && "bg-indigo-600 font-semibold text-white",
                "mx-auto flex h-7 w-7 items-center cursor-default justify-center rounded-full"
              )}
            >
              {day.date.split("-").pop()?.replace(/^0/, "")}
            </time>
          </button>
        ))}
      </div>
    </section>
  );
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
