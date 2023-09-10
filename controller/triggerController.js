export const recursiveTaskTrigger = (payload, result='') => {
    // const p = await new Promise((resolve, reject) => {
        try {
            const payloadArr = payload[0].split(/\n/);
            const noOfTasks = parseInt(payloadArr[1]);
            let initialInputRowStr = payloadArr[noOfTasks + 2];
            // let inputArr = payloadArr[noOfTasks + 2].split(',');
            // const inputObj = inputArr.reduce((accumaltor, currentIndex) => {
            //     accumaltor[currentIndex] = true;
            //     return accumaltor;
            // }, {});
            let hashMap = {}, byProductHashMap = {}, taskNo = 0, tasksTriggered = `${payloadArr[0]} `, tasksTriggeredObj={}, k = 0;
    
            // Creating hashmap of all task input vs {taskNo + output array}
            // i represents each task row
            for (let i = 2; i < noOfTasks + 2; i++) {
                // console.log('ITERATION NUMBER ::::: ', i);
                let taskValuesArr = payloadArr[i].split(';');

                // Iterating over input part of the task
                for (let k = 0; k < taskValuesArr[0].length; k++) {
                    // Adding each valid task input into a hashMap (ignoring commas)
                    if(parseInt(taskValuesArr[0][k]) || taskValuesArr[0][k] === '0')
                        hashMap[taskValuesArr[0][k]] = {
                            task: i - 2,
                            byProduct: taskValuesArr[1],
                        }
                }
            }
    
            // Now search each input value in the hash map
            while(k < initialInputRowStr.length) {
                if(hashMap[initialInputRowStr[k]]) {
                    // tasksTriggered += `${hashMap[initialInputRowStr[k]].task},`;
                    tasksTriggeredObj[hashMap[initialInputRowStr[k]].task] = true;
                    // Adding output of the value in respective task row to the initial list of inputs provided
                    initialInputRowStr += ',' + hashMap[initialInputRowStr[k]].byProduct;
                }
    
                k++;
            }
    
            tasksTriggered = Object.keys(tasksTriggeredObj).join(',')
            result += `${payloadArr[0]} ${tasksTriggered}\n\n`;
            console.log('Tasks triggered now :::: ', result);
    
            payload.shift();
            if (payload.length === 0)
                return result;
            else
                return recursiveTaskTrigger(payload, result);
        } catch (error) {
            console.log('Error during recursion :::::: ', error);
        }
    }
    // ).then((promiseResult) => {
    //     console.log('SOMIL 1 ::::::: ', promiseResult);
    //     // return Promise.resolve(promiseResult);
    //     return promiseResult;
    // });

//     return p;
// }

export const testFun = async (result) => {
         return result = 'Somil';
}