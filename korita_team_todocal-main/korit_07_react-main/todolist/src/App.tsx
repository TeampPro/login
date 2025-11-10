import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BASE_URL = 'http://localhost:8080/api/items';

export interface Item {
  id: number;
  name: string;
  quantity: number;
}

export async function fetchItems(): Promise<Item[]> {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export async function createItem(item: Omit<Item, 'id'>): Promise<Item> {
  const res = await axios.post(BASE_URL, item);
  return res.data;
}

export async function updateItem(id: number, item: Omit<Item, 'id'>): Promise<Item> {
  const res = await axios.put(`${BASE_URL}/${id}`, item);
  return res.data;
}

export async function deleteItem(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`);
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingQuantity, setEditingQuantity] = useState(1);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleAdd = async () => {
    if (!newName) return;
    const newItem = await createItem({ name: newName, quantity: newQuantity });
    setItems([...items, newItem]);
    setNewName('');
    setNewQuantity(1);
  };

  const handleDelete = async (id: number) => {
    await deleteItem(id);
    setItems(items.filter(item => item.id !== id));
    setSelectedItems(selectedItems.filter(sid => sid !== id));
  };

  const startEditing = (item: Item) => {
    setEditingId(item.id);
    setEditingName(item.name);
    setEditingQuantity(item.quantity);
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    const updated = await updateItem(editingId, { name: editingName, quantity: editingQuantity });
    setItems(items.map(item => (item.id === editingId ? updated : item)));
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setEditingQuantity(1);
  };

  const toggleSelect = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const deleteSelected = async () => {
    for (let id of selectedItems) {
      await deleteItem(id);
    }
    setItems(items.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <p>할 일들을 작성해보세요</p>

      <input
        placeholder="Item name"
        value={newName}
        onChange={e => setNewName(e.target.value)}
      />
      <input
        type="number"
        min={1}
        value={newQuantity}
        onChange={e => setNewQuantity(Number(e.target.value))}
      />
      <button onClick={handleAdd}>추가</button>

      {selectedItems.length > 0 && (
        <button className="delete-selected" onClick={deleteSelected}>
          삭제 ({selectedItems.length})
        </button>
      )}

      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleSelect(item.id)}
            />
            {editingId === item.id ? (
              <>
                <input
                  value={editingName}
                  onChange={e => setEditingName(e.target.value)}
                />
                <input
                  type="number"
                  min={1}
                  value={editingQuantity}
                  onChange={e => setEditingQuantity(Number(e.target.value))}
                />
                <button onClick={saveEdit}>저장</button>
                <button onClick={cancelEdit}>취소</button>
              </>
            ) : (
              <>
                {item.name} - {item.quantity}{' '}
                <button onClick={() => startEditing(item)}>수정</button>
                <button onClick={() => handleDelete(item.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
