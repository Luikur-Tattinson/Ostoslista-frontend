import './App.css';
import {useState,useEffect} from 'react';

const URL = 'http://localhost/ostoslista/';

function App() {
  const [items, setItems] = useState([]);
  const [itemdesc, setItem] = useState('');
  const [amnt, setAmount] = useState('');

  useEffect(() => {
    let status = 0;
    fetch(URL + 'index.php')
    .then(res => {
      status = parseInt(res.status);
      return res.json()
    })
    .then(
      (res) => {
        if (status === 200) {
          setItems(res);
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }, [])

  function save(e) {
    e.preventDefault();
    let status = 0;
    fetch(URL + 'add.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        description: itemdesc,
        amount: amnt
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          setItems(items => [...items, res]);
          setItem('');
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }

  function remove(id) {
    let status = 0;
    fetch(URL + 'delete.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          const newListWithoutRemoved = items.filter((item) => item.id !== id);
          setItems(newListWithoutRemoved);
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }

return (
  <div className="container">
    <h3>Shopping List</h3>
    <div>
      <form onSubmit={save}>
        <label>New Item</label>
        <input value={itemdesc} onChange={e => setItem(e.target.value)} placeholder="Type description"/>
        <input value={amnt} onChange={e => setAmount(e.target.value)} placeholder="Type amount"/>
        <button>Add</button>
      </form>
    </div>
    <ul>
      {items.map(itemdesc => (
        <li>{itemdesc.description}&nbsp;{itemdesc.amount}&nbsp;<a className="delete" onClick={() => remove(itemdesc.id)} href="#">Delete</a></li>
        
      ))}
        
        
    </ul>
  </div>
  );
}

export default App;