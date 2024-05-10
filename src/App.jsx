import { useEffect, useState } from "react";
import Success from "./components/Success";
import Users from "./components/Users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка при получении пользователей");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onSendInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(invites.filter((item) => item !== id));
    } else {
      setInvites([...invites, id]);
    }
  };

  const onClickSendInvites = () => {
    if (invites.length === 0) {
      alert("Вы не выбрали ни одного пользователя");
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onSendInvite={onSendInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
};

export default App;
