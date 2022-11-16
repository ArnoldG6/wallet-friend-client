import Movement from "../../../Types/Account/movement.types";
import FixedMovement from "../../../Types/Account/fixedMovement.types";

interface Entry {
    key: string,
    value: string,
}

export default function graphData(singleMovement: Array<Movement> | undefined, fixedMovement: Array<FixedMovement> | undefined) {
    if (singleMovement !== undefined && fixedMovement !== undefined) {
        let dataMap = new Map();
        let predictionMap = new Map();
        let prediction = 0;
        singleMovement.sort((a, b) => getTime(a.creation_datetime) - getTime(b.creation_datetime));
        let monthCount = 0;
        let totalCount = 0;
        let prevMonth = "";
        let predMonth = "";
        singleMovement.forEach(movement => {
            const date = movement.creation_datetime.toLocaleString('default', {month: 'long'}) + ", " + movement.creation_datetime.getFullYear();
            predMonth = new Date(movement.creation_datetime.getFullYear(), movement.creation_datetime.getMonth() + 1).toLocaleString('default', {month: 'long'}) + ", " + movement.creation_datetime.getFullYear();
            if (predictionMap.has(date)) {
                if (!isFixed(movement, fixedMovement)) {
                    predictionMap.set(date, predictionMap.get(date) + movement.amount);
                    monthCount++;
                }
            } else {
                if (!isFixed(movement, fixedMovement)) {
                    predictionMap.set(date, movement.amount);
                    monthCount = 1
                    totalCount++;
                }
            }
            if (dataMap.has(date)) {
                dataMap.set(date, dataMap.get(date) + movement.amount);
            } else {
                dataMap.set(date, movement.amount);
                if (prevMonth === "") {
                    prevMonth = date;
                } else {
                    if (predictionMap.has(prevMonth)) {
                        prediction += predictionMap.get(prevMonth) / monthCount;
                        //monthCount = 0;
                    }
                }
                prevMonth = date;
            }
        })
        //check for last month
        if (predictionMap.has(prevMonth)) {
            prediction += predictionMap.get(prevMonth) / monthCount;
            monthCount = 0;
        }
        prediction /= totalCount;
        //handle fixed
        fixedMovement.forEach(movement => {
            prediction += movement.amount;
        })

        let data = Array.from(dataMap, ([name, value]) => ({name, value}));

        let last = {
            name: data.at(-1)?.name,
            value: data.at(-1)?.value,
            predicted: data.at(-1)?.value
        }
        data.pop();
        data.push(last);
        let d = {
            name: predMonth,
            value: null,
            predicted: Math.round(prediction * 100) / 100
        }
        data.push(d);
        return data;
    }
}

function isFixed(movement: Movement, fixedMovement: Array<FixedMovement>) {
    let is = false;
    fixedMovement.forEach(m => {
        if (m.amount === movement.amount && m.name === movement.name) {
            is = true;
            return true;
        }
        return false;
    })
    return is;
}

function getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
}