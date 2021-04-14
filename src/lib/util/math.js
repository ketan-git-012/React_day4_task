const globalFunctions = {
    getRandomNumber(maxNumber){
        return Math.floor(Math.random() * maxNumber);
    },

    getNextRoundRobin(total, current){
        return current < total ? current++ : 0
    }

}

export default globalFunctions;