'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import { updateInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="font-medium" htmlFor="customerId">Customer</label>
          <select
            id="customerId"
            name="customerId"
            defaultValue={invoice.customerId}
            className="rounded border px-3 py-2"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-medium" htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            defaultValue={invoice.amount}
            className="rounded border px-3 py-2"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-medium" htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            defaultValue={invoice.status}
            className="rounded border px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}