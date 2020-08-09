<template>
    <div>
        <template>
			<div class="flex -mx-1 py-2 border-b">
				<div class="flex-1 px-1">
					<div class="">
                        <VueSelect :data="items" v-model="selectedValue" v-on:valueSelect="onValueSelect">

                        </VueSelect>
                    </div>
				</div>

				<div class="px-1 w-20 text-right">
					<p class="text-gray-800" x-text="invoice.qty"></p>
				</div>

				<div class="px-1 w-32 text-right">
					<p class="text-gray-800" x-text="numberFormat(invoice.rate)"></p>
				</div>

				<div class="px-1 w-32 text-right">
					<p class="text-gray-800" x-text="numberFormat(invoice.total)"></p>
				</div>

				<div class="px-1 w-20 text-right">
					<a href="#" class="text-red-500 hover:text-red-600 text-sm font-semibold" @click.prevent="deleteItem(invoice.id)">Delete</a>
				</div>
			</div>
		</template>

        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueSelect from './VueSelect'

export default {
    components: {
            VueSelect
    },
    props: {
        itemData: {
            type: Object,
            default: null
        },
        index: {
            type: Number,
            default: null
        },
        invoiceItems: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            selectedValue: '',
            loading: true,
            item: {...this.itemData},
        }
    },
    computed: {
        ...mapGetters({
            items: 'items/items'
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
    },

    mounted () {
        this.getItems()
        this.loading = false;
	}
}
</script>