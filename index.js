const store = new Vuex.Store({
    state: {
        cities: [
            "Stockholm",
            "Göteborg"
        ],
        houses: [],
        people: [{
            name: "Adam",
            telnr: 26
        }, {
            name: "Billy",
            telnr: 35
        }, {
            name: "Che",
            telnr: 773
        }, {
            name: "Dee",
            telnr: 12
        }]
    }
})

const Person = {
    template: `
        <div class="person">
            
        </div>
    `
}

const House = {
    template: `
        <div class="house">
            <person-type v-for="person in people" v-bind:person="person">
            </person-type>
        </div>
    `,
    components: {
        'person-type': Person
    }
}

Vue.component('city', {
    template: `
        <div class="city">
            <house-building v-for="house, index in houses" v-bind:house="house"></house-building>
        </div>
    `,
    components: {
        'house-building': House
    }
});

const app = new Vue({
    el: "#app",
    data: {
        tal: 3
    }
});