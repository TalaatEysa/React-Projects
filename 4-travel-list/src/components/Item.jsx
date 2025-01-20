export default function Item({ item, onDeleteItem }) {
    return (
        <li>
            <span style={{ textDecoration: item.packed ? 'line-through' : '' }}>
                {item.description} {item.quantity}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}
