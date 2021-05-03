//Helper class that contains common helper methods
module.exports.Helpers = class Helpers {

    //Search function to find element in a sorted array
    search(array,key,value){
        let start = 0;
        let end = array.length - 1;
    
        while (start <= end) {
            let middle = Math.floor((start + end) / 2);
    
            if (array[middle][key] === value) {
                return middle;
            } else if (array[middle][key] < value) {
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }
        return null;
    }
};