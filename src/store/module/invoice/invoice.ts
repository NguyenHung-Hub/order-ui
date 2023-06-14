import { ActionContext } from 'vuex';
import { RootState, StoreBase } from '../../../interfaces/store.interface';
import { IInvoiceResponse, IInvoiceStatus, TInvoiceStatus } from '../../../interfaces/invoice.interface';
import * as invoiceService from '../../../services/invoice.service';

interface InvoicesState {
    invoices: IInvoiceStatus;
    error: any;
}

export interface IMoveInvoiceData {
    invoice: IInvoiceResponse;
    from: TInvoiceStatus;
    to: TInvoiceStatus;
}

const productStore: StoreBase = {
    state(): InvoicesState {
        return {
            invoices: {
                waitingConfirm: [],
                serving: [],
                finish: [],
                cancel: [],
            },
            error: null,
        };
    },
    mutations: {
        setInvoicesWaiting(state: InvoicesState, invoicesPayload: IInvoiceResponse[]) {
            state.invoices.waitingConfirm = invoicesPayload;
        },
        addInvoiceWaiting(state: InvoicesState, invoicePayload: IInvoiceResponse) {
            state.invoices.waitingConfirm = [...state.invoices.waitingConfirm, invoicePayload];
        },

        setInvoicesServing(state: InvoicesState, invoicesPayload: IInvoiceResponse[]) {
            state.invoices.serving = invoicesPayload;
            console.log(`file: invoice.ts:39 > invoicesPayload:`, invoicesPayload);
        },
        addInvoiceServing(state: InvoicesState, invoicePayload: IInvoiceResponse) {
            state.invoices.serving = [...state.invoices.serving, invoicePayload];
        },

        setInvoicesFinish(state: InvoicesState, invoicesPayload: IInvoiceResponse[]) {
            state.invoices.finish = invoicesPayload;
        },
        addInvoiceFinish(state: InvoicesState, invoicePayload: IInvoiceResponse) {
            state.invoices.finish = [invoicePayload, ...state.invoices.finish];
        },

        setInvoicesCancel(state: InvoicesState, invoicesPayload: IInvoiceResponse[]) {
            state.invoices.cancel = invoicesPayload;
        },
        addInvoiceCancel(state: InvoicesState, invoicePayload: IInvoiceResponse) {
            state.invoices.cancel = [invoicePayload, ...state.invoices.cancel];
        },

        /**
         * Remove invoice -> data.from then add invoice updated status -> data.to
         * @param state
         * @param data
         */
        moveInvoice(state: InvoicesState, data: IMoveInvoiceData) {
            state.invoices[data.from] = state.invoices[data.from].filter((item) => item._id != data.invoice._id);
            state.invoices[data.to] = [...state.invoices[data.to], data.invoice];
        },

        updateInvoiceItemsServing(state: InvoicesState, data: IInvoiceResponse) {
            state.invoices.serving = state.invoices.serving.map((invoice) => {
                if (invoice._id == data._id) {
                    return data;
                }
                return invoice;
            });
        },

        setError(state: InvoicesState, errorPayload: any) {
            state.error = errorPayload;
        },
    },
    actions: {
        async fetchInvoices(context: ActionContext<InvoicesState, RootState>, shopId: string) {
            try {
                const result: IInvoiceResponse[] | undefined = await invoiceService.getByShop(shopId);
                console.log(`file: invoice.ts:77 > result:`, result);

                if (!result) {
                    context.commit('setError', 'undefined');
                    return;
                }

                new Promise<IInvoiceStatus>((resolve, reject) => {
                    const waitingConfirm: IInvoiceResponse[] = [];
                    const serving: IInvoiceResponse[] = [];
                    const finish: IInvoiceResponse[] = [];
                    const cancel: IInvoiceResponse[] = [];
                    result.forEach((invoice) => {
                        if (invoice.status === 'waitingConfirm') {
                            waitingConfirm.push(invoice);
                        } else if (invoice.status === 'serving') {
                            serving.push(invoice);
                        } else if (invoice.status === 'finish') {
                            finish.push(invoice);
                        } else if (invoice.status === 'cancel') {
                            cancel.push(invoice);
                        } else {
                            console.error(`status ${invoice.status} is  not supported`, invoice);
                        }
                    });

                    resolve({ waitingConfirm, serving, finish, cancel });
                }).then((data: IInvoiceStatus) => {
                    console.log(`file: invoice.ts:105 > data:`, data);

                    context.commit('setInvoicesWaiting', data.waitingConfirm);

                    context.commit('setInvoicesServing', data.serving);
                    context.commit('setInvoicesFinish', data.finish);
                    context.commit('addInvoiceCancel', data.cancel);
                });
            } catch (error) {
                console.log(`file: orders.ts:82 > error:`, error);
            }
        },

        addInvoiceWaiting(context: ActionContext<InvoicesState, RootState>, data: IMoveInvoiceData) {
            context.commit('addInvoiceWaiting', data);
        },
        addInvoiceServing(context: ActionContext<InvoicesState, RootState>, data: IMoveInvoiceData) {
            context.commit('addInvoiceServing', data);
        },
        getInvoiceServing(context: ActionContext<InvoicesState, RootState>, id: string) {
            return context.state.invoices.serving.filter((i) => i._id === id)[0];
        },

        moveInvoice(context: ActionContext<InvoicesState, RootState>, data: IMoveInvoiceData) {
            context.commit('moveInvoice', data);
        },
        updateInvoiceItemsDone(context: ActionContext<InvoicesState, RootState>, data: IInvoiceResponse[]) {
            data.forEach((newInvoice) => {
                context.commit('updateInvoiceItemsServing', newInvoice);
            });
        },
        updateInvoiceItemsDelivered(context: ActionContext<InvoicesState, RootState>, data: IInvoiceResponse) {
            context.commit('updateInvoiceItemsServing', data);
        },
    },

    getters: {
        invoices: (state: InvoicesState) => state.invoices,
    },
};

export default productStore;
