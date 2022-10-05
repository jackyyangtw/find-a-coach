export default {
    async registerCoach(context,payload) {
        const userId = context.rootGetters.userId;
        const formData = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            areas: payload.areas,
            description: payload.description,
            hourlyRate: payload.hourlyRate
        }
        // const token = context.rootGetters.token
        const res = await fetch(`${process.env.VUE_APP_BASEURL}/coaches/${userId}.json`,{
            method: "PUT",
            body: JSON.stringify(formData)
        })

        if(!res.ok){
            // error handling
            // throw new Error(res.message || 'Failed to fetch !')
        }

        context.commit("registerCoach",{
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