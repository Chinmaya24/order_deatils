import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDetails = () => {
    const [details, setDetails] = useState([]);
    const [formData, setFormData] = useState({
        order_id: '', item_id: '', quantity: '', unit_price: ''
    });

    useEffect(() => { fetchDetails(); }, []);

    const fetchDetails = () => {
        axios.get('http://localhost:8080/api/order-details')
            .then(res => setDetails(res.data))
            .catch(err => console.error(err));
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/order-details', formData)
            .then(res => {
                setDetails([...details, res.data]);
                setFormData({ order_id: '', item_id: '', quantity: '', unit_price: '' });
            });
    };

    const deleteDetail = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:8080/api/order-details/${id}`)
                .then(() => setDetails(details.filter(item => (item.order_detail_id || item.orderDetailId) !== id)));
        }
    };

    const markDelivered = (id) => {
        axios.put(`http://localhost:8080/api/order-details/${id}/deliver`)
            .then(res => setDetails(details.map(item => (item.order_detail_id || item.orderDetailId) === id ? res.data : item)));
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Order Management Dashboard</h1>
                <p style={styles.subtitle}>Core Infrastructure</p>
            </header>

            {/* Glassmorphism Form Card */}
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Add New Order Detail</h3>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input name="order_id" placeholder="Order ID" value={formData.order_id} onChange={handleChange} style={styles.input} required />
                    <input name="item_id" placeholder="Item ID" value={formData.item_id} onChange={handleChange} style={styles.input} required />
                    <input name="quantity" type="number" placeholder="Qty" value={formData.quantity} onChange={handleChange} style={styles.input} required />
                    <input name="unit_price" type="number" placeholder="Unit Price (₹)" value={formData.unit_price} onChange={handleChange} style={styles.input} required />
                    <button type="submit" style={styles.addButton}>Add to Record</button>
                </form>
            </div>

            {/* Modern Table Container */}
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeaderRow}>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Order</th>
                            <th style={styles.th}>Item</th>
                            <th style={styles.th}>Quantity</th>
                            <th style={styles.th}>Total (₹)</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((row, index) => {
                            const id = row.order_detail_id || row.orderDetailId;
                            const isDelivered = row.status === 'Delivered';
                            return (
                                <tr key={id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                    <td style={styles.td}>{id}</td>
                                    <td style={styles.td}>#{row.order_id}</td>
                                    <td style={styles.td}>ID: {row.item_id}</td>
                                    <td style={styles.td}>{row.quantity}</td>
                                    <td style={styles.td}><strong>₹{row.subtotal}</strong></td>
                                    <td style={styles.td}>
                                        <span style={isDelivered ? styles.badgeSuccess : styles.badgePending}>
                                            {row.status || 'Ordered'}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <button 
                                            onClick={() => markDelivered(id)} 
                                            disabled={isDelivered}
                                            style={isDelivered ? styles.disabledBtn : styles.deliverBtn}
                                        >
                                            Deliver
                                        </button>
                                        <button onClick={() => deleteDetail(id)} style={styles.deleteBtn}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Modern UI Styles ---
const styles = {
    container: { padding: "40px", backgroundColor: "#f4f7f6", minHeight: "100vh", fontFamily: "'Inter', sans-serif" },
    header: { marginBottom: "30px", textAlign: "center" },
    title: { color: "#2d3436", fontSize: "2.5rem", fontWeight: "bold", margin: "0" },
    subtitle: { color: "#636e72", fontSize: "1rem", marginTop: "5px" },
    card: { background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", marginBottom: "40px" },
    cardTitle: { marginTop: "0", marginBottom: "20px", color: "#2d3436" },
    form: { display: "flex", gap: "15px", flexWrap: "wrap" },
    input: { flex: "1", padding: "12px", borderRadius: "8px", border: "1px solid #dfe6e9", fontSize: "14px", outline: "none" },
    addButton: { padding: "12px 24px", background: "#6c5ce7", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", transition: "0.3s" },
    tableWrapper: { background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" },
    table: { width: "100%", borderCollapse: "collapse" },
    tableHeaderRow: { background: "#f9f9f9", textAlign: "left" },
    th: { padding: "18px", color: "#636e72", fontWeight: "600", borderBottom: "1px solid #f1f2f6" },
    td: { padding: "18px", color: "#2d3436", borderBottom: "1px solid #f1f2f6" },
    evenRow: { backgroundColor: "#fff" },
    oddRow: { backgroundColor: "#fcfcfc" },
    badgeSuccess: { padding: "5px 12px", borderRadius: "20px", background: "#dff9fb", color: "#00b894", fontSize: "12px", fontWeight: "bold" },
    badgePending: { padding: "5px 12px", borderRadius: "20px", background: "#fff3e0", color: "#e67e22", fontSize: "12px", fontWeight: "bold" },
    deliverBtn: { background: "#00b894", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "6px", cursor: "pointer", marginRight: "8px" },
    deleteBtn: { background: "#ff7675", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "6px", cursor: "pointer" },
    disabledBtn: { background: "#dfe6e9", color: "#b2bec3", border: "none", padding: "8px 15px", borderRadius: "6px", cursor: "not-allowed", marginRight: "8px" }
};

export default OrderDetails;
