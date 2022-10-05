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
                    <label for="password">E-Mail</label>
                    <input type="password" id="password" v-model.trim="password"/>
                </div>
                <p class="errors" v-if="!formIsValid">Please enter a valid email and password!</p>
                <base-button>{{ submitBtnText }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeBtnText }}</base-button>
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
            return this.mode === 'login' ? 'Login' : 'Signup'
        },
        switchModeBtnText() {
            return this.mode === 'login' ? 'Signup instead' : 'Login'
        },
        isSignupSuccess() {
            return this.$store.getters['auth/isSignupSuccess']
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
                    await this.$store.dispatch('auth/login',actionPayload);
                    // this.$router.replace('/coaches');
                }
                else {
                    await this.$store.dispatch('auth/signup',actionPayload)
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
            this.$store.commit('auth/closeSuccessDialog');
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