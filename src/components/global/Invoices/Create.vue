<template>
<div class="antialiased sans-serif min-h-screen bg-white" style="min-height: 900px">
<div class="border-t-8 border-gray-700 h-2"></div>
	<div 
		class="container mx-auto py-6 px-4"
	>
		<div class="flex justify-between">
			<h2 class="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">Invoice</h2>
			<div>
				<div class="relative mr-4 inline-block">
					<div class="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" @click="printInvoice()">
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
							<path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
							<path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
							<rect x="7" y="13" width="10" height="8" rx="2" />
						</svg>				  
					</div>
					<div x-show.transition="showTooltip" class="z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs">
						Print this invoice!
					</div>
				</div>
				
				<div class="relative inline-block">
					<div class="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" @mouseenter="showTooltip2 = true" @mouseleave="showTooltip2 = false" @click="window.location.reload()">
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
							<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
							<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
						</svg>	  
					</div>
					<div x-show.transition="showTooltip2" class="z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs">
						Reload Page
					</div>
				</div>
			</div>
		</div>

		<div class="flex mb-8 justify-between">
			<div class="w-2/4">
				<div class="mb-2 md:mb-1 md:flex items-center">
					<label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice No.</label>
					<span class="mr-4 inline-block hidden md:block">:</span>
					<div class="flex-1">
					<input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="eg. #INV-100001" x-model="invoiceNumber">
					</div>
				</div>

				<div class="mb-2 md:mb-1 md:flex items-center">
					<label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
					<span class="mr-4 inline-block hidden md:block">:</span>
					<div class="flex-1">
				<date-picker
					v-model="newInvoice.invoice_date"
					format="DD/MM/YYYY"
					valueType="format"
					placeholder="Select invoice date"
				></date-picker>
					</div>
				</div>

				<div class="mb-2 md:mb-1 md:flex items-center">
					<label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Due date</label>
					<span class="mr-4 inline-block hidden md:block">:</span>
					<div class="flex-1">
					<date-picker
					v-model="newInvoice.due_date"
					format="DD/MM/YYYY"
					valueType="format"
					placeholder="Select due date"
				></date-picker>
					</div>
				</div>
			</div>
			<div>
				<div class="w-32 h-32 mb-1 border rounded-lg overflow-hidden relative bg-gray-100">
					<img id="image" class="object-cover w-full h-32" src="https://placehold.co/300x300/e2e8f0/e2e8f0" />
					
					<div class="absolute top-0 left-0 right-0 bottom-0 w-full block cursor-pointer flex items-center justify-center" onClick="document.getElementById('fileInput').click()">
						<button type="button"
							style="background-color: rgba(255, 255, 255, 0.65)"
							class="hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded-lg shadow-sm"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
								<path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
								<circle cx="12" cy="13" r="3" />
							</svg>							  
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap justify-between mb-8">
			<div class="w-full md:w-1/3 mb-2 md:mb-0">
				<label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Bill/Ship To:</label>
				<input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Billing company name" x-model="billing.name">
				<input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Billing company address" x-model="billing.address">
				<input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Additional info" x-model="billing.extra">
			
			<CustomerSelect />
			</div>
			<div class="w-full md:w-1/3">
				<label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">From:</label>
				<input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Your company name" x-model="from.name">

				<input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Your company address" x-model="from.address">

				<input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Additional info" x-model="from.extra">
			</div>
		</div>

		<div class="flex -mx-1 border-b py-2 items-start">
			<div class="flex-1 px-1">
				<p class="text-gray-800 uppercase tracking-wide text-sm font-bold">Description</p>
			</div>

			<div class="px-1 w-20 text-right">
				<p class="text-gray-800 uppercase tracking-wide text-sm font-bold">Units</p>
			</div>

			<div class="px-1 w-32 text-right">
				<p class="leading-none">
					<span class="block uppercase tracking-wide text-sm font-bold text-gray-800">Unit Price</span>
					<span class="font-medium text-xs text-gray-500">(Incl. GST)</span>
				</p>
			</div>

			<div class="px-1 w-32 text-right">
				<p class="leading-none">
					<span class="block uppercase tracking-wide text-sm font-bold text-gray-800">Amount</span>
					<span class="font-medium text-xs text-gray-500">(Incl. GST)</span>
				</p>
			</div>

			<div class="px-1 w-20 text-center">
			</div>
		</div>
		<draggable v-model="newInvoice.items">
			<Item
				v-for="(item, index) in newInvoice.items"
				:key="item.id"
				:index="index"
				:item-data="item"
				:invoice-items="newInvoice.items"
				@update="updateItem"
				@remove="removeItem"
			/>
		</draggable>
	    
		<button 
            class="mt-6 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded shadow-sm" 
            @click="addItem">
			Add Invoice Items
		</button>

		<div class="py-2 ml-auto mt-5 w-full sm:w-2/4 lg:w-1/4">
			<div class="flex justify-between mb-3">
				<div class="text-gray-800 text-right flex-1">Total incl. GST</div>
				<div class="text-right w-40">
					<div class="text-gray-800 font-medium" x-html="netTotal"></div>
				</div>
			</div>
			<div class="flex justify-between mb-4">
				<div class="text-sm text-gray-600 text-right flex-1">GST(18%) incl. in Total</div>
				<div class="text-right w-40">
					<div class="text-sm text-gray-600" x-html="totalGST"></div>
				</div>
			</div>
		
			<div class="py-2 border-t border-b">
				<div class="flex justify-between">
					<div class="text-xl text-gray-600 text-right flex-1">Amount due</div>
					<div class="text-right w-40">
						<div class="text-xl text-gray-800 font-bold" x-html="netTotal"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Print Template -->
		<div id="js-print-template" x-ref="printTemplate" class="hidden">
			<div class="mb-8 flex justify-between">
				<div>
					<h2 class="text-3xl font-bold mb-6 pb-2 tracking-wider uppercase">Invoice</h2>

					<div class="mb-1 flex items-center">
						<label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Invoice No.</label>
						<span class="mr-4 inline-block">:</span>
						<div x-text="invoiceNumber"></div>
					</div>
		
					<div class="mb-1 flex items-center">
						<label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Invoice Date</label>
						<span class="mr-4 inline-block">:</span>
						<div x-text="invoiceDate"></div>
					</div>
		
					<div class="mb-1 flex items-center">
						<label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Due date</label>
						<span class="mr-4 inline-block">:</span>
						<div x-text="invoiceDueDate"></div>
					</div>
				</div>
				<div class="pr-5">
					<div class="w-32 h-32 mb-1 overflow-hidden">
						<img id="image2" class="object-cover w-20 h-20" />
					</div>
				</div>
			</div>

			<div class="flex justify-between mb-10">
				<div class="w-1/2">
					<label class="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">Bill/Ship To:</label>
					<div>
						<div x-text="billing.name"></div>
						<div x-text="billing.address"></div>
						<div x-text="billing.extra"></div>
					</div>
				</div>
				<div class="w-1/2">
					<label class="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">From:</label>
					<div>
						<div x-text="from.name"></div>
						<div x-text="from.address"></div>
						<div x-text="from.extra"></div>
					</div>
				</div>
			</div>

			<div class="flex flex-wrap -mx-1 border-b py-2 items-start">
				<div class="flex-1 px-1">
					<p class="text-gray-600 uppercase tracking-wide text-xs font-bold">Description</p>
				</div>
	
				<div class="px-1 w-32 text-right">
					<p class="text-gray-600 uppercase tracking-wide text-xs font-bold">Units</p>
				</div>
	
				<div class="px-1 w-32 text-right">
					<p class="leading-none">
						<span class="block uppercase tracking-wide text-xs font-bold text-gray-600">Unit Price</span>
						<span class="font-medium text-xs text-gray-500">(Incl. GST)</span>
					</p>
				</div>
	
				<div class="px-1 w-32 text-right">
					<p class="leading-none">
						<span class="block uppercase tracking-wide text-xs font-bold text-gray-600">Amount</span>
						<span class="font-medium text-xs text-gray-500">(Incl. GST)</span>
					</p>
				</div>
			</div>
			<template :key="">
				<div class="flex flex-wrap -mx-1 py-2 border-b">
					<div class="flex-1 px-1">
						<p class="text-gray-800" x-text="invoice.name"></p>
					</div>
	
					<div class="px-1 w-32 text-right">
						<p class="text-gray-800" x-text="invoice.qty"></p>
					</div>
	
					<div class="px-1 w-32 text-right">
						<p class="text-gray-800" x-text="numberFormat(invoice.rate)"></p>
					</div>
	
					<div class="px-1 w-32 text-right">
						<p class="text-gray-800" x-text="numberFormat(invoice.total)"></p>
					</div>
				</div>
			</template>

			<div class="py-2 ml-auto mt-20" style="width: 320px">
				<div class="flex justify-between mb-3">
					<div class="text-gray-800 text-right flex-1">Total incl. GST</div>
					<div class="text-right w-40">
						<div class="text-gray-800 font-medium" x-html="netTotal"></div>
					</div>
				</div>
				<div class="flex justify-between mb-4">
					<div class="text-sm text-gray-600 text-right flex-1">GST(18%) incl. in Total</div>
					<div class="text-right w-40">
						<div class="text-sm text-gray-600" x-html="totalGST"></div>
					</div>
				</div>
			
				<div class="py-2 border-t border-b">
					<div class="flex justify-between">
						<div class="text-xl text-gray-600 text-right flex-1">Amount due</div>
						<div class="text-right w-40">
							<div class="text-xl text-gray-800 font-bold" x-html="netTotal"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
        </div>


		<button @click="submitInvoiceData">Click me</button>
</div>
</template>

	<script>
	import axios from 'axios'
	import draggable from 'vuedraggable'
	import DatePicker from 'vue2-datepicker';
  	import 'vue2-datepicker/index.css';
  	import { mapGetters, mapActions } from 'vuex'
	import Guid from 'guid'
	import moment from 'moment'
	import InvoiceStub from '../../../stub/invoice'

    import Item from './Item'
    import CustomerSelect from './CustomerSelect'

    export default {
        components: {
			Item,
			draggable,
			DatePicker,
			CustomerSelect
        },

        data() {
            return {
				loading: true,
				newInvoice: {
					invoice_date: null,
					due_date: null,
					invoiceNumber: 0,
					customer_id: 1,
					invoice_template_id: 1,
					sub_total: null,
					total: null,
					tax: null,
					notes: null,
					discount_type: 'fixed',
					discount_val: 0,
					discount: 0,
					reference_number: null,
					items: [{
						...InvoiceStub,
						//id: Guid.raw()
					}],
				},
				showTooltip: false,
				showTooltip2: false,
				openModal: false,
                
            }
        },

		watch: {
			item: {
				handler: 'updateItem',
				deep: true
			},
		},

        methods: {

			...mapActions({
				createInvoice: 'invoices/createInvoice'
			}), 
            addItem() {
                this.newInvoice.items.push({
                    ...InvoiceStub,
					//id: Guid.raw()
                })
            },

			updateItem (data) {
				console.log('update', data)
				Object.assign(this.newInvoice.items[data.index], {...data.item})
			},

			removeItem (index) {
				this.newInvoice.items.splice(index, 1)
			},

			onValueSelect(value) {
				this.newInvoice.items.push(value)

				console.log(this.newInvoice.items)
			},

			submitInvoiceData() {
				let data = {
					...this.newInvoice,
					invoice_date: moment().format('DD/MM/YYYY'),
					due_date: moment().format('DD/MM/YYYY'),
					sub_total: 1,
					total: 2,
					tax: 1,
					company_id: 1,
					invoice_template_id: ''
				}
				//console.log('DATA', data)
				this.createInvoice({data})
			}

        },
    }
	</script>

