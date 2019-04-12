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
            house: 1,
            money: 1000
        }, {
            name: "Billy",
            house: 3,
            money: 20
        }, {
            name: "Che",
            house: 2,
            money: 300
        }, {
            name: "Dee",
            house: 1,
            money: 310
        }],
        giver: null,
        taker: null
    },
    getters: {
        getHousesByCity: (state) => (city) => {
            return state.houses.filter(house => house.city == city)
        },
        getPeopleByHouse: (state) => (house) => {
            return state.people.filter(people => people.house == house)
        }

    },
    mutations: {
        setGiver(state, person) {
            state.giver = person
        },
        setTaker(state, person) {
            state.taker = person
        },
        makeDeal(state) {
            var pot = state.giver.money / 2;
            state.giver.money -= pot;
            state.taker.money += pot;
        }

    }
})

const Person = {
    props: ['person'],
    template: `
        <div class="person">
            <span> {{ person.name }} <br/><em>({{ person.money }} )</em></span>
        </div>
    `
}

Vue.component('personSelektor', VueSelect.VueSelect)

const House = {
    props: [
        'house'
    ],
    computed: {
        people() {
            return this.$store.getters.getPeopleByHouse(this.house.id)
        }
    },
    template: `
        <div class="house" v-on:mouseover="showHouseInfo">
            <person-type v-for="person, index in people" v-bind:person="person" v-bind:key="index" >
            </person-type>
        </div>
    `,
    components: {
        'person-type': Person
    },
    methods: {
        showHouseInfo: function() {
            console.log(this.house.address)
        }
    }
}

Vue.component('city', {
    props: ['title'],
    computed: {
        houses() {
            return this.$store.getters.getHousesByCity(this.title)
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
    el: "#app",
    store,
    methods: {
        setGiver(val) {
            this.$store.commit('setGiver', val)
        },
        setTaker(val) {
            this.$store.commit('setTaker', val)
        },
        makeTheDeal() {
            this.$store.commit('makeDeal')
        }
    }
});