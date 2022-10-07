import router from "../../../router";
let timer;

export default {
    async login(context,payload){
        return context.dispatch('auth',{
            ...payload,
            mode: 'login',
            successHandler: () => {
                const userName = context.getters.userName;
                localStorage.setItem('userName',userName);
            }
        })
    },
    async signup(context,payload){
        return context.dispatch('auth',{
            ...payload,
            mode: 'signup',
            successHandler: () => {
                // context.commit('setSignupSuccess');
                if(context.getters['coaches/isCoach']) {
                    router.replace('/coaches')
                }
                router.replace('/register');
            }
        })
    },
    async auth(context,payload) {
        let url;
        if(payload.mode === 'login') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuEQuGmwBV5FgOjtnTFfYX4CvtdBVzexE'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuEQuGmwBV5FgOjtnTFfYX4CvtdBVzexE'
        }
        const res = await fetch(url,{
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const data = await res.json();

        console.log(data)

        if(!res.ok) {
            throw new Error(data.error.message || 'Something went wrong!')
        } else {

            const expiresIn = +data.expiresIn * 1000;
            const expirationDate = new Date().getTime() + expiresIn;

            localStorage.setItem('tokenExpiration',expirationDate);
            localStorage.setItem('token',data.idToken);
            localStorage.setItem('userId',data.localId);

            timer = setTimeout(() => {
                context.dispatch('autoLogout')
            }, expiresIn);

            
            context.commit('setUser',{
                token: data.idToken,
                userId: data.localId,
            })

            
            
            if(!payload.successHandler) {
                return
            }
            payload.successHandler();
            context.dispatch('coaches/loadCoaches',{forceRefresh: true},{root: true});
        }
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if(expiresIn < 0 ){
            return
        }

        timer = setTimeout(() => {
            context.dispatch('autoLogout')
        }, expiresIn);

        if(token && userId) {
            context.commit('setUser',{
                token,
                userId,
            })
        }
    },
    async logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('userName');

        clearTimeout(timer)

        
        context.commit('setUser',{
            token: null,
            userId: null,
        })

        await context.dispatch('coaches/loadCoaches',{forceRefresh: true},{root: true});
        
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout')
    }
}