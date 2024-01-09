import { useEffect, useLayoutEffect, useState } from "react";
import { useGetTasksMutation } from "../../redux/taskApi";
import { element } from "prop-types";

export const MainComponent = () => {
    const [getTasks, {data, isSuccess, isLoading}] = useGetTasksMutation();
    const [countOfDays, setCountOfDays] = useState(3);

    let day = 0;

    const currentDate = new Date("2024-01-08");
    currentDate.setHours(0,0,0,0);

    useEffect(() => {
        getTasks();
    }, []);

    var listOfTasks = [];

    if (isSuccess) {
        listOfTasks = data.tasks || [];
    }


    const sort = (list, count) => {
        const resultList = [];

        let counter = 0;
        do {
            resultList[counter] = [];
            counter++;
        } while (counter < count)

        

        list.forEach(elem => {
            if (currentDate <= new Date(elem.expiredDate) ) {
                if (new Date(currentDate).setDate(currentDate.getDate() + 1)) {
                    const [hours, minutes, secunds] = new Date(elem.expiredDate).toLocaleTimeString().split(":");
                    const newElement = {
                        ...elem,
                        expiredTime: `${hours}:${minutes}`
                    }
                    if (element.type === "task") {
                        resultList[0].unshift(newElement);
                    } else {
                        resultList[0].push(newElement);
                    }
                } else if (new Date(currentDate).setDate(currentDate.getDate() + 2)) {
                    if (element.type === "task") {
                        resultList[1].unshift(elem);
                    } else {
                        resultList[1].push(elem);
                    }
                } else if (new Date(currentDate).setDate(currentDate.getDate() + 3)) {
                    if (element.type === "task") {
                        resultList[2].unshift(elem);
                    } else {
                        resultList[2].push(elem);
                    }
                } else if (new Date(currentDate).setDate(currentDate.getDate() + 4)) {
                    if (element.type === "task") {
                        resultList[3].unshift(elem);
                    } else {
                        resultList[3].push(elem);
                    }
                } else if (new Date(currentDate).setDate(currentDate.getDate() + 5)) {
                    if (element.type === "task") {
                        resultList[4].unshift(elem);
                    } else {
                        resultList[4].push(elem);
                    }
                } else if (new Date(currentDate).setDate(currentDate.getDate() + 6)) {
                    if (element.type === "task") {
                        resultList[5].unshift(elem);
                    } else {
                        resultList[5].push(elem);
                    }
                } else if (new Date(currentDate).setDate(currentDate.getDate() + 7)) {
                    if (element.type === "task") {
                        resultList[6].unshift(elem);
                    } else {
                        resultList[6].push(elem);
                    }
                }
                
            }
        });
        return resultList;
    }
    const sortDates = (countOfDays) => {
        const arr = [];
        let day = new Date().getDate();
        for (let counter = 1; counter <= countOfDays; counter++) {
            arr.push(day);
            day++;
        }
        return arr;
    }
    const sortedListOfTask = sort(listOfTasks, countOfDays);
    const arrWithDate = sortDates(countOfDays);


    return (
        <main className="main">
            <div className="main__container">
                <h1>Main Page</h1>
                <div className="control-panel">
                    <button className="button" onClick={e => setCountOfDays(1)}>Today</button>
                    <button className="button" onClick={e => setCountOfDays(3)}>3 Days</button>
                    <button className="button" onClick={e => setCountOfDays(7)}>7 Days</button>
                </div>
                {
                    isLoading ? <>Loading...</> :
                    <div className="content-block">
                    {sortedListOfTask.map(taskList => 
                        <div className="day-box">
                            {/* {console.log(taskList)} */}
                            <div className="day-box__container">
                                <div className="day-headline">{arrWithDate[day++]}</div>
                                <div className="day-list">
                                    { taskList.length <= 0 ? <>List is empty</> : 
                                    taskList.map(taska => 
                                        <div className="task-container">
                                            {/* const d = taska.expiredDate */}
                                            <div className="task-text">{taska.text}</div>
                                            {
                                                taska.type === "task" ? 
                                                <input type="checkbox" name="" id="" /> :
                                                <div className="exp-time">{taska.expiredTime}</div>
                                            }
                                        </div>   
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                }
            </div>
        </main>
    );
}