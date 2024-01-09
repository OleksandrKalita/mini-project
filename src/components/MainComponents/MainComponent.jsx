import { useEffect, useLayoutEffect, useState } from "react";
import { useGetTasksMutation } from "../../redux/taskApi";

export const MainComponent = () => {
    const [getTasks, {data, isSuccess, isLoading}] = useGetTasksMutation();
    const [countOfDays, setCountOfDays] = useState(3);

    const millisecondInDay = 86400000;

    const currentDate = new Date().toISOString().split("T")[0];

    useEffect(() => {
        getTasks();
    }, []);

    var listOfTasks = [];

    if (isSuccess) {
        listOfTasks = data.tasks || [];
    }

    const sort = (list, count) => {
        const resultList = [];

        // resultList[0] = [];
        // resultList[1] = [];
        // resultList[2] = [];
        let counter = 0;
        do {
            resultList[counter] = [];
            counter++;
        } while (counter < count)

        list.forEach(element => {

            if (new Date(element.expiredDate).getTime() >= new Date(currentDate).getTime()) {
                if (new Date(currentDate).getTime() + millisecondInDay > new Date(element.expiredDate).getTime() && countOfDays >= 1) {
                    resultList[0].push(element);
                } else if (new Date(currentDate).getTime() + millisecondInDay*2 > new Date(element.expiredDate).getTime() && countOfDays >= 2) {
                    resultList[1].push(element);
                } else if (new Date(currentDate).getTime() + millisecondInDay*3 > new Date(element.expiredDate).getTime() && countOfDays >= 3) {
                    resultList[2].push(element);
                } else if (new Date(currentDate).getTime() + millisecondInDay*4 > new Date(element.expiredDate).getTime() && countOfDays >= 4) {
                    resultList[3].push(element);
                } else if (new Date(currentDate).getTime() + millisecondInDay*5 > new Date(element.expiredDate).getTime() && countOfDays >= 5) {
                    resultList[4].push(element);
                } else if (new Date(currentDate).getTime() + millisecondInDay*6 > new Date(element.expiredDate).getTime() && countOfDays >= 6) {
                    resultList[5].push(element);
                } else if (new Date(currentDate).getTime() + millisecondInDay*7 > new Date(element.expiredDate).getTime() && countOfDays >= 7) {
                    resultList[6].push(element);
                }
                
            }
        });
        return resultList;
    }
    const arr = sort(listOfTasks, countOfDays);

    return (
        <main className="main">
            <div className="main__container">
                <h1>Main Page</h1>

                <div className="control-panel">
                    <button onClick={event => setCountOfDays(1)}>today</button>
                    <button onClick={event => setCountOfDays(3)}>3 days</button>
                    <button onClick={event => setCountOfDays(7)}>7 days</button>
                </div>
                <div className="con">
                    {   
                        isLoading ? <div className="">loading...</div> :
                        arr.map(element => 
                            <div className="content-box">
                                {
                                    element.length > 0 ? 
                                    element.map(elem => 
                                        <div className="day-box" key={elem._id}>
                                            <div className="box-date">{elem.expiredDate}</div>
                                            <ul className="box-list">
                                                <li className="list-item">{elem.text}</li>
                                            </ul>
                                        </div>
                                    ) : 
                                    <div className="">list is empty</div>
                                }
                            </div>
                    )}
                </div>

            </div>
        </main>
    );
}

// today , 3 days, 7 days
// morning - evening
// task or evet - type