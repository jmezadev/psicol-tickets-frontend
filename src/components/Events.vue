<template>
    <div class="events">
        <main role="main" class="flex-shrink-0">
            <div class="container">
                <h1 class="mt-5">Próximos Eventos</h1>
                <hr>
                <div id="container-events" class="col-12 text-left">
                    <div class="mb-3 my-5" v-if="events.length > 0">
                        <div class="row my-2 py-3 container-event" v-for="event in events" :key="event.id">
                            <div class="col-md-3">
                                <img :src="ROUTE + event.image" class="card-img" alt="Evento">
                            </div>
                            <div class="col-md-9">
                                <div class="card-body">
                                    <h5 class="card-title" v-text="event.name"></h5>
                                    <p class="card-text" v-text="event.description"></p>
                                    <div class="card-text row" id="event-info">
                                        <div class="col-12">
                                            <small class="text-muted"><b>Fecha</b>: {{ event.datetime }}</small>
                                        </div>
                                        <div class="col-12">
                                            <small class="text-muted"><b>Lugar</b>: {{ event.address }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 text-right">
                                <hr>
                                <button @click="buyTickets(event.id)" class="btn btn-info">Comprar Boletas</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h5 class="text-left my-5">No hay ningún evento disponible</h5>
                    </div>
                </div>
            </div>
        </main>

        <div>
            <b-modal ref="modal-buy-tickets" title="Comprar Boletas">
                <b-form ref="form-buy-tickets">
                    <div>
                        <span class="text-bold">{{ this.selectedEvent.name }}</span> - <small>{{ this.selectedEvent.event_date }} {{ this.selectedEvent.event_hour }}</small>
                    </div>
                    <small>{{ this.selectedEvent.address }}</small>
                    <hr>
                    <label for="select-location">Locación:</label>
                    <select class="form-control" name="location_id" id="select-location" @change="handleSelectEventLocation($event)">
                        <option value="">Seleccione la locación</option>
                        <option v-for="event_location in this.selectedEvent.locations" :key="event_location.id" :value="event_location.id">{{ event_location.name }} - Disponibles: {{ event_location.total_tickets }} boletas</option>
                    </select>
                    <hr>
                    <div id="container-event-location-info" class="mt-4" v-if="this.showEventLocationInfo">
                        <div class="col-12 row d-flex align-items-center">
                            <label class="text-bold col-6">Precio por Boleta:</label>
                            $ <span v-text="this.selectedEvent.locations[this.formBuyTickets.event_selected_location_id].price"></span>
                        </div>
                        <div class="col-12 row d-flex align-items-center">
                            <label for="quantity" class="text-bold col-6">Cantidad:</label> &nbsp;
                            <input class="form-control col-4" type="number" id="quantity" v-model="formBuyTickets.quantity" max="10" min="1" @change="handleChooseQuantity()">
                        </div>
                        <hr>
                        <div class="col-12 mt-4 text-right">
                            <label for="quantity" class="text-bold">Total:</label> &nbsp;&nbsp; $<span v-text="this.formBuyTickets.total"></span>
                        </div>
                        <hr>
                        <label for="select-user">Seleccione Usuario:</label>
                        <select class="form-control" name="location_id" id="select-user" @change="handleSelectUser($event)" v-model="formBuyTickets.user_id">
                            <option v-for="user in this.users" :key="user.id" :value="user.id">{{ user.name }} {{ user.last_name }}</option>
                        </select>
                    </div>
                </b-form>
                <template v-slot:modal-footer>
                    <div class="w-100">
                        <template>
                            <b-button type="button" class="float-right" size="sm" variant="success" v-if="showBuyButton" @click.prevent="sendForm()">
                                Comprar
                            </b-button>
                        </template>
                    </div>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { API_ROUTE } from '../main.js'
    import { ROUTE } from '../main.js'

    export default {
        name: 'Events',
        props: {},
        data() {
            return {
                ROUTE: ROUTE,
                users: [],
                events: [],
                showModal: false,
                showEventLocationInfo: false,
                showBuyButton: false,
                selectedEvent: [],
                formBuyTickets: {
                    event_id: null,
                    event_name: null,
                    event_locations: [],
                    event_selected_location_id: null,
                    user_id: "",
                    quantity: 1,
                    total: 0,
                },
            }
        },
        created() {
            this.getEvents();
            this.getUsers();
        },
        methods: {
            getUsers() {
                axios.get(API_ROUTE + '/users').then(response => {
                    this.users = response.data
                });
            },
            getEvents() {
                axios.get(API_ROUTE + '/events').then(response => {
                    this.events = response.data
                });
            },
            buyTickets(id) {
                this.resetForm();

                axios.get(API_ROUTE + '/events/' + id).then(response => {
                    this.selectedEvent = response.data;

                    this.formBuyTickets.event_id = response.data.id;
                    this.formBuyTickets.event_name = response.data.name;
                    this.formBuyTickets.event_locations = response.data.locations;

                    this.$refs['modal-buy-tickets'].show();
                });
            },
            calculateTotal() {
                let location_price = this.selectedEvent.locations[this.formBuyTickets.event_selected_location_id].price_value;
                this.formBuyTickets.total = new Intl.NumberFormat("de-DE").format(parseInt(this.formBuyTickets.quantity) * location_price);
            },
            handleSelectEventLocation(event_location) {
                if(event_location.target.value !== "") {
                    if(this.formBuyTickets.user_id !== null) {
                        this.showBuyButton = true;
                    } else {
                        this.showBuyButton = false;
                    }

                    this.showEventLocationInfo = true;
                    this.formBuyTickets.event_selected_location_id = event_location.target.value;
                    this.calculateTotal();
                } else {
                    this.showEventLocationInfo = false;
                    this.showBuyButton = false;
                }
            },
            handleChooseQuantity() {
                this.calculateTotal();
            },
            handleSelectUser(user) {
                this.showBuyButton = user.target.value !== "";
            },
            resetForm() {
                this.showEventLocationInfo = false;
                this.formBuyTickets.event_id = null;
                this.formBuyTickets.event_name = null;
                this.formBuyTickets.event_locations = null;
                this.formBuyTickets.event_selected_location_id = null;
                this.formBuyTickets.user_id = null;
                this.formBuyTickets.quantity = 1;
                this.formBuyTickets.total = 1;
                this.selectedEvent = [];
            },
            sendForm() {
                axios.post(API_ROUTE + '/tickets', this.formBuyTickets).then(() => {

                    this.$refs['modal-buy-tickets'].hide();

                    this.$swal({
                        icon: 'success',
                        title: '¡Correcto!',
                        text: 'Compra realizada exitosamente!',
                    });

                    this.getEvents();
                });
            },
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

    .container-event {
        border: 1px solid #858585;
        border-radius: 4px;
        box-shadow: 1px 2px 4px 1px #bebebe;
    }

    .text-bold {
        font-weight: bold;
    }
</style>
