import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import GsServerAPI from '@/api/GsServerAPI';
import { useContext } from 'react';
import { UsersContext } from './Context/UserDataContext';

type Product = {
    productID?: string;
    name?: string;
    price: number;
    quantity?: number;
    description?: string;
    image?: string;
};

const Store: React.FC = () => {
    const { accessToken } = useContext(UsersContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // pagination state
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(12);
    const [total, setTotal] = useState<number | null>(null); // total items if server provides
    const [clientAll, setClientAll] = useState<Product[] | null>(null); // fallback when server has no paging

    useEffect(() => {
        const ac = new AbortController();

        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                // try server-side pagination first
                const res = await GsServerAPI.get('/product', {
                    params: { page, limit },
                    withCredentials: true,
                    signal: ac.signal
                });

                // common server shapes:
                // - array body: res.data = [ ... ] (no total) -> client-side paginate
                // - paged body: res.data.products = [...], res.data.total = number
                // - headers: X-Total-Count
                const data = res.data;
                const totalFromBody = data?.total ?? data?.count ?? null;
                const listFromBody = Array.isArray(data) ? data : (Array.isArray(data?.products) ? data.products : null);

                // if server returns an array and no total, fetch all once and use client pagination
                if (Array.isArray(data) && totalFromBody == null) {
                    // store full list for client-side paging
                    setClientAll(data);
                    setTotal(data.length);
                    // slice for current page
                    const start = (page - 1) * limit;
                    setProducts(data.slice(start, start + limit));
                } else if (listFromBody) {
                    // server returned page
                    setProducts(listFromBody);
                    // determine total items
                    const totalHeader = Number(res.headers?.['x-total-count'] ?? res.headers?.['X-Total-Count']);
                    setTotal(totalFromBody ?? (isNaN(totalHeader) ? null : totalHeader));
                    // clear clientAll if previously set
                    setClientAll(null);
                } else if (Array.isArray(data?.products)) {
                    setProducts(data.products);
                    setTotal(totalFromBody ?? null);
                    setClientAll(null);
                } else {
                    // fallback: try single product or unknown shape
                    const arr = Array.isArray(data) ? data : (data ? [data] : []);
                    setProducts(arr);
                    setTotal(arr.length);
                    setClientAll(null);
                }
            } catch (err: any) {
                if (err.name === 'CanceledError' || err.name === 'AbortError') return;
                console.error('Fetch products failed:', err);
                setError(err?.response?.data?.message || err.message || 'Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        return () => ac.abort();
    }, [page, limit]);

    // client-side pagination helpers when clientAll is set
    useEffect(() => {
        if (!clientAll) return;
        const start = (page - 1) * limit;
        setProducts(clientAll.slice(start, start + limit));
    }, [clientAll, page, limit]);

    const skeletonCount = 8;

    const totalPages = total ? Math.max(1, Math.ceil(total / limit)) : null;

    const goToPage = (p: number) => {
        if (p < 1) p = 1;
        if (totalPages && p > totalPages) p = totalPages;
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddtoCart = async (pID:string) => {
        console.log('Product ID:', pID);
        const packageItem = {
            productID: pID,
            quantity: 1
        };
        try {
            const response = await GsServerAPI.post("/cartItems", 
            packageItem,
            {
                headers: { 'Authorization': `Bearer ${accessToken}`},
                withCredentials: true
            });
            if (response.status === 200) {
                console.log("Add to cart successful:", response.data);
            }
        } catch (error) {   
            console.error("Add to cart failed:", error);
        }   
    };


    return (
        <div>
            <Header showNav={false} />
            <main className="min-h-[60vh] max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold mb-6">Store</h1>

                {error && (
                    <div className="mb-6 p-3 bg-red-100 text-red-800 rounded">{error}</div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: skeletonCount }).map((_, i) => (
                            <div key={i} className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800 animate-pulse">
                                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                                    <div className="h-8 w-10 bg-gray-200 dark:bg-gray-700 rounded ml-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.length === 0 ? (
                                <div className="col-span-full p-6 text-center text-gray-600">No products found.</div>
                            ) : (
                                products.map((p) => (
                                    <div key={p.productID ?? p.name ?? p.name} className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800 flex flex-col">
                                        <div className="h-40 mb-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded overflow-hidden">
                                            {p.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={p.image} alt={p.name ?? p.name} className="object-cover h-full w-full" />
                                            ) : (
                                                <div className="text-gray-400">{(p.name ?? p.name ?? 'P').slice(0, 1)}</div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-lg mb-1 text-gray-900 dark:text-gray-100">{p.name ?? p.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">{p.description}</p>
                                        </div>
                                        <div className="mt-3 flex items-center">
                                            <div className="text-lg font-semibold text-amber-600">${p.price?.toFixed?.(2) ?? p.price}</div>
                                            <button className="ml-auto px-3 py-1.5 bg-amber-500 text-white rounded hover:opacity-90" 
                                            onClick={() => handleAddtoCart(p.productID ?? '')}
                                            disabled={p.quantity <= 0}
                                            >Add</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination controls */}
                        <div className="mt-6 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => goToPage(page - 1)}
                                    disabled={page <= 1}
                                    className="px-3 py-1 rounded border bg-white disabled:opacity-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                >
                                    Prev
                                </button>

                                {totalPages ? (
                                    // show simple pages with ellipsis when many pages
                                    <div className="flex items-center gap-1 ml-2">
                                        {Array.from({ length: totalPages }).map((_, i) => {
                                            const p = i + 1;
                                            // limit shown page buttons for readability
                                            if (totalPages > 10) {
                                                if (p === 1 || p === totalPages || Math.abs(p - page) <= 1 || p === page - 2 || p === page + 2) {
                                                    return (
                                                        <button
                                                            key={p}
                                                            onClick={() => goToPage(p)}
                                                            className={`px-2 py-1 rounded ${p === page ? 'bg-amber-500 text-white' : 'bg-white border '}`}
                                                        >
                                                            {p}
                                                        </button>
                                                    );
                                                }
                                                // show ellipsis if needed
                                                if (p === 2 && page > 4) return <span key="e1" className="px-2">…</span>;
                                                if (p === totalPages - 1 && page < totalPages - 3) return <span key="e2" className="px-2">…</span>;
                                                return null;
                                            }
                                            return (
                                                <button
                                                    key={p}
                                                    onClick={() => goToPage(p)}
                                                    className={`px-2 py-1 rounded ${p === page ? 'bg-amber-500 text-white' : 'bg-white border dark:bg-gray-900 text-gray-900 dark:text-gray-100'}`}
                                                >
                                                    {p}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    // unknown total: show current page and Prev/Next
                                    <div className="ml-2 text-sm text-gray-600">Page {page}</div>
                                )}

                                <button
                                    onClick={() => goToPage(page + 1)}
                                    disabled={totalPages ? page >= totalPages : products.length < limit}
                                    className="px-3 py-1 rounded border bg-white disabled:opacity-50 ml-2 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                >
                                    Next
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">Per page:</label>
                                <select
                                    value={limit}
                                    onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                                    className="border rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                >
                                    {[8, 12, 24, 48].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Store;