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
                <hr>
                <div class="col-12">
                    <div class="card mb-3" v-for="transaction in user_transactions.transactions" :key="transaction.id">
                        <div class="card-header">{{ transaction.event_name }} - {{ transaction.event_time }}</div>
                        <div class="card-body">
                            <h5 class="card-title">Boletas compradas: {{ transaction.tickets_count }}</h5>
                            <p class="card-text">Fecha de Compra: {{ transaction.date }}</p>
                        </div>
                    </div>
                </div>
                <div v-if="noTransactions" class="col-12">
                    <h5>Sin transacciones</h5>
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
                noTransactions: false,
                users: [],
                user_transactions: [],
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
                this.user_transactions = []; // Reset array
                this.noTransactions = false;
                this.user_id = user.target.value;

                axios.post(API_ROUTE + '/users/tickets', {user_id: this.user_id})
                    .then(response => {
                        this.user_transactions = response.data;
                        if(response.data.transactions.length === 0) {
                            this.noTransactions = true;
                        }
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
