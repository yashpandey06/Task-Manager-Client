import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Columns from "./Columns";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Popup from "./Popup/Popup";
import { useNavigate } from "react-router-dom";
import SummariserIcon from "./icons/SummariserIcon";

interface TypeColumn {
  id: number | string;
  title: string;
  tasks: [];
}

export default function Board() {
  const [popupState, setPopupState] = useState<boolean>(false);
  const [summariser, setSummariser] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [colId, setColId] = useState<string | number>();
  const [title, setTitle] = useState<string>("");
  const isSmall = window.innerWidth <= 600;
  const storedDummyState = localStorage.getItem("dummyState");
  const defaultDummyState = storedDummyState
    ? JSON.parse(storedDummyState)
    : [
        {
          id: "1",
          title: "Work in Progress",
        },
        {
          id: "2",
          title: "Tasks",
        },
        {
          id: "3",
          title: "Done",
        },
      ];
  const [cols, setCols] = useState<TypeColumn[]>([
    {
      id: defaultDummyState[0].id,
      title: defaultDummyState[0].title,
      tasks: [],
    },
    {
      id: defaultDummyState[1].id,
      title: defaultDummyState[1].title,
      tasks: [],
    },
    {
      id: defaultDummyState[2].id,
      title: defaultDummyState[2].title,
      tasks: [],
    },
  ]);

  async function handleDeleteTask(id: string, author: string) {
    try {
      const token = Cookies.get("auth-token");
      const url = `https://task-backened-65u3.onrender.com/board/${author}/${id}`;
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res && res.status === 200) {
        await Toggledel();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const navigate = useNavigate();

  async function Toggledel() {
    await getBoardData();
    navigate("/dashboard");
  }

  function handleAddTask({
    id,
    title,
  }: {
    id: number | string;
    title: string;
  }) {
    setColId(id);
    setTitle(title);
    OpenModel();
  }

  function OpenModel() {
    setPopupState(true);
  }

  function CloseModel() {
    setPopupState(false);
  }

  async function getBoardData() {
    try {
      const token = Cookies.get("auth-token");
      const url = "https://task-backened-65u3.onrender.com/board";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedCols = [
        {
          id: defaultDummyState[0].id,
          title: defaultDummyState[0].title,
          tasks: response.data.progress || [],
        },
        {
          id: defaultDummyState[1].id,
          title: defaultDummyState[1].title,
          tasks: response.data.done || [],
        },
        {
          id: defaultDummyState[2].id,
          title: defaultDummyState[2].title,
          tasks: response.data.todo || [],
        },
      ];

      const newCols = updatedCols.map((col) => {
        if (col.title.toLowerCase().trim().includes("progress")) {
          col.tasks = response.data.progress || [];
        } else if (col.title.toLowerCase().trim().includes("done")) {
          col.tasks = response.data.done || [];
        } else if (col.title.toLowerCase().trim().includes("tasks")) {
          col.tasks = response.data.todo || [];
        }

        return {
          id: col.id,
          title: col.title,
          tasks: col.tasks,
        };
      });

      setCols(newCols);
      toggleSummariserSection();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getBoardData();
  }, [popupState]);

  async function toggleSummariserSection() {
    await fetchData();
    setSummariser(true);
    setTimeout(() => {
      setSummariser(false);
    }, 2000);
  }
  function handleOnDragEnd(result: DropResult) {
    const { destination, source, type } = result;
    if (!destination) return;

    // Handle the column
    if (type === "column") {
      const dummy: TypeColumn[] = Array.from(cols);
      const [removed] = dummy.splice(source.index, 1);
      dummy.splice(destination.index, 0, removed);
      setCols(dummy);

      const newColState = dummy.map((item) => {
        return {
          id: item.id,
          title: item.title,
        };
      });
      const dummyString = JSON.stringify(newColState);
      localStorage.setItem("dummyState", dummyString);
    }
    if (type === "cards") {
      console.log(destination);
      console.log(source);
    }
  }

  const fetchData = async () => {
    const url = "https://task-backened-65u3.onrender.com/kanban";
    const token = Cookies.get("auth-token");

    if (token) {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const index = response.data.email.indexOf("@");
        setUsername(response.data.email.substring(0, index));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.error("Error: No authentication token found.");
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="summariser  text-black italic flex items-center justify-center p-2 gap-8 relative md:-top-8">
        <div>
          <SummariserIcon summariser={summariser} />
        </div>

        <div className="text-md">
          {`Hey `}
          <strong className="text-red-500">{username}</strong>
          {cols.map((item) => (
            <div>
              {`Currently , there are ${item.tasks.length} tasks  in `}
              <strong className="text-blue-500">{`${item.title.toUpperCase()}`}</strong>
            </div>
          ))}
        </div>
      </div>
      {popupState && colId ? (
        <Popup title={title} id={colId} CloseModel={CloseModel} />
      ) : (
        <></>
      )}
      <Droppable
        droppableId={cols[0].id.toString()}
        direction={isSmall ? "vertical" : "horizontal"}
        type="column"
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex md:flex-row flex-col gap-16 p-5 justify-center items-center md:items-start  md:justify-between lg:fixed"
          >
            {cols.map((item, index) => (
              <div key={item.id} className="">
                <Columns
                  index={index}
                  id={item.id}
                  todosTopic={item.title}
                  tasks={item.tasks}
                  handleDeleteTask={handleDeleteTask}
                  handleAddTask={handleAddTask}
                  title={item.title}
                />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
