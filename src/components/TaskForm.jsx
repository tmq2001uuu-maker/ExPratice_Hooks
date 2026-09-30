import React, { useRef, useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      inputRef.current?.focus();
      return;
    }
    onAdd(trimmedTitle);
    setTitle('');
    inputRef.current?.focus();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input ref={inputRef} aria-label="Tên công việc mới" placeholder="Nhập tên công việc..."
        value={title} onChange={event => setTitle(event.target.value)} />
      <button type="submit" disabled={!title.trim()}>Thêm</button>
    </form>
  );
}
