<template>
<v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-spacer />
        <v-btn icon @click.stop="rightDrawer = !rightDrawer">
            <v-icon>mdi-menu</v-icon>
        </v-btn> -->
    </v-app-bar>
    <v-main>
        <v-container>
            <Nuxt />
        </v-container>
    </v-main>
</v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [{
                    icon: 'mdi-apps',
                    title: 'Welcome',
                    to: '/'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        }
    }
}
</script>
