import { Draggable, Droppable } from "react-beautiful-dnd";
import GarbageIcon from "./icons/GarbageIcon";
import EditIcon from "./icons/EditIcon";

export default function Columns({
  index,
  id,
  todosTopic,
  tasks,
  handleDeleteTask,
  handleAddTask,
  title,
}) {
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* rendering the droppable tasks inside draggable tasks */}
          <Droppable droppableId={id.toString()} type="cards">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl bg-black/5 text-black shadow-md w-[400px] hover:shadow-xl`}
              >
                <h1 className="flex justify-between items-center px-3 p-1">
                  <h2 className="font-bold text-lg">{todosTopic}</h2>
                  <h3 className="text-white font-bold bg-gray-500 rounded-xl px-[7px] flex items-center justify-center">
                    {tasks.length}
                  </h3>
                </h1>

                <div>
                  {tasks.map((item, i) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id.toString()}
                      index={i}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          className="bg-white/75 m-2 rounded-2xl  shadow-sm p-3  flex items-center justify-between "
                        >
                          <div className="font-medium">{item.Task}</div>

                          <button
                            onClick={() =>
                              handleDeleteTask(item._id, item.author)
                            }
                          >
                            <GarbageIcon />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                <button
                  onClick={() => handleAddTask({ id, title })}
                  className="bg-blue-500 rounded-full flex justify-center items-center w-10 h-10 text-white "
                >
                  <EditIcon />
                </button>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
