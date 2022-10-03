export default {
    async registerCoach(context,payload) {
        const userId = context.rootGetters.userId;
        const formData = {
            id: context.rootGetters.userId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            areas: payload.areas,
            description: payload.description,
            hourlyRate: payload.hourlyRate
        }
        const res = await fetch(`${process.env.VUE_APP_BASEURL}/coaches/${userId}.json`,{
            method: "put",
            body: JSON.stringify(formData)
        })

        if(!res.ok){
            // error handling
        }

        context.commit("registerCoach",{
            ...formData,
            id: userId
        })
    },
    async loadCoaches(context) {

        const res = await fetch(`${process.env.VUE_APP_BASEURL}/coaches.json`)

        // { {},{},{} }
        const datas = await res.json();

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

        context.commit("setCoaches",coaches)

    }
}