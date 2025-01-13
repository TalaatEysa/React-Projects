export default function Item({ item }) {
    return (
        <li>
            <span style={{ textDecoration: item.packed ? 'line-through' : '' }}>
                {item.description} {item.quantity}
            </span>
            <button>❌</button>
        </li>
    );
}
