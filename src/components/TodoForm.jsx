
import { useState, useEffect } from 'react'

function TodoForm({ onAdd, onUpdate, onClose, initialData }) {
    const [title, setTitle] = useState('')
    const [deskripsi, setDeskripsi]=useState('')
    const [status, setStatus] = useState('todo')
    const [prioritas, setPrioritas] = useState('')
    const [deadline, setDeadline] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title)
            setDeskripsi(initialData.deskripsi || '')
            setStatus(initialData.status)
            setPrioritas(initialData.prioritas)
            setDeadline(initialData.deadline)
        } else {
            setTitle('')
            setDeskripsi('')
            setStatus('')
            setPrioritas('')
            setDeadline('')
        }
    }, [initialData])

    function handleSubmit(e) {
        e.preventDefault()

        if (!title.trim() || !status || !prioritas || !deadline) {
            setError("Semua wajib diisi!")
            return
        }

        const todoBaru = {
            id: initialData ? initialData.id : crypto.randomUUID(),
            title: title.trim(),
            status,
            deskripsi,
            prioritas,
            deadline
        }

        // Membedakan tambah dan update
        if (initialData) {
            onUpdate(todoBaru)
        } else {
            onAdd(todoBaru)
        }

        setError('')
    }

    return (
        <>
            <div className="daftarform">
                <form className="form" onSubmit={handleSubmit}>

                    <h2>{initialData ? 'Update Todo' : 'Tambah Todo'}</h2>

                    <p>Judul</p>
                    <input
                        className="card"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Masukkan judul"
                    />
                    <p>Deskripsi</p>
                    <input
                        className="card"
                        value={deskripsi}
                        onChange={e=>setDeskripsi(e.target.value)}
                        placeholder="Masukkan Deskripsi"
                    />
                    <p>Status</p>
                    <select
                        className="card"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    >
                        <option value="">Pilih Status</option>
                        <option value="todo">To do</option>
                        <option value="progress">In Progress</option>
                    </select>

                    <p>Prioritas</p>
                    <select
                        className="card"
                        value={prioritas}
                        onChange={e => setPrioritas(e.target.value)}
                    >
                        <option value="">Pilih Prioritas</option>
                        <option value="low">Low</option>
                        <option value="mid">Mid</option>
                        <option value="high">High</option>
                    </select>

                    <p>Deadline</p>
                    <input
                        className="card"
                        type="date"
                        value={deadline}
                        onChange={e => setDeadline(e.target.value)}
                    />

                    {error && <p role="alert">{error}</p>}

                    <button className="card" type="submit">
                        {initialData ? 'Simpan Perubahan' : 'Simpan Todo'}
                    </button>

                    <button className="card" type="button" onClick={onClose}>
                        Batal
                    </button>

                </form>
            </div>
        </>
    )
}

export default TodoForm
