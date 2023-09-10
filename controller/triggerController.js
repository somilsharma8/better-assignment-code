export const recursiveTaskTrigger = (payload, result='') => {
        try {
            const payloadArr = payload[0].split(/\n/);
            const noOfTasks = parseInt(payloadArr[1]);
            let initialInputRowStr = payloadArr[noOfTasks + 2].split(',');
            let hashMap = {}, tasksTriggered = `${payloadArr[0]} `, tasksTriggeredObj={}, k = 0;
    
            // Creating hashmap of all task input vs {taskNo + output array}
            // i represents each task row
            for (let i = 2; i < noOfTasks + 2; i++) {
                const [ taskInputStr, taskOutputStr ] = payloadArr[i].split(';');
                const taskInputs = taskInputStr.split(',');

                // Iterating over input part of the task
                for (let k = 0; k < taskInputs.length; k++) {
                    // Adding each valid task input into a hashMap (ignoring commas)
                        hashMap[taskInputs[k]] = {
                            task: i - 2,
                            byProduct: taskOutputStr,
                        }
                }
            }
    
            // Now search each input value in the hash map
            while(k < initialInputRowStr.length) {
                if(hashMap[initialInputRowStr[k]] && !hashMap[initialInputRowStr[k]].alreadyEncountered) {
                    tasksTriggeredObj[hashMap[initialInputRowStr[k]].task] = true;
                    // Adding output of the value in respective task row to the initial list of inputs provided
                    initialInputRowStr = [...initialInputRowStr, ...hashMap[initialInputRowStr[k]].byProduct.split(',')]
                    // Remembering that we've encountered this input before
                    hashMap[initialInputRowStr[k]].alreadyEncountered = true;
                }
    
                k++;
            }
    
            tasksTriggered = Object.keys(tasksTriggeredObj).join(',')
            result += `${payloadArr[0]} ${tasksTriggered}\n\n`;
    
            payload.shift();
            if (payload.length === 0)
                return result;
            else
                return recursiveTaskTrigger(payload, result);
        } catch (error) {
            console.log('Error during recursion :::::: ', error);
        }
    }