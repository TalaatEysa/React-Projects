import Item from './Item';

export default function PackingList({items, onDeleteItem}) {
    return (
        <div className='list'>
            <ul>
                {items.map((item) => (
                    <Item
                        key={item.id}
                        item={ item }
                        onDeleteItem={onDeleteItem}
                    />
                ))}
            </ul>
        </div>
    );
}
