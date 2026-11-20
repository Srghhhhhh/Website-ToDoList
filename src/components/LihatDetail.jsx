import { useState } from 'react'
function LihatDetail({todo,onClose,onUpdate}){
    return(
        <>
            <div className="detail">  
                <div className="detail-judul">
                    <h2>Detail Todo</h2>
                </div>
                <div className="detail-list">
                    <h2>Judul</h2>
                    <p>{todo.title}</p>
                    <h2>Deskripsi</h2>
                    <p>{todo.deskripsi}</p>
                    <h2>Status</h2>
                    <p>{todo.status}</p>
                    <h2>Prioritas</h2>
                    <p>{todo.prioritas}</p>
                    <h2>Deadline</h2>
                    <p>{todo.deadline}</p>
                </div>
                <div className="detail-todo-button">
                    <button  type="button" onClick={onClose}>Batal</button>
                    <button  type="button" onClick={onUpdate}>Update</button>
                </div>
            </div>

        </>
    )
}
export default LihatDetail