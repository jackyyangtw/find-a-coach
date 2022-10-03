export default {
    contactCoach(context,payload) {
        const newRequest = {
            email: payload.email,
            message: payload.message,
            coachId: payload.coachId,
            id: new Date().toISOString()
        }
        context.commit('addRequest',newRequest)
    }
}