import React, { useState } from 'react';
import './member.css';

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(new Date());

    const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    let date = 1;

    let calendarRows = [];
    for (let i = 0; i < 6; i++) {
      let rowCells = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          rowCells.push(<td key={j}></td>);
        } else if (date <= daysInMonth) {
          rowCells.push(<td key={j}>{date}</td>);
          date++;
        } else {
          rowCells.push(<td key={j}></td>);
        }
      }
      calendarRows.push(<tr key={i}>{rowCells}</tr>);
    }

    return calendarRows;
  };

  const handlePrevMonthClick = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonthClick = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const calendarRows = generateCalendar();

  return(

    <div className="container">
                <div className="calendar-container">
                  <div className="calendar">
                    <table className='calendar-buttons'>
                      <tr>
                      <td>
                          <button className='no-border-button' onClick={handlePrevMonthClick}>◀</button>
                        </td>
                    <td>
                    <h2 id="calendar-header">
                      {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                    </h2>
                    </td>
                    <td>
                          <button className='no-border-button' onClick={handleNextMonthClick}>▶</button>
                        </td>
                      </tr>
                    </table>
                    <table>
                      <thead>
                        <tr>
                          <th>일</th>
                          <th>월</th>
                          <th>화</th>
                          <th>수</th>
                          <th>목</th>
                          <th>금</th>
                          <th>토</th>
                        </tr>
                      </thead>
                      <tbody id="calendar-body">{calendarRows}</tbody>
                    </table>
                  </div>
                </div>
              </div>
  );

};

export default Calendar;