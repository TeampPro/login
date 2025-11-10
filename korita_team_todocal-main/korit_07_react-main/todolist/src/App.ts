const BASE_URL = 'http://localhost:8080/api/items';

export interface Item {
  id: number;
  name: string;
  quantity: number;
}

export async function fetchItems(): Promise<Item[]> {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createItem(item: Omit<Item, 'id'>): Promise<Item> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function updateItem(id: number, item: Omit<Item, 'id'>): Promise<Item> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function deleteItem(id: number): Promise<void> {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
}
