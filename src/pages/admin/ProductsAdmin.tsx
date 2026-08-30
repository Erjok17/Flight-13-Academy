import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import { API_URL } from '../../config/api';

const emptyForm = {
  name: '', price: '', category: '', sizes: '', colors: '',
  image_url: '', description: '', details: '', in_stock: true,
};

const ProductsAdmin = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (product: any) => {
    setEditing(product);
    setForm({
      name: product.name || '',
      price: product.price || '',
      category: product.category || '',
      sizes: (product.sizes || []).join(', '),
      colors: (product.colors || []).join(', '),
      image_url: product.image_url || '',
      description: product.description || '',
      details: (product.details || []).join(', '),
      in_stock: product.in_stock !== false,
    });
    setShowForm(true);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setForm(prev => ({ ...prev, image_url: data.url }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Network error during upload');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      ...form,
      price: parseFloat(form.price as any) || 0,
      sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()).filter(Boolean) : [],
      colors: form.colors ? form.colors.split(',').map(s => s.trim()).filter(Boolean) : [],
      details: form.details ? form.details.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    try {
      const url = editing ? `${API_URL}/api/products/${editing.id}` : `${API_URL}/api/products`;
      const method = editing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setShowForm(false);
        setEditing(null);
        setForm(emptyForm);
        fetchProducts();
      } else {
        alert(data.error || 'Failed to save product');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Network error while saving product');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) fetchProducts();
      else alert(data.error || 'Failed to delete product');
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const inputStyle = { padding: '12px', border: '1px solid #ddd', borderRadius: '8px' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px' }}>Manage Products</h3>
        <button onClick={openAdd} style={{ backgroundColor: 'var(--red)', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '20px' }}>{editing ? 'Edit Product' : 'Add New Product'}</h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input name="name" placeholder="Product Name *" value={form.name} onChange={handleChange} required style={inputStyle} />
            <input name="price" type="number" placeholder="Price (UGX) *" value={form.price} onChange={handleChange} required style={inputStyle} />
            <input name="category" placeholder="Category (e.g., Jerseys)" value={form.category} onChange={handleChange} style={inputStyle} />
            <input name="sizes" placeholder="Sizes (comma separated)" value={form.sizes} onChange={handleChange} style={inputStyle} />
            <input name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleChange} style={inputStyle} />

            <div style={{ gridColumn: '1/3' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Product Image</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {form.image_url && (
                  <img src={form.image_url} alt="Preview" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#f0f0f0', border: '1px dashed #999', borderRadius: '8px', cursor: uploading ? 'wait' : 'pointer' }}
                >
                  <Upload size={16} />
                  {uploading ? 'Uploading...' : form.image_url ? 'Replace Image' : 'Upload Image'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={2} style={{ ...inputStyle, gridColumn: '1/3' }} />
            <textarea name="details" placeholder="Details (comma separated)" value={form.details} onChange={handleChange} rows={2} style={{ ...inputStyle, gridColumn: '1/3' }} />

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: '1/3' }}>
              <input type="checkbox" name="in_stock" checked={form.in_stock} onChange={handleChange} />
              In Stock
            </label>

            <div style={{ gridColumn: '1/3', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" disabled={uploading} style={{ padding: '10px 24px', backgroundColor: 'var(--red)', color: 'white', border: 'none', borderRadius: '8px', cursor: uploading ? 'wait' : 'pointer' }}>
                {editing ? 'Update' : 'Add'} Product
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '12px' }}>Image</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Price</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Category</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Stock</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                  ) : '—'}
                </td>
                <td style={{ padding: '12px' }}>{product.name}</td>
                <td style={{ padding: '12px' }}>UGX {Number(product.price).toLocaleString()}</td>
                <td style={{ padding: '12px' }}>{product.category || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{product.in_stock ? 'In Stock' : 'Out of Stock'}</td>
                <td style={{ padding: '12px' }}>
                  <button onClick={() => openEdit(product)} style={{ color: 'var(--red)', cursor: 'pointer', background: 'none', border: 'none', marginRight: '8px' }}><Edit size={16} /></button>
                  <button onClick={() => deleteProduct(product.id)} style={{ color: '#f44336', cursor: 'pointer', background: 'none', border: 'none' }}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#888' }}>No products added yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsAdmin;