import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setshowAddFriend] = useState(false);
  function handleshowAddfriend() {
    setshowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setshowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />

        {showAddFriend && <FormAddfriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleshowAddfriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>
      <Formsplit />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function FormAddfriend({ onAddFriend }) {
  const [name, setname] = useState("");
  const [image, setimage] = useState("https://i.pravatar.cc/48");

  function handlesubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newfriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newfriend);
    onAddFriend(newfriend);
    setname("");
    setimage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handlesubmit}>
      <label>🌍 friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />

      <label>🌄 Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setimage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Formsplit() {
  return (
    <form className="form-split-bill">
      <h2> Split a Bill with X</h2>
      <label>🌍Bill Value</label>
      <input type="text" />
      <label>🌄Your expense</label>
      <input type="text" />
      <label>🫂X s expense</label>
      <input type="text" disabled />
      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
