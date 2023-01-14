import {
  Button,
  Checkbox,
  Divider,
  Input,
  InputRef,
  List,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addData, getData, updateTodo } from "../../store/todo";
// import { addTodo, doneTodo } from "../../store/todo";

export default function Todo() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { isLoading, dataList } = useSelector((state) => state);
  const [inputData, setInputData] = useState("");

  const id = new Date().getTime();

  const fetchData = () => {
    dispatch(getData())
      .unwrap()
      .then((data) => {
        console.log(data);
      });
  };

  const addTodoHandler = () => {
    const data = {
      text: inputData,
      done: false,
      id,
    };

    if (!inputData) {
      messageApi.open({
        type: "error",
        content: "Text required",
      });
    } else {
      dispatch(addData(data))
        .unwrap()
        .then(() => {
          setInputData("");
          fetchData();
        });
    }
  };
  const todoOnChangeHandler = (id, isDone) => {
    console.log(isDone);
    dispatch(updateTodo({ id, done: !isDone }))
      .unwrap()
      .then(() => {
        fetchData();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {contextHolder}

      <Title>My Todo App</Title>
      <Divider />
      <Input.Group compact>
        <Input
          style={{ width: "calc(100% - 200px)" }}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Button type="primary" onClick={addTodoHandler}>
          Add Todo
        </Button>
      </Input.Group>
      <Divider />
      <List
        loading={isLoading}
        size="small"
        header={<div>Todo CheckList</div>}
        bordered
        dataSource={dataList}
        renderItem={(item, index) => (
          <List.Item>
            <Checkbox
              checked={item?.done}
              onChange={() => todoOnChangeHandler(item?.id, item?.done)}
            >
              {item?.text}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
}
