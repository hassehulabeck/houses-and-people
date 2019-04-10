const store = new Vuex.Store({
    state: {
        houses: [{
                id: 1,
                address: "Kungsgatan 1",
                city: "Stockholm"
            },
            {
                id: 2,
                address: "Drottninggatan 23",
                city: "Göteborg"
            },
            {
                id: 3,
                address: "Rucklargränd 3",
                city: "Stockholm"
            }
        ],
        people: [{
            name: "Adam",
            telnr: 27,
            house: 1
        }, {
            name: "Billy",
            telnr: 35,
            house: 3
        }, {
            name: "Che",
            telnr: 773,
            house: 2
        }, {
            name: "Dee",
            telnr: 12,
            house: 1
        }]
    },
    getters: {
        getHousesByCity: (state) => (city) => {
            return state.houses.filter(house => house.city == city)
        },
        getPeopleByHouse: (state) => (house) => {
            return state.people.filter(people => people.house == house)
        }

    }
})

const Person = {
    props: ['person'],
    template: `
        <div class="person">
            <span> {{ person.name }}</span>
        </div>
    `
}

const House = {
    props: [
        'house'
    ],
    computed: {
        people() {
            return store.getters.getPeopleByHouse(this.house.id)
        }
    },
    template: `
        <div class="house">
            <person-type v-for="person, index in people" v-bind:person="person" v-bind:key="index" v-on:click="showHouseInfo">
            </person-type>
        </div>
    `,
    components: {
        'person-type': Person
    },
    methods: {
        showHouseInfo: function() {
            console.log(this.house)
        }
    }
}

Vue.component('city', {
    props: ['title'],
    computed: {
        houses() {
            return store.getters.getHousesByCity(this.title)
        }
    },
    template: `
        <div class="city">
            <h1> {{ this.title }} </h1>
            <house-building v-for="house, index in houses" v-bind:house="house" v-bind:key="index"></house-building>
        </div>
    `,
    components: {
        'house-building': House
    }
});

const app = new Vue({
    el: "#app"
});