import { useEffect, useLayoutEffect, useState } from "react";
import { useGetTasksMutation } from "../../redux/taskApi";
import { TaskComponent } from "./TaskComponent";

export const MainComponent = () => {
    const [getTasks, {data, isSuccess, isLoading}] = useGetTasksMutation();
    const [countOfDays, setCountOfDays] = useState(3);

    let day = 0;

    const currentDate = new Date();
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
                for (let counter = 1; counter <= count; counter++) {
                    if (new Date(currentDate).setDate(currentDate.getDate() + counter) > new Date(elem.expiredDate)) {
                        const [hours, minutes, seconds] = new Date(elem.expiredDate).toLocaleTimeString().split(":");
                        const newElement = {
                            ...elem,
                            expiredTime: `${hours}:${minutes}`
                        }
                        if (elem.type === "task") {
                            resultList[counter-1].unshift(newElement);
                        } else {
                            resultList[counter-1].push(newElement);
                        }
                        break;
                    }
                }
            }
        });

        for (let i = 0; i < resultList.length; i++) {
            resultList[i] = resultList[i].sort((a,b) => new Date(a.expiredDate) - new Date(b.expiredDate));
        }

        return resultList;
    }
    const sortDates = (countOfDays) => {
        const arr = [];

        for (let i = 0; i < countOfDays; i++) {
            const date = new Date(currentDate).setDate(currentDate.getDate()+i);
            arr[i] = new Date(date).getDate();
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
                            <div className="day-box__container">
                                <div className="day-headline">{arrWithDate[day++]}</div>
                                <div className="day-list">
                                    { taskList.length <= 0 ? <>List is empty</> : 
                                    taskList.map(taska => <TaskComponent task={taska}/>)}
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