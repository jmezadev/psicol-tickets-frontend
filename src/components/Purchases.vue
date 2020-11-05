<template>
    <div class="register">
        <main role="main" class="flex-shrink-0">
            <div class="container text-left">
                <h1 class="mt-5">Compras realizadas</h1>
                <hr>
                <div class="col-12 mb-5">
                    <label for="select-user">Usuario:</label>
                    <select class="form-control" name="location_id" id="select-user" @change="handleSelectUser($event)">
                        <option value="" selected>Seleccione el usuario</option>
                        <option v-for="user in this.users" :key="user.id" :value="user.id">{{ user.name }} {{ user.last_name }}</option>
                    </select>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from "axios";
    import {API_ROUTE} from "../main";

    export default {
        name: 'Register',
        props: {
            msg: String
        },
        data() {
            return {
                users: [],
                user_id: "",
            }
        },
        created() {
            this.getUsers();
        },
        methods: {
            getUsers() {
                axios.get(API_ROUTE + '/users').then(response => {
                    this.users = response.data
                });
            },
            handleSelectUser(user) {
                console.log("HERE");
                this.user_id = user.target.value;

                axios.post(API_ROUTE + '/users/tickets', {user_id: this.user_id})
                    .then(response => {
                    console.log(response);
                        /*this.errors = null;
                        this.$swal({
                            icon: 'success',
                            title: '¡Correcto!',
                            text: 'Usuario registrado exitosamente!',
                        });

                        this.resetForm();*/
                }).catch(e => {
                    console.log('------------');
                    console.log(e.response);
                    this.errors = e.response.data.errors;
                });
            },
            resetForm() {
                this.formUser.name = null;
                this.formUser.last_name = null;
                this.formUser.dni = null;
                this.formUser.address = null;
                this.formUser.phone = null;
                this.formUser.email = null;
                this.formUser.password = null;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .bg-red {
        background: #ff4c4c;
    }
</style>
