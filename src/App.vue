<template>
    <div id="app">
        <header>
            <!-- Fixed navbar -->
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a class="navbar-brand" href="/">Psicol Tickets</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Eventos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/register" class="nav-link">Registrar Usuarios</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/purchases" class="nav-link">Compras</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <router-view />

        <footer class="footer mt-auto py-3 text-right">
            <div class="container">
                <span class="text-muted">Psicol Tickets | Developed by: <b>José Manuel Meza</b> @jmezadev.</span>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {}
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
            font-size: 3.5rem;
        }
    }

    main > .container {
        padding: 60px 15px 0;
    }

    .footer {
        background-color: #f5f5f5;
    }

    .footer > .container {
        padding-right: 15px;
        padding-left: 15px;
    }

    code {
        font-size: 80%;
    }
</style>
