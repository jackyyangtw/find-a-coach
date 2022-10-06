export default {
    async registerCoach({rootGetters,commit},payload) {
        const userId = rootGetters.userId;
        const formData = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            areas: payload.areas,
            description: payload.description,
            hourlyRate: payload.hourlyRate
        }
        const token = rootGetters.token;
        const res = await fetch(`${process.env.VUE_APP_BASEURL}/coaches/${userId}.json?auth=${token}`,{
            method: "PUT",
            body: JSON.stringify(formData)
        })

        if(!res.ok){
            // error handling
            // throw new Error(res.message || 'Failed to fetch !')
        }

        commit("registerCoach",{
            ...formData,
            id: userId
        })
    },
    
    async loadCoaches(context, payload) {

        if(!payload.forceRefresh && !context.getters.shouldUpdate) {
            return
        }

        const res = await fetch(`${process.env.VUE_APP_BASEURL}/coaches.json`)

        // { {},{},{} }
        const datas = await res.json();

        if(!res.ok && context.rootGetters.coaches.length === 0){
            // error handling
            throw new Error(datas.message || 'Failed to fetch !')
        }

        const coaches = [];

        if(!datas || datas.length === 0) {
            return
        }

        Object.keys(datas).forEach(key => {
            const coach = {
                id: key,
                firstName: datas[key].firstName,
                lastName: datas[key].lastName,
                description: datas[key].description,
                hourlyRate: datas[key].hourlyRate,
                areas: datas[key].areas
            }
            coaches.push(coach)
        })

        // for (const key in data) {
        //     const coach = {
        //         id: key,
        //         firstName: data[key].firstName,
        //         lastName: data[key].lastName,
        //         description: data[key].description,
        //         hourlyRate: data[key].hourlyRate,
        //         areas: data[key].areas
        //     }
        //     coaches.push(coach)
        // }

        context.commit("setCoaches",coaches);
        context.commit("setFetchTimestamp");

    }
}