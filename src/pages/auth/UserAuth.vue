<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred" @close="errorhandler">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating..." fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-dialog :show="isSignupSuccess" title="Sign up successfully!" @close="closeSuccessDialog">
            <p>Sign up successfully!</p>
        </base-dialog>
        <base-card>    
            <form @submit.prevent="submitHandler">
                <div class="form-control">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model.trim="email"/>
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password"/>
                </div>
                <p class="errors" v-if="!formIsValid">Please enter a valid email and password, password must have 6 characters</p>
                <div style="margin-top: 2em">
                    <base-button>{{ submitBtnText }}</base-button>
                    <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeBtnText }}</base-button>
                </div>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formIsValid: true,
            email: '',
            password: '',
            mode: '',
            isLoading: false,
            error: null,
        }
    },
    computed: {
        submitBtnText(){
            return this.mode === 'login' ? 'Login' : 'Signup and reigster'
        },
        switchModeBtnText() {
            return this.mode === 'login' ? 'Signup and reigster' : 'Login'
        },
        isSignupSuccess() {
            return this.$store.getters['isSignupSuccess']
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach']
        },
        isLogin(){
            return this.$store.getters.isLogin
        }
    },
    methods: {
        async submitHandler(){
            if(this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false
                return
            }

            const actionPayload = {
                email: this.email,
                password: this.password,
                // isSignupSuccess: this.isSignupSuccess
            }

            this.isLoading = true

            try {
                if(this.mode === 'login') {
                    await this.$store.dispatch('login',actionPayload);
                    let redirectUrl;
                    if(!this.isCoach && this.isLogin) {
                        redirectUrl = '/coaches'
                    } else if(!this.isCoach) {
                        redirectUrl = `/${this.$route.query.redirect}`
                    } else {
                        redirectUrl = '/coaches'
                    }
                    this.$router.replace(redirectUrl);
                }
                else {
                    await this.$store.dispatch('signup',actionPayload)
                }
            }
            catch (err) {
                this.error = err
            }

            this.isLoading = false;

        },
        errorhandler(){
            this.error = null
        },
        switchAuthMode(){
            if(this.mode === 'login') {
                this.mode = 'signup'
            } else {
                this.mode = 'login'
            }
        },
        closeSuccessDialog() {
            this.$store.commit('closeSuccessDialog');
        }
    }
}
</script>

<style scoped>
    form {
        margin: 1rem;
        /* border-radius: 12px; */
        padding: 1rem;
    }
    
    .form-control {
        margin: 0.5rem 0;
    }
    
    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
    }
    
    input,
    textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        padding: 0.15rem;
    }
    
    input:focus,
    textarea:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
    }
    
    .errors {
        font-weight: bold;
        color: red;
    }
    
    .actions {
        text-align: center;
    }
</style>