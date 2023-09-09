export const recursiveTaskTrigger = async (payload, result) => {
    try {
        if (payload.length === 0)
            return result;

        const payloadArr = payload[0].split(/\n/);
        const noOfTasks = parseInt(payloadArr[1]);
        let initialInputRowStr = payloadArr[noOfTasks + 2];
        // let inputArr = payloadArr[noOfTasks + 2].split(',');
        // const inputObj = inputArr.reduce((accumaltor, currentIndex) => {
        //     accumaltor[currentIndex] = true;
        //     return accumaltor;
        // }, {});
        let hashMap = {}, byProductHashMap = {}, taskNo = 0, tasksTriggered = '', k = 0;
        // let i = 0, j = 2;

        // Creating hashmap of all task input vs {taskNo + output array}
        // i represents each task row
        for (let i = 2; i < noOfTasks + 2; i++) {
            console.log('ITERATION NUMBER ::::: ', i);
            let taskValuesArr = payloadArr[i].split(';');
            // if(taskValuesArr[0].indexOf())
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

        // i represents index of each input, j represents each task row
        // while( i <inputArr.length ) {
        //     payloadArr[j].search(``);
        // }
        // for(let j = 2, i = 0, ;i <= inputArr.length;j++) {
        //     if()

        //     taskNo++;
        // }

        // Now search each input value in the hash map
        while(k < initialInputRowStr.length) {
            if(hashMap[initialInputRowStr[k]]) {
                tasksTriggered += `${hashMap[initialInputRowStr[k]].task},`;
                // Adding output of the value in respective task row to the initial list of inputs provided
                initialInputRowStr += ',' + hashMap[initialInputRowStr[k]].byProduct;
            }

            k++;
        }

        console.log('Tasks triggered now :::: ', tasksTriggered);
        result += tasksTriggered + '\n';

        payload.shift();
        recursiveTaskTrigger(payload, result);
    } catch (error) {
        console.log('Error during recursion :::::: ', error);
    }
}

export const testFun = async (result) => {
    result = 'Somil';
    return result;
}

// module.exports = {
//     recursiveTaskTrigger,
//     testFun,
// }