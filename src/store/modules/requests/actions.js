export default {
    async contactCoach(context,payload) {
        const newRequest = {
            email: payload.email,
            message: payload.message,
            coachId: payload.coachId,
        }
        const res = await fetch(`${process.env.VUE_APP_BASEURL}/requests/${payload.coachId}.json`,{
            method: "POST",
            body: JSON.stringify(newRequest)
        })
        const data = await res.json();

        if(!res.ok) {
            throw new Error(data.message || 'Failed to send request !')
        }

        newRequest.id = data.name;

        context.commit('addRequest',newRequest)
    },
    async loadRequests(context){
        const userId = context.rootGetters.userId
        const token = context.rootGetters.token
        const res = await fetch(`${process.env.VUE_APP_BASEURL}/requests/${userId}.json?auth=${token}`);
        const datas = await res.json();

        if(!res.ok) {
            throw new Error(datas.message || 'Failed to send request !')
        }
        const requests = [];
        Object.keys(datas).forEach(key => {
            requests.push({
                id: key,
                message: datas[key].message,
                email: datas[key].email,
                coachId: datas[key].coachId,
            })
        })
        context.commit('loadRequests',requests)
    }
}