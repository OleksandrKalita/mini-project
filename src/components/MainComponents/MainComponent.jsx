import { useEffect, useLayoutEffect, useState } from "react";
import { useGetTasksMutation } from "../../redux/taskApi";

export const MainComponent = () => {
    const [getTasks, {data, isSuccess, isLoading}] = useGetTasksMutation();

    const millisecondInDay = 86400000;

    const currentDate = new Date().toISOString().split("T")[0];
    

    useEffect(() => {
        getTasks();
    }, []);

    var listOfTasks = [];

    if (isSuccess) {
        listOfTasks = data.tasks || [];
    }

    const sort = (list) => {
        const resultList = [];

        resultList[0] = [];
        resultList[1] = [];
        resultList[2] = [];

        list.forEach(element => {

            if (new Date(element.expiredDate).getTime() >= new Date(currentDate).getTime()) {
                console.log(new Date(currentDate).getTime() + millisecondInDay > new Date(element.expiredDate).getTime());
                if (new Date(currentDate).getTime() + millisecondInDay > new Date(element.expiredDate).getTime()) {
                    resultList[0].push(element);
                    // console.log(new Date(element.expiredDate).toISOString().split("T")[0]);
                } else if (new Date(currentDate).getTime() + millisecondInDay*2 > new Date(element.expiredDate).getTime()) {
                    resultList[1].push(element);
                }
                
            }
        });
        // console.log(resultList);
        return resultList;
    }
    const arr = sort(listOfTasks);
    console.log(arr);

    return (
        <main className="main">
            <div className="main__container">
                <h1>Main Page</h1>

                <div className="control-panel"></div>
                <div className="con">
                    {
                        arr.map(element => 
                            <div className="content-box">
                                {
                                    element.length > 0 ? 
                                    element.map(elem => 
                                        <div className="day-box">
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