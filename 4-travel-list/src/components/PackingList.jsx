import Item from './Item';

const initialItems = [
    { id: 1, description: 'Passports', quantity: 2, packed: false },
    { id: 2, description: 'Socks', quantity: 12, packed: false },
    { id: 3, description: 'Towel', quantity: 1, packed: false },
    { id: 4, description: 'Underwear', quantity: 3, packed: true },
];

export default function PackingList() {
    return (
        <div className='list'>
            <ul>
                {initialItems.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                    />
                ))}
            </ul>
        </div>
    );
}
