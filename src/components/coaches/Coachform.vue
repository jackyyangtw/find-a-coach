<template>
    <form @submit.prevent="submitHandler">
        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" v-model.trim="firstName.val" @change="inputChangeHandler('firstName')">
            <p v-if="!firstName.isValid">First Name must not be empty!</p>
        </div>
        <div class="form-control" :class="{invalid: !lastName.isValid}">
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" v-model.trim="lastName.val" @change="inputChangeHandler('lastName')">
            <p v-if="!lastName.isValid">Last Name must not be empty!</p>
        </div>
        <div class="form-control"  :class="{invalid: !description.isValid}">
            <label for="description">Description</label>
            <input type="text" id="description" v-model.trim="description.val" @change="inputChangeHandler('description')">
            <p v-if="!description.isValid">Description must not be empty!</p>
        </div>
        <div class="form-control" :class="{invalid: !hourlyRate.isValid}">
            <label for="rate">Hourly Rate</label>
            <input type="number" id="rate" v-model.number="hourlyRate.val" @change="inputChangeHandler('hourlyRate')">
            <p v-if="!hourlyRate.isValid">Hourly Rate must not be empty and greater than 0!</p>
        </div>
        <div class="form-control" :class="{invalid: !areas.isValid}">
            <h3>Areas of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @change="inputChangeHandler('areas')">
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.val" @change="inputChangeHandler('areas')">
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.val" @change="inputChangeHandler('areas')">
                <label for="career">Career Advisory</label>
            </div>
            <p v-if="!areas.isValid">Must have at least one expertise!</p>
        </div>
        <p v-if="!formIsValid" style="color:red">Please fix the above errors.</p>
        <base-button>Register</base-button>
    </form>
</template>

<script>
export default {
    emits: ['send-data'],
    data () {
        return {
            firstName: {
                val: '',
                isValid: true
            },
            lastName: {
                val: '',
                isValid: true
            },
            description: {
                val: '',
                isValid: true
            },
            hourlyRate: {
                val: null,
                isValid: true
            },
            areas: {
                val: [],
                isValid: true
            },
            formIsValid: true,
        }
    },
    methods: {
        inputChangeHandler(input) {
            this[input].isValid = true;
        },
        validateForm () {
            this.formIsValid = true
            if(this.firstName.val === '') {
                this.firstName.isValid = false
                this.formIsValid = false;
            }
            if(this.lastName.val === '') {
                this.lastName.isValid = false;
                this.formIsValid = false;
            }
            if(this.description.val === '') {
                this.description.isValid = false;
                this.formIsValid = false;
            }
            if(!this.hourlyRate.val || this.hourlyRate.val <= 0) {
                this.hourlyRate.isValid = false;
                this.formIsValid = false;
            }
            if(this.areas.val.length === 0) {
                this.areas.isValid = false;
                this.formIsValid = false;
            }
        },
        submitHandler() {
            this.validateForm();
            if(!this.formIsValid) return;
            const formData = {
                firstName: this.firstName.val,
                lastName: this.lastName.val,
                descrption: this.description.val,
                hourlyRate: this.hourlyRate.val,
                areas: this.areas.val
            }
            this.$emit('send-data',formData)
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
.invalid h3,
.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>