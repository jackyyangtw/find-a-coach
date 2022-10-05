export default {
    async login(context,payload){
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuEQuGmwBV5FgOjtnTFfYX4CvtdBVzexE',{
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        console.log(res)
        const data = await res.json();
        console.log(data)
        if(!res.ok) {
            throw new Error(data.error.message || 'Something went wrong!')
        } else {
            // show success dialog
        }
        context.commit('setUser',{
            token: data.idToken,
            userId: data.localId,
            tokenExpiration: data.expiresIn
        })
    },
    async signup(context,payload){
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuEQuGmwBV5FgOjtnTFfYX4CvtdBVzexE',{
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        console.log(res)
        const data = await res.json();
        console.log(data)
        if(!res.ok) {
            throw new Error(data.error.message || 'Something went wrong!')
        } else {
            // show success dialog
            context.commit('setSignupSuccess');
            context.commit('setUser',{
                token: data.idToken,
                userId: data.localId,
                tokenExpiration: data.expiresIn
            })
        }
    },
}