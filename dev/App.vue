<!-- eslint-disable-->
<template>
    <div id="app">
        <div>
            <h1>Normal Select</h1>
            <select v-model="selectedFilter">
                <option
                    v-for="(filter, filterIndex) in filters"
                    :key="'filter' + filterIndex"
                    :value="filter"
                    :label="filter"
                ></option>
            </select>
            <h4>Value Selected:</h4>
            <p>{{ selectedFilter }}</p>
        </div>

        <div>
            <h1>Inkline Select</h1>
            <i-select v-model="selectedFilter">
                <i-select-option
                    v-for="(filter, filterIndex) in filters"
                    :key="'filter' + filterIndex"
                    :value="filter"
                    :label="filter"
                ></i-select-option>
            </i-select>

            <h4>Value Selected:</h4>
            <p>{{ selectedFilter }}</p>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'test',
        data() {
            return {
                filters: ['cat'],
                selectedFilter: 'cat',
                normalSelectedFilter: 'cat'
            };
        },
        methods: {
            updateFilters: function () {
                setTimeout(() => {
                    this.filters = ['cat', 'dog_dog', 'other'];
                }, 3000);
            }
        },
        created: function () {
            this.updateFilters();
        }
    };
</script>

