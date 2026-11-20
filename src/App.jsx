
import { useState } from 'react'
import TodoForm from './components/TodoForm'
import LihatDetail from './components/LihatDetail'
import './App.css'

function App() {
    const [todos, setTodos] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTodo, setEditingTodo]=useState(null)
    const [detailId, setDetailId]=useState(null)

    function handleAdd(todo) {
        setTodos(prev => [...prev, todo])
        setIsModalOpen(false)
    }

    function handleDelete(id) {
        setTodos(prev => prev.filter(todo => todo.id !== id))
        if(detailId===id){
            setDetailId(null)
        }
    }
    function handleSee(id){
        if(detailId===id){
            setDetailId(null)
        }else{
            setDetailId(id)
        }
    }
    function handleUpdate(todo){
        setEditingTodo(todo)
        setDetailId(null)
        setIsModalOpen(true)
    }
    function handleSaveUpdate(todoBaru) {
    setTodos(prev =>
        prev.map(todo => {
            if (todo.id === todoBaru.id) {
                return todoBaru;
            }

            return todo;
        })
    );

    setEditingTodo(null);
    setIsModalOpen(false);
}
    return (
        <>
            <h1>Todo List</h1>
            <div className="tombol-tambah-todo">
                <button onClick={() => setIsModalOpen(true)}>
                    Tambah Todo
                </button>
            </div>
            <div className="judulkolom">
                <h2>Title</h2>
                <h2>Status</h2>
                <h2>Prioritas</h2>
                <h2>Deadline</h2>
                <h2>Aksi</h2>
            </div>
            <div className="daftartodo">
                {todos.map(todo => (
                    <div key={todo.id}>
                        <div className="list">
                            <p>{todo.title}</p>
                            <p>{todo.status}</p>
                            <p>{todo.prioritas}</p>
                            <p>{todo.deadline}</p>
                            <div className="tombol-aksi">
                                <button onClick={() =>{
                                    const yakin=window.confirm("Apakah kamu yakin ingin menghapus list ini?");
                                    if(yakin){
                                        handleDelete(todo.id);
                                    }
                                }}>
                                Hapus
                                </button>
                                <button onClick={()=> handleSee(todo.id)}>
                                {detailId===todo.id?'Tutup':'Lihat Detail'}
                                </button>
                            </div>
                        </div>
                        {detailId === todo.id && (
                            <LihatDetail
                                todo={todo}
                                onClose={() => setDetailId(null)}
                                onUpdate={()=> handleUpdate(todo)}
                            />
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <TodoForm
                    onAdd={handleAdd}
                    onUpdate={handleSaveUpdate}
                    initialData={editingTodo}
                    onClose={() => {
                        setIsModalOpen(false)
                        setEditingTodo(null)
                    }}
                        
                />
            )}
            
        </>
    )
}

export default App
