<template>
    <div class="flex -mx-1 py-2 border-b">
        <div class="flex-1 px-1">
            <div class="">
                <VueSelect :data="items" v-model="selectedValue" v-on:valueSelect="onValueSelect">

                </VueSelect>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueSelect from './VueSelect'

export default {
    components: {
            VueSelect
    },
    data() {
        return {
            loading: true,
        }
    },
    computed: {
        ...mapGetters({
            customers: 'customers/customers'
        })
	},
    methods: {
        ...mapActions({
            getItems: 'items/getItems'
        }),

        onValueSelect(value) {
            this.selectedValue = value.name;
            // console.log(this.invoiceItems)
            this.item.name = value.name
            this.item.price = value.price
            this.item.item_id = value.id
            this.item.description = value.description
            //this.item.unit = value.unit

            this.$emit('itemSelected', value);

            this.updateItem()
		},
        addItem() {
            this.invoiceItems.push({})
        },

        updateItem () {
            this.$emit('update', {
                'index': this.index,
                'item': {
                    ...this.item,
                }
            })
        },

        removeItem () {
            this.$emit('remove', this.index)
        },
    },

    mounted () {
        this.getItems()
        this.loading = false;
	}
}
</script>