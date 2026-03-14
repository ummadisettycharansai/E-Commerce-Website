import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi, categoriesApi } from '../../api/products';
import { adminApi } from '../../api/cart';
import AdminTable from '../../components/admin/AdminTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminProductsPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const { register, handleSubmit, reset } = useForm();

  const { data, isLoading } = useQuery({ queryKey: ['admin-products', page], queryFn: () => productsApi.getProducts({ page, limit: 20 }) });
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: categoriesApi.getCategories });

  const save = useMutation({
    mutationFn: (d: any) => editing ? productsApi.updateProduct(editing.id, d) : productsApi.createProduct({ ...d, price: +d.price, stock: +d.stock, sizes: d.sizes?.split(',').map((s: string) => s.trim()), colors: d.colors?.split(',').map((c: string) => c.trim()), images: d.images?.split(',').map((i: string) => i.trim()) || [] }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-products'] }); setModalOpen(false); reset(); setEditing(null); },
  });

  const del = useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const openEdit = (p: any) => { setEditing(p); reset({ ...p, sizes: p.sizes?.join(', '), colors: p.colors?.join(', '), images: p.images?.join(', ') }); setModalOpen(true); };
  const openCreate = () => { setEditing(null); reset({}); setModalOpen(true); };

  const columns = [
    { key: 'images', label: 'Image', render: (r: any) => <img src={r.images[0]} alt={r.name} className="w-12 h-12 object-cover rounded-lg" /> },
    { key: 'name', label: 'Name', render: (r: any) => <span className="font-medium">{r.name}</span> },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', render: (r: any) => `$${r.price.toFixed(2)}` },
    { key: 'stock', label: 'Stock' },
    { key: 'isActive', label: 'Status', render: (r: any) => <span className={`text-xs px-2 py-0.5 rounded-full ${r.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{r.isActive ? 'Active' : 'Inactive'}</span> },
    { key: 'actions', label: '', render: (r: any) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(r)} className="p-1.5 hover:bg-gray-100 rounded text-gray-600"><Pencil size={14} /></button>
        <button onClick={() => del.mutate(r.id)} className="p-1.5 hover:bg-red-50 rounded text-red-400"><Trash2 size={14} /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={openCreate} size="sm"><Plus size={16} />Add Product</Button>
      </div>

      <div className="card p-6">
        <AdminTable columns={columns} data={data?.products || []} loading={isLoading} />
        {data && data.pages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded text-sm ${p === page ? 'bg-primary text-white' : 'border hover:border-primary'}`}>{p}</button>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? 'Edit Product' : 'Add Product'}>
        <form onSubmit={handleSubmit((d) => save.mutate(d))} className="space-y-3">
          <Input label="Name" {...register('name', { required: true })} />
          <Input label="Description" {...register('description', { required: true })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Price" type="number" step="0.01" {...register('price', { required: true })} />
            <Input label="Sale Price" type="number" step="0.01" {...register('salePrice')} />
          </div>
          <Input label="Brand" {...register('brand', { required: true })} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select {...register('categoryId', { required: true })} className="input">
              {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <Input label="Sizes (comma separated: S, M, L)" {...register('sizes')} />
          <Input label="Colors (comma separated: BLACK, WHITE)" {...register('colors')} />
          <Input label="Images (comma separated URLs)" {...register('images')} />
          <Input label="Stock" type="number" {...register('stock')} />
          <Button type="submit" loading={save.isPending} className="w-full">{editing ? 'Update' : 'Create'} Product</Button>
        </form>
      </Modal>
    </div>
  );
}
