<template>
    <div class="register">
        <main role="main" class="flex-shrink-0">
            <div class="container text-left">
            <h1 class="mt-5">Registro de Usuario</h1>
            <hr>
            <div v-if="errors" class="bg-red text-white py-2 px-4 pr-0 rounded font-bold mb-4 shadow-lg">
                <div v-for="(v, k) in errors" :key="k">
                    <p v-for="error in v" :key="error" class="text-sm">
                        {{ error }}
                    </p>
                </div>
            </div>
            <form>
                <div class="form-group">
                    <label for="input-name">Nombres</label>
                    <input type="text" class="form-control" id="input-name" name="name" v-model="formUser.name">
                </div>
                <div class="form-group">
                    <label for="input-lastname">Apellidos</label>
                    <input type="text" class="form-control" id="input-lastname" name="lastname" v-model="formUser.last_name">
                </div>
                <div class="form-group">
                    <label for="input-dni">N° documento</label>
                    <input type="text" class="form-control" id="input-dni" name="dni" v-model="formUser.dni">
                </div>
                <div class="form-group">
                    <label for="input-address">Dirección</label>
                    <textarea class="form-control" name="address" id="input-address" cols="30" rows="4" v-model="formUser.address"></textarea>
                </div>
                <div class="form-group">
                    <label for="input-phone">Teléfono</label>
                    <input type="text" class="form-control" id="input-phone" name="phone" v-model="formUser.phone">
                </div>
                <div class="form-group">
                    <label for="input-email">Correo electrónico</label>
                    <input type="email" class="form-control" id="input-email" v-model="formUser.email">
                </div>
                <div class="form-group">
                    <label for="input-password">Contraseña</label>
                    <input type="password" class="form-control" id="input-password" v-model="formUser.password">
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="sendForm()">Registrar</button>
            </form>
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
                formUser: {
                    name: null,
                    last_name: null,
                    dni: null,
                    address: null,
                    phone: null,
                    email: null,
                    password: null,
                },
                errors: null,
            }
        },
        methods: {
            sendForm() {
                axios
                    .post(API_ROUTE + '/users', this.formUser)
                    .then(() => {
                        this.errors = null;
                        this.$swal({
                            icon: 'success',
                            title: '¡Correcto!',
                            text: 'Usuario registrado exitosamente!',
                        });

                        this.resetForm();
                    })
                    .catch(e => {
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
